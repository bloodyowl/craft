# Craft 

Craft adds a few objects or methods to the global object (or in the delivered requirejs object) : 

* `Request` : XHR methods
* `Elements` : Elements methods
* `Browser` : Browser detection results
* `Class` : Class methods
* `$` (alias `Craft`): CSS selector
* `$$`: CSS selector, only return the first match

## RequireJS

If you import Craft with RequireJS, `Request`, `Elements`, `Browser`, `Class`, `$` and `Craft` aren't pushed to the global object. Nevertheless, as Craft extends the native object's prototype such as `Function`, `Array` and `String`, and stores a bunch of methods in `Event`, `Array`, `Object` and `String`, these ones are extended even in a RequireJS configuration. 

```javascript
requirejs(["craft"], function(craft){ console.log(Object.getKeys(craft)) })
```
```javascript
["Request", "Elements", "Browser", "Class", "$", "Craft", "$$"]
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
# Browser 

The `Browser` object contains the results of a UA sniffing. 

It contains the following properties (as booleans) : 

* `IE`
* `IE7`
* `IE8`
* `IE9`
* `Gecko`
* `WebKit`
* `Opera`

Also, a `toString` method returns a string representing the matched browser. (i.e. `"ie ie7"` or `"webkit"`) that can easily be used to generate a `className` to give to `document.documentElement`. 
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
# Class

The `Class` object is a bunch of methods that let you organize your code in an OOP-like style. 

## Class.from 

Creates an object with `object` as a `__proto__` (acts like ES5 `Object.create` without the second argument). 

```javascript
Class.from({foo:"bar"})

{
    __proto__: {
        foo : "bar"
      , __proto__ : Object
    }
}
```

## Class.create

Creates a new `Class`, that can inherit from an optional `parentClass`. The second argument, `object` must contain an `initialize` method (unless you want to use a clone of the parent's one). 

The returned `Class` is the `initialize` method, with a prototype organized as follows : 

For : 
```javascript 
var Parent = Class.create({foo:"bar", initialize:function(){}})
  , Child = Class.create(Parent, {
        bar : "baz" 
      , initialize : function(){}
      , foo : "foo"
  })
```
The Child.prototype will be : 
```javascript
{
    initialize : function(){}
  , foo : "foo"
  , bar : "baz"
  , __proto__ : {
        initialize : function(){}
      , foo : "bar"
      , __proto__ : Object
    }
}
```

## Class.attachAll 

Attaches the given (or all) the methods in the class to a given instance. 

If you want to use a prototype method from anywhere else than the instance, you find yourself in that case : 

```javascript
var MyClass = Class.create({
    initialize : function(){this.myValue = "baz"}
  , myValue : "bar"
  , bar : function(){return this.myValue}
})
  , myInstance = new MyClass()
  , bar = myInstance.bar
  
bar() // undefined
```

`Class.attachAll` lets you handle this simply : 


```javascript
var MyClass = Class.create({
    initialize : function(){
      this.myValue = "baz"
      Class.attachAll(this) // or Class.attachAll(this, ["bar"])
    }
  , myValue : "bar"
  , bar : function(){return this.myValue}
})
  , myInstance = new MyClass()
  , bar = myInstance.bar

bar() // "baz"
```


## Example 

A possible use of `Class`.

```javascript
var App = Class.create({
    initialize : function(options){
      var self = this
      Object.extend(self, options)
      Class.attachAll(self, ["domReady", "fillContent"])
      document.ready(self.domReady)
      return self
    }
    
    
  , domReady : function(){
      var self = this
      self.container = $("#container")
      self.content = $("#content")
      self.emptyButton = $("#empty").text(self.emptyText || "")
      self.events()
    }
    
    
  , events : function(){
      var self = this
      self.container.listen("click", "li", function(){
        Request
          .get($(this).data("url"))
          .then(self.fillContent)
      })
      self.emptyButton.listen("click", function(){
          self.content.empty()
      })
    }
    
    
  , fillContent : function(res){
      var self = this
      self.content.html(res)
      Request.evaluate(res) // evaluates inline <script> tags
      return self
    }
})

var myApp = new App({
  emptyText : "Empty the box"
})
```

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

Iterates over the given array, executes the `fn` function for each item in the array, with `item, index, array` as arguments, and an optional `thisValue`. The returned value is a new array containing the items of the first array for which `fn` returned a strict `true`. 

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

## Array.find

Finds the first occurrence of the given `value` in the given `array` (strict equality), optionally starting from an specified `index`, and returns the `index` of the item, or `-1` if not found. 

```javascript
myArray.find(value, index)
  // -> index
Array.find(myArray, value, index)
  // -> index
```

## Array.findLast

`Array.findLast` is the same as `Array.find`, except it loops backwards. 

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

# Elements

## Get elements 

See Selectors. 

```javascript
$(".myElements") // multiple elements
$$("#myElement") // single element
myElement.getElements(".foo")
Elements(nodeList || arrayOfElements || element)
```

Elements are wrapped inside an Array-like object, of which the prototype is extended with Craft's methods.

## Methods 

### document.ready 

Executes the code inside asynchronously, when the DOM is ready. 

```javascript
document.ready(function(){
  /* here you can manipulate the DOM */
})
```
or 
```javascript
($ || Craft)(function(){
  /* here you can manipulate the DOM */
})
```

You can check the current state of the DOM using 

```javascript
document.ready.status // (boolean)
```

### Elements.create

Creates an `nodeName` element, with the optional given `props`. 

```javascript
Elements.create("div", { 
    "class": "foo"
  , "property" : "bar"
  , "@attribute" : "baz"
}) 
  // -> Elements instance
```

### Elements.from

Creates an Elements instance from a string. 

```javascript
Elements.from("<div class='foo'></div>")
  // -> Elements instance
Elements.from("<a href='#'></a><div class='foo'></div>")
  // -> Elements instance
```

### Elements.fragment

Returns a new `DocumentFragment`. 

```javascript
Elements.fragment()
  // -> documentFragment
```

### Elements.matches

Checks if a given element matches a selector. 

```javascript
Elements.matches(myElement, ".selector")
  // -> Boolean
```

### Elements.prototype.each 

Iterates over the given `Elements` instance, executes the `fn` function for each item in the array, with `item, index, array` as arguments, and an optional `thisValue`. The loop breaks when `fn` returns a strict `false`. 

```javascript
myElements.each(function(item, index, array){}, thisValue) 
  // -> myElements
```

### Elements.prototype.collect 

Iterates over the given `Elements` instance, executes the `fn` function for each item in the `Elements` instance, with `item, index, array` as arguments, and an optional `thisValue`. The returned value is a new array containing the values returned by `fn`. 

```javascript
myElements.collect(function(item, index, array){}, thisValue) 
  // -> array
```

### Elements.prototype.select

Iterates over the given `Elements` instance, executes the `fn` function for each item in the `Elements` instance, with `item, index, array` as arguments, and an optional `thisValue`. The returned value is a new `Elements` instance containing the items of the first `Elements` instance for which `fn` returned a strict `true`. 

```javascript
myElements.select(function(item, index, array){}, thisValue) 
  // -> newElements
```

### Elements.prototype.reject

Iterates over the given `Elements` instance, executes the `fn` function for each item in the `Elements` instance, with `item, index, array` as arguments, and an optional `thisValue`. The returned value is a new `Elements` instance containing the items of the first `Elements` instance for which `fn` returned a falsy value. 

```javascript
myElements.reject(function(item, index, array){}, thisValue) 
  // -> newElements
```

### Elements.prototype.fold

Iterates over the given `Elements` instance, executes the `fn` function for each item in the `Elements` instance, with `currentValue, nextValue, index, array` as arguments, and an optional `thisValue`. The returned value is the returned result of the last `fn` call. 

```javascript
myElements.fold(function(currentValue, nextValue, index, array){}, thisValue, initialValue) 
  // -> value
```

### Elements.prototype.foldRight

`Elements.prototype.foldRight` is the same as `Elements.prototype.fold`, except it loops backwards. 

### Elements.prototype.find 

Finds the first occurrence of the given `element` in the given `Elements` instance (strict equality), optionally starting from an specified `index`, and returns the `index` of the item, or `-1` if not found. 

```javascript
myElements.find(element, index)
  // -> index
```

### Elements.prototype.findLast

`Elements.prototype.findLast` is the same as `Elements.prototype.find`, except it loops backwards. 

### Elements.prototype.contains 

Returns a boolean defining whether or not the given value is in the `Elements` instance or not. 

```javascript
myElements.contains(element)
  // -> boolean
```

### Elements.prototype.pluck

Returns a new array filled with the given `property` of each item. 

```javascript
myElements.pluck(property)
  // -> new array
```

### Elements.prototype.isEmpty

Returns a boolean defining whether or not the `Elements` instance is empty.

```javascript
myElements.isEmpty()
  // -> boolean
```

### Elements.prototype.intersect

Returns a new `Elements` instance filled with the items that are both in the first and in the second `Elements` instance, `NodeList`, or `Array`. 

```javascript
myElements.intersect(otherElements)
  // -> newElements
```

### Elements.prototype.intersect

Returns a new `Elements` instance filled with the items that are in the first and not in the second list. 

```javascript
myElements.difference(otherElements)
  // -> newElements
```

### Elements.prototype.sortBy

Sorts the `Elements` instance by a given `property`, and optionally a given `algorithm`. 

```javascript
myElements.sortBy(property, algorithm)
  // -> newElements
```

### Elements.prototype.groupBy

Creates an array filled by arrays of `n` length containing the ordered values of the given `Elements` instance. If there are missing items in the last array to reach a `n` length, a `fill` parameter can be used to fill the blanks.  

```javascript
myElements.groupBy(n, fill)
  // myArray
```

### Elements.prototype.last

Shorthand for `myElements[myElements.length - 1]`. 

```javascript
myElements.last()
  // -> last element
```

### Elements.prototype.groupWith

Returns an array returning arrays of values sharing the same indexes in different arrays or `Elements` instances. 

```javascript
myElements.groupWith(myArray, myElements2 …)
  // -> new array
```

### Elements.prototype.any

Returns whether or not an `Elements` instance contains at least one item for which `fn` called with `item, index, array` and an optional `thisValue` returns a truthy value. 

```javascript
myElements.any(fn, thisValue)
  // -> boolean
```

### Elements.prototype.all 

Returns whether or not `fn`, called with `item, index, array` and an optional `thisValue` returns a truthy value for every item in an array. 

```javascript
myElements.all(fn, thisValue)
  // -> boolean
```

### Elements.prototype.html

Replaces the content of every item in the list by a given string interpreted as HTML. 

```javascript
myElements.html("foo")
  // -> myElements
```

### Elements.prototype.text

Replaces the content of every item in the list by a given string interpreted as TextNodes. 

```javascript
myElements.text("foo")
  // -> myElements
```

### Elements.prototype.append

Appends the given node(s) to the first element of the list. 

```javascript
myElements.append(myFragment)
  // -> myElements
```

### Elements.prototype.ancestors

Returns an array of the first element's ancestors (stops at `<html>`, included). 

```javascript 
myElements.ancestors()
  // -> array
```

### Elements.prototype.appendTo

Appends the list of elements to a given element. 

```javascript
myElements.appendTo(element)
  // -> myElements
```

### Elements.prototype.prepend

Prepends the given node(s) to the first element of the list. 

```javascript
myElements.prepend(myFragment)
  // -> myElements
```

### Elements.prototype.prependTo

Prepends the list of elements to a given element. 

```javascript
myElements.appendTo(element)
  // -> myElements
```

### Elements.prototype.insertAfter

Inserts the given `nodes` next to the first element of the list. 

```javascript
myElements.insertAfter(nodes)
  // -> myElements
```

### Elements.prototype.insertBefore

Inserts the given `nodes` right before the first element of the list. 

```javascript
myElements.insertBefore(nodes)
  // -> myElements
```


### Elements.prototype.siblings

Return a new `Elements` instance containing all the siblings of the first item in the list (optionally, without this item setting `dismissElement` to `true` ). 

```javascript
myElements.siblings(dismissElement)
  // -> mySiblings
```

### Elements.prototype.siblingsBefore

Return a new `Elements` instance containing all the siblings before the first item in the list. 

```javascript
myElements.siblingsBefore()
  // -> mySiblings
```

### Elements.prototype.siblingsAfter

Return a new `Elements` instance containing all the siblings after the first item in the list. 

```javascript
myElements.siblingsAfter()
  // -> mySiblings
```

### Elements.prototype.previous

Return a new `Elements` instance containing the element preceding the first item in the list. 

```javascript
myElements.previous()
  // -> mySibling
```

### Elements.prototype.next

Return a new `Elements` instance containing the element next to the first item in the list. 

```javascript
myElements.next()
  // -> mySibling
```

### Elements.prototype.children

Return a new `Elements` instance containing the children elements of the first item in the list. 

```javascript
myElements.children()
  // -> myChildren
```

### Elements.prototype.getElements

Return a new `Elements` instance containing the descendant elements matching a given `selector` of the first item in the list. 

```javascript
myElements.getElements(selector)
  // -> myChildren
```

### Elements.prototype.empty

Empties every element in the list (references to removed descendants are kept). 

```javascript
myElements.empty()
  // -> myElements
```

### Elements.prototype.remove

Removes every element in the list from their current parent. 

```javascript
myElements.remove()
  // -> myElements
```

### Elements.prototype.css

Gets the asked property(ies) of the first item in the list or sets the properties of every item in the list. 

```javascript
myElements.css("position")
  // -> value
myElements.css(["position","display"])
  // -> {position:value, display:value}
myElements.css("display", "block")
  // -> myElements
myElements.css({disply:"block", float:"left"})
  // -> myElements
```

### Elements.prototype.getValue

Returns the current value of the first item in the list. 

```javascript
myElements.getValue()
  // -> value
```

### Elements.prototype.setValue

Sets the value of each item in the list (if the item is a select, a `number` as `value` will be considered as an `index`). 

```javascript
myElements.setValue(value)
  // -> myElements
```

### Elements.prototype.index

Returns the current index of the first element into it's `parentNode` children. 

```javascript
myElements.index()
  // -> number
```

### Elements.prototype.serialize 

Returns an object containing the name/values of the `<input>, <textarea>, <select> & <button>` inside the first item of the list. 

```javascript
myElements.serialize()
  // -> object
```

### Elements.prototype.attr

Reads the first item's given attribute, or set it for each element. 

```javascript
myElements.attr("foo")
  // -> value
myElements.attr("foo","bar")
  // -> myElements
```

### Elements.prototype.data

Reads the first item's given `data-*`, or set it for each element. 

```javascript
myElements.data("foo")
  // -> value
myElements.data("foo","bar")
  // -> myElements
```

### Elements.prototype.clone

Clones each node in the list (optionally with descendants) 

```javascript
myElements.clone()
  // -> myClonedElements
myElements.clone(true)
  // -> myClonedElements
```

### Elements.prototype.parent

Returns the first item's parentNode (`Elements` instance)

```javascript
myElements.parent()
  // -> myParent
```

### Elements.prototype.coords

Returns the coordinates of the first element in the list. 

The output is an object containing integers (as pixels) for the following properties : `top`, `left`, `bottom`, `right`, `width`, `height`. 

```javascript
myElements.coords()
  // -> object
```

### Elements.prototype.offset

Returns the offset of the first element in the list, relative to its clothest positioned ancestor. 

The output is an object containing integers (as pixels) for the following properties : `top`, `left`,  and the `parent` element

```javascript
myElements.offset()
  // -> object
```

### Elements.prototype.globalOffset

Returns the offset of the first element in the list, relative to the document. 

The output is an object containing integers (as pixels) for the following properties : `top`, `left`. 

```javascript
myElements.globalOffset()
  // -> object
```

### Elements.prototype.classNames

Returns an array of classNames for the first item in the list. 

```javascript
myElements.classNames()
  // -> array
```

### Elements.prototype.hasClass

Returns if the first item in the list has a given className

```javascript
myElements.hasClass(className)
  // -> boolean
```

### Elements.prototype.addClass

Adds the given className(s) to each element of the list.

```javascript
myElements.addClass(classNames)
  // -> myElements
```

### Elements.prototype.removeClass

Removes the given className(s) from each element of the list.

```javascript
myElements.removeClass(classNames)
  // -> myElements
```

### Elements.prototype.toggleClass

Toggles the given className(s) of each element of the list.

```javascript
myElements.toggleClass(classNames)
  // -> myElements
```
# Event

## Event.listen

Attaches a callback to a given event for a `Node` or an `Object`. 

An optional argument (`selector`) is used for event delegation. 

The `callback` is a function, with an `eventObject` as first argument, and the element from which the event was launched. In case of delegation, it's the element matching the `selector`, otherwise it's element you listen to directly. 

```javascript
// Event method
Event.listen(element, "mouseenter", ".list-item", function(e){})
Event.listen(element, "mouseenter", function(e){})
// Elements method
myElements.listen(element, "mouseenter", ".list-item", function(e){})
myElements.listen(element, "mouseenter", function(e){})
```

## Event.stopListening

Stops listening event(s) *(attached by Craft)*. Note that if you precise a `handler`, it **must** be the same reference as the one you attached to the event. 

```javascript
// Event method
Event.stopListening(element) // stops listening every event
Event.stopListening(element, "click") // stops listening every "click" event
Event.stopListening(element, "click", handler) // stops listening the "click" event with the given handler
// Elements method
myElements.stopListening() // stops listening every event
myElements.stopListening("click") // stops listening every "click" event
myElements.stopListening("click", handler) // stops listening the "click"
```

## Event.fire

Fires a custom event. Works like [PrototypeJS](http://api.prototypejs.org/dom/Event/fire/) and requires a `":"` in the custom event's name. 

```javascript
// Event method
Event.fire(myElements, "data:loaded") // fires "data:loaded"
Event.fire(myElements, "data:loaded", {data:"foo"}) // fires "data:loaded" and {data:"foo"} is accessible in the eventObject.meta
Event.fire(myElements, "data:loaded", null, false) // fires "data:loaded" without bubbling
// Elements method
myElements.fire("data:loaded") // fires "data:loaded"
myElements.fire("data:loaded", {data:"foo"}) // fires "data:loaded" and {data:"foo"} is accessible in the eventObject.meta
myElements.fire("data:loaded", null, false) // fires "data:loaded" without bubbling
```

## Event helpers

### Event.preventDefault

Use inside an event callback to cancel the default behavior related to an event. 

```javascript
function(e){
  Event.preventDefault(e)
}
```

### Event.stopPropagation

Use inside an event callback to cancel the propagation of an event. 

```javascript
function(e){
  Event.stopPropagation(e)
}
```

### Event.stop

Use inside an event callback to cancel the propagation of an event **and** its default behavior. 

```javascript
function(e){
  Event.stop(e)
}
```

### Event.target

Use inside an event callback to get the event's target. 
```javascript
function(e){
  var target = Event.target(e) // -> element
}
```

## Enhancements 

### mouseenter and mouseleave

MouseEnter and MouseLeave events are supported, even with delagation. 

The difference with MouseOver and MouseLeave is that they don't fire again if a child of the element you're listening to fires these events if the mouse was already in the element you listen to.

```javascript
myElements.listen("mouseenter", ".list-item", handler)
```

### Bubbling focus and blur

If you listen to Focus and Blur events, they normally don't bubble. Craft enables that bubbling so that you can use event delegation with it. 

```javascript
myElements.listen("focus", "input", handler)
```

### IE memory leaks

Craft detaches every handler on IE browsers on the `unload` event, to prevent memory leaks. 
# Selector

Selectors are used in `$` (or its alias, `Craft`), in `Elements.matches`, and in event delegation. 

## Selectors 

```css
/* direct queries */
#foo
.bar
div
[name="foo"]

/* multiple arguments (all combinations are possible) */
div[attr="foo"]
.bar.baz[attr="foo"]
#foo[attr="foo"]
#foo.bar[attr="foo"]

/* inheritance */
#foo .bar.baz div[attr="bar"]

/* direct filiation */
#foo > .bar.baz

/* adjacency */
#foo > .bar.baz + div
#foo > .bar.baz - div /* non css-like, but working as "preceding element" */
```

## Query the DOM 

```javascript
$("#foo .bar") 
$(".bar", "#foo") // optional context argument
$("#foo").getElements(".bar")
$$(".foo") // first match only
```

**NOTE** : You should cache the queries you use more than once.  

## Match a selector

```javascript
Elements.matches(myElement, "#foo .bar.baz") // boolean
```

## Delegate an event

```javascript
myElement.listen("mouseenter", "#foo .bar.baz", function(e){
  // something
})
```
# String

## String.parseJSON 

`String.parseJSON` returns an object extracted from a `json` string. If this string isn't JSON, a `Syntax Error` will be thrown. 

```javascript
String.parseJSON("{\"foo\":\"bar\"}") 
  // -> Object
```

## String.compiler 

See [String.prototype.compile](#stringprototypecompile). 

Generates a simple templating function. 

```javascript
var comp = String.compiler("<p>#{*}</p>")
  // -> Function
comp("foo") 
  // -> "<p>foo</p>"
```

## String.prototype.isJSON 

Returns whether or not the given string is parsable JSON. 

```javascript
"".isJSON()
  // -> false
"{}".isJSON()
  // -> true
"{foo:'bar'}".isJSON()
  // -> false
"{\"foo\":\"bar\"}".isJSON()
  // -> true
```

## String.prototype.trim

Returns a new string without trailing whitespace. 

```javascript
"    foo ".trim()
  // -> "foo"
```

## Sting.prototype.camelize

Returns a camelized string

```javascript
"FOO BAR".camelize()
  // -> "fooBar"
"foo-bar".camelize()
  // -> "fooBar"
```

## String.prototype.dasherize

Returns a dasherized string

```javascript
"FOO BAR".dasherize()
  // -> "foo-bar"
"fooBar".dasherize()
  // -> "foo-bar"
```

## String.prototype.capitalize

Returns a capitalized string (optionally every word)

```javascript
"FOO BAR".capitalize()
  // -> "Foo bar"
"foo bar".capitalize(true)
  // -> "Foo Bar"
```

## String.prototype.compile

Simple templating utility. 

```javascript
"<li>#{foo}, #{bar}</li>".compile({foo:"hello", bar:"world"})
  // -> "<li>hello, world</li>"
"<li>#{foo}, #{bar.baz}</li>".compile({foo:"hello", bar:{baz:"world"}})
  // -> "<li>hello, world</li>"
"<li>#{*}</li>".compile("hello, world")
  // -> "<li>hello, world</li>"
```

### Patterns

Type | Pattern
--- | --- 
String | `#{*}`
Array | `#{index}`
Nested Array | `#{index.property}`
Object | `#{property}`
Nested object | `#{property.to.reach}`

# Request

## Requests Classes

Craft has four different kinds of Requests : `Request.get`, `Request.post`, `Request.script`, `Request.jsonp`. 

### Initialization 

```javascript
Request.get(url) // request object
Request.post(url) // request object
Request.script(url) // request object
Request.jsonp(url) // request object
```

### .update (`get`, `post`, `script`, `jsonp`)

`request#update` launches the request. 

If the request is a `post` one, the function can take a first argument 

```javascript
myRequest
  .then(function(response){

  })
```

### .then (`get`, `post`, `script`, `jsonp`)

`request#then` executes a callback when the request is done with loading. You can set as many `then` callbacks as you want, and they will be executed in the order you've set them. 

If the request is an XHR (get or post), callback's `this` is the `XHR`. 

```javascript
myRequest
  .then(function(response){

  })
```

### .fail (`get`, `post`, `script`, `jsonp`)

`request#fail` executes a callback when the request failed. You can set as many `fail` callbacks as you want, and they will be executed in the order you've set them. 

If the request is an XHR (get or post), callback's `this` is the `XHR`. 

```javascript
myRequest
  .fail(function(){

  })
```

### .always (`get`, `post`, `script`, `jsonp`)

`request#always` executes a callback when the request is initialized. You can set as many `always` callbacks as you want, and they will be executed in the order you've set them. 

```javascript
myRequest
  .always(function(){

  })
```

### .async (`get`, `post`)

`request#async` lets you set whether or not you want the request to be asynchronous (default is `true`). 

```javascript
myRequest
  .async(false)
```

### .withCredentials (`get`, `post`)

`request#withCredentials` lets you set whether or not you want the `XHR.withCredentials` to be true. 

```javascript
myRequest
  .withCredentials(true)
```

### .setHeader (`get`, `post`)

`request#setHeader` lets you set a request header.  

```javascript
myRequest
  .setHeader(name, value)
```

### .setHeaders (`get`, `post`)

`request#setHeaders` lets you set several request headers (key = name, value = value).  

```javascript
myRequest
  .setHeaders(object)
```

## Request method

The `Request` method is a dead-simple way to perform requests (you don't even need an `.update`) : 

```javascript
Request(["post(queryString):foo", "jsonp:bar", myRequest])
  .then(function(postRes, jsonpRes, otherRequest){
    console.log("went right : ", arguments)
  })
  .fail(function(){})
  .always(function(){})
  .then(function(){})
```

The string patterns are : 

Type | Pattern
--- | ---
`"GET"` | `"#{url}"`
`"POST"` | `"post(#{queryString}):#{url}"`
`"Script"` | `"script:#{url}"`
`"JSONP"` | `"jsonp:#{url}"`

but you can as well pass Request objects in the array of requests. 
# Function

## Function.prototype.implement

Extends the function's prototype. 

```javascript
myFunction.implement("foo", function(){})
  // myFunction
myFunction.implement({
    foo : function(){}
  , bar : 0
})
```

## Function.prototype.attach

`Function.prototype.attach` returns (for a given function) a new function with a bound `thisValue`, and optional arguments. If you attach `null` or `undefined`, a new instance (`new attachedFunction`) will not be possible to create. 

```javascript
myFunction.attach(thisValue, arg1, arg2 …) 
  // -> attached function
```

### Example 

```javascript
function foo(a){
  return this.bar + " " + a
}
var bar = foo.attach({bar:"foo"})
bar("hello") 
  // -> "foo hello"
```

## Function.prototype.partial

`Function.prototype.partial` returns (for a given function) a new function with n first arguments that are already filled.  

```javascript
myFunction.partial(arg1, arg2 …)
  // -> partially filled function
```

### Example 

```javascript
function move(direction, length){
  myDiv.style.left = (parseInt(myDiv.style.left, 10) + (direction * length)) + "px"
}

var moveLeft = move(-1)
  , moveRight = move(1)

moveLeft(30) // moves 30px left
```

## Function.prototype.delay 

`Function.prototype.delay` delays the execution of a function of `n` second, with, optionally, the given arguments. 

```javascript
myFunction.delay(2, arg1, arg2 …)
  // -> setTimeout id
```

## Function.prototype.debounce

`Function.prototype.debounce` returns a function that executes the given one, delayed of `n` seconds, unless the function is called during the delay, in which case the timer is reset. The arguments of the given function are the one you call your `debounced` function with. 

```javascript
myFunction.debounce(3) 
  // -> debounced function
```