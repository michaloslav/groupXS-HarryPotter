const discountPercentages = {
  1: 1,
  2: .95,
  3: .9,
  4: .8,
  5: .75
}

const nChooseKCombos = require('./nChooseK')

let memoizedPrices = {}

// bookset - in the following format:
// {
//   1: 3, // 3 copies of the first book
//   3: 2 // 2 copies of the third book
// }
function getPriceOfBooks(bookset){
  // check if the bookset has already been memoized
  const stringifiedBookset = JSON.stringify(bookset)
  if(memoizedPrices[stringifiedBookset]) return memoizedPrices[stringifiedBookset]

  // init the variable
  let possiblePrices = []

  const booksetKeys = Object.keys(bookset)
  const booksetKeysLength = booksetKeys.length

  // base cases
  if(booksetKeysLength === 0) return 0
  if(booksetKeysLength === 1) return Object.values(bookset)[0] * 8

  // find all the possible ways to apply one discount to the bookset
  // then call the function recursively to get the price of the other books
  for(let [numberOfDiscountedBooks, discountPerc] of Object.entries(discountPercentages)){
    numberOfDiscountedBooks = Number(numberOfDiscountedBooks)

    // if the discount cannot be applied, break
    if(numberOfDiscountedBooks > booksetKeysLength) break

    // get all the possible combinations of books to apply the discount to
    // (eg. if we're applying the 2-different-books discount to a bookset with 3 different books,
    // discountCombosPure will be [[1, 2], [1, 3], [2, 3]])
    const discountCombosPure = nChooseKCombos(booksetKeysLength, numberOfDiscountedBooks)

    // the discount combos need to be applied to the bookset
    // eg. if the bookset is {2: 1, 3: 1, 5: 1} and discountCombosPure is [[1, 2], [1, 3], [2, 3]],
    // this will change 1 -> 2, 2 -> 3, 3 -> 5 and give us the final result of [[2, 3], [2, 5], [3, 5]]
    let discountCombos = []
    let changesToBeApplied = {}
    booksetKeys.forEach((key, index) => changesToBeApplied[index + 1] = Number(key))
    discountCombosPure.forEach(combo => {
      let appliedCombo = []
      combo.forEach(itemId => {
        appliedCombo.push(changesToBeApplied[itemId])
      })
      discountCombos.push(appliedCombo)
    })

    discountCombos.forEach(discountCombo => {
      const costOfDiscountedBooks = 8 * numberOfDiscountedBooks * discountPerc

      // get the bookset remaining after the discount
      let booksetWithoutDiscountedBooks = {}
      for(let [bookId, bookAmount] of Object.entries(bookset)){
        bookId = Number(bookId)
        if(discountCombo.includes(bookId)){
          if(bookAmount > 1) booksetWithoutDiscountedBooks[bookId] = bookAmount - 1
        }
        else booksetWithoutDiscountedBooks[bookId] = bookAmount
      }

      // get the price of the booksetWithoutDiscountedBooks
      const costOfBooksWithoutADiscount = getPriceOfBooks(booksetWithoutDiscountedBooks)

      possiblePrices.push(costOfDiscountedBooks + costOfBooksWithoutADiscount)
    })
  }

  // the lowest possible price
  const result = Math.min(...possiblePrices)

  // memoize the result
  memoizedPrices[stringifiedBookset] = result

  return result
}

console.log(getPriceOfBooks({1: 3, 2: 3, 3: 3, 4: 3, 5: 2}));

module.exports = getPriceOfBooks
