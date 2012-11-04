# Introduction

Craft is a lightweight but powerful JavaScript framework that helps you to build web applications. 

## Concept

Craft is a tiny framework (only 3.69KB gzipped), that makes it really fast to load and to initialize. Nevertheless, it is still powerful and helps you to build web apps with only what you need. 

The main part of Craft is about extending native JavaScript objects : `Array`, `Function` & `String`. Because of the problems raised by the extension of `Element` & `Object`, two new contructors have been deployed : `Hash` (dedicated to Objects as associative arrays) and `DOM`, to manipulate the DOM easily without breaking it or be forced to simulate `Element` on Internet Explorer. 

Also, a global `Craft` object has been created to contain an improved `typeOf` function, a `Browser` object, an `AJAX` constructor, and a `toArray` function. 

**Craft.js** has been rewritten in **CoffeeScript** to make custom builds easier, and to improve the readability of the source. 


## Get Craft

```
git clone https://github.com/mlbli/Craft.git
```

## Build your version
```
cd path/to/craft/src

coffee -j ../craft.js -c core array hash function string dom browser
```# Craft

## Definition

Craft is a function that executes the first argument with `Craft, window, document` as own arguments.  

## Methods

### Craft.typeOf 

```js
Craft.typeOf(object) // -> object's type
```

Returns the object's type. Acts like native `typeof` but adds `"array"` and `"null"` to the detected types. 

### Craft.extend

```js
Craft.extend(object, [function || object]) // -> object
```
Adds to the object the properties of the second arguments (which can be an object or a function returnong an object).


## Properties

### Craft.version

```js
Craft.version // -> string
```
### Craft.Browser

```js
Craft.Browser // -> hash
```

Contains the following properties : 

```
UA // lowerCase userAgent
isWebkit // boolean
isFirefox // boolean
isIE // boolean
isIE6 // boolean
isIE7 // boolean
isIE8 // boolean
isOpera // boolean
isKonqueror // boolean
isiPhone // boolean
isiPad // boolean
isiPod // boolean
isAndroid // boolean
toClassName // active browser joined with spaces in a string
```
# AJAX 


## Craft.AJAX

```js
var myRequest = new Craft.AJAX({
  url : "path/to/request",
  method : "POST" // or "GET" (default : "GET"),
  success : function(res){},
  loading : function(){},
  async : true // or false (default : true),
  query : "foo=bar&bar=baz" // if method is "POST"
}) 
// -> AJAX instance
```

**NOTE** : The AJAX Object owns the `Hash.prototype`. 

## Craft.AJAX#update

```js
myRequest.update() // -> responseText if async is set to false
```

Sends the request and executes the callback. If the request is synchronous, the responseText is returned. 

## Update periodically

Simply use : 

```js 
myRequest.update.every(15)
```# Array

## Array#forEach

```js
[1,2,3,4,5,6].forEach(function(item, index, array){}) // -> Array
```

Calls the given function for each item present in the Array.  

## Array#clone

```js
[1,2,3].clone() // -> new Array
```

Returns a safe-to-modify Array from a given source. 

## Array#map

```js
[1,2,3].map(function(item, index, array){}) // -> new Array
```

Replaces the value of each item with the value returned by the function. 

## Array#filter

```js 
[1,2,3].filter(function(item, index, array){}) // -> new Array
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

# Function

## Function#bind

```js
myFunction.bind(object, arg1, arg2 …) // -> new Function
```

Returns a new function with filled and locked context and first arguments. 

## Function#curry

```js
myFunction.curry(arg1, arg2 …) // -> new Function
```

Returns a new function with filled and locked first arguments. 


## Function#delay

```js
myFunction.delay(time, arg1, arg2 …) // -> timeOut id
```

Executes the function after a given time, and given arguments.  

## Function#every

```js
myFunction.every(time, arg1, arg2 …) // -> interval id
```

Iterates over the given time to execute the function with the given arguments. # String

## String#parseJSON

```js
myString.parseJSON() // -> evaluated string
```

Returns a JavaScript object from JSON. 

## String#trim

```js
myString.trim() // -> cleaned string
```

Returns a string cleaned from the whitespace before and after the content.  


## String#camelize

```js
myString.camelize() // -> new String
```

Return a camelCase version of the given string. 

**for instance** : `"border-radius".camelize() // -> "borderRadius"`

## String#toElement

```js
myString.toElement() // -> DOM nodes
```

Returns DOM nodes (Elements and TextNodes) from a given String, wrapped inside a DocumentFragment. # DOM

## Constructor

```js
myElements = new DOM(elements) // -> wrapped elements
```

## DOM.create
```js
DOM.create("p", { id : "foo" }) // -> DOM Object 
```
If arguments is empty, returns a wrapped `documentFragment`. Else an element with the given `tagName` with `object` properties is returned. 

## DOM.createFragment
```js
DOM.createFragment() // -> DOM Object (Fragment)
```

## DOM.loaded 
```js
DOM.loaded(func) 
```

Executes the function when the DOM is ready to be manipulated. 

## remove
```js
myDOMElement.remove() // -> DOM Object (Element)
```
Removes the given element. 

## clone
```js
myDOMElement.clone() // -> cloned myDOMElement
```

Clones the given element. 

## insert
```js
myDOMElement.insert("<p></p>")  // -> myDOMElement
myDOMElement.insert({
  before:"foo", 
  after:"<hr>", 
  bottom:DOM.create("p"), 
  top: document.createElement("i")
}) // -> myDOMElement
```
Inserts content where you want. 

## empty
```js
myDOMElement.empty() // -> myDOMElement
```
Empty the given element. 


## appendTo
```js
myDOMElement.appendTo(container)  // -> myDOMElement
```
 
## prependTo
```js
myDOMElement.prependTo(container)  // -> myDOMElement
```
Prepends the given element to the container.
## siblings
```js
myDOMElement.siblings() //  -> DOMElements
```
Returns the siblings of a given element. 

 
## parent
```js
myDOMElement.parent()  // -> DOMparentElement
```
Returns the parent of a given element. 

 
## children
```js
myDOMElement.children()  // -> DOMchildren 
```
Returns the children of a given element. 

## getElement
```js
myDOMElements.getElement(n)  // -> DOMElement
```
Returns a chain able element corresponding to the nth element of the list.  

## getValue
```js
myDOMElement.getValue() // -> Object
```
Returns the value of a given form element. 

## setValue
```js
myDOMElement.setValue("foo") // -> myDOMElement
myDOMElement.setValue(3 /* selectedIndex */) myDOMElement)

```
Sets the value of a given form element. 

## getAttr
```js
myDOMElement.getAttr("data-foo") // -> "data-foo" value
```
Reads the given attribute. 

## setAttr
```js
myDOMElement.setAttr("data-foo", "true") // -> myDOMElement
```
Writes the given attribute. 
	
## serialize
```js
myDOMElement.serialize(/*accept ids as names (not recommanded) */) // -> Hash 
```
Returns an object composed of the values of a given form element. If `acceptIds` is set to `true`, ids are accepted if name attribute is missing. 

## css
```js
myDOMElement.css({ "color" : "red", "border-width" : "2px" }) // -> myDOMElement 
```
Changes the style of the element.

 
## classNames
```js
myDOMElement.classNames() // -> Array ["foo","bar","baz"] 
```
Returns an array composed of the given element classNames.

 
## hasClass
```js
myDOMElement.hasClass("foo") // -> true
```
Checks if the given element has the given className.

## addClass
```js
myDOMElement.addClass("myClass") // -> myDOMElement
```
Adds the given className(s) to the element. 


## removeClass
```js
myDOMElement.removeClass("myClass") // -> myDOMElement
```
Removes the given className(s) from the element. 

 
## toggleClass
```js
myDOMElement.toggleClass("myClass") // -> myDOMElement
```
Toggles the given className(s) from the element. 


## invoke
```js
myDOMElements.invoke(myFunc, arg1, arg2 /* ... */) // -> myDOMElements
```

Each iteration calls function with `item, argument1, argument2 ...` as arguments. 


# Event 

## Event.stop
```js
myDOMElement.listen("click", function(e){
	Event.stop(e)
}) 
```
Prevents bubbling and default behavior. 

## listen
```js
myDOMElement.listen("mouseover mouseout", myHandler) // -> myDOMElement
```
Listens the given event(s) and calls the handler with element as `this` and the event object as first argument.
	
## stopListening
```js
myDOMElement.stopListening("mouseout", myHandler) // -> myDOMElement
```
Stop the listening of the given event(s) that call the given handler.



# Selector 

 
## getById *(alias DOM.getById)*
```js
DOM.getById("foo") // -> Craft Object (Element)
```
Returns the elements with the given id. 

 
## getByClass
```js
myDOMElement.getByClass("myClass") // DOMElements
```
Returns the elements with the given className. 

**Note :** `DOM.getByClass` has `document` as a context. 

 
## getByTag
```js
myDOMElements.getByTag("div") // -> DOMElements
```
Returns the elements with the given tagName. 

**Note :** `DOM.getByTag` has `document` as a context. 

