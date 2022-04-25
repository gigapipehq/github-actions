import * as core from '@actions/core'
import { Client } from '@notionhq/client'

async function run(): Promise<void> {
  core.startGroup('📘 Reading input values')

  try {
    const application = core.getInput('application').toLowerCase()
    const version = core.getInput('version')
    const env = core.getInput('environment').toLowerCase()
    const token = core.getInput('token')
    const databaseId = core.getInput('notionDatabaseId')

    if (!application) core.setFailed('You must provide an application name')
    if (!version) core.setFailed('You must provide a new version id')
    if (!env) core.setFailed('You must provide a valid ')
    if (!token) core.setFailed('You must provide a token for the Notion API')
    if (!databaseId)
      core.setFailed(
        'You must provide the ID of the Notion database to write the deployed versions',
      )

    core.endGroup()

    const notion = new Client({
      auth: token,
    })

    core.startGroup(`🗄️ Retriving Notion page for ${application}`)

    const { results } = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Id',
        rich_text: {
          equals: application,
        },
      },
    })
    if (!results.length) {
      core.setFailed(`There is no application named ${application} on the Notion page`)
    } else if (results.length > 1) {
      core.setFailed(`There is more than one application named ${application} on the Notion page`)
    }

    core.endGroup()

    core.startGroup('💾 Updating version in Notion')

    const pageId = results[0].id
    const propertyKey = env.charAt(0).toUpperCase() + env.slice(1)

    await notion.pages.update({
      page_id: pageId,
      properties: {
        [propertyKey]: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: version,
              },
            },
          ],
        },
      },
    })

    core.endGroup()
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

run()
