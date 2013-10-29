module("Craft events")

test(
    "craft.events.create"
  , function(){
      
      var events = craft.events.create()
        , _isPrototypeOf = {}.isPrototypeOf
        , _hasOwnProperty = {}.hasOwnProperty
        
      ok(
          _isPrototypeOf.call(craft.events, events)
        , "Prototypal inheritance is respected"
      )
      
      ok(
          _hasOwnProperty.call(events, "_events")
        , "Events object is created"
      )
      
    }
)

asyncTest(
    "events handling"
  , function(){
    
      expect(11)
      
      var events = craft.events.create()
        , object = {}
      
      function callback(evt){
        equal(
            evt.data
          , "bar"
          , "Passes data correctly"
        )
        equal(
            this
          , object
          , "ThisValue is passed correctly"  
        )
      }
      
      function callback2(evt){
        equal(
            evt.data
          , "bar"
          , "Passes data correctly"
        )
        equal(
            this
          , object
          , "ThisValue is passed correctly"  
        )
      }
      
      events.listen("foo", callback2)
      
      events.listenOnce("foo", function(evt){
        equal(
            evt.data
          , "bar"
          , "Passes data correctly"
        )
        equal(
            this
          , object
          , "ThisValue is passed correctly"  
        )
      })
      
      equal(
          events.listen("foo", callback)
        , events
        , "Returns object on .listen"
      )
      
      equal(
          events.fire("foo", "bar", object)
        , events
        , "Returns object on .fire"
      )
      
      equal(
          events.stopListening("foo", callback)
        , events
        , "Returns object on .stopListening"
      )
      
      events.fire("foo", "bar", object)
      
      events.stopListening("foo")
      
      events.fire("foo", "bar", object)
      
      setTimeout(function(){
        start()
      }, 1000)
      
    }
)

asyncTest(
    "events bubbling"
  , function(){
    
      expect(4)
      
      var events1 = craft.events.create()
        , events2 = craft.events.create(events1)
        , events3 = craft.events.create(events2) 
        , object = {}
    
      events1.listen("foo", function(){
        throw new Error()
      })
      
      events2.listen("foo", function(evt){
        equal(
            evt.data
          , "bar"
          , "Event object passed to parent"
        )
        equal(
            this
          , object
          , "thisValue passed to parent"
        )
        evt.stop()
      })
      
      events3.listen("foo", function(evt){
        equal(
            evt.data
          , "bar"
          , "Event object passed"
        )
        equal(
            this
          , object
          , "thisValue"
        )
      })
      
      events3.fire("foo", "bar", object)
    
      setTimeout(function(){
        start()
      }, 200)
    }  
)