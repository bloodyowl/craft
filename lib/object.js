var objectMethods = (function(){

  /*
    Object.each
    =======
    Iterates over a given object
    =======
    @arguments {
      object : Object to iterate over
      fn : Function to execute at each iteration
      [context] : context in which fn is executed
    }
    @output 
      object
  */


  function each(object, fn, context){
    if(object === null) return
    for(var i in object) {
      if(_hasOwn.call(object, i)) {
        if(fn.call(context, object[i], i, object) === false) break
      }
    }
    return object
  }

  /*
    Object.collect
    =======
    Gives to a new object the values of fn(item, index, object) 
    =======
    @arguments {
      object : Object to iterate over
      fn : Function to execute at each iteration
      [context] : context in which fn is executed
    }
    @output 
      newObject
  */

  function collect(object, fn, context){
    if(object === null) return null
    var o = {}
    for(var i in object) {
      if(_hasOwn.call(object, i)) {
        o[i] = fn.call(context, object[i], i, object)
      }
    }
    return o
  }

  /*
    Object.keys
    =======
    Returns an array filled by the object's keys
    =======
    @arguments {
      object : Object to iterate over
    }
    @output 
      array : newArray
  */

  function getKeys(object){
    if(object === null) return []
    var result = []
    for(var i in object) {
      if(_hasOwn.call(object, i)) result.push(i)
    }
    return result
  }

  /*
    Object.values
    =======
    Returns an array filled by the object's values
    =======
    @arguments {
      object : Object to iterate over
    }
    @output 
      array : newArray
  */

  function getValues(object){
    if(object === null) return []
    var result = []
    for(var i in object) {
      if(_hasOwn.call(object, i)) result.push(object[i])
    }
    return result
  }

  /*
    Object.pairs
    =======
    Returns an array filled by key/value pairs
    =======
    @arguments {
      object : Object to iterate over
    }
    @output 
      array : newArray
  */

  function getPairs(object){
    if(object === null) return []
    var result = []
    for(var i in object) {
      if(_hasOwn.call(object, i)) result.push([i, object[i]])
    }
    return result
  }

  /*
    Object.isEmpty
    =======
    Returns the emptiness of the object
    =======
    @arguments {
      object : Object to test
    }
    @output 
      boolean : element emptiness
  */

  function isEmpty(object){
    if(typeof object !== "object") return true
    for(var index in object) if(_hasOwn.call(object, index)) return false
    return true
  }

  /*
    Object.clone
    =======
    Makes a shallow clone of the object
    =======
    @arguments {
      object : Object to clone
    }
    @output 
      object : cloned object
  */

  function clone(object){
    if(typeof object !== "object") return {}
    return extend({}, object)
  }

  /*
    Object.toQueryString
    =======
    Converts an object to a queryString
    Ignores anything that isn't an array, a string or a number
    =======
    @arguments {
      object : Object to convert
      [array] : append "[]" to arrays indexes
    }
    @output 
      string : queryString
  */

  function toQueryString(object, arrays){
      if(object === null) return ""
      var queryString = ""
      each(object, function(item, index){
        if(!isArray(item) && !isString(item) && !isNumber(item)) return
        if(arrays && isArray(item)) index += "[]"
        queryString += index + "=" + [].concat(item).join("&" + index + "=") + "&"
      })
      queryString = queryString.slice(0, -1)
      return "encodeURI" in win ? win.encodeURI(queryString) : win.escape(queryString)
    } 
    
  /*
    Object.toQueryString
    =======
    Converts an queryString into an object
    =======
    @arguments {
      str : Object to convert
    }
    @output 
      string : queryString
  */
    
  function fromQueryString(str){
    var obj = {}, arr, i = 0, l, cache, first
    if(str == null) return {}
    first = str.charAt(0)
    if(first == "&" || first == "?") str = str.slice(1)
    arr = str.match(/[^\&\=]+/g)
    l = arr.length
    for(;i < l; i = i+2) {
      cache = arr[i]
      if(/\[\]$/.test(cache) && (cache = cache.replace(/\[\]$/, ""))) {
        obj[cache] = (Object.isArray(obj[cache]) ? obj[cache] : []).concat(window.unescape ? window.unescape(arr[i+1]) : arr[i+1])
      } else {
        obj[cache] = window.unescape ? window.unescape(arr[i+1]) : arr[i+1]
      }
    }
    return obj
  }

  /*
    Object.uniqGenerator
    =======
    returns a unique string generator
    =======
    @arguments {
      [prefix] : prefix
    }
    @output 
      function : generator
  */

  var uniqueId_ = 0
  function uniqueId(prefix){
    return (isString(prefix) ? prefix : "") + uniqueId_++
  }

  /*
    Object.owns
    =======
    Shorthand for Object.prototype.hasOwnProperty
    =======
    @arguments {
      object : object to test
      property : property to check
    }
    @output 
      boolean : ownership of the object
  */

  function owns(object, property){
    return _hasOwn.call(object, property)
  }


  return {
      each : each
    , collect : collect
    , getKeys : getKeys
    , getValues : getValues
    , getPairs : getPairs
    , extend : extend
    , isEmpty : isEmpty
    , clone : clone
    , toQueryString : toQueryString
    , fromQueryString : fromQueryString
    , uniqueId : uniqueId
    , owns : owns
    , typeOf : typeOf
    , isFunction : isFunction
    , isArray : isArray
    , isElement : isElement
    , isNode : isNode
    , isText : isText
    , isFragment : isFragment
    , isDocument : isDocument
    , isRegExp : isRegExp
    , isUndefined : isUndefined
    , isNull : isNull
    , isString : isString
    , isNumber : isNumber
    , isBoolean : isBoolean
    , isDate : isDate
    , isNaN : isNaN
    , isWindow : isWindow
    , isObject : isObject
  }

})()


extend(Object, objectMethods)