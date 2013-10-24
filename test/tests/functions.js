module("Functions")

test(
    "craft.curry"
  , function(){
      
      var curried = craft.curry(add)
        , curriedLength = craft.curry(addNoLimit, 4)
      function add(a,b,c,d){
        return a + b + c + d
      }
      
      function addNoLimit(){
        var args = arguments
          , l = args.length
          , r = 0
        while(--l > -1) {
          r += args[l]
        } 
        return r
      }
      
      equal(
          curried(1)(2)(3)(4)
        , 10
        , "Curry one param"  
      )
      
      equal(
          curried(1, 2)(3, 4)
        , 10
        , "Curry with multiple"  
      )
      
      equal(
          curried(1, 2, 3, 4)
        , 10
        , "Curry with one call"  
      )
      
      
      equal(
          curried(1, 2)(3, 4, 5)
        , 10
        , "Curry with one extra param"  
      )
      
      
      equal(
          curriedLength(1, 2)(3, 4)
        , 10
        , "Curry with limit set manually"  
      )
      
    }
)


test(
    "craft.partial"
  , function(){

      var partialFn = craft.partial(add, 1, 2)
        , partialThisValueFn = craft.partial(addThisValue, 1, 2)
      
      function add(a,b,c,d){
        return a + b + c + d
      }
      
      addThisValue.prototype.foo = 5

      function addThisValue(a,b,c,d){
        this.foo += a + b + c + d
      }
      
      equal(
          partialFn(3, 4)
        , 10
        , "Partial"  
      )
      
      equal(
          new partialThisValueFn(3, 4).foo
        , 15
        , "Partial with thisValue"  
      )
      

    }
)

test(
    "craft.compose"
  , function(){

      var makeTag = craft.compose(wrap, toUpperCase, join)
        , wrapper = craft.compose(wrap)
      
      function wrap(a){
        return "<" + a + ">"
      }
      
      function toUpperCase(a){
        return a.toUpperCase()
      }
      
      function join(){
        return [].slice.call(arguments).join("")
      }
      
      equal(
          makeTag("sp", "a", "n") 
        , "<SPAN>" 
        , "Compose runs"
      )
      
      equal(
          wrapper("SPAN")
        , "<SPAN>"
        , "Compose run with one fn"  
      )
     
    }
)


asyncTest(
    "craft.after"
  , function(){
      expect(3)
      
      var i = 3
        , j = -1
        , after = craft.after(3, succeed)
        , afterZero = craft.after(0, succeedZero)

      
      while(--i > -1) after(i)
      
      function succeed(n){
        
        equal(
            i
          , -1
          , "callback is executed asynchronously"
        )
        
        equal(
            n
          , 0
          , "Arguments are well passed"
        )
        
        start()
      }
      
      while(j < 3) afterZero(++j)
      
      function succeedZero(a){
        equal(
            a
          , 0
          , "0 as times param executes at first call"
        )
      }
      
    }
)


asyncTest(
    "craft.delay"
  , function(){
    
      var arg 
      
      expect(2)
      
      ok(
          typeof craft.delay(function(a){
            arg = a
          }, 200, 1) == "number"
        , "Returns timeout identifier"
      )
      
      setTimeout(function(){
        equal(
            arg
          , 1
          , "Delay passes arguments after a given time"
        )
        start()
      }, 300)
      
    }
)

asyncTest(
    "craft.debounce"
  , function(){

      var arg
        , debounced = craft.debounce(callback, 400) 

      expect(1)

      function callback(arg){
        equal(
            arg
          , "baz"
          , "Debounce works"  
        )
        start()
      }
      
      debounced("foo")
      
      setTimeout(function(){
        debounced("bar")
      }, 100)
      
      setTimeout(function(){
        debounced("baz")
      }, 400)
      

    }
)


test(
    "craft.memoize"
  , function(){
    
      var i = -1
        , memoized = craft.memoize(fn, null, 1)
        , memoizedStr = craft.memoize(str)
        , memoizedCustomHasher = craft.memoize(fnHasher, hasher)
        , hasherVerified = false
    
      function fn(a){
        return ++i * a
      }
      
      function str(a){
        return a
      }
      
      function fnHasher(foo){
        return foo
      }
      
      function hasher(a){
        if(!hasherVerified) {
          hasherVerified = true
          equal(
              a
            , "foo"
            , "Argument is passed to hasher"
          )
        }
        return 1
      }
      
      memoized(1)
      
      equal(
          memoized(1)
        , 0
        , "Memoizes results"
      )
      
      equal(
          memoized(2)
        , 2
        , "Can limit results"
      )
      
      equal(
          memoizedStr("toString")
        , "toString"
        , "Own property check"  
      )
      
      memoizedCustomHasher("foo")
      
      equal(
          memoizedCustomHasher("bar")
        , "foo"
        , "Custom hasher"
      )
    
    }
)

