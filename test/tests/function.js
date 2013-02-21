;(function(){
  
  test("Function.prototype.attach", function(){
    
    function fn(a,b){
      return this.foo + a + (b ? b : "")
    }
    
    function fn2(){
      return this
    }
    
    
    
    fn.prototype.getFoo = fn2.prototype.getFoo = function(){
      return this.foo
    }
    
    var obj = {
      foo : "bar"
    }
      , attached = fn.attach(obj)
      , attachedArg = fn.attach(obj, "foo")
      , attached2 = fn2.attach(null)
      , attached3 = fn2.attach(undefined)
      , attached4 = fn2.attach(0)
      , attached5 = fn2.attach("")
      , attached6 = fn2.attach(false)
      , obj2 = {
          foo : "foo"
        , fn : attached
      }
      
    equal(obj2.fn("foo"), obj.foo + "foo", "Correctly attached")
    equal(attachedArg("foo"), obj.foo + "foofoo", "Correctly attached, and argument passed")
    equal(attached.prototype.getFoo, fn.prototype.getFoo, "Prototype is passed")
    equal(new attached2(), window, "Passing null prevents the function from creating an instance")
    equal(new attached3(), window, "Passing undefined prevents the function from creating an instance")
    deepEqual(new attached4(), fn2.prototype, "Passing 0 doesn't prevent the function from creating an instance")
    deepEqual(new attached5(), fn2.prototype, "Passing \"\" doesn't prevent the function from creating an instance")
    deepEqual(new attached6(), fn2.prototype, "Passing false doesn't prevent the function from creating an instance")
    
  })
  
  test("Function.prototype.partial", function(){
    
    function fn(a ,b){
      return a + (b ? b : "")
    }
    
    function fn2(a){
      return this
    }
    
    fn.prototype.getFoo = fn2.prototype.getFoo  = function(){
      return this.foo
    }

    var partial = fn.partial()
      , partial2 = fn.partial("foo")
      , partial3 = fn2.partial()
      
    equal(partial("foo"), "foo", "Empty partial is a function copy")
    equal(partial2("foo"), "foofoo", "Partial works")
    deepEqual(partial2.prototype, fn.prototype, "Prototypes are taken") 
    equal(partial3(), window)
    deepEqual(new partial3(), fn2.prototype, "call with new works")
  })
  
  asyncTest("Function.prototype.delay", function(){
    
    expect(2)
    
    function fn(a, b){
      equal(a + " " + b, "foo bar", "Function is delayed and arguments are passed")
      start()
    }
    
    var timeout = fn.delay(0.01, "foo", "bar")
    
    ok(typeof timeout == "number", "timeout id is returned")

  })
  
  asyncTest("Function.prototype.every", function(){
    
    expect(3)
    
    var index = 0
      , interval
    
    function fn(a, b){
      index++
      if(index == 3) {
        equal(a + " " + b, "foo bar", "Arguments are passed")
        equal(index, 3, "Function is reapeated")
        start()
        window.clearInterval(interval)
      }
    }
    
    interval = fn.every(0.01, "foo", "bar")
    
    ok(typeof interval == "number", "interval id is returned")
  
  })
  
  asyncTest("Function.prototype.debounce", function(){
    
    expect(2)
    
    var debounceFn
    
    function fn(a, b){
      equal(a + " " + b, "foo bar", "Arguments are passed")
      start()
    }
    
    debounceFn = fn.debounce(0.1)
    
    debounceFn("bar", "baz")
    debounceFn("foo", "bar")
    
    equal(typeof debounceFn, "function", "Function is returned")
      
  })
  
})()