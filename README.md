# Generatorics

### An efficient combinatorics library for JavaScript utilizing ES2015 generators. Generate combinations, permutations, and power sets of arrays or strings.

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

**Note:** This module is not transpiled for compatibility, as it degrades the performance. Check your browser/node version.

## Usage

### power set
```javascript
for (var subset of G.powerSet(['a', 'b', 'c'])) {
  console.log(subset);
}
// [ ]
// [ 'a' ]
// [ 'a', 'b' ]
// [ 'a', 'b', 'c' ]
// [ 'a', 'c' ]
// [ 'b' ]
// [ 'b', 'c' ]
// [ 'c' ]
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

For efficiency, each array being yielded is the same one being mutated on each iteration. **DO NOT** mutate the array.
```javascript
var combs = [];
for (var comb of G.combination(['a', 'b', 'c'], 2)) {
  combs.push(comb);
}
console.log(combs);
// [ [ 'b', 'c' ], [ 'b', 'c' ], [ 'b', 'c' ] ]
```
You can clone if necessary, or use the [clone submodule](#clone-submodule)

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

## Clone Submodule
Each array yielded from the generator is actually the same array in memory, just mutated to have different elements. This is to avoid the unnecessary creation of a bunch of arrays, which consume memory. As a result, you get a strange result when trying to generate an array.
```javascript
var combs = G.combination(['a', 'b', 'c'], 2);
console.log([...combs]);
// [ [ 'b', 'c' ], [ 'b', 'c' ], [ 'b', 'c' ] ]
```
Instead, you can use the clone submodule.
```javascript
var combs = G.clone.combination(['a', 'b', 'c'], 2);
console.log([...combs]);
// [ [ 'a', 'b' ], [ 'a', 'c' ], [ 'b', 'c' ] ]
```

### G.clone
This submodule produces generators that yield a different array on each iteration in case you need to mutate it. The [combination](#module_G.combination), [permutation](#module_G.permutation), [powerSet](#module_G.powerSet), [permutationCombination](#module_G.permutationCombination), [baseN](#module_G.baseN), [baseNAll](#module_G.baseNAll), and [cartesian](#module_G.cartesian) methods are provided on this submodule.

## Cool things to do with ES2015 generators
```javascript
var combs = G.clone.combination([1, 2, 3], 2);

// "for-of" loop
for (let comb of combs) {
  console.log(comb);
}

// generate arrays
Array.from(combs);
[...combs];

// generate sets
new Set(combs);

// spreading in function calls
console.log(...combs);
```

#### Writing a code generator? Need to produce an infinite stream of minified variable names?

No problem! Just pass in a collection of all your valid characters and start generating.

```javascript
var mininym = G.baseNAll('abcdefghijklmnopqrstuvwxyz$#')
var name = mininym.next().value.join('')
global[name] = 'some value'
```

#### Card games anyone?
```javascript
var cards = [...G.clone.cartesian('♠♥♣♦', 'A23456789JQK')];
console.log(G.shuffle(cards));
// [ [ '♦', '6' ], [ '♠', '6' ], [ '♣', '7' ], [ '♥', 'K' ],
//   [ '♣', 'J' ], [ '♥', '4' ], [ '♦', '2' ], [ '♥', '9' ],
//   [ '♦', 'Q' ], [ '♠', 'Q' ], [ '♠', '4' ], [ '♠', 'K' ],
//   [ '♥', '3' ], [ '♥', '7' ], [ '♠', '5' ], [ '♦', '7' ],
//   [ '♥', '5' ], [ '♣', 'Q' ], [ '♣', '9' ], [ '♠', 'A' ],
//   [ '♣', '4' ], [ '♣', '3' ], [ '♥', 'A' ], [ '♥', '8' ],
//   [ '♣', '8' ], [ '♦', '8' ], [ '♠', '8' ], [ '♣', '5' ],
//   [ '♥', '2' ], [ '♥', 'Q' ], [ '♦', 'A' ], [ '♥', '6' ],
//   [ '♠', '2' ], [ '♣', '6' ], [ '♠', '3' ], [ '♦', 'K' ],
//   [ '♦', 'J' ], [ '♠', '7' ], [ '♥', 'J' ], [ '♦', '5' ],
//   [ '♦', '9' ], [ '♦', '3' ], [ '♠', '9' ], [ '♣', '2' ],
//   [ '♣', 'A' ], [ '♣', 'K' ], [ '♦', '4' ], [ '♠', 'J' ] ]
```

## Documentation
<a name="module_G"></a>

## G

* [G](#module_G)
    * [.factorial(n)](#module_G.factorial) ⇒ <code>Number</code>
    * [.factoradic(n)](#module_G.factoradic) ⇒ <code>Array</code>
    * [.P(n, k)](#module_G.P) ⇒ <code>Number</code>
    * [.C(n, k)](#module_G.C) ⇒ <code>Number</code>
    * [.choices(n, k, [options])](#module_G.choices) ⇒ <code>Number</code>
    * [.combination(arr, [size])](#module_G.combination) ⇒ <code>Generator</code>
    * [.permutation(arr, [size])](#module_G.permutation) ⇒ <code>Generator</code>
    * [.powerSet(arr)](#module_G.powerSet) ⇒ <code>Generator</code>
    * [.permutationCombination(arr)](#module_G.permutationCombination) ⇒ <code>Generator</code>
    * [.baseN(arr, [size])](#module_G.baseN) ⇒ <code>Generator</code>
    * [.baseNAll(arr)](#module_G.baseNAll) ⇒ <code>Generator</code>
    * [.cartesian(...sets)](#module_G.cartesian) ⇒ <code>Generator</code>
    * [.shuffle(arr)](#module_G.shuffle) ⇒ <code>Array</code>

<a name="module_G.factorial"></a>

### G.factorial(n) ⇒ <code>Number</code>
Calculates a factorial

**Kind**: static method of <code>[G](#module_G)</code>  
**Returns**: <code>Number</code> - n!  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | The number to operate the factorial on. |

<a name="module_G.factoradic"></a>

### G.factoradic(n) ⇒ <code>Array</code>
Converts a number to the factorial number system. Digits are in least significant order.

**Kind**: static method of <code>[G](#module_G)</code>  
**Returns**: <code>Array</code> - digits of n in factoradic in least significant order  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | Integer in base 10 |

<a name="module_G.P"></a>

### G.P(n, k) ⇒ <code>Number</code>
Calculates the number of possible permutations of "k" elements in a set of size "n".

**Kind**: static method of <code>[G](#module_G)</code>  
**Returns**: <code>Number</code> - n P k  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | Number of elements in the set. |
| k | <code>Number</code> | Number of elements to choose from the set. |

<a name="module_G.C"></a>

### G.C(n, k) ⇒ <code>Number</code>
Calculates the number of possible combinations of "k" elements in a set of size "n".

**Kind**: static method of <code>[G](#module_G)</code>  
**Returns**: <code>Number</code> - n C k  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | Number of elements in the set. |
| k | <code>Number</code> | Number of elements to choose from the set. |

<a name="module_G.choices"></a>

### G.choices(n, k, [options]) ⇒ <code>Number</code>
Higher level method for counting number of possible combinations of "k" elements from a set of size "n".

**Kind**: static method of <code>[G](#module_G)</code>  
**Returns**: <code>Number</code> - Number of possible combinations.  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | Number of elements in the set. |
| k | <code>Number</code> | Number of elements to choose from the set. |
| [options] | <code>Object</code> |  |
| options.replace | <code>Boolean</code> | Is replacement allowed after each choice? |
| options.ordered | <code>Boolean</code> | Does the order of the choices matter? |

<a name="module_G.combination"></a>

### G.combination(arr, [size]) ⇒ <code>Generator</code>
Generates all combinations of a set.

**Kind**: static method of <code>[G](#module_G)</code>  
**Returns**: <code>Generator</code> - yields each combination as an array  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arr | <code>Array</code> &#124; <code>String</code> |  | The set of elements. |
| [size] | <code>Number</code> | <code>arr.length</code> | Number of elements to choose from the set. |

<a name="module_G.permutation"></a>

### G.permutation(arr, [size]) ⇒ <code>Generator</code>
Generates all permutations of a set.

**Kind**: static method of <code>[G](#module_G)</code>  
**Returns**: <code>Generator</code> - yields each permutation as an array  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arr | <code>Array</code> &#124; <code>String</code> |  | The set of elements. |
| [size] | <code>Number</code> | <code>arr.length</code> | Number of elements to choose from the set. |

<a name="module_G.powerSet"></a>

### G.powerSet(arr) ⇒ <code>Generator</code>
Generates all possible subsets of a set (a.k.a. power set).

**Kind**: static method of <code>[G](#module_G)</code>  
**Returns**: <code>Generator</code> - yields each subset as an array  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> &#124; <code>String</code> | The set of elements. |

<a name="module_G.permutationCombination"></a>

### G.permutationCombination(arr) ⇒ <code>Generator</code>
Generates the permutation of the combinations of a set.

**Kind**: static method of <code>[G](#module_G)</code>  
**Returns**: <code>Generator</code> - yields each permutation as an array  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> &#124; <code>String</code> | The set of elements. |

<a name="module_G.baseN"></a>

### G.baseN(arr, [size]) ⇒ <code>Generator</code>
Generates all possible "numbers" from the digits of a set.

**Kind**: static method of <code>[G](#module_G)</code>  
**Returns**: <code>Generator</code> - yields all digits as an array  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arr | <code>Array</code> &#124; <code>String</code> |  | The set of digits. |
| [size] | <code>Number</code> | <code>arr.length</code> | How many digits will be in the numbers. |

<a name="module_G.baseNAll"></a>

### G.baseNAll(arr) ⇒ <code>Generator</code>
Infinite generator for all possible "numbers" from a set of digits.

**Kind**: static method of <code>[G](#module_G)</code>  
**Returns**: <code>Generator</code> - yields all digits as an array  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> &#124; <code>String</code> | The set of digits |

<a name="module_G.cartesian"></a>

### G.cartesian(...sets) ⇒ <code>Generator</code>
Generates the cartesian product of the sets.

**Kind**: static method of <code>[G](#module_G)</code>  
**Returns**: <code>Generator</code> - yields each product as an array  

| Param | Type | Description |
| --- | --- | --- |
| ...sets | <code>Array</code> &#124; <code>String</code> | variable number of sets of n elements. |

<a name="module_G.shuffle"></a>

### G.shuffle(arr) ⇒ <code>Array</code>
Shuffles an array in place using the Fisher–Yates shuffle.

**Kind**: static method of <code>[G](#module_G)</code>  
**Returns**: <code>Array</code> - a random, unbiased perutation of arr  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | A set of elements. |

