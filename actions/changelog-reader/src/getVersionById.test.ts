import { getVersionById } from './getVersionById'

test('get latest if no version provided', () => {
  const input = [
    {
      id: 'v2.0.2',
      text: 'text',
    },
    {
      id: 'v2.0.1',
      text: 'text',
    },
  ]
  const output = getVersionById(input)

  expect(output?.id).toEqual(input[0].id)
})

test('return null if bad version provided', () => {
  const input = [
    {
      id: 'v2.0.2',
      text: 'text',
    },
    {
      id: 'v2.0.1',
      text: 'text',
    },
  ]
  const output = getVersionById(input, 'v1.2.12')

  expect(output).toBeUndefined()
})

test('support X.X.X version patern', () => {
  const input = [
    {
      id: 'v2.0.2',
      text: 'text',
    },
    {
      id: '2.0.1',
      text: 'text',
    },
    {
      id: '1.13.2',
      text: 'text',
    },
  ]
  const output = getVersionById(input, '2.0.1')

  expect(output?.id).toEqual('2.0.1')
})

test('get the correct version', () => {
  const input = [
    {
      id: 'v2.1.1',
      text: 'text',
    },
    {
      id: 'v2.1.0',
      text: 'text',
    },
    {
      id: 'v2.0.0',
      text: 'text',
    },
    {
      id: 'v1.2.12',
      text: 'text',
    },
  ]
  const output = getVersionById(input, 'v2.1.0')

  expect(output?.id).toEqual(input[1].id)
})

test('dont depend on presence of "v"', () => {
  const input = [
    {
      id: 'v2.0.2',
      text: 'text',
    },
    {
      id: '2.0.1',
      text: 'text',
    },
    {
      id: '1.13.2',
      text: 'text',
    },
  ]
  const output = getVersionById(input, 'v2.0.1')
  expect(output?.id).toEqual('2.0.1')

  const output2 = getVersionById(input, '2.0.2')
  expect(output2?.id).toEqual('v2.0.2')
})
