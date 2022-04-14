import { parseEntry } from './parseEntry'

const entryDescription = `
## 🚀 Features

- Group disks by node CU-21w7u3c (#499) @gyopiazza

## 🐛 Fixes

- Fix style issue of Stepper in safari (#513) @oriolcastro

## 💬 Other

- Fix development automation for draft pull requests (#511) @oriolcastro
`

test('get readable data from text entry', () => {
  const input = `
    # v3.0.0
    ${entryDescription}
  `
  const output = parseEntry(input)

  expect(output.id).toEqual('3.0.0')
  expect(output.text).toContain(`## 🚀 Features`)
  expect(output.text).toContain(`- Fix style issue of Stepper in safari (#513) @oriolcastro`)
})
