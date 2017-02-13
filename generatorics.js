/*
 *  Licensed under the MIT license.
 *  http://www.opensource.org/licenses/mit-license.php
 *
 *  References:
 *    http://www.ruby-doc.org/core-2.0/Array.html#method-i-combination
 *    http://www.ruby-doc.org/core-2.0/Array.html#method-i-permutation
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    root.G = factory()
  }
}(this, function() {

'use strict'

/** @exports G */
const G = {

  clones: false,

  /**
   * Calculates a factorial
   * @param {Number} n - The number to operate the factorial on.
   * @returns {Number} n!
   */
  factorial: function factorial(n) {
    for (var ans = 1; n; ans *= n--);
    return ans
  },

  /**
   * Converts a number to the factorial number system. Digits are in least significant order.
   * @param {Number} n - Integer in base 10
   * @returns {Array} digits of n in factoradic in least significant order
   */
  factoradic: function factoradic(n) {
    let radix = 1
    for (var digit = 1; radix < n; radix *= ++digit);
    if (radix > n) radix /= digit--
    let result = [0]
    for (; digit; radix /= digit--) {
      result[digit] = Math.floor(n / radix)
      n %= radix
    }
    return result
  },

  /**
   * Calculates the number of possible permutations of "k" elements in a set of size "n".
   * @param {Number} n - Number of elements in the set.
   * @param {Number} k - Number of elements to choose from the set.
   * @returns {Number} n P k
   */
  P: function P(n, k) {
    return this.factorial(n) / this.factorial(n - k)
  },

  /**
   * Calculates the number of possible combinations of "k" elements in a set of size "n".
   * @param {Number} n - Number of elements in the set.
   * @param {Number} k - Number of elements to choose from the set.
   * @returns {Number} n C k
   */
  C: function C(n, k) {
    return this.P(n, k) / this.factorial(k)
  },

  /**
   * Higher level method for counting number of possible combinations of "k" elements from a set of size "n".
   * @param {Number} n - Number of elements in the set.
   * @param {Number} k - Number of elements to choose from the set.
   * @param {Object} [options]
   * @param {Boolean} options.replace - Is replacement allowed after each choice?
   * @param {Boolean} options.ordered - Does the order of the choices matter?
   * @returns {Number} Number of possible combinations.
   */
  choices: function choices(n, k, options = {}) {
    if (options.replace) {
      if (options.ordered) {
        return Math.pow(n, k)
      } else {
        return this.C(n + k - 1, k)
      }
    } else {
      if (options.ordered) {
        return this.P(n, k)
      } else {
        return this.C(n, k)
      }
    }
  },

  /**
   * Generates all combinations of a set.
   * @param {Array|String} arr - The set of elements.
   * @param {Number} [size=arr.length] - Number of elements to choose from the set.
   * @returns {Generator} yields each combination as an array
   */
  combination: function* combination(arr, size = arr.length) {
    let that = this
    let end = arr.length - 1
    let data = []
    yield* combinationUtil(0, 0)
    function* combinationUtil(start, index) {
      if (index === size) { // Current combination is ready to be processed, yield it
        return yield that.clones ? data.slice() : data // .slice() is a JS idiom for shallow cloning an array
      }
      // replace index with all possible elements. The condition
      // "end - i + 1 >= size - index" makes sure that including one element
      // at index will make a combination with remaining elements
      // at remaining positions
      for (let i = start; i <= end && end - i + 1 >= size - index; i++) {
        data[index] = arr[i]
        yield* combinationUtil(i + 1, index + 1)
      }
    }
  },

  /**
   * Generates all permutations of a set.
   * @param {Array|String} arr - The set of elements.
   * @param {Number} [size=arr.length] - Number of elements to choose from the set.
   * @returns {Generator} yields each permutation as an array
   */
  permutation: function* permutation(arr, size = arr.length) {
    let that = this
    let len = arr.length
    if (size === len) { // switch to Heap's algorithm. it's more efficient
      return yield* heapsAlg(arr, that.clones)
    }
    let data = []
    let indecesUsed = [] // permutations do not repeat elements. keep track of the indeces of the elements already used
    yield* permutationUtil(0)
    function* permutationUtil(index) {
      if (index === size) {
        return yield that.clones ? data.slice() : data
      }
      for (let i = 0; i < len; i++) {
        if (!indecesUsed[i]) {
          indecesUsed[i] = true
          data[index] = arr[i]
          yield *permutationUtil(index + 1)
          indecesUsed[i] = false
        }
      }
    }
  },

  /**
  * Generates all possible subsets of a set (a.k.a. power set).
  * @param {Array|String} arr - The set of elements.
  * @returns {Generator} yields each subset as an array
  */
  powerSet: function* powerSet(arr) {
    let that = this
    let len = arr.length
    let data = []
    yield* powerUtil(0, 0)
    function* powerUtil(start, index) {
      data.length = index
      yield that.clones ? data.slice() : data
      if (index === len) {
        return
      }
      for (let i = start; i < len; i++) {
        data[index] = arr[i]
        yield* powerUtil(i + 1, index + 1)
      }
    }
  },

  /**
   * Generates the permutation of the combinations of a set.
   * @param {Array|String} arr - The set of elements.
   * @returns {Generator} yields each permutation as an array
   */
  permutationCombination: function* permutationCombination(arr) {
    let that = this
    let len = arr.length
    let data = []
    let indecesUsed = []
    yield* permutationUtil(0)
    function* permutationUtil(index) {
      data.length = index
      yield that.clones ? data.slice() : data
      if (index === len) {
        return
      }
      for (let i = 0; i < len; i++) {
        if (!indecesUsed[i]) {
          indecesUsed[i] = true
          data[index] = arr[i]
          yield *permutationUtil(index + 1)
          indecesUsed[i] = false
        }
      }
    }
  },

  /**
   * Generates all possible "numbers" from the digits of a set.
   * @param {Array|String} arr - The set of digits.
   * @param {Number} [size=arr.length] - How many digits will be in the numbers.
   * @returns {Generator} yields all digits as an array
   */
  baseN: function* baseN(arr, size = arr.length) {
    let that = this
    let len = arr.length
    let data = []
    yield* baseNUtil(0)
    function* baseNUtil(index) {
      if (index === size) {
        return yield that.clones ? data.slice() : data
      }
      for (let i = 0; i < len; i++) {
        data[index] = arr[i]
        yield* baseNUtil(index + 1)
      }
    }
  },

  /**
   * Infinite generator for all possible "numbers" from a set of digits.
   * @param {Array|String} arr - The set of digits
   * @returns {Generator} yields all digits as an array
   */
  baseNAll: function* permutationAll(arr) {
    for (let len = 1; true; len++) {
      yield* this.baseN(arr, len)
    }
  },

  /**
   * Generates the cartesian product of the sets.
   * @param {...(Array|String)} sets - variable number of sets of n elements.
   * @returns {Generator} yields each product as an array
   */
  cartesian: function* cartesian(...sets) {
    let that = this
    let data = []
    yield* cartesianUtil(0)
    function* cartesianUtil(index) {
      if (index === sets.length) {
        return yield that.clones ? data.slice() : data
      }
      for (let i = 0; i < sets[index].length; i++) {
        data[index] = sets[index][i]
        yield* cartesianUtil(index + 1)
      }
    }
  },

  /**
   * Shuffles an array in place using the Fisher–Yates shuffle.
   * @param {Array} arr - A set of elements.
   * @returns {Array} a random, unbiased perutation of arr
   */
  shuffle: function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      swap(arr, i, j)
    }
    return arr
  }

}


let clone = { clones: true }
clone.combination = G.combination
clone.permutation = G.permutation
clone.powerSet = G.powerSet
clone.permutationCombination = G.permutationCombination
clone.baseN = G.baseN
clone.baseNAll = G.baseNAll
clone.cartesian = G.cartesian

G.clone = clone



/*
 * More efficient alorithm for permutations of All elements in an array. Doesn't
 * work for "sub-permutations", e.g. permutations of 3 elements from [1, 2, 3, 4, 5]
 */
function* heapsAlg(arr, clone) {
  let size = arr.length
  if (typeof arr === 'string') {
    arr = arr.split('')
  }
  yield* heapsUtil(0)
  function* heapsUtil(index) {
    if (index === size) {
      return yield clone ? arr.slice() : arr
    }

    for (let j = index; j < size; j++) {
      swap(arr, index, j)
      yield* heapsUtil(index + 1)
      swap(arr, index, j)
    }
  }
}

/*
 * Swaps two array elements.
 */
function swap(arr, i, j) {
  let len = arr.length
  if (i >= len || j >= len) {
    console.warn('Swapping an array\'s elements past its length.')
  }
  let temp = arr[j]
  arr[j] = arr[i]
  arr[i] = temp
  return arr
}


return G

}))
