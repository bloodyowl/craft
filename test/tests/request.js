module("Request")

test(
    "craft.request.create"
  , function(){
      
      var request = craft.request.create("/request")
        , request2 = craft.request.create({
              url: "/request"
            , data: "foo=bar"
          })
        , _isPrototypeOf = {}.isPrototypeOf
      
      ok(
          _isPrototypeOf.call(craft.events, request)
        , "Request is an instance of Events"
      )
      
      equal(
          request.url
        , "/request"
        , "Accepts string argument as URL"  
      )
      
      equal(
          request2.data
        , "foo=bar"
        , "Accepts object argument"
      )
    }  
)

asyncTest(
    "craft.request"
  , function(){
    
      expect(3)

      var request = craft.request.create("/request")
        , request2 = craft.request.create("/request/404")
        
      request.listen("success", function(){
        equal(
            this.responseText
          , "Helloworld!"
          , "Success callback"
        )
      })
      
      request2.listen("error", function(){
        equal(
            this.responseText
          , "404"
          , "Error callback" 
        )
      })
      
      request2.listen(404, function(){
        equal(
            this.responseText
          , "404"
          , "Status callback" 
        )
        start()
      })
      
      request.start()
      request2.start()
    }  
)