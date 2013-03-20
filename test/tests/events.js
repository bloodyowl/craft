/*jshint forin:true, eqnull:true, noarg:true, noempty:true, boss:true, loopfunc:true, unused:true, browser:true, asi:true, laxcomma:true */


;(function(){
  

  asyncTest("Listen/Fire", function(){
    
    expect(3)
    
    $(function(){
      
      var body = $("body")
        , qunit = $("#qunit")
        , i = 0
      
      body.listen("test:fire", function(e){ok(typeof e.meta.foo == "string",  e.meta.foo); i++})   
      body.fire("test:fire", {foo:"Fires"})
      body.stopListening("test:fire")
      body.listen("test:fire", function(e){
        ok(typeof e.meta.foo == "string",  e.meta.foo) 
        i++
        equal(i, 2, "Stop Listening works")
        start()
       })   
      qunit.fire("test:fire", {foo:"Bubbles"})
      body.stopListening("test:fire")
      body.fire("test:fire", {foo:"Fires"})
      
      
    })
    
  })
  
  
  asyncTest("Delegate", function(){
    
    expect(3)
    
    $(function(){
      
      var body = $("body")
        , qunit = $("#qunit")
        , header = $("#qunit-header")
      
      body.listen("test:delegate", "#qunit", function(e){ 
        ok(typeof e.meta.foo == "string", e.meta.foo) 
      })
      
      body.fire("test:delegate", {foo:null})
      $("#qunit-fixture").fire("test:delegate", {foo:null})
      
      qunit.fire("test:delegate", {foo:"Actual element"})
      
      body.stopListening("test:delegate")
      
      body.listen("test:delegate", "#qunit", function(e){ 
        ok(this == qunit[0], "Context is the target")
        ok(typeof e.meta.foo == "string", e.meta.foo) 
        start()
      })
      
      header.fire("test:delegate", {foo:"Child element"})
      body.stopListening("test:delegate")
      
    })
    
  })
  
  
})()