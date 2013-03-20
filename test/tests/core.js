/*jshint forin:true, eqnull:true, noarg:true, noempty:true, boss:true, loopfunc:true, unused:true, browser:true, maxerr:50, asi:true, laxcomma:true */


;(function(){
  
  var _hasOwn = {}.hasOwnProperty
    , types = {
          "null" : null
        , regexp : /\w+/g
        , array : []
        , object : {}
        , date : new Date()
        , element : document.createElement("div")
        , document : document
        , fragment : document.createDocumentFragment()
        , text : document.createTextNode("")
        , string : ""
        , "function" : function(){}
        , number : 0
        , "NaN" : NaN
        , "boolean" : true
        , "undefined" : undefined
      }
  
  test("Object.typeOf", function() {
    
    var expected = {
            "null" : "null"
          , regexp : "regexp"
          , array : "array"
          , date : "date"
          , object : "object"
          , element : "element"
          , document : "document"
          , fragment : "fragment"
          , text : "text"
          , string : "string"
          , "NaN" : "nan"
          , window : "window"
          , "boolean" : "boolean"
          , "function" : "function"
          , number : "number"
          , "undefined" : "undefined"
        }
      
    for(var i in types) if(_hasOwn.call(types, i)) equal(Object.typeOf(types[i]), expected[i], i)

  })
  
  test("Object.isFunction", function(){
    for(var i in types) {
      if(_hasOwn.call(types, i)) equal(Object.isFunction(types[i]), i == "function" ? true : false, i)
    }
  })
  
  test("Object.isArray", function(){
    for(var i in types) {
      if(_hasOwn.call(types, i)) equal(Object.isArray(types[i]), i == "array" ? true : false, i)
    }
  })
  
  test("Object.isElement", function(){
    for(var i in types) {
      if(_hasOwn.call(types, i)) equal(Object.isElement(types[i]), i == "element" ? true : false, i)
    }
  })
  
  test("Object.isNode", function(){
    for(var i in types) {
      if(_hasOwn.call(types, i)) equal(Object.isNode(types[i]), (i == "text") || (i == "element") || (i == "document") || (i == "fragment")  ? true : false, i)
    }
  })
  
  test("Object.isText", function(){
    for(var i in types) {
      if(_hasOwn.call(types, i)) equal(Object.isText(types[i]), i == "text" ? true : false, i)
    }
  })
  
  test("Object.isFragment", function(){
    for(var i in types) {
      if(_hasOwn.call(types, i)) equal(Object.isFragment(types[i]), i == "fragment" ? true : false, i)
    }
  })
  
  test("Object.isDocument", function(){
    for(var i in types) {
      if(_hasOwn.call(types, i)) equal(Object.isDocument(types[i]), i == "document" ? true : false, i)
    }
  })
  
  test("Object.isRegExp", function(){
    for(var i in types) {
      if(_hasOwn.call(types, i)) equal(Object.isRegExp(types[i]), i == "regexp" ? true : false, i)
    }
  })
  
  test("Object.isUndefined", function(){
      for(var i in types) {
        if(_hasOwn.call(types, i)) equal(Object.isUndefined(types[i]), i == "undefined" ? true : false, i)
      }
    })


  test("Object.isNull", function(){
      for(var i in types) {
        if(_hasOwn.call(types, i)) equal(Object.isNull(types[i]), i == "null" ? true : false, i)
      }
    })
  
  test("Object.isString", function(){
      for(var i in types) {
        if(_hasOwn.call(types, i)) equal(Object.isString(types[i]), i == "string" ? true : false, i)
      }
    })
  
  test("Object.isNumber", function(){
      for(var i in types) {
        if(_hasOwn.call(types, i)) equal(Object.isNumber(types[i]), (i == "number") || (i == "NaN")  ? true : false, i)
      }
    })
    
  test("Object.isBoolean", function(){
    for(var i in types) {
      if(_hasOwn.call(types, i)) equal(Object.isBoolean(types[i]), i == "boolean" ? true : false, i)
    }
  })
  
  test("Object.isDate", function(){
    for(var i in types) {
      if(_hasOwn.call(types, i)) equal(Object.isDate(types[i]), i == "date" ? true : false, i)
    }
  })
  
  test("Object.isNaN", function(){
    for(var i in types) {
      if(_hasOwn.call(types, i)) equal(Object.isNaN(types[i]), i == "NaN" ? true : false, i)
    }
  })

  test("Object.isWindow", function(){
    for(var i in types) {
      if(_hasOwn.call(types, i)) equal(Object.isWindow(types[i]), i == "window" ? true : false, i)
    }
  })
  
  
  test("Object.extend", function(){
    
    var expected = {
          foo : "bar"
        , bar : "baz"
        , baz : "foo"
      }
      , buggy = Object.extend({foo : "bar"}, {toString : function(){return this.foo}, valueOf : function(){return this.toString()}})
      
    deepEqual(Object.extend(
      {foo : "bar"}, 
      {bar : "baz", baz : "foo"})
    , expected
    , "Extend with an object")
    
    deepEqual(buggy.toString()
    , "bar"
    , "Extend with buggy properties in IE")
    
  })
  
  test("Function.prototype.implement", function(){
    
    var fn = function(){}
      , proto = {
            foo : function(){
              this.a = "foo"
            }
        }
    
    fn.implement(proto)
    
    deepEqual(fn.prototype.foo, proto.foo, "Extends prototype with an object")
    
    fn = function(){}
    
    function method(){ this.a = "foo" }
    
    
    fn = function(){}
        
    fn.implement("foo", method)

    deepEqual(fn.prototype.foo, method, "Extends prototype with a name-method set")
    
  })
  
})()