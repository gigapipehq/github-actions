import { semver } from './regexps'

export const getVersionById = (versions: { id: string; text: string }[], id?: string) => {
  if (id) {
    return versions.find(version => {
      const [semverVersionId] = version.id.match(semver)!
      const [semverId] = id.match(semver)!

      return semverVersionId === semverId
    })
  }

  return versions[0]
}
