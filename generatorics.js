(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.C = factory();
  }
}(this, function () {

/*
 * Helpers
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

/**
 * The goods
**/

var C = {};

C.factorial = factorial;
function factorial(n) {
  var ans = 1;
  while(n) {
    ans *= n--;
  }
  return ans;
}

C.P = P;
function P(n, r) {
  return factorial(n) / factorial(n - r);
}

C.C = _C;
function _C(n, r) {
  return factorial(n) / factorial(r) / factorial(n - r);
}

C.combinations = combinations;
function* combinations(arr, size) {
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
}


C.permutations = permutations;
function* permutations(arr, size) {
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
}


/**
* More efficient alorithm for permutations of All elements in an array. Doesn't
* work for "sub-permutations", e.g. permutations of 3 elements from [1, 2, 3, 4, 5]
**/
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
};


return C;

}));
