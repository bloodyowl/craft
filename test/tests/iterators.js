module("Iterators")

test(
    "craft.getKeys"
  , function(){
      
      function Obj(){
        this.foo = "bar"
        this.bar = "baz"
        this.constructor = function(){}
      }
      
      Obj.prototype.baz = "foo"
    
      var object = new Obj
        , array = [1,1]
      
      array[3] = 1
      
      deepEqual(
          craft.getKeys(object)
        , ["foo", "bar", "constructor"]
        , "Object"
      )
      
      deepEqual(
          craft.getKeys(array)
        , ["0", "1", "3"]
        , "Array"
      )
      
      deepEqual(
          craft.getKeys(null)
        , []
        , "null"
      )
      
      deepEqual(
          craft.getKeys()
        , []
        , "undefined"
      )
      
    }
)



test(
    "craft.getValues"
  , function(){

      function Obj(){
        this.foo = "bar"
        this.bar = "baz"
        this.constructor = function(){}
      }

      Obj.prototype.baz = "foo"

      var object = new Obj
        , array = [1,1]

      array[3] = 1

      deepEqual(
          craft.getValues(object)
        , ["bar", "baz", object.constructor]
        , "Object"
      )

      deepEqual(
          craft.getValues(array)
        , [1, 1, 1]
        , "Array"
      )

      deepEqual(
          craft.getValues(null)
        , []
        , "null"
      )

      deepEqual(
          craft.getValues()
        , []
        , "undefined"
      )

    }
)

test(
    "craft.each"
  , function(){

      equal(
          craft.forEach
        , craft.each
        , "craft.forEach"
      )
      
      function Obj(){
        this.foo = "bar"
        this.bar = "baz"
        this.constructor = function(){}
      }

      Obj.prototype.baz = "foo"

      var object = new Obj
        , array = [1,1]
        , aggregator = []
        , lastIndex

      array[3] = 1
      
      equal(
        craft.each(void 0, function(){}),
        null, 
        "Ignores falsy values"  
      )

      equal(
          craft.each(array, function(){})
        , array
        , "Returns first argument"
      )

      craft.each([1], function(){
        equal(
            this
          , Obj
          , "thisValue is passed with Array"
        )
      }, Obj)
      
      craft.each({foo:"bar"}, function(){
        equal(
            this
          , Obj
          , "thisValue is passed with Object"
        )
      }, Obj)

      craft.each(array, function(item, index){
        aggregator.push(item, index)
      })
      
      deepEqual(
          aggregator
        , [1, 0, 1, 1, undefined, 2, 1, 3]
        , "Iteration on Array is correct"
      )
      
      aggregator.length = 0
      
      craft.each(object, function(item, index){
        aggregator.push(item, index)
      })
      
      deepEqual(
          aggregator
        , ["bar","foo","baz","bar",object.constructor,"constructor"]
        , "Iteration on Object is correct"
      )

      craft.each(array, function(item, index){
        lastIndex = index
        if(index > 1) return false
      })
      
      equal(
          lastIndex
        , 2
        , "Early exit"
      )

    }
)


test(
    "craft.map"
  , function(){

      equal(
          craft.collect
        , craft.map
        , "craft.collect"
      )

      function Obj(){
        this.foo = 1
        this.bar = 2
        this.constructor = 3
      }

      Obj.prototype.baz = 4

      var object = new Obj
        , array = [1,2]
        , aggregator = []
        , lastIndex

      array[3] = 3

        
      equal(
        craft.map(void 0, function(){}),
        null, 
        "Ignores falsy values"  
      )
      
      
      deepEqual(
          craft.map(array, function(a){return a * a})
        , [1, 4, NaN, 9]
        , "Maps on Arrays"
      )

      craft.map([1], function(){
        equal(
            this
          , Obj
          , "thisValue is passed with Array"
        )
      }, Obj)

      craft.map({foo:"bar"}, function(){
        equal(
            this
          , Obj
          , "thisValue is passed with Object"
        )
      }, Obj)

      deepEqual(
          craft.map(object, function(a){return a * a})
        , {"foo":1, "bar":4, constructor:9}
        , "Maps on Object"
      )
    }
)

test(
    "craft.pluck"
  , function(){

      function Obj(){
        this.foo = {foo:1}
        this.bar = {foo:2}
        this.constructor = {foo:3}
      }

      Obj.prototype.baz = {foo:4}

      var object = new Obj
        , array = [{foo:1},{foo:2}]
        , aggregator = []
        , lastIndex

      array[3] = {foo:3}


      equal(
        craft.pluck(void 0, function(){}),
        null, 
        "Ignores falsy values"  
      )


      deepEqual(
          craft.pluck(array, "foo")
        , [1, 2, null, 3]
        , "Maps on Arrays"
      )

      deepEqual(
          craft.pluck(object, "foo")
        , {"foo":1, "bar":2, "constructor":3}
        , "Maps on Object"
      )
    }
)


test(
    "craft.filter"
  , function(){

      equal(
          craft.filter
        , craft.select
        , "craft.select"
      )

      function Obj(){
        this.foo = 1
        this.bar = 2
        this.constructor = 3
      }

      Obj.prototype.baz = 4

      var object = new Obj
        , array = [1,2]
        , aggregator = []
        , lastIndex

      array[3] = 3

      equal(
        craft.filter(void 0, function(){}),
        null, 
        "Ignores falsy values"  
      )
      
      deepEqual(
          craft.filter(array, function(a){return !(a % 2)})
        , [2, undefined]
        , "Filter on Arrays"
      )

      craft.filter([1], function(){
        equal(
            this
          , Obj
          , "thisValue is passed with Array"
        )
      }, Obj)

      craft.filter({foo:"bar"}, function(){
        equal(
            this
          , Obj
          , "thisValue is passed with Object"
        )
      }, Obj)

      deepEqual(
          craft.filter(object, function(a){return !(a % 2)})
        , {"bar":2}
        , "Filter on Object"
      )
    }
)


test(
    "craft.reject"
  , function(){

      function Obj(){
        this.foo = 1
        this.bar = 2
        this.constructor = 3
      }

      Obj.prototype.baz = 4

      var object = new Obj
        , array = [1,2]
        , aggregator = []
        , lastIndex

      array[3] = 3

      equal(
        craft.filter(void 0, function(){}),
        null, 
        "Ignores falsy values"  
      )
      
      deepEqual(
          craft.reject(array, function(a){return !(a % 2)})
        , [1, 3]
        , "Reject on Arrays"
      )

      craft.reject([1], function(){
        equal(
            this
          , Obj
          , "thisValue is passed with Array"
        )
      }, Obj)

      craft.reject({foo:"bar"}, function(){
        equal(
            this
          , Obj
          , "thisValue is passed with Object"
        )
      }, Obj)

      notDeepEqual(
          craft.reject(object, function(a){return !(a % 2)})
        , {"foo":1, "bar":3}
        , "Filter on Object"
      )
    }
)


test(
    "craft.reduce"
  , function(){
    
      equal(
          craft.reduce
        , craft.fold
        , "craft.fold"
      )

      function Obj(){
        this.foo = 1
        this.bar = 2
        this.constructor = 3
      }

      Obj.prototype.baz = 4

      var object = new Obj
        , array = [1,2]
        , aggregator = []
        , lastIndex

      equal(
        craft.reduce(void 0, function(){}),
        null, 
        "Ignores falsy values"  
      )

      array[3] = 3

      deepEqual(
          craft.reduce(array, function(a,b){return a + (typeof b == "number" ? b : 0)}, 0)
        , 6
        , "Reduce on Arrays"
      )
      
      deepEqual(
          craft.reduce(array, function(a,b){return a + (typeof b == "number" ? b : 0)})
        , 6
        , "Reduce on Arrays without initial value"
      )

      craft.reduce([1], function(){
        equal(
            this
          , Obj
          , "thisValue is passed with Array"
        )
      }, 0, Obj)

      craft.reduce({foo:"bar"}, function(){
        equal(
            this
          , Obj
          , "thisValue is passed with Object"
        )
      }, 0, Obj)

      equal(
          craft.reduce(object, function(a,b){return a + b}, 0)
        , 6
        , "Reduce on Object"
      )
      
      equal(
          craft.reduce(object, function(a,b){return a + b})
        , 6
        , "Reduce on Object without inital value"
      )
      
      equal(
          craft.reduce([""], function(a,b){return a + b}, void 0)
        , "undefined"
        , "Authorizes undefined as initialValue"
      )
    }
)

test(
    "craft.reduceRight"
  , function(){

      function Obj(){
        this.foo = "1"
        this.bar = "2"
        this.constructor = "3"
      }

      Obj.prototype.baz = "4"

      var object = new Obj
        , array = ["1","2"]
        , aggregator = []
        , lastIndex

      array[3] = "3"

      equal(
        craft.reduceRight(void 0, function(){}),
        null, 
        "Ignores falsy values"  
      )
      
      
      deepEqual(
          craft.reduceRight(array, function(a,b){return a + (typeof b == "string" ? b : "")}, "4")
        , "4321"
        , "Reduce on Arrays"
      )

      deepEqual(
          craft.reduceRight(array, function(a,b){return a + (typeof b == "string" ? b : "")})
        , "321"
        , "Reduce on Arrays without initial value"
      )

      craft.reduceRight([1], function(){
        equal(
            this
          , Obj
          , "thisValue is passed with Array"
        )
      }, 0, Obj)

      craft.reduceRight({foo:"bar"}, function(){
        equal(
            this
          , Obj
          , "thisValue is passed with Object"
        )
      }, 0, Obj)

      equal(
          craft.reduceRight(object, function(a,b){return a + b}, "4")
        , "4321"
        , "Reduce on Object"
      )

      equal(
          craft.reduceRight(object, function(a,b){return a + b})
        , "321"
        , "Reduce on Object without inital value"
      )
      
      equal(
          craft.reduceRight([""], function(a,b){return a + b}, void 0)
        , "undefined"
        , "Authorizes undefined as initialValue"
      )
    }
)