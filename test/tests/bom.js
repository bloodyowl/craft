module("BOM")

asyncTest(
    "craft.requestAnimationFrame"
  , function(){
    var i = 0
    expect(2)
    
    ok(typeof craft.requestAnimationFrame(function(){
      equal(
          i
        , 1
        , "Is executed asynchronously"
      )
      start()
      }) == "number"
    , "Returns timeout id")
    ++i
    
  }
)

asyncTest(
    "craft.cancelAnimationFrame"
  , function(){
      expect(1)
    
      ok(!craft.cancelAnimationFrame(
        craft.requestAnimationFrame(function(){
          ok(1)
        })
      ), 
      "Cancels animation frame")
      start()
    }
)

asyncTest(
    "craft.debounceAnimationFrame"
  , function(){
      expect(1)
      
      var fn = craft.debounceAnimationFrame(function(a){
        equal(
            a
          , "bar"
          , "Debouces"
        )
        start()
      }, 200)
      
      fn("foo")
      fn("bar")
      
    }
)