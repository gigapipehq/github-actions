# Changelog Reader

A simple action that reads the CHANGELOG.md file and extract the content corresponding to that version.

Forked from [conventional-changelog-reader-action](https://github.com/artlaman/conventional-changelog-reader-action) and addapted to the internal CHANGELOG.md format.

## How to use it?

In a workflow use this action to read from the file and use the output string for example to create a GitHub Release.

### Pre-requisits

- A markdown file containing the changelog should exist in the repo. Its content must adere to the format outputed by [mikepenz/release-changelog-builder-action](https://github.com/mikepenz/release-changelog-builder-action).
- The repo's code needs to be checkout using [actions/checkout](https://github.com/actions/checkout)

### Inputs

| **Inputs** | **Description**                                                                     |
| ---------- | ----------------------------------------------------------------------------------- |
| `path`     | Path to the CHANGELOG file containing the log entries. Defaults to `./CHANGELOG.md` |
| `version`  | Version of the log entry wanted. A valid semver number (ie. `1.0.5`)                |

### Outputs

| **Outputs** | **Description**                                                                                      |
| ----------- | ---------------------------------------------------------------------------------------------------- |
| `changes`   | Description text of the log entry found. Use it as an input for another step (see the example below) |
| `version`   | Version of the log entry found. A valid semver number (ie. `1.0.5`)                                  |

### Example

The example shows how this action can be used to read the changelog entry for a specific version and use that content as the body of a GitHub Release.

```yml
name: 'CI'
on:
  push:
    branches:
      - main

jobs:
  example:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
        uses: actions/checkout@v3.0.0
    - name: Read CHANGELOG.md
        id: read_changelog
        uses: gigapipehq/github-actions/actions/changelog-reader@main
        with:
          version: v1.0.5
          path: ./CHANGELOG.md
      - name: Create Release
        id: create_release
        uses: softprops/action-gh-release@v1
        with:
          body: ${{steps.read_changelog.outputs.changes}}
          tag_name: v1.0.5
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
