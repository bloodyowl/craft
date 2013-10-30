module("DOM Events")

test(
    "eventClass.create"
  , function(){
      
      var div = document.createElement("div")
        , klass = craft.eventClass.create(div)
        , _isPrototypeOf = {}.isPrototypeOf
      
      equal(
          div.events
        , klass
        , "EventClass passed to Object"
      )
      
      ok(
          _isPrototypeOf.call(craft.eventClass, klass)
        , "Prototypal inheritance preserved"
      )
      
    }  
)

test(
    "eventClass.add"
  , function(){
    
      var div = document.createElement("div")
        , klass = craft.eventClass.create(div)
        , object
      
      klass.add("click", ".list-item", callback)
      function callback(evt){
        var target = evt.delegated
      }
      
      ok(
          craft.isArray(klass.click)
        , "Event callback list is created"
      )
      
      object = klass.click[0]
      
      ok(
          object
        , "Object has been created"
      )
      
      equal(
          object.listener
        , callback
        , "Callback is stored"
      )
      
      equal(
          object.selector
        , ".list-item"
        , "Selector is stored"  
      )
    
    }
)

test(
    "eventClass.remove"
  , function(){

      var div = document.createElement("div")
        , klass = craft.eventClass.create(div)
        , object

      klass.add("click", ".list-item", callback)
      klass.add("click", ".list-item", callback2)
      klass.add("click", callback2)
      
      function callback(evt){
        var target = evt.delegated
      }
      
      function callback2(evt){
        var target = evt.delegated
      }

      klass.remove("click", callback2)
      
      equal(
          klass.click.length
        , 1
        , "Removes callbacks"
      )
      
      equal(
          klass.click[0].listener
        , callback
        , "Left the right callback"  
      )
      
      klass.add("click", ".list-item", callback2)
      klass.add("click", callback2)
      
      klass.remove("click", ".list-item")
      
      equal(
          klass.click.length
        , 1
        , "Removes callbacks"  
      )
      
      equal(
          klass.click[0].selector
        , void 0
        , "Left the right callback"
      )
      
    }
)

asyncTest(
    "eventClass.fire"
  , function(){
      
      expect(2)
      
      var span = document.createElement("span")
        , parent = document.createElement("div")
        , klass = craft.eventClass.create(span)
        , parentKlass = craft.eventClass.create(parent)
        , object
        
      parent.appendChild(span)
      parentKlass.add("click", callback)
      
      document.body.appendChild(parent)
      
      klass.add("click", ".list-item", callback)
      klass.add("click", ".list-item", otherCallback)
      klass.add("click", otherCallback)
      
      function callback(evt){
        equal(
            typeof evt
          , "object"
          , "Bubbles"
        )
      }
      
      function otherCallback(evt){
        equal(
            typeof evt
          , "object"
          , "Event object is passed"
        )
      }
      
      klass.fire("click")
      
      setTimeout(function(){
        document.body.removeChild(parent)
        start()
      }, 1000)
    }  
)


asyncTest(
    "nodeList#listen"
  , function(){
    
      expect(3)
    
      var element = craft.createElement("div")
      element.appendTo(document.body)

      function K(){
        ok(
            1
          , "Pushes listener"
        )
      }
      
      equal(
          element.listen("click", K)
        , element
        , "Returns nodeList"
      )
      
      deepEqual(
          element[0].events.click
        , [{listener:K, useCapture:false, selector: null}]
        , "Binds event"
      )
      
      element.fire("click")
      setTimeout(function(){
        element.remove()
        start()
      }, 1000)
    }
)


asyncTest(
    "nodeList#stopListening (callback)"
  , function(){
    
      expect(2)
    
      var element = craft.createElement("div")
      
      element.appendTo(document.body)


      function K(){
        ok(
            0
          , "Didn't remove listener"
        )
      }
      
      element.listen("click", K)
      
      equal(
          element.stopListening("click", K)
        , element
        , "Returns nodeList"
      )
      
      deepEqual(
          element[0].events.click
        , []
        , "Removes event"
      )
      
      element.fire("click")
      
      setTimeout(function(){
        element.remove()
        start()
      }, 1000)
    
    }
)


asyncTest(
    "nodeList#stopListening (all)"
  , function(){
    
      expect(2)
    
      var element = craft.createElement("div")
      
      element.appendTo(document.body)

      function K(){
        ok(
            0
          , "Didn't remove listener"
        )
      }
      
      element.listen("click", K)
      
      equal(
          element.stopListening("click")
        , element
        , "Returns nodeList"
      )
      
      deepEqual(
          element[0].events.click
        , []
        , "Removes event"
      )
      
      element.fire("click")
      
      setTimeout(function(){
        element.remove()
        start()
      }, 1000)
    
    }
)


asyncTest(
    "nodeList#stopListening (selector)"
  , function(){
    
      expect(2)
    
      var element = craft.createElement("div")
      
      element.appendTo(document.body)
      
      function K(){
        ok(
            0
          , "Didn't remove listener"
        )
      }
      
      element.listen("click", ".foo", K)
      
      equal(
          element.stopListening("click", ".foo")
        , element
        , "Returns nodeList"
      )
      
      deepEqual(
          element[0].events.click
        , []
        , "Removes event"
      )
      
      element.fire("click")
      
      setTimeout(function(){
        element.remove()
        start()
      }, 1000)
      
    
    }
)


asyncTest(
    "nodeList#fire"
  , function(){

      expect(3)

      var element = craft.createElement("div")
        , child = craft.createElement("div")

      element.appendTo(document.body)
      child.appendTo(element)
      
      function K(evt){
        equal(
            evt.target
          , child[0]
          , "Event bubbled"
        )
      }
      
      function L(){
        ok(
            1
          , "Event fired"
        )
      }

      child.listen("click", L)
      element.listen("click", K)

      equal(
          child.fire("click")
        , child
        , "Returns nodeList"
      )
      
      setTimeout(function(){
        element.remove()
        start()
      }, 1000)


    }
)