export type PullRequestsTypes = 'feature' | 'pre-release' | 'release'

export type Config = {
  rules: Record<
    PullRequestsTypes,
    {
      title: RegExp[]
      titleErrorMessage: string
      branch?: RegExp
      branchErrorMessage?: string
      body?: RegExp
    }
  >
}

export const defaultConfig: Config = {
  rules: {
    feature: {
      title: [/CU-[a-zA-Z0-9]{7}/, /^[A-Z]/],
      titleErrorMessage:
        'The title must start with a capital letter and contain the ClickUp task id with the CU-XXXXXXX format',
      branch: /^(feature|feat|bugfix|bug|other|test)\//,
      branchErrorMessage:
        'The branch must start with one of the accepted prefixes (_feature, feat, bugfix, bug, other, test_).',
    },
    'pre-release': {
      title: [/Pre-release v[0-9]+.[0-9]+.[0-9]+/],
      titleErrorMessage:
        'The title must be _Pre-release_ followed by the version number with the vX.Y.Z format',
    },
    release: {
      title: [/Release v[0-9]+.[0-9]+.[0-9]+/],
      titleErrorMessage:
        'The title must be _Release_ followed by the version number with the vX.Y.Z format',
    },
  },
}
