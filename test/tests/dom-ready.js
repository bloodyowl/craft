module("DOM Ready")

asyncTest(
    "DOM ready"
  , function(){
      
      expect(4)
      
      equal(
          craft.domReady(function(){
            ok(
                /interactive|complete|loaded/.test(document.readyState)
              , "Ready state is ok"
            )
          })
        , craft
        , "Returns craft"
      )
      
      craft.domReady(function(){
          throws(
              function(){
                throw "foo"
              }
            , "foo"
          )
        })
        .domReady(function(){
          ok(
              1
            , "Errors thown do not affect other callbacks"
          )
          start()
        })
      
    }
)