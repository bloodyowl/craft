module("JSONP")

asyncTest(
    "craft.jsonp"
  , function(){
      
      expect(3)
      
      var request = craft.jsonp("/jsonp")
        , errorRequest = craft.jsonp("/jsonp2", null, 1000)
        , _isPrototypeOf = {}.isPrototypeOf
      
      ok(
          _isPrototypeOf.call(craft.promise, request)
        , "Returns a promise"
      )
      
      request.then(function(value){
        equal(
            value.foo
          , "bar"
          , "Object passed"
        )
      })
      
      
      errorRequest.then(null, function(){
        ok(
            1
          , "Error in script rejects promise"
        )
      })
      
      setTimeout(function(){
        start()
      }, 2000)
    }  
)