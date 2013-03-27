/*jshint forin:true, eqnull:true, noarg:true, noempty:true, boss:true, loopfunc:true, unused:true, browser:true, asi:true, laxcomma:true */


;(function(){
  
  test("Object.each", function(){
    
    function ctor(){
      this.foo = "bar"
      this.bar = "baz"
      this.baz = "foo"
      return this
    }
    
    ctor.prototype.test = 1
    
    var obj = new ctor()
      , ctx = {verified : true}
      , expect = [true, true, true]
      , arrTest = []
      , ctxTest
      , objTest
      , ownTest = []
      , nullTest = 0
    
    Object.each(obj, function(item, index, o){
      arrTest.push(obj[index] === item)
      ownTest.push(Object.prototype.hasOwnProperty.call(o, index))
      ctxTest = "verified" in ctx && ctx.verified
      objTest = o
    }, ctx)
    
    Object.each(null, function(){
      nullTest++
    })
        
    deepEqual(arrTest, expect, "Correct items and indexes")
    deepEqual(ownTest, expect, "Only owned values are used")
    equal(ctxTest, ctx.verified, "Correct access to context")
    equal(objTest, obj, "Correct access to object")
    equal(nullTest, 0, "Null as object is ignored")
  })
  
  
  
  
  
  test("Object.collect", function(){
    
    function ctor(){
      this.foo = 1
      this.bar = 2
      this.baz = 3
      return this
    }
    
    ctor.prototype.test = 1
    
    var obj = new ctor()
      , ctx = {verified : true}
      , expect = [true, true, true]
      , arrTest = []
      , ctxTest
      , objTest
      , ownTest = []
      , nullTest = 0
      , collected
      , nullCollected
      , expectedCollect = {
            foo : 1
          , bar : 4
          , baz : 9
        }
    
    collected = Object.collect(obj, function(item, index, o){
      arrTest.push(obj[index] === item)
      ownTest.push(Object.prototype.hasOwnProperty.call(o, index))
      ctxTest = "verified" in ctx && ctx.verified
      objTest = o
      return item * item
    }, ctx)
    
    nullCollected = Object.collect(null, function(){
      nullTest++
    })
        
    deepEqual(collected, expectedCollect, "Collected item are right")
    deepEqual(arrTest, expect, "Correct items and indexes")
    deepEqual(ownTest, expect, "Only owned values are used")
    equal(ctxTest, ctx.verified, "Correct access to context")
    equal(objTest, obj, "Correct access to object")
    equal(nullTest, 0, "Null as object is ignored")
    equal(nullCollected, null, "Null is returned if null is set as object")
  })
  
  test("Object.getKeys", function(){
    
    function ctor(){
      this.foo = 1
      this.bar = 2
      this.baz = 3
      return this
    }
    
    ctor.prototype.test = 1
    
    var obj = new ctor()
      , expect = ["foo", "bar", "baz"]
      , keys
      , nullKeys
      , nullExpect = []
    
    keys = Object.getKeys(obj)
    nullKeys = Object.getKeys(null)
            
    deepEqual(keys, expect, "Keys are right")
    equal(keys.length, 3, "Only owned values")
    deepEqual(nullKeys, nullExpect, "Empty array if null is set as object")
    
  })
  
  test("Object.getValues", function(){
    
    function ctor(){
      this.foo = 1
      this.bar = 2
      this.baz = 3
      return this
    }
    
    ctor.prototype.test = 1
    
    var obj = new ctor()
      , expect = [1, 2, 3]
      , values
      , nullValues
      , nullExpect = []
    
    values = Object.getValues(obj)
    nullValues = Object.getValues(null)
            
    deepEqual(values, expect, "Values are right")
    equal(values.length, 3, "Only owned values")
    deepEqual(nullValues, nullExpect, "Empty array if null is set as object")
    
  })
  
  test("Object.getPairs", function(){
    
    function ctor(){
      this.foo = 1
      this.bar = 2
      this.baz = 3
      return this
    }
    
    ctor.prototype.test = 1
    
    var obj = new ctor()
      , expect = [["foo", 1], ["bar", 2], ["baz", 3]]
      , pairs
      , nullPairs
      , nullExpect = []
    
    pairs = Object.getPairs(obj)
    nullPairs = Object.getPairs(null)
            
    deepEqual(pairs, expect, "Values are right")
    equal(pairs.length, 3, "Only owned values")
    deepEqual(nullPairs, nullExpect, "Empty array if null is set as object")
    
  })
  
  test("Object.isEmpty", function(){
    
    function ctor(){
      return this
    }
    
    ctor.prototype.test = 1
    
    var obj = new ctor()
            
    equal(Object.isEmpty({}), true, "Empty object")
    equal(Object.isEmpty(obj), true, "Only owned values")
    equal(Object.isEmpty({foo:"bar"}), false, "Empty array if null is set as object")
    equal(Object.isEmpty(null), true, "Null returns true")
    equal(Object.isEmpty(), true, "Undefined returns true")
  })
  
  test("Object.clone", function(){
    
    function ctor(){
      this.foo = 1
      this.bar = 2
      this.baz = 3
      return this
    }
    
    ctor.prototype.test = 1
    
    var obj = new ctor()
      , clone = Object.clone(obj)
    
    ok(clone !== obj , "Not the same object")
    ok(typeof clone.test == "undefined", "Doesn't copy prototype")
    ok(clone.foo === obj.foo && clone.bar === obj.bar && clone.baz === clone.baz, "Same properties")
    deepEqual(Object.clone(null), null, "Null as object return null")
    
  })
  
  
  test("Object.toQueryString", function(){
    
    function ctor(){
      this.foo = 1
      this.bar = [2, 4, 6]
      this.baz = 3
      return this
    }
    
    ctor.prototype.test = 1
    
    var obj = new ctor()
      , queryString = Object.toQueryString(obj)
      , queryStringArrays = unescape(Object.toQueryString(obj, true))
    
    equal(queryString, "foo=1&bar=2&bar=4&bar=6&baz=3" , "Returns the right string and ignores prototype")
    equal(queryStringArrays, "foo=1&bar[]=2&bar[]=4&bar[]=6&baz=3" , "Optional Array params works")
    equal(Object.toQueryString(null), "", "Null object returns empty string")
    
  })
  
  
  test("Object.fromQueryString", function(){
  
    deepEqual(Object.fromQueryString("foo=1&bar=2&bar=4&bar=6&baz=3"),  {bar: "6", baz: "3", foo: "1"}, "Returns the right object")
    deepEqual(Object.fromQueryString("?foo=1&bar=2&bar=4&bar=6&baz=3"),  {bar: "6", baz: "3", foo: "1"}, "Avoids starting `?`")
    deepEqual(Object.fromQueryString("&foo=1&bar=2&bar=4&bar=6&baz=3"),  {bar: "6", baz: "3", foo: "1"}, "Avoids starting `&`")
    deepEqual(Object.fromQueryString("foo=1&bar[]=2&bar[]=4&bar[]=6&baz=3"), {bar: ["2", "4", "6"], baz: "3", foo: "1"}, "Optional Array params works")
    deepEqual(Object.fromQueryString("foo=1&bar=2&bar[]=4&bar[]=6&baz=3"), {bar: ["4", "6"], baz: "3", foo: "1"}, "Array params after non-array erases the first one")
    deepEqual(Object.fromQueryString("foo=1&bar[]=2&bar[]=4&bar=6&baz=3"), {bar: "6", baz: "3", foo: "1"}, "Last prop erases previous array")
    deepEqual(Object.fromQueryString(), {}, "undefined param returns empty object")
    deepEqual(Object.fromQueryString(null), {}, "null param returns empty object")
  })
  
  
  test("Object.uniqueId", function(){
    
    var uniq1 = Object.uniqueId.partial("foo")
      , uniq2 = Object.uniqueId
      , i = 0, u1 = [], u2 = []
    
    for(;i < 3; i++) {
      u1.push(uniq1())
      u2.push(uniq2())
    }
    
    ok(u1[0] != u1[1] && u1[1] != u1[2] && u1[0] != u1[2] , "Prefix works")
    ok(u2[0] != u2[1] && u2[1] != u2[2] && u2[0] != u2[2] , "Works without prefix")
    
  })
  
  test("Object.owns", function(){
    
    function ctor(){
      this.foo = 1
      this.bar = 2
      this.baz = 3
      return this
    }
    
    ctor.prototype.test = 1
    
    var obj = new ctor()
        
    equal(Object.owns(obj, "foo"), true , "Ownership")
    equal(Object.owns(obj, "test"), false, "Non Ownership")
    equal(Object.owns(obj, "azerty"), false, "Non existent")
    
  })
  
})()