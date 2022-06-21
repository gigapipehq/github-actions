import * as core from '@actions/core'
import * as github from '@actions/github'
import type { PullRequestEvent } from '@octokit/webhooks-types'

import { semver } from './regexps'
import type { Languages } from './types'

import { bumpVersion, commitChanges, updateChangelogFile, updatePRDescription } from './utils'

const DEFAULT_VERSIONING_FILES: Record<Languages, string> = {
  javascript: 'package.json',
  python: 'app/__init__.py',
  golang: 'version.txt',
}

async function run(): Promise<void> {
  core.startGroup('📘 Reading input values')
  if (github.context.eventName === 'push') core.setFailed('This action only works on pull requests')

  try {
    const changelogContent = core.getInput('changelogContent')
    const changelogFile = core.getInput('changelogFile') || 'CHANGELOG.md'
    const appLanguage = core.getInput('appLanguage') as Languages
    const versioningFilePath =
      core.getInput('versioningFilePath') || DEFAULT_VERSIONING_FILES[appLanguage]
    const token = core.getInput('token')
    const commiterName = core.getInput('commiterName') || 'Gigapipe Bot'
    const commiterEmail = core.getInput('commiterEmail') || 'engineering@gigapipe.com'

    if (!changelogContent)
      core.setFailed(
        'You must provide a changelog content generated by release-changelog-builder-action',
      )
    if (!appLanguage) core.setFailed('No language specified')

    const payload = github.context.payload as PullRequestEvent
    const newAppVersion = payload.pull_request.head.ref.split('-v')[1]
    if (!semver.test(newAppVersion))
      core.setFailed('Invalid version format. Review the name of the head branch')

    core.endGroup()

    const octokit = github.getOctokit(token)

    await updateChangelogFile(changelogFile, changelogContent, newAppVersion)

    await bumpVersion(newAppVersion, { appLanguage, filepath: versioningFilePath })

    await commitChanges(`chore: release version v${newAppVersion} and update CHANGELOG.md`, {
      name: commiterName,
      email: commiterEmail,
      branch: payload.pull_request.head.ref,
    })

    await updatePRDescription(changelogContent, octokit)
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

run()
