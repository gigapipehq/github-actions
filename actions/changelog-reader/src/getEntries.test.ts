import { getEntries } from './getEntries'

const DATA = `
# v1.1.0

## 🚀 Features

- Group disks by node CU-21w7u3c (#499) @gyopiazza

# v1.0.1

## 🐛 Fixes

- Fix style issue of Stepper in safari (#513) @oriolcastro

# v1.0.0

## 💬 Other

- Fix development automation for draft pull requests (#511) @oriolcastro
`

test('retreive entries', () => {
  const output = getEntries(DATA)

  expect(output.length).toEqual(3)
})
