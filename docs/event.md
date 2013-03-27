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
myElements.listen("mouseenter", ".list-item", function(e){})
myElements.listen("mouseenter", function(e){})
// Multiple events
myElements.listen("click myclass:create", function(e){})
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
// Multiple events
myElements.stopListening("click myclass:create")
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