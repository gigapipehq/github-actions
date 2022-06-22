import * as core from '@actions/core'
import * as github from '@actions/github'
import type { PullRequestEvent } from '@octokit/webhooks-types'
import { createRegex, fetchConfigurationFile, getPullRequestType } from './utils'

async function run(): Promise<void> {
  core.startGroup('📘 Reading input values')
  if (github.context.eventName === 'push') core.setFailed('This action only works on pull requests')

  try {
    const token = core.getInput('token')
    const octokit = github.getOctokit(token)

    const payload = github.context.payload as PullRequestEvent

    const configurationFile: string = core.getInput('configurationPath') ?? '.github/pr_linter.json'

    const config = await fetchConfigurationFile(octokit, {
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      path: configurationFile,
      ref: payload.pull_request.head.sha,
    })

    const ignoreCase = core.getInput('ignoreCase') === 'true'
    const validateTitle = core.getInput('validateTitle') === 'true'
    const validateBranch = core.getInput('validateBranch') === 'true'

    core.endGroup()

    core.startGroup('Retrieving pull request data')

    const prNumber = payload.pull_request.number
    const pullRequestType = getPullRequestType(
      payload.pull_request.base.ref,
      payload.pull_request.head.ref,
    )

    if (!pullRequestType) {
      core.setFailed(
        `Unsupported pull request type. Review the base (${payload.pull_request.base.ref}) and head (${payload.pull_request.head.ref}) branches.`,
      )
      return
    }

    const title = ignoreCase ? payload.pull_request.title.toLowerCase() : payload.pull_request.title

    const branch = ignoreCase
      ? payload.pull_request.head.ref.toLowerCase()
      : payload.pull_request.head.ref
    core.endGroup()

    core.startGroup('Validating pull request data')

    const statuses = []

    if (validateTitle) {
      core.info('Validating pull request title')
      core.debug(`title rules = ${config.rules[pullRequestType].title}`)
      const isTitleValid = config.rules[pullRequestType].title.every(rule =>
        createRegex(rule).test(title),
      )
      statuses.push(isTitleValid)

      if (!isTitleValid) {
        core.info('Title is not valid')
        core.debug(`title error mesage = ${config.rules[pullRequestType].titleErrorMessage}`)
        await octokit.rest.issues.createComment({
          owner: payload.repository.owner.login,
          repo: payload.repository.name,
          issue_number: prNumber,
          body: config.rules[pullRequestType].titleErrorMessage,
        })
      }
    }

    if (validateBranch) {
      core.info('Validating pull request base branch name')
      core.debug(`branch rules = ${config.rules[pullRequestType].branch}`)

      const isBranchValid = config.rules[pullRequestType].branch?.every(rule =>
        createRegex(rule).test(branch),
      )
      statuses.push(isBranchValid)

      if (!isBranchValid) {
        core.info('Branch name is not valid')
        core.debug(`branch name error mesage = ${config.rules[pullRequestType].branchErrorMessage}`)

        await octokit.rest.issues.createComment({
          owner: payload.repository.owner.login,
          repo: payload.repository.name,
          issue_number: prNumber,
          body: config.rules[pullRequestType].titleErrorMessage,
        })
      }
    }

    if (statuses.some(status => status === false)) {
      core.setFailed('Pull request is not valid')
    }
    core.endGroup()
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

run()
