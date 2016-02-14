<a name="module_generatorics"></a>
## generatorics

* [generatorics](#module_generatorics)
    * [.factorial(n)](#module_generatorics.factorial)
    * [.P(n, r)](#module_generatorics.P)
    * [.C(n, r)](#module_generatorics.C)
    * [.combinations(arr, [size])](#module_generatorics.combinations)
    * [.permutations(arr, [size])](#module_generatorics.permutations)
    * [.baseN(arr, [size])](#module_generatorics.baseN)
    * [.power(arr)](#module_generatorics.power)

<a name="module_generatorics.factorial"></a>
### generatorics.factorial(n)
Calculates a factorial

**Kind**: static method of <code>[generatorics](#module_generatorics)</code>  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | The number to operate the factorial on. |

<a name="module_generatorics.P"></a>
### generatorics.P(n, r)
Calculates the number of possible permutations of "r" elements in a set of size "n".

**Kind**: static method of <code>[generatorics](#module_generatorics)</code>  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | Number of elements in the set. |
| r | <code>Number</code> | Number of elements to choose from the set. |

<a name="module_generatorics.C"></a>
### generatorics.C(n, r)
Calculates the number of possible combinations of "r" elements in a set of size "n".

**Kind**: static method of <code>[generatorics](#module_generatorics)</code>  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | Number of elements in the set. |
| r | <code>Number</code> | Number of elements to choose from the set. |

<a name="module_generatorics.combinations"></a>
### generatorics.combinations(arr, [size])
Creates a generator of all combinations of a set.

**Kind**: static method of <code>[generatorics](#module_generatorics)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arr | <code>Array</code> &#124; <code>String</code> |  | The set of elements. |
| [size] | <code>Number</code> | <code>arr.length</code> | Number of elements to choose from the set. |

<a name="module_generatorics.permutations"></a>
### generatorics.permutations(arr, [size])
Creates a generator of all permutations of a set.

**Kind**: static method of <code>[generatorics](#module_generatorics)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arr | <code>Array</code> &#124; <code>String</code> |  | The set of elements. |
| [size] | <code>Number</code> | <code>arr.length</code> | Number of elements to choose from the set. |

<a name="module_generatorics.baseN"></a>
### generatorics.baseN(arr, [size])
Creates a generator of all possible "numbers" from the digits of a set.

**Kind**: static method of <code>[generatorics](#module_generatorics)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arr | <code>Array</code> &#124; <code>String</code> |  | The set of digits. |
| [size] | <code>Number</code> | <code>arr.length</code> | How many digits will be in the numbers. |

<a name="module_generatorics.power"></a>
### generatorics.power(arr)
Creates a generator of all possible subsets of a set (a.k.a. power set).

**Kind**: static method of <code>[generatorics](#module_generatorics)</code>  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> &#124; <code>String</code> | The set of elements. |

