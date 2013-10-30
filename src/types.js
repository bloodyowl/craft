;(function(craft){
  
  var STRING_CLASS = "[object String]"
    , ARRAY_CLASS = "[object Array]"
    , NUMBER_CLASS = "[object Number]"
    , BOOLEAN_CLASS = "[object Boolean]"
    , DATE_CLASS = "[object Date]"
    , REGEXP_CLASS = "[object RegExp]"
    , ARGUMENTS_CLASS = "[object Arguments]"
    , FUNCTION_CLASS = "[object Function]"
    , _toString = {}.toString
    , _hasOwnProperty = {}.hasOwnProperty
    , _propertyIsEnumerable = {}.propertyIsEnumerable
    , supportsArgumentsClass = _toString.call(arguments) == ARGUMENTS_CLASS
  
  craft.isObject = isObject
  function isObject(value){
    var type = typeof value
    return value && 
        type == "object" || 
        type == "function"
  }
  
  craft.isString = isString
  function isString(value){
    return typeof value == "string" ||
        _toString.call(value) == STRING_CLASS
  }
  
  craft.isArray = isArray
  function isArray(value){
    return _toString.call(value) == ARRAY_CLASS
  }
  
  craft.isFunction = typeof /f/ == "function" ? 
      isFunctionCompat : 
      isFunction
  
  function isFunction(value){
    return typeof value == "function"
  }
  
  function isFunctionCompat(value){
    return typeof value == "function" &&
        _toString.call(value) == FUNCTION_CLASS
  }
  
  craft.isNumber = isNumber
  function isNumber(value){
    return typeof value == "number" ||
        _toString.call(value) == NUMBER_CLASS
  }
  
  craft.isBoolean = isBoolean
  function isBoolean(value){
    return typeof value == "boolean" ||
        _toString.call(value) == BOOLEAN_CLASS
  }
  
  craft.isDate = isDate
  function isDate(value){
    return _toString.call(value) == DATE_CLASS
  }
  
  craft.isRegExp = isRegExp
  function isRegExp(value){
    return _toString.call(value) == REGEXP_CLASS
  }
  
  craft.isArguments = supportsArgumentsClass ? isArguments : isArgumentsCompat
  function isArguments(value){
     return _toString.call(value) == ARGUMENTS_CLASS
  }
  
  function isArgumentsCompat(value){
    return value &&
        typeof value == "object" &&
        typeof value.length == "number" &&
        _hasOwnProperty.call(value, "callee") && 
        !_propertyIsEnumerable.call(value, "callee")
  }
  
  craft.isUndefined = isUndefined
  function isUndefined(value){
    return value === void 0
  }
  
  craft.isNull = isNull
  function isNull(value){
    return value === null
  }
  
  craft.isNaN = isNaN
  function isNaN(value){
    return isNumber(value) && +value != value
  }
  
  craft.isElement = isElement
  function isElement(value){
    return !!value && value.nodeType == 1
  }

})(craft)