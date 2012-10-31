# Array

## Array#forEach

```js
[1,2,3,4,5,6].forEach(function(item, index, array){}[, context]) // -> Array
```

Calls the given function for each item present in the Array.  

## Array#clone

```js
[1,2,3].clone() // -> new Array
```

Returns a safe-to-modify Array from a given source. 

## Array#map

```js
[1,2,3].map(function(item, index, array){}[, context]) // -> new Array
```

Replaces the value of each item with the value returned by the function. 

## Array#filter

```js 
[1,2,3].filter(function(item, index, array){}[, context]) // -> new Array
```

Returns a new Array from the source after having removed every iteration of the function that returned false. 

## Array#reduce

```js
[1,2,3].reduce(function(item, nextItem, index, array){}) // -> object
```

Iterates over the array and returns the last value returned by the function.

## Array#indexOf

```js
[1,2,3,4].indexOf(value[, start]) // -> index
``` 

Returns the first index where value is found. Can start from a given index. 

## Array#pluck

```js
["foo", "bar", "baz"].pluck("length") // -> [3,3,3]
```

Returns the given property for every item. 

## Array#isEmpty

```js
[].isEmpty() // -> true
```

Checks if the Array is empty or not.

## Array#invoke

```js
[].invoke(method, arg1, /* arg2 … */)
```

Calls the method for each item of the given array. 

## Array#clean

```js
[false, [], undefined, 1, 2, null, 3].clean() // -> [1,2,3]
```

Returns a new Array cleaned from `false, [], undefined, null`. 

## Array#intersect

```js
[1,2,3,4,5].intersect([2,4, "foo"]) // -> [2,4]
```

Returns common values of two arrays. 

## Array#difference

```js
[1,2,3,4,5].difference([2,4, "foo"]) // -> [1,3,5]
```

Returns values that are in the first array, but not in the second. 


