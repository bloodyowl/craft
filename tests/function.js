test("Function#attach", function() {

  ok((function(a, b){return [this.version, a, b]}).attach(Craft,'function')('bound').join(",") == '1.1.4,function,bound')
});

test("Function#partial", function() {

  ok((function(a, b, c){return [a, b, c]}).partial('function', 'is')('curried').join(",") == "function,is,curried")
});


asyncTest("Function#delay", 2, function() {

  var delayed = false

  ;(function(){ delayed = true }).delay(0.1)

  window.setTimeout(function(){
    if(!delayed) ok("delayed not too soon")
  }, 50)

  window.setTimeout(function(){
    if(delayed) ok("delayed not too late")
    start()
  }, 150)
});


asyncTest("Function#every", 2, function() {

  var delayed = false
    , interval = (function(){ window.clearInterval(interval); delayed = true }).delay(0.1)

  window.setTimeout(function(){
    if(!delayed) ok("delayed not too soon")
  }, 50)

  window.setTimeout(function(){
    if(delayed) ok("delayed not too late")
    start()
  }, 150)
});

