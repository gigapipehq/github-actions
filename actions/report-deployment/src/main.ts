import * as core from '@actions/core'
import { Client } from '@notionhq/client'

async function run(): Promise<void> {
  core.startGroup('📘 Reading input values')

  try {
    const applicationName = core.getInput('application')
    const newVersion = core.getInput('newVersion')
    const env = core.getInput('environment')
    const token = core.getInput('token')
    const databaseId = core.getInput('notionDatabaseId')

    core.endGroup()

    const notion = new Client({
      auth: token,
    })

    core.startGroup(`Retriving Notion page for ${applicationName}`)

    const { results } = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Application',
        title: {
          equals: applicationName,
        },
      },
    })
    if (!results.length) {
      core.setFailed(`There is no application with this name defined in the Notion page`)
    } else if (results.length > 1) {
      core.setFailed(`There are more than one application with this name on the Notion page`)
    }

    core.endGroup()

    core.startGroup('Updating version in Notion')

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
                content: newVersion,
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
