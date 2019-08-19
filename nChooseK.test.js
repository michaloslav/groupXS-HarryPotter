const nChooseKCombos = require('./nChooseK')

describe('n = 5', () => {
  test('k = 1', () => {
    expect(nChooseKCombos(5, 1)).toEqual([
      [1],
      [2],
      [3],
      [4],
      [5]
    ])
  })

  test('k = 2', () => {
    expect(nChooseKCombos(5, 2)).toEqual([
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 3],
      [2, 4],
      [2, 5],
      [3, 4],
      [3, 5],
      [4, 5]
    ])
  })

  test('k = 3', () => {
    expect(nChooseKCombos(5, 3)).toEqual([
      [3, 4, 5],
      [2, 4, 5],
      [2, 3, 5],
      [2, 3, 4],
      [1, 4, 5],
      [1, 3, 5],
      [1, 3, 4],
      [1, 2, 5],
      [1, 2, 4],
      [1, 2, 3]
    ])
  })

  test('k = 4', () => {
    expect(nChooseKCombos(5, 4)).toEqual([
      [2, 3, 4, 5],
      [1, 3, 4, 5],
      [1, 2, 4, 5],
      [1, 2, 3, 5],
      [1, 2, 3, 4]
    ])
  })

  test('k = 5', () => {
    expect(nChooseKCombos(5, 5)).toEqual([[1, 2, 3, 4, 5]])
  })
})

describe('n = 3', () => {
  test('k = 1', () => {
    expect(nChooseKCombos(3, 1)).toEqual([
      [1],
      [2],
      [3]
    ])
  })

  test('k = 2', () => {
    expect(nChooseKCombos(3, 2)).toEqual([
      [2, 3],
      [1, 3],
      [1, 2]
    ])
  })

  test('k = 3', () => {
    expect(nChooseKCombos(3, 3)).toEqual([[1, 2, 3]])
  })
})

test('n = 1, k = 1', () => {
  expect(nChooseKCombos(1, 1)).toEqual([[1]])
})