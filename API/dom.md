# DOM

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
myDOMElement.remove() 
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
Returns a chainable element corresponding to the nth element of the list.  

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

