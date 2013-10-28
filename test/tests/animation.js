module("Animation")

asyncTest("craft.animation", function(){
  
  expect(16)
  
  var animation
    , i = -1
  
  ok(typeof craft.animation(function(){}) == "function")
  
  animation = craft.animation(function(a, b){
    ok(a >= 0 && a <= 1)
    ok(b >= 0 && b <= 1) 
    ok(b == 1 - a)
    if(++i == 4) start()
  })
  
  animation(-3)
  animation(0)
  animation(.5)
  animation(1)
  animation(3)
  
})

asyncTest("craft.timeout", function(){
  
  expect(6)
  
  var i = -1
    , last = 0
    , ran = false
    , timer = craft.timer(1000, 10, function(a){
        if(++i > 5) {
          if(ran) return
          ran = true
          return start()
        }
        ok(a >= last)
        last = a
      })
    
  timer()
  
})