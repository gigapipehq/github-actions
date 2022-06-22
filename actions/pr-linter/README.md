# Pull request linter

A GitHub action that validates the title, branch, and body of a pull request.

## How to use it?

In a workflow triggered by a pull request event use this action to validate the PR.

### Pre-requisits

No pre-requisits.

### Inputs

| **Inputs**          | **Description**                                                                                                          | **Required** | **Default**               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------ | ------------------------- |
| `configurationPath` | Relative path to the configuration file.                                                                                 | false        | `.github/pr_linter.json'` |
| `token`             | Personal access token with enough permissions to interact with the repo and its branches.                                | false        | `secrets.GITHUB_TOKEN`    |
| `ignoreCase`        | Boolean that controls if the validation should be case agnostic.                                                         | false        | `false`                   |
| `validateTitle`     | Boolean that controls if the pull request title should be validated.                                                     | false        | `true`                    |
| `validateBranch`    | Boolean that controls if the pull request base branch name should be validated. It only applies to feature pull requests | false        | `true`                    |

### Example

The example shows how this action can be used to report the deployed version of an application.

```yml
name: 'CI'
on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

jobs:
  pr-automation:
    runs-on: ubuntu-latest
    name: Pull request automation
    steps:
      - name: Lint Pull Request
        uses: gigapipehq/github-actions/actions/pr-linter@main
```
