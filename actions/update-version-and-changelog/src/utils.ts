import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as github from '@actions/github'
import type { PullRequestEvent } from '@octokit/webhooks-types'

import { readFile, writeFile } from 'fs/promises'
import type { Languages } from './types'

export async function updateChangelogFile(filepath: string, changelog: string, version: string) {
  core.startGroup('💾 Updating changelog file')
  core.info(`Updating ${filepath}`)
  core.info(changelog)

  const currentContent = await readFile(filepath, { encoding: 'utf8' })

  const newContent = [`# v${version}\n\n`, `${changelog}\n\n`, `${currentContent}`].join('')

  await writeFile(filepath, newContent, { encoding: 'utf8' })

  core.endGroup()
}

export async function bumpVersion(
  version: string,
  options: { appLanguage: Languages; filepath: string },
): Promise<void> {
  core.startGroup('💾 Updating app version')
  core.info(`Updating ${options.filepath ?? 'package.json'}`)

  switch (options.appLanguage) {
    case 'javascript':
      await exec.exec('npm', [
        'version',
        version,
        '--git-tag-version=false',
        '--allow-same-version=true',
      ])
      break
    case 'python':
      await writeFile(options.filepath, [`__version__ = `, `"${version}"`].join(''))
      break
    case 'golang':
      await writeFile(options.filepath, version)
      break
    default:
      core.setFailed(`Unsupported application language: ${options.appLanguage}`)
      break
  }

  core.endGroup()
}

export async function commitChanges(message: string, config: { name: string; email: string }) {
  core.startGroup('💾 Committing changes')

  await exec.exec('git', ['config', '--global', 'user.name', config.name])
  await exec.exec('git', ['config', '--global', 'user.email', config.email])

  await exec.exec('git', ['commit', '-a', '-m', message, '--no-verify'])

  await exec.exec('git', ['push', '--force'])

  core.endGroup()
}

export async function updatePRDescription(
  description: string,
  octokit: ReturnType<typeof github.getOctokit>,
): Promise<void> {
  core.startGroup('💾 Updating PR description')

  const payload = github.context.payload as PullRequestEvent
  const prNumber = payload.pull_request.number

  const newDescription = `${description}\n\nThis PR was automatically updated by the [Gigapipe Bot]`

  await octokit.rest.pulls.update({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    body: newDescription,
    pull_number: prNumber,
  })

  core.endGroup()
}
