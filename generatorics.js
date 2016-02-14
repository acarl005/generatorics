(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.generatorics = factory();
  }
}(this, function() {


/** @exports generatorics */
var generatorics = {

  /**
   * Calculates a factorial
   * @param {Number} n - The number to operate the factorial on.
   */
  factorial: function factorial(n) {
    var ans = 1;
    while(n) {
      ans *= n--;
    }
    return ans;
  },

  /**
   * Calculates the number of possible permutations of "r" elements in a set of size "n".
   * @param {Number} n - Number of elements in the set.
   * @param {Number} r - Number of elements to choose from the set.
   */
  P: function P(n, r) {
    return this.factorial(n) / this.factorial(n - r);
  },

  /**
   * Calculates the number of possible combinations of "r" elements in a set of size "n".
   * @param {Number} n - Number of elements in the set.
   * @param {Number} r - Number of elements to choose from the set.
   */
  C: function C(n, r) {
    return this.factorial(n) / this.factorial(r) / this.factorial(n - r);
  },

  /**
   * Creates a generator of all combinations of a set.
   * @param {Array|String} arr - The set of elements.
   * @param {Number} [size=arr.length] - Number of elements to choose from the set.
   */
  combinations: function* combinations(arr, size) {
    size = typeof size === 'undefined' ? arr.length : size;
    var end = arr.length - 1;
    var data = [];
    yield* combinationUtil(0, 0);
    function* combinationUtil(start, index) {
      // Current combination is ready to be processed, yield the combination
      if (index === size) {
        return yield data;
      }

      // replace index with all possible elements. The condition
      // "end - i + 1 >= size - index" makes sure that including one element
      // at index will make a combination with remaining elements
      // at remaining positions
      for (var i = start; i <= end && end - i + 1 >= size - index; i++) {
        data[index] = arr[i];
        yield* combinationUtil(i + 1, index + 1);
      }
    }
  },

  /**
   * Creates a generator of all permutations of a set.
   * @param {Array|String} arr - The set of elements.
   * @param {Number} [size=arr.length] - Number of elements to choose from the set.
   */
  permutations: function* permutations(arr, size) {
    size = typeof size === 'undefined' ? arr.length : size;
    if (size === arr.length) {
      return yield* heapsAlg(arr);
    }
    var data = [];
    var indecesUsed = [];
    yield* permutationUtil(0);
    function* permutationUtil(index) {
      if (index === size) {
        return yield data;
      }
      for (var i = 0; i < arr.length; i++) {
        if (!indecesUsed[i]) {
          indecesUsed[i] = true;
          data[index] = arr[i];
          yield *permutationUtil(index + 1);
          indecesUsed[i] = false;
        }
      }
    }
  },

  /**
   * Creates a generator of all possible "numbers" from the digits of a set.
   * @param {Array|String} arr - The set of digits.
   * @param {Number} size - How many digits will be in the numbers.
   */
  baseN: function* baseN(arr, size) {
    size = typeof size === 'undefined' ? arr.length : size;
    var data = [];
    yield* baseNUtil(0);
    function* baseNUtil(index) {
      if (index === size) {
        return yield data;
      }
      for (var i = 0; i < arr.length; i++) {
        data[index] = arr[i];
        yield* baseNUtil(index + 1);
      }
    }
  },

  /**
   * Creates a generator of all possible subsets of a set (a.k.a. power set).
   * @param {Array|String} arr - The set of elements.
   */
  power: function* power(arr) {
    var end = arr.length - 1;
    var data = [];
    yield* powerUtil(0, 0);
    function* powerUtil(start, index) {
      data.length = index;
      yield data;
      if (index === arr.length) {
        return;
      }
      for (var i = start; i <= end; i++) {
        data[index] = arr[i];
        yield* powerUtil(i + 1, index + 1);
      }
    }
  }

};



/*
 * More efficient alorithm for permutations of All elements in an array. Doesn't
 * work for "sub-permutations", e.g. permutations of 3 elements from [1, 2, 3, 4, 5]
 */
function* heapsAlg(arr) {
  var size = arr.length;
  yield* heapsUtil(0);
  function* heapsUtil(index) {
    if (index === size) {
      return yield arr;
    }

    for (var j = index; j < size; j++) {
      swap(arr, index, j);
      yield* heapsUtil(index + 1);
      swap(arr, index, j);
    }
  }
}

/*
* Swaps two array elements.
*/
function swap(arr, i, j) {
  var len = arr.length;
  if (i >= len || j >= len) {
    console.warn('Swapping an array\'s elements past its length.');
  }
  var temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
  return arr;
}


return generatorics;

}));
