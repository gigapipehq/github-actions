import * as core from '@actions/core'
import { semver } from './regexps'

const headerRegex = new RegExp(`# v${semver.source}`, 'g')

export const getEntries = (rawData: string): string[] => {
  const content = String(rawData)

  core.debug(`CHANGELOG content: ${content}`)

  const headerIndexes = [...content.matchAll(headerRegex)].map(match => match.index)
  const versions = headerIndexes.map((e, i) => content.slice(e, headerIndexes[i + 1]))

  return versions
}
