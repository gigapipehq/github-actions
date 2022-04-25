# Report deployment

A simple action that updates the deployment information on the Notion page.

## How to use it?

In a workflow use this action to report the deployed version of your application to a Notion Database page. You should call this action after the deployment job has succeeded or at least after the image has been build and pushed to the registry.

### Pre-requisits

- The Notion API token needs to be configured in the secrets of your repo or organization.
- A Notion database has been created containig:
  - A page for each application.
  - One property named after each environment (ie. `Dev`, `Staging`, `Production`). Use the name of that property in the `environment` input.
  - A text property named `Id`. Use the value as the `aplication` input.
- The repo's code needs to be checkout using [actions/checkout](https://github.com/actions/checkout)

### Inputs

| **Inputs**         | **Description**                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| `application`      | Name of the application being deployed. Maps to `Id` property in Notion database.                             |
| `version`          | Id of the new version being deployed.                                                                         |
| `environment`      | Name of the environment where the deployment took place. Maps to an existing property in the Notion dabatase. |
| `token`            | Provide the Notion token as a secret.                                                                         |
| `notionDatabaseId` | Id of the Notion database where the deployed version will be reported.                                        |

### Example

The example shows how this action can be used to report the deployed version of an application.

```yml
name: 'CI'
on:
  push:
    branches:
      - rc-v*

jobs:
  report-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
        uses: actions/checkout@v3.0.0
    - name: Extract next version from branch
        id: extract_version
        uses: actions/github-script@v6.0.0
        env:
          GITHUB_CONTEXT: ${{ toJson(github) }}
        with:
          result-encoding: string
          script: |
            const { GITHUB_CONTEXT } = process.env
            const githubContext = JSON.parse(GITHUB_CONTEXT)
            const newVersion = githubContext.ref.split('-v')[1]
            return newVersion
      - name: Get short hash
        id: get_short_sha
        run: echo "::set-output name=sha_short::$(git rev-parse --short HEAD)"
      - name: Report deploy
        uses: gigapipehq/github-actions/actions/report-deployment@main
        with:
          application: 'mch-ui'
          version: v${{steps.extract_version.outputs.result}}-dev.${{ steps.get_short_sha.outputs.sha_short }}
          environment: Dev
          token: ${{ secrets.NOTION_API_TOKEN }}
          notionDatabaseId: '123456789'

```
