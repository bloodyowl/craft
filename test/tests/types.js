module("Types")

test(
    "craft.isObject"
  , function(){
    
    var object = {}
      , fn = function(){}
      , object2 = new fn()
    
    ok(!craft.isObject(""))
      ok(craft.isObject(new String("")))
      ok(craft.isObject([]))
      ok(craft.isObject(object))
      ok(craft.isObject(object2))
      ok(craft.isObject(fn))
    ok(!craft.isObject(1))
    ok(!craft.isObject(NaN))
      ok(craft.isObject(new Number(NaN)))
      ok(craft.isObject(new Number(1)))
      ok(craft.isObject(new Date()))
      ok(craft.isObject(new RegExp()))
      ok(craft.isObject(/foo/))
      ok(craft.isObject(arguments))
      ok(craft.isObject(new Boolean(false)))
    ok(!craft.isObject(false))
    ok(!craft.isObject(null))
    ok(!craft.isObject(void 0))
      ok(craft.isObject(document.createElement("div")))
      ok(craft.isObject(document.createTextNode("foo")))

  }
)

test(
    "craft.isString"
  , function(){

    var object = {}
      , fn = function(){}
      , object2 = new fn()

      ok(craft.isString(""))
      ok(craft.isString(new String("")))
    ok(!craft.isString([]))
    ok(!craft.isString(object))
    ok(!craft.isString(object2))
    ok(!craft.isString(fn))
    ok(!craft.isString(1))
    ok(!craft.isString(NaN))
    ok(!craft.isString(new Number(NaN)))
    ok(!craft.isString(new Number(1)))
    ok(!craft.isString(new Date()))
    ok(!craft.isString(new RegExp()))
    ok(!craft.isString(/foo/))
    ok(!craft.isString(arguments))
    ok(!craft.isString(new Boolean(false)))
    ok(!craft.isString(false))
    ok(!craft.isString(null))
    ok(!craft.isString(void 0))
    ok(!craft.isString(document.createElement("div")))
    ok(!craft.isString(document.createTextNode("foo")))

  }
)


test(
    "craft.isArray"
  , function(){

    var object = {}
      , fn = function(){}
      , object2 = new fn()

    ok(!craft.isArray(""))
    ok(!craft.isArray(new String("")))
      ok(craft.isArray([]))
    ok(!craft.isArray(object))
    ok(!craft.isArray(object2))
    ok(!craft.isArray(fn))
    ok(!craft.isArray(1))
    ok(!craft.isArray(NaN))
    ok(!craft.isArray(new Number(NaN)))
    ok(!craft.isArray(new Number(1)))
    ok(!craft.isArray(new Date()))
    ok(!craft.isArray(new RegExp()))
    ok(!craft.isArray(/foo/))
    ok(!craft.isArray(arguments))
    ok(!craft.isArray(new Boolean(false)))
    ok(!craft.isArray(false))
    ok(!craft.isArray(null))
    ok(!craft.isArray(void 0))
    ok(!craft.isArray(document.createElement("div")))
    ok(!craft.isArray(document.createTextNode("foo")))

  }
)


test(
    "craft.isFunction"
  , function(){

    var object = {}
      , fn = function(){}
      , object2 = new fn()

    ok(!craft.isFunction(""))
    ok(!craft.isFunction(new String("")))
    ok(!craft.isFunction([]))
    ok(!craft.isFunction(object))
    ok(!craft.isFunction(object2))
      ok(craft.isFunction(fn))
    ok(!craft.isFunction(1))
    ok(!craft.isFunction(NaN))
    ok(!craft.isFunction(new Number(NaN)))
    ok(!craft.isFunction(new Number(1)))
    ok(!craft.isFunction(new Date()))
    ok(!craft.isFunction(new RegExp()))
    ok(!craft.isFunction(/foo/))
    ok(!craft.isFunction(arguments))
    ok(!craft.isFunction(new Boolean(false)))
    ok(!craft.isFunction(false))
    ok(!craft.isFunction(null))
    ok(!craft.isFunction(void 0))
    ok(!craft.isFunction(document.createElement("div")))
    ok(!craft.isFunction(document.createTextNode("foo")))

  }
)


test(
    "craft.isNumber"
  , function(){

    var object = {}
      , fn = function(){}
      , object2 = new fn()

    ok(!craft.isNumber(""))
    ok(!craft.isNumber(new String("")))
    ok(!craft.isNumber([]))
    ok(!craft.isNumber(object))
    ok(!craft.isNumber(object2))
    ok(!craft.isNumber(fn))
      ok(craft.isNumber(1))
      ok(craft.isNumber(NaN))
      ok(craft.isNumber(new Number(NaN)))
      ok(craft.isNumber(new Number(1)))
    ok(!craft.isNumber(new Date()))
    ok(!craft.isNumber(new RegExp()))
    ok(!craft.isNumber(/foo/))
    ok(!craft.isNumber(arguments))
    ok(!craft.isNumber(new Boolean(false)))
    ok(!craft.isNumber(false))
    ok(!craft.isNumber(null))
    ok(!craft.isNumber(void 0))
    ok(!craft.isNumber(document.createElement("div")))
    ok(!craft.isNumber(document.createTextNode("foo")))

  }
)


test(
    "craft.isBoolean"
  , function(){

    var object = {}
      , fn = function(){}
      , object2 = new fn()

    ok(!craft.isBoolean(""))
    ok(!craft.isBoolean(new String("")))
    ok(!craft.isBoolean([]))
    ok(!craft.isBoolean(object))
    ok(!craft.isBoolean(object2))
    ok(!craft.isBoolean(fn))
    ok(!craft.isBoolean(1))
    ok(!craft.isBoolean(NaN))
    ok(!craft.isBoolean(new Number(NaN)))
    ok(!craft.isBoolean(new Number(1)))
    ok(!craft.isBoolean(new Date()))
    ok(!craft.isBoolean(new RegExp()))
    ok(!craft.isBoolean(/foo/))
    ok(!craft.isBoolean(arguments))
      ok(craft.isBoolean(new Boolean(false)))
      ok(craft.isBoolean(false))
    ok(!craft.isBoolean(null))
    ok(!craft.isBoolean(void 0))
    ok(!craft.isBoolean(document.createElement("div")))
    ok(!craft.isBoolean(document.createTextNode("foo")))

  }
)

test(
    "craft.isDate"
  , function(){

    var object = {}
      , fn = function(){}
      , object2 = new fn()

    ok(!craft.isDate(""))
    ok(!craft.isDate(new String("")))
    ok(!craft.isDate([]))
    ok(!craft.isDate(object))
    ok(!craft.isDate(object2))
    ok(!craft.isDate(fn))
    ok(!craft.isDate(1))
    ok(!craft.isDate(new Number(1)))
    ok(!craft.isDate(NaN))
    ok(!craft.isDate(new Number(NaN)))
      ok(craft.isDate(new Date()))
    ok(!craft.isDate(new RegExp()))
    ok(!craft.isDate(/foo/))
    ok(!craft.isDate(arguments))
    ok(!craft.isDate(new Boolean(false)))
    ok(!craft.isDate(false))
    ok(!craft.isDate(null))
    ok(!craft.isDate(void 0))
    ok(!craft.isDate(document.createElement("div")))
    ok(!craft.isDate(document.createTextNode("foo")))

  }
)


test(
    "craft.isRegExp"
  , function(){

    var object = {}
      , fn = function(){}
      , object2 = new fn()

    ok(!craft.isRegExp(""))
    ok(!craft.isRegExp(new String("")))
    ok(!craft.isRegExp([]))
    ok(!craft.isRegExp(object))
    ok(!craft.isRegExp(object2))
    ok(!craft.isRegExp(fn))
    ok(!craft.isRegExp(1))
    ok(!craft.isRegExp(NaN))
    ok(!craft.isRegExp(new Number(NaN)))
    ok(!craft.isRegExp(new Number(1)))
    ok(!craft.isRegExp(new Date()))
      ok(craft.isRegExp(new RegExp()))
      ok(craft.isRegExp(/foo/))
    ok(!craft.isRegExp(arguments))
    ok(!craft.isRegExp(new Boolean(false)))
    ok(!craft.isRegExp(false))
    ok(!craft.isRegExp(null))
    ok(!craft.isRegExp(void 0))
    ok(!craft.isRegExp(document.createElement("div")))
    ok(!craft.isRegExp(document.createTextNode("foo")))

  }
)


test(
    "craft.isArguments"
  , function(){

    var object = {}
      , fn = function(){}
      , object2 = new fn()
      , fake = ["foo"]

    ok(!craft.isArguments(""))
    ok(!craft.isArguments(new String("")))
    ok(!craft.isArguments([]))
    ok(!craft.isArguments(object))
    ok(!craft.isArguments(object2))
    ok(!craft.isArguments(fn))
    ok(!craft.isArguments(1))
    ok(!craft.isArguments(NaN))
    ok(!craft.isArguments(new Number(NaN)))
    ok(!craft.isArguments(new Number(1)))
    ok(!craft.isArguments(new Date()))
    ok(!craft.isArguments(new RegExp()))
    ok(!craft.isArguments(/foo/))
      ok(craft.isArguments(arguments))
    ok(!craft.isArguments(new Boolean(false)))
    ok(!craft.isArguments(false))
    ok(!craft.isArguments(null))
    ok(!craft.isArguments(void 0))
    ok(!craft.isArguments(document.createElement("div")))
    ok(!craft.isArguments(document.createTextNode("foo")))

    // fake arguments 
    ok(!craft.isArguments({0:"foo", length:1, callee:function(){}}))
    
    fake.callee = function(){}
    
    ok(!craft.isArguments(fake))
  
  }
)

test(
    "craft.isUndefined"
  , function(){

    var object = {}
      , fn = function(){}
      , object2 = new fn()

    ok(!craft.isUndefined(""))
    ok(!craft.isUndefined(new String("")))
    ok(!craft.isUndefined([]))
    ok(!craft.isUndefined(object))
    ok(!craft.isUndefined(object2))
    ok(!craft.isUndefined(fn))
    ok(!craft.isUndefined(1))
    ok(!craft.isUndefined(NaN))
    ok(!craft.isUndefined(new Number(NaN)))
    ok(!craft.isUndefined(new Number(1)))
    ok(!craft.isUndefined(new Date()))
    ok(!craft.isUndefined(new RegExp()))
    ok(!craft.isUndefined(/foo/))
    ok(!craft.isUndefined(arguments))
    ok(!craft.isUndefined(new Boolean(false)))
    ok(!craft.isUndefined(false))
    ok(!craft.isUndefined(null))
      ok(craft.isUndefined(void 0))
    ok(!craft.isUndefined(document.createElement("div")))
    ok(!craft.isUndefined(document.createTextNode("foo")))
  }
)

test(
    "craft.isNull"
  , function(){

    var object = {}
      , fn = function(){}
      , object2 = new fn()

    ok(!craft.isNull(""))
    ok(!craft.isNull(new String("")))
    ok(!craft.isNull([]))
    ok(!craft.isNull(object))
    ok(!craft.isNull(object2))
    ok(!craft.isNull(fn))
    ok(!craft.isNull(1))
    ok(!craft.isNull(NaN))
    ok(!craft.isNull(new Number(NaN)))
    ok(!craft.isNull(new Number(1)))
    ok(!craft.isNull(new Date()))
    ok(!craft.isNull(new RegExp()))
    ok(!craft.isNull(/foo/))
    ok(!craft.isNull(arguments))
    ok(!craft.isNull(new Boolean(false)))
    ok(!craft.isNull(false))
      ok(craft.isNull(null))
    ok(!craft.isNull(void 0))
    ok(!craft.isNull(document.createElement("div")))
    ok(!craft.isNull(document.createTextNode("foo")))

  }
)

test(
    "craft.isNaN"
  , function(){

    var object = {}
      , fn = function(){}
      , object2 = new fn()

    ok(!craft.isNaN(""))
    ok(!craft.isNaN(new String("")))
    ok(!craft.isNaN([]))
    ok(!craft.isNaN(object))
    ok(!craft.isNaN(object2))
    ok(!craft.isNaN(fn))
    ok(!craft.isNaN(1))
      ok(craft.isNaN(NaN))
      ok(craft.isNaN(new Number(NaN)))
    ok(!craft.isNaN(new Number(1)))
    ok(!craft.isNaN(new Date()))
    ok(!craft.isNaN(new RegExp()))
    ok(!craft.isNaN(/foo/))
    ok(!craft.isNaN(arguments))
    ok(!craft.isNaN(new Boolean(false)))
    ok(!craft.isNaN(false))
    ok(!craft.isNaN(null))
    ok(!craft.isNaN(void 0))
    ok(!craft.isNaN(document.createElement("div")))
    ok(!craft.isNaN(document.createTextNode("foo")))
  }
)

test(
    "craft.isElement"
  , function(){

    var object = {}
      , fn = function(){}
      , object2 = new fn()

    ok(!craft.isElement(""))
    ok(!craft.isElement(new String("")))
    ok(!craft.isElement([]))
    ok(!craft.isElement(object))
    ok(!craft.isElement(object2))
    ok(!craft.isElement(fn))
    ok(!craft.isElement(1))
    ok(!craft.isElement(NaN))
    ok(!craft.isElement(new Number(NaN)))
    ok(!craft.isElement(new Number(1)))
    ok(!craft.isElement(new Date()))
    ok(!craft.isElement(new RegExp()))
    ok(!craft.isElement(/foo/))
    ok(!craft.isElement(arguments))
    ok(!craft.isElement(new Boolean(false)))
    ok(!craft.isElement(false))
    ok(!craft.isElement(null))
    ok(!craft.isElement(void 0))
      ok(craft.isElement(document.createElement("div")))
    ok(!craft.isElement(document.createTextNode("foo")))

  }
)