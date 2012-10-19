# Hash

## Constructor 

```js
new Hash({
  key1 : "value",
  key2 : "value",
  key3 : "value"
}) 
// -> hash
```

## Hash#forEach

```js
myHash.forEach(function(item, index, array){}) // -> Hash
```

Calls the given function for each item present in the Hash.  

## Hash#clone

```js
myHash.clone() // -> new Hash
```

Returns a safe-to-modify Hash from a given source. 

## Hash#keys

```js
myHash.keys() // -> new Array
```

Returns an Array containing all the keys owned by the hash 

## Hash#values

```js
myHash.values() // -> new Array
```

Returns an Array containing all the values owned by the hash 

## Hash#get

```js
myHash.get("key") // -> value
```
Returns the value of a given key

## Hash#set

```js
myHash.set("key", "value") // -> hash
``` 

Sets the given key to the given value

## Hash.toQueryString

```js
myHash.toQueryString // -> "key1=value1&key2=value2 ..."
```

Returns a HTTP query string from the hash. 

## Hash#isEmpty

```js
myHash.isEmpty() // -> true
```

Checks if the Hash is empty or not.

## Array#invoke

```js
myHash.invoke(method, arg1, /* arg2 … */)
```

Calls the method for each item of the given hash. 

