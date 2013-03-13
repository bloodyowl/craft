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