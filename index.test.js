const getPriceOfBooks = require('./index')

describe('No discount', () => {
  test('1 book', () => {
    for(let i = 1; i <= 5; i++) expect(getPriceOfBooks({ [i]: 1 })).toBe(8)
  })
  
  test('2 copies of the same book', () => {
    for(let i = 1; i <= 5; i++) expect(getPriceOfBooks({ [i]: 2 })).toBe(16)
  })
  
  test('10 copies of the same book', () => {
    for(let i = 1; i <= 5; i++) expect(getPriceOfBooks({ [i]: 10 })).toBe(80)
  })
})

describe('One discount applicable', () => {
  test('1 copy of 2 different books', () => {
    for(let i = 1; i <= 4; i++){
      expect(getPriceOfBooks({ [i]: 1, [i + 1]: 1 })).toBe(8 * 2 * .95)
    }

    // make sure it works if they aren't subsequent
    expect(getPriceOfBooks({ 1: 1, 4: 1 })).toBe(8 * 2 * .95)
  })

  test('1 copy of 3 different books', () => {
    for(let i = 1; i <= 3; i++){
      expect(getPriceOfBooks({ [i]: 1, [i + 1]: 1, [i + 2]: 1 })).toBe(8 * 3 * .9)
    }

    // make sure it works if they aren't subsequent
    expect(getPriceOfBooks({ 1: 1, 4: 1, 5: 1 })).toBe(8 * 3 * .9)
  })

  test('1 copy of 4 different books', () => {
    for(let i = 1; i <= 2; i++){
      expect(getPriceOfBooks({ [i]: 1, [i + 1]: 1, [i + 2]: 1, [i + 3]: 1 })).toBe(8 * 4 * .8)
    }

    // make sure it works if they aren't subsequent
    expect(getPriceOfBooks({ 1: 1, 2: 1, 4: 1, 5: 1 })).toBe(8 * 4 * .8)
  })

  test('1 copy of each book', () => {
    expect(getPriceOfBooks({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 })).toBe(8 * 5 * .75)
  })
})

describe('Multiple discounts applicable', () => {
  test('2 copies of the first 3, 1 copy of the fourth and fifth', () => {
    expect(getPriceOfBooks({ 1: 2, 2: 2, 3: 2, 4: 1, 5: 1 })).toBe(51.2)
  })

  test('3 copies of the first 4 books, 2 copies of the last one', () => {
    expect(getPriceOfBooks({ 1: 3, 2: 3, 3: 3, 4: 3, 5: 2 })).toBe(85.6)
  })

  test('4 of the first two and 2 of the next two', () => {
    expect(getPriceOfBooks({ 1: 4, 2: 4, 3: 2, 4: 2 })).toBe(81.6)
  })

  test('5 copies of the first, 4 of the second, 3 of the third, 2 of the fourth, one of the last', () => {
    expect(getPriceOfBooks({ 1: 5, 2: 4, 3: 3, 4: 2, 5: 1 })).toBe(100)
  })
})