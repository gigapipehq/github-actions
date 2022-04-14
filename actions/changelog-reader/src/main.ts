import { readFile } from 'fs/promises'
import * as core from '@actions/core'

import { parseEntry } from './parseEntry'
import { getEntries } from './getEntries'
import { getVersionById } from './getVersionById'

async function run(): Promise<void> {
  try {
    const changelogPath = core.getInput('path') || './CHANGELOG.md'
    const targetVersion = core.getInput('version') || undefined

    if (targetVersion === undefined) {
      core.warning(
        `No target version specified. Will try to return the most recent one in the changelog file.`,
      )
    }

    core.startGroup('Parse data')

    const rawData = await readFile(changelogPath, { encoding: 'utf8' })
    const versions = getEntries(rawData).map(parseEntry)
    core.debug(`${versions.length} version logs found`)
    core.endGroup()

    const version = getVersionById(versions, targetVersion)

    if (version == null) {
      throw new Error(
        `No log entry found${targetVersion != null ? ` for version ${targetVersion}` : ''}`,
      )
    }

    core.setOutput('version', version.id)
    core.setOutput('changes', version.text)
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

run()
