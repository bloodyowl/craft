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
