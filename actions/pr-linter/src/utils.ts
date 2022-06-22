import * as core from '@actions/core'
import * as github from '@actions/github'

import { type Config, defaultConfig, type PullRequestsTypes } from './config'

export function getPullRequestType(
  baseBranch: string,
  headBranch: string,
): PullRequestsTypes | undefined {
  if (baseBranch.startsWith('rc-v') || baseBranch.startsWith('hotfix-v')) {
    core.debug('Pull request is of type `feature`')
    return 'feature'
  }
  if (headBranch === 'staging') {
    core.debug('Pull request is of type `pre-release`')
    return 'pre-release'
  }
  if (headBranch === 'master' || headBranch === 'main') {
    core.debug('Pull request is of type `release`')
    return 'release'
  }
  return undefined
}

export async function fetchConfigurationFile(
  client: ReturnType<typeof github.getOctokit>,
  options: { owner: string; repo: string; path: string; ref: string },
) {
  const { owner, repo, path, ref } = options

  if (path) {
    core.debug(`configurationPath = '${path}'`)

    let rawConfig: any
    try {
      const result = await client.rest.repos.getContent({
        owner,
        repo,
        path,
        ref,
      })
      rawConfig = result.data

      core.info(`ℹ️ Configuration successfully loaded.`)
      core.debug(`rawConfig = ${rawConfig}`)
    } catch (error) {
      core.info(`⚠️ Configuration path provided, but it couldn't be found. Fallback to Defaults.`)
      return defaultConfig
    }

    try {
      const configurationJSON: Config = JSON.parse(rawConfig.content)

      core.debug(`configuration = ${JSON.stringify(configurationJSON)}`)

      return configurationJSON
    } catch (error) {
      core.info(`⚠️ Configuration provided, but it couldn't be parsed. Fallback to Defaults.`)
      return defaultConfig
    }
  } else {
    core.info(`ℹ️ Configuration not provided. Using Defaults.`)
    return defaultConfig
  }
}
