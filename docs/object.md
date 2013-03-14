# Object

## Type checking

### Object.typeOf

Returns a string with the object's type : 

* `null`
* `regexp`
* `array`
* `date`
* `element`
* `document`
* `fragment`
* `text`
* `nan`
* `window`
* `string`
* `number`
* `function`
* `undefined`
* `boolean`
* `object`

```javascript
Object.typeOf(object)
  // -> string
```

Craft also provides a few type-checking methods, each of them returns a boolean. 

```javascript
Object.isFunction(o)
Object.isArray(o)
Object.isElement(o)
Object.isNode(o)
Object.isText(o)
Object.isFragment(o)
Object.isDocument(o)
Object.isRegExp(o)
Object.isUndefined(o)
Object.isNull(o)
Object.isString(o)
Object.isNumber(o)
Object.isBoolean(o)
Object.isDate(o)
Object.isNaN(o)
Object.isWindow(o)
Object.isObject(o)
```

## Object methods

**NOTE** : An *owned* property is a property directly in the object, and not deeper in its prototype chain. 

### Object.each

Iterates over the owned properties of an object, executes the `fn` function for each item in the array, with `item, index, object` as arguments, and an optional `thisValue`. The loop breaks when `fn` returns a strict `false`. 

```javascript
Object.each(object, function(item, index, object){}, thisValue) 
  // -> object
```

### Object.collect

Iterates over the owned properties of an object, executes the `fn` function for each item in the object, with `item, index, array` as arguments, and an optional `thisValue`. The returned value is a new object containing the values returned by `fn`. 


```javascript
Object.collect(object, function(item, index, object){}, thisValue) 
  // -> new object
```

### Object.getKeys

Returns the owned keys of the given object as an array. 

```javascript
Object.getKeys(object)
  // -> array
```

### Object.getValues

Returns the owned values of the given object as an array. 

```javascript
Object.getValues(object)
  // -> array
```

### Object.getPairs

Returns an array of arrays containing `[key, value]` for each owned property. 

```javascript
Object.getPairs(object)
  // -> array
```

### Object.isEmpty

Returns a boolean defining whether or not the object is empty (doesn't consider non-owned properties).  

```javascript
Object.isEmpty(object)
  // -> boolean
```

### Object.clone

Makes a shallow clone of the object

```javascript
Object.clone(object)
  // -> new object
```

### Object.toQueryString

Returns a queryString filled with the objects properties/values. Ignores properties that aren't arrays, strings or numbers. 

The methods takes an optional arguments `arrays`, to enable a `"foo[]=1&foo[]=2"` syntax for arrays when set to `true`. 

```javascript
var object = {
    foo : "bar"
  , bar : "baz"
  , baz : null
}
Object.toQueryString(object) 
  // -> "foo=bar&bar=baz"
```

### Object.uniqueId 

Returns a string with an optional prefix with a unique number (one increment for every generated id) 

```javascript
Object.uniqueId() 
  // -> "13"
Object.uniqueId("foo-") 
  // -> "foo-14"
Object.uniqueId()
  // -> "15"
```

### Object.owns

Shorthand for `Object.prototype.hasOwnProperty.call`

```javascript
Object.owns(object, property)
  // -> boolean
```

### Object.extend

Extends an object with an other (optionally copies the properties in the prototype chain). 

```javascript
Object.extend(dest, source)
  // -> dest
Object.extend(dest, source, true)
  // -> dest, with source inherits
```