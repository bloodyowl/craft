# Craft 

Craft adds a few objects or methods to the global object (or in the delivered requirejs object) : 

* `Request` : XHR methods
* `Elements` : Elements methods
* `Browser` : Browser detection results
* `Class` : Class methods
* `$` (alias `Craft`): CSS selector

## RequireJS

If you import Craft with RequireJS, `Request`, `Elements`, `Browser`, `Class`, `$` and `Craft` aren't pushed to the global object. Nevertheless, as Craft extends the native object's prototype such as `Function`, `Array` and `String`, and stores a bunch of methods in `Event`, `Array`, `Object` and `String`, these ones are extended even in a RequireJS configuration. 

```javascript
requirejs(["craft"], function(craft){ console.log(Object.getKeys(craft)) })
```
```javascript
["Request", "Elements", "Browser", "Class", "$", "Craft"]
```

## Get the Craft version

`Craft.version` or `$.version` returns a version (`"x.x.x"`) string. 

If you develop a component for a `"a.b.c"` version of Craft, it should work with every Craft version that has the same `"a"`. 

## No conflict mode

`Craft.noConflict()` or `$.noConflict()` sets back the original value of `window.$`, and returns `Craft`. 

## Extend Craft

### Arrays

```javascript
Object.extend(Array, object) // Array[object[i]]
Array.implement(name, method) // Array.prototype[name]
Array.implement(object) // Array.prototype[object[i]]
```

### Objects

```javascript
Object.extend(Object, object) // Object[object[i]]
```

### Functions

```javascript
Object.extend(Function, object) // Function[object[i]]
Function.implement(name, method) // Function.prototype[name]
Function.implement(object) // Function.prototype[object[i]]
```

### Strings

```javascript
Object.extend(String, object) // String[object[i]]
String.implement(name, method) // String.prototype[name]
String.implement(object) // String.prototype[object[i]]
```

### Elements

```javascript
Object.extend(Elements, object) // Elements[object[i]]
($ || Craft || Elements).implement(name, method) // Elements.prototype[name]
($ || Craft || Elements).implement(object) // Elements.prototype[object[i]]
```

### Craft object
```javascript
Object.extend(Craft, object) // Craft[object[i]]
```