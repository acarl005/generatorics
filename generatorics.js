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
 * helpers
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

var C = {};

C.factorial = function factorial(n) {
  var ans = 1;
  while(n) {
    ans *= n--;
  }
  return ans;
};

C.combinations = function* combinations(arr, size) {
  size = typeof size === 'undefined' ? arr.length : size;
  var end = arr.length - 1;
  var data = [];
  yield* combinationUtil(0, 0);
  function* combinationUtil(start, index) {
    // Current combination is ready to be processed, yield the combination
    if (index === size) {
      yield data;
      return;
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
};

C.permutations = function* permutations(arr, size) {
  size = typeof size === 'undefined' ? arr.length : size;
  yield* permutationUtil(0);
  function* permutationUtil(index) {
    if (index === size) {
      yield arr;
      return;
    }

    for (var j = index; j < size; j++) {
      swap(arr, index, j);
      yield* permutationUtil(index + 1);
      swap(arr, index, j);
    }
  }
};
for (var perm of C.permutations([1, 2, 3], 2)) {
  console.log(perm);
}

return C;
}));
