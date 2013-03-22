# Arrays

Craft directly extends the `Array.prototype`. Also, each method is available in the `Array` object, taking the `[Array]`, `[Arguments]` or array-like `[Object]`. 

## Array.each

Iterates over the given array, executes the `fn` function for each item in the array, with `item, index, array` as arguments, and an optional `thisValue`. The loop breaks when `fn` returns a strict `false`. 

```javascript
myArray.each(function(item, index, array){}, thisValue) 
  // -> myArray
 
Array.each(myArray, function(item, index, array){}, thisValue)
  // -> myArray
```

## Array.collect

Iterates over the given array, executes the `fn` function for each item in the array, with `item, index, array` as arguments, and an optional `thisValue`. The returned value is a new array containing the values returned by `fn`. 

```javascript
myArray.collect(function(item, index, array){}, thisValue) 
  // -> newArray

Array.collect(myArray, function(item, index, array){}, thisValue)
  // -> newArray
```

## Array.select

Iterates over the given array, executes the `fn` function for each item in the array, with `item, index, array` as arguments, and an optional `thisValue`. The returned value is a new array containing the items of the first array for which `fn` returned a truthy value. 

```javascript
myArray.select(function(item, index, array){}, thisValue) 
  // -> newArray

Array.select(myArray, function(item, index, array){}, thisValue)
  // -> newArray
```

## Array.reject

Iterates over the given array, executes the `fn` function for each item in the array, with `item, index, array` as arguments, and an optional `thisValue`. The returned value is a new array containing the items of the first array for which `fn` returned a falsy value. 

```javascript
myArray.reject(function(item, index, array){}, thisValue) 
  // -> newArray

Array.reject(myArray, function(item, index, array){}, thisValue)
  // -> newArray
```

## Array.fold

Iterates over the given array, executes the `fn` function for each item in the array, with `currentValue, nextValue, index, array` as arguments, and an optional `thisValue`. The returned value is the returned result of the last `fn` call. 

```javascript
myArray.fold(function(currentValue, nextValue, index, array){}, thisValue, initialValue) 
  // -> value

Array.fold(myArray, function(currentValue, nextValue, index, array){}, thisValue, initialValue)
  // -> value
```

## Array.foldRight

`Array.foldRight` is the same as `Array.fold`, except it loops backwards. 

## Array.firstMatch

Finds the first occurrence of the given `value` in the given `array` (strict equality), optionally starting from an specified `index`, and returns the `index` of the item, or `-1` if not found. If `value` is a function, `firstMatch` returns the first item for which `value` returned a truthy value (`value` is in that case executed with an optional `thisValue`, and `item, index, array` as arguments (to get the default `index` with a `thisValue`, just set `index` to `null`). If `value` is a `RegExp`, the result will be the first item matching the regular expression.  

```javascript
myArray.firstMatch(value, index, thisValue)
  // -> index
Array.firstMatch(myArray, value, index, thisValue)
  // -> index
```

## Array.lastMatch

`Array.lastMatch` is the same as `Array.firstMatch`, except it loops backwards. 

## Array.contains

Returns a boolean defining whether or not the given value is in the Array or not. 

```javascript
myArray.contains(value)
  // -> boolean
Array.contains(myArray, value)
  // -> boolean 
```

## Array.pluck

Returns a new array filled with the given `property` of each item. 

```javascript
myArray.pluck(property)
  // -> new array
Array.pluck(myArray, property)
  // -> new array
```

## Array.isEmpty

Returns a boolean defining whether or not the array is empty.

```javascript
myArray.isEmpty()
  // -> boolean
Array.isEmpty(myArray)
  // -> boolean
```

## Array.clone

Returns a shallow copy of the array (which means that every item that isn't of a primitive type will still be a reference). 

```javascript
myArray.clone()
  // -> cloned array
Array.clone(myArray)
  // -> cloned array
```

## Array.clean

Returns a new array, with the values of the given one, without any falsy value (except `0`) or empty array. 

```javascript
myArray.clean()
  // -> clean array
Array.clean(myArray)
  // -> clean array
```

## Array.intersect

Returns a new array filled with the items that are both in the first and in the second array. 

```javascript
myArray.intersect(otherArray)
  // -> new array
Array.intersect(myArray, otherArray)
  // -> new array
```

## Array.difference

Returns a new array filled with the items that are in the first and not in the second array. 

```javascript
myArray.difference(otherArray)
  // -> new array
Array.difference(myArray, otherArray)
  // -> new array
```

## Array.flatten

Flattens a array for one level of arrays, or until there is not any array left if `deep` is truthy. 

```javascript
myArray.flatten(deep)
  // -> new array
Array.flatten(myArray, deep)
  // -> new array
```

## Array.sortBy

Sorts the array by a given `property`, and optionally a given `algorithm`. 

```javascript
myArray.sortBy(property, algorithm)
  // myArray
Array.sortBy(myArray, property, algorithm)
  // myArray
```

## Array.groupBy

Creates an array filled by arrays of `n` length containing the ordered values of the given array. If there are missing items in the last array to reach a `n` length, a `fill` parameter can be used to fill the blanks.  

```javascript
myArray.groupBy(n, fill)
  // myArray
Array.groupBy(myArray, n, fill)
  // myArray
```

## Array.last

Shorthand for `array[array.length - 1]`. 

```javascript
myArray.last()
  // -> last value
Array.last(myArray)
  // -> last value
```

## Array.min

Returns the minimum value of the array (each value can be modified using a optional `fn`) or `null`. 

```javascript
myArray.min(fn)
  // -> value
Array.min(myArray, fn)
  // -> value
```

## Array.max

Returns the max value of the array (each value can be modified using a optional `fn`) or `null`. 

```javascript
myArray.max(fn)
  // -> value
Array.max(myArray, fn)
  // -> value
```

## Array.groupWith

Returns an array returning arrays of values sharing the same indexes in different arrays. 

```javascript
myArray.groupWith(array1, array2 …)
  // -> new array
Array.groupWith(myArray, array1, array2 …)
// -> new array
```

## Array.any

Returns whether or not an array contains at least one item for which `fn` called with `item, index, array` and an optional `thisValue` returns a truthy value. 

```javascript
myArray.any(fn, thisValue)
  // -> boolean
Array.any(myArray, fn, thisValue)
  // -> boolean
```

## Array.all 

Returns whether or not `fn`, called with `item, index, array` and an optional `thisValue` returns a truthy value for every item in an array. 

```javascript
myArray.all(fn, thisValue)
  // -> boolean
Array.all(myArray, fn, thisValue)
  // -> boolean
```

## Array.from

Converts an array-like object into a proper array. 

```javascript
Array.from(arrayLike)
```

## Array.range

Generates an array of successive numbers. 

```javascript
Array.range(start = 0, end)
```
