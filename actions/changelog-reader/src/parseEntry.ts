import { semver } from './regexps'

export const parseEntry = (entry: string) => {
  const [title, ...other] = entry.trim().split('\n')

  const [versionNumber] = title.match(semver)!

  return {
    id: versionNumber,
    text: other.join('\n').trim(),
  }
}
