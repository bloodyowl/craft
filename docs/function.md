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

## Function.prototype.getLength

Introduced in Craft 2.0.5. 

`Function.prototype.getLength` returns the expected number of arguments of a given function. `.partial` and  `.attach` use the `arguments` object to prepend parameters, so the `function.length` is always `0`. `function.getLength()` returns the accurate length for arity consistency. 

```javascript
function foo(a,b,c){}
var bar = foo.partial(1).partial(2)
bar.length // 0
bar.getLength() // 1
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