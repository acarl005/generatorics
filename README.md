# Generatorics

### A combinatorics library for JavaScript utilizing ES2015 generators. Generate combinations, permutations, and power sets of arrays or strings.

- Node
```
npm install generatorics
```
```javascript
var G = require('generatorics');
```

- Browser
```
bower install generatorics
```
```html
<script src="file/path/to/generatorics.js"></script>
```


## Usage

### Power Set
```javascript
for (var subset of G.powerSet(['a', 'b', 'c'])) {
  console.log(subset);
}
//  [ ]
//  [ 'a' ]
//  [ 'b' ]
//  [ 'a', 'b' ]
//  [ 'c' ]
//  [ 'a', 'c' ]
//  [ 'b', 'c' ]
//  [ 'a', 'b', 'c' ]
```

### permutation
```javascript
for (var perm of G.permutation(['a', 'b', 'c'], 2)) {
  console.log(perm);
}
// [ 'a', 'b' ]
// [ 'a', 'c' ]
// [ 'b', 'a' ]
// [ 'b', 'c' ]
// [ 'c', 'a' ]
// [ 'c', 'b' ]

for (var perm of G.permutation(['a', 'b', 'c'])) { // assumes full length of array
  console.log(perm);
}
// [ 'a', 'b', 'c' ]
// [ 'a', 'c', 'b' ]
// [ 'b', 'a', 'c' ]
// [ 'b', 'c', 'a' ]
// [ 'c', 'b', 'a' ]
// [ 'c', 'a', 'b' ]
```

### combination
```javascript
for (var comb of G.combination(['a', 'b', 'c'], 2)) {
  console.log(comb);
}
// [ 'a', 'b' ]
// [ 'a', 'c' ]
// [ 'b', 'c' ]
```

### permutation of combination
```javascript
for (var perm of G.permutationCombination(['a', 'b', 'c'])) {
  console.log(perm);
}
// [ ]
// [ 'a' ]
// [ 'a', 'b' ]
// [ 'a', 'b', 'c' ]
// [ 'a', 'c' ]
// [ 'a', 'c', 'b' ]
// [ 'b' ]
// [ 'b', 'a' ]
// [ 'b', 'a', 'c' ]
// [ 'b', 'c' ]
// [ 'b', 'c', 'a' ]
// [ 'c' ]
// [ 'c', 'a' ]
// [ 'c', 'a', 'b' ]
// [ 'c', 'b' ]
// [ 'c', 'b', 'a' ]
```

### cartesian product
```javascript
for (var prod of G.cartesian([0, 1, 2], [0, 10, 20], [0, 100, 200])) {
  console.log(prod);
}
// [ 0, 0, 0 ],  [ 0, 0, 100 ],  [ 0, 0, 200 ]
// [ 0, 10, 0 ], [ 0, 10, 100 ], [ 0, 10, 200 ]
// [ 0, 20, 0 ], [ 0, 20, 100 ], [ 0, 20, 200 ]
// [ 1, 0, 0 ],  [ 1, 0, 100 ],  [ 1, 0, 200 ]
// [ 1, 10, 0 ], [ 1, 10, 100 ], [ 1, 10, 200 ]
// [ 1, 20, 0 ], [ 1, 20, 100 ], [ 1, 20, 200 ]
// [ 2, 0, 0 ],  [ 2, 0, 100 ],  [ 2, 0, 200 ]
// [ 2, 10, 0 ], [ 2, 10, 100 ], [ 2, 10, 200 ]
// [ 2, 20, 0 ], [ 2, 20, 100 ], [ 2, 20, 200 ]
```

### base N
```javascript
for (var num of G.baseN(['a', 'b', 'c'])) {
  console.log(num);
}
// [ 'a', 'a', 'a' ], [ 'a', 'a', 'b' ], [ 'a', 'a', 'c' ]
// [ 'a', 'b', 'a' ], [ 'a', 'b', 'b' ], [ 'a', 'b', 'c' ]
// [ 'a', 'c', 'a' ], [ 'a', 'c', 'b' ], [ 'a', 'c', 'c' ]
// [ 'b', 'a', 'a' ], [ 'b', 'a', 'b' ], [ 'b', 'a', 'c' ]
// [ 'b', 'b', 'a' ], [ 'b', 'b', 'b' ], [ 'b', 'b', 'c' ]
// [ 'b', 'c', 'a' ], [ 'b', 'c', 'b' ], [ 'b', 'c', 'c' ]
// [ 'c', 'a', 'a' ], [ 'c', 'a', 'b' ], [ 'c', 'a', 'c' ]
// [ 'c', 'b', 'a' ], [ 'c', 'b', 'b' ], [ 'c', 'b', 'c' ]
// [ 'c', 'c', 'a' ], [ 'c', 'c', 'b' ], [ 'c', 'c', 'c' ]
```

## Documentation


jsdpairjvraiojgpoaeirjgoefjg
