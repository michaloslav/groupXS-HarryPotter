// returns all N choose K combinations
// mock function - since both n and k are between 1 and 5, we can make a mock function that works for these values
function nChooseKCombos(n, k){
  if(k === n){
    let onlyCombo = [] // there's only one possible combo in this case
    for(let i = 1; i <= n; i++) onlyCombo.push(i)
    return [onlyCombo]
  }

  if(k === 1){
    let result = []
    for(let i = 1; i <= n; i++) result.push([i])
    return result
  }

  if(k === n - 1){
    let result = []
    for(let i = 1; i <= n; i++){
      let combo = []
      for(let i2 = 1; i2 <= n; i2++) if(i !== i2) combo.push(i2)
      result.push(combo)
    }
    return result
  }

  if(k === 2){
    let result = []
    for(let item1 = 1; item1 <= n; item1++){
      for(let item2 = item1 + 1; item2 <= n; item2++){
        result.push([item1, item2])
      }
    }
    return result
  }

  if(k === n - 2){
    let result = []
    for(let item1 = 1; item1 <= n; item1++){
      for(let item2 = item1 + 1; item2 <= n; item2++){
        let combo = []
        for(let i = 1; i <= n; i++) if(i !== item1 && i !== item2) combo.push(i)
        result.push(combo)
      }
    }
    return result
  }

  console.warn("This scenario isn't supported by this mock function", n, k)
}

module.exports = nChooseKCombos