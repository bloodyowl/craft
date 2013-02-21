/*!
  Craft.js
  2.0.0 
*/



;(function(window, document, undefined){


var Browser = (function(){
  var ua = navigator.userAgent
    , el = document.createElement("i")
    , opera = !!window.opera
    , ie = !!window.attachEvent && !opera
  
  function testUA(reg){ return reg.test(ua) }

  return {
      IE : ie
    , IE7 : ie && !!~ua.indexOf("IE 7")
    , IE8 : ie && !!~ua.indexOf("IE 8")
    , IE9 : ie && !!~ua.indexOf("IE 9")
    , Gecko : !!~ua.indexOf("Gecko") && !~ua.indexOf("KHTML")
    , WebKit : !!~ua.indexOf("AppleWebKit/")
    , Opera : opera
    , toString : function(){
      var self = this, arr = [], i
      for(i in self) if(Object.owns(self, i) && i != "toString" && self[i]) arr.push(i.toLowerCase())
      return arr.join(" ")
    }
  }

})()


var Class = (function(){
  
  /*
    Class.from
    =======
    Returns a new object instanceof `inherit` 
    =======
    @arguments {
      inherit : inherit object
    }
    @output 
      object
  */
  
  function from(inherit){
    function fn(){}
    fn.prototype = inherit
    return new fn()
  }
  
  /*
    Class.create
    =======
    Returns a new class
    =======
    @arguments {
      [inherit] : inherit object
      object : object to make a class from
    }
    @output 
      object
  */
  
  function create(inherits, object){
      var ctor
      if(!object) {
        object = inherits
        inherits = null
      } else {
        inherits = inherits.prototype
      }
      if(typeof object != "object") return null
      
      ctor = object.initialize
      if(!ctor && inherits && inherits.initialize) ctor = object.initialize = function(){ return inherits.initialize.apply(this, arguments) }
      if(typeof ctor != "function") throw Object.error("type", "Undefined can't be a constructor")
      
      if(inherits) ctor.prototype = Class.from(inherits)
            
      ctor.implement(object)
      return ctor
  }
  
  /*
    Class.attachAll
    =======
    Attaches all the object's functions to a certain context
    =======
    @arguments {
      object : object where to find methods
      context : context
    }
    @output 
      class
  */
  
  function attachAll(object, methods){
    var index, item
    for(index in object) {
      item = object[index]
      if(isFunction(item) && (!methods || (isArray(methods) && methods.contains(index)))) object[index] = item.attach(object)
    }
    return object
  }
  
  return {
      from : from
    , create : create 
    , attachAll : attachAll
  }
  
})()


  var _toString = {}.toString
    , _hasOwn = {}.hasOwnProperty
  
  /*
    Object.typeOf
    =======
    Checks the type of an object
    =======
    @arguments {
      object : Object to test the type of
    }
    @output 
      string : Type of the object
  */
  
  function typeOf(object){
      var type = typeof object
         , objectString = _toString.call(object)
         , nodeType
      if(object === null) return "null"
      if(objectString == "[object RegExp]") return "regexp"
      if(objectString == "[object Array]") return "array"
      if(objectString == "[object Date]") return "date"
      if(type == "object" && "nodeType" in object) {
        nodeType = object.nodeType
        if(nodeType == 1) return "element"
        if(nodeType == 9) return "document"
        if(nodeType == 11) return "fragment"
        if(nodeType == 3) return "text"
      }
      if(isNaN(object)) return "nan"
      if(isWindow(object)) return "window"
      return type
   }
   
   /*
     Object.isFunction
     =======
     Checks if an object is a function
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is a function
   */
  
   var isFunction = typeof (/o/) == "function" ? 
     function (object){
       return object instanceof Function || _toString.call(object) == "[object Function]"
     } : 
     function (object){
       return typeof object == "function"
     }
   
   /*
     Object.isArray
     =======
     Checks if an object is an array
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is an array
   */
  
   function isArray(object){
     return _toString.call(object) == "[object Array]"
   }
   
   /*
     Object.isElement
     =======
     Checks if an object is an element
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is an element
   */
  
   function isElement(object){
     return typeOf(object) == "element"
   }
   
   /*
     Object.isNode
     =======
     Checks if an object is a node
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is an node
   */
   
   function isNode(object){
     return !!object && typeof object == "object" && "nodeType" in object
   }
   
   /*
     Object.isText
     =======
     Checks if an object is a textNode
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is a textNode
   */
   
   function isText(object){
     return typeOf(object) == "text"
   }
   
   /*
     Object.isFragment
     =======
     Checks if an object is a fragment
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is a document fragment
   */
  
   function isFragment(object){
     return typeOf(object) == "fragment"
   }
   
   /*
     Object.isDocument
     =======
     Checks if an object is a document
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is a document
   */
  
   function isDocument(object){
     return typeOf(object) == "document"
   }
   
   /*
     Object.isRegExp
     =======
     Checks if an object is a regular expression
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is a regular expression
   */
  
   function isRegExp(object){
     return _toString.call(object) == "[object RegExp]"
   }
   
   /*
     Object.isUndefined
     =======
     Checks if an object is undefined
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is undefined
   */
  
   function isUndefined(object){
     return typeof object === "undefined"
   }
   
   /*
     Object.isNull
     =======
     Checks if an object is null
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is null
   */
  
   function isNull(object){
     return object === null
   }
   
   /*
     Object.isString
     =======
     Checks if an object is a string
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is a string
   */
  
   function isString(object){
     return typeof object == "string"
   }
   
   /*
     Object.isNumber
     =======
     Checks if an object is a number
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is a number
   */
  
   function isNumber(object){
     return typeof object == "number"
   }
   
   /*
     Object.isDate
     =======
     Checks if an object is a date
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is a date
   */
  
   function isDate(date){
     return typeOf(date) == "date"
   }
   
   
   /*
     Object.isBoolean
     =======
     Checks if an object is a date
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is a date
   */
   
   function isBoolean(bool){
     return typeof bool == "boolean"
   }
   
   /*
     Object.isNaN
     =======
     Checks if an object is NaN
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is NaN
   */
  
   function isNaN(nan){
     return typeof nan == "number" && nan != +nan
   }
   
   /*
     Object.isWindow
     =======
     Checks if an object is window
     =======
     @arguments {
       object : Object to test the type of
     }
     @output 
       boolean : The object is window
   */
  
   function isWindow(win){
     return win ? win.window == win : false
   }
   
   /*
      Object.isObject
      =======
      Checks if an object is an object
      =======
      @arguments {
        object : Object to test the type of
      }
      @output 
        boolean : The object is an object
   */
   
   function isObject(obj){
     return  obj === Object(obj)
   }
   
   /*
     Object.extend
     =======
     Extends an object with another one
     =======
     @arguments {
       object : Object to extend
       source : Appendix to the object (can be a function returning an object)
     }
     @output 
       object
   */
   var wrongEnumeration = (function(i){ 
     for(i in {toString:"x"}) if(i == "toString") return false
     return true
   })()
    , objectToString = {}.toString
    , objectValueOf = {}.valueOf
  
   function extend(object, source, inherits){
     var i
     if(!source || !object) return null
     if(inherits) {
       for(i in source) object[i] = source[i]
     } else {
       for(i in source) if(_hasOwn.call(source, i)) object[i] = source[i]
     }
     if(wrongEnumeration) {
       if(source.toString != objectToString) object.toString = source.toString
       if(source.valueOf != objectValueOf) object.valueOf = source.valueOf
     }
     return object
   }
   
   /*
     Object.error
     =======
     Throws a non-blocking (asynchronous) error
     =======
     @arguments {
       [type] : Error type ("eval", "range", "reference", "syntax", "type" or "uri")
       error : Error message
     }
     @output 
       none
   */
  
   function error(type, error_){
     var err
     if(error_) err = type.capitalize() + "Error"
     else {
       error_ = type
       err = "Error"
     }
     if(!(err in window)) err = "Error"
     if(type instanceof Error) return type
     return new window[err](error_)
   }
   
   /*
     Function.prototype.implement
     =======
     Extends the function's prototype
     =======
     @arguments {
       name : method name
       method : function
     }
     {
       name : object (or function returning an object)
     }
     @output 
       function
   */
  
   Function.prototype.implement = function(name, method){
     var self = this
     if(typeof name == "string" && typeof method == "function") {
       self.prototype[name] = method 
       return self
     }
     Object.extend(self.prototype, name)
     return self
   }
   
  



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
        fn.call(context, object[i], i, object)
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

  function keys(object){
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

  function values(object){
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

  function pairs(object){
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
      return "encodeURI" in window ? encodeURI(queryString) : escape(queryString)
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
    , keys : keys
    , values : values
    , pairs : pairs
    , extend : extend
    , isEmpty : isEmpty
    , clone : clone
    , toQueryString : toQueryString
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
    , error : error
  }

})()


extend(Object, objectMethods)


var Arrays = (function(){
  
  var _arr = []
    , _sort = _arr.sort
    , _slice = _arr.slice
  
  /*
    Array.prototype.each
    =======
    Iterates over the array and returns it
    =======
    @arguments {
      fn : iterator
      [context] : context of fn
    }
    @output 
      array
  */

  function each(fn, context){
    var self = this
      , index = 0
      , length = self.length

    for(;index < length; index++) if(fn.call(context, self[index], index, self) === false) break

    return self
  }
  
  /*
    Array.prototype.collect
    =======
    Iterates over the array and returns a newArray with the values of fn(item, index, array)
    =======
    @arguments {
      fn : iterator
      [context] : context of fn
    }
    @output 
      array : newArray
  */

  function collect(fn, context){
    var self = this
      , mapped = Array(self.length)
      , index = 0
      , length = self.length

    for(;index < length; index++) mapped[index] = fn.call(context, self[index], index, self)

    return mapped
  }
  
  /*
    Array.prototype.select
    =======
    Iterates over the array and returns a newArray with the items for which fn(item, index, array) returned true
    =======
    @arguments {
      fn : iterator
      [context] : context of fn
    }
    @output 
      array : newArray
  */

  function select (fn, context){
    var self = this
      , filtered = []
      , index = 0
      , length = self.length

    for(;index < length; index++) if(fn.call(context, self[index], index, self) === true) filtered.push(self[index])

    return filtered
  }
  
  /*
    Array.prototype.reject
    =======
    Iterates over the array and returns a newArray with the items for which fn(item, index, array) returned false
    =======
    @arguments {
      fn : iterator
      [context] : context of fn
    }
    @output 
      array : newArray
  */

  function reject (fn, context){
    var self = this
      , filtered = []
      , index = 0
      , length = self.length

    for(;index < length; index++) if(fn.call(context, self[index], index, self) !== true) filtered.push(self[index])

    return filtered
  }
  
  /*
    Array.prototype.fold
    =======
    Iterates over the array and returns the last value returned by the fn(item, next, index, array).
    =======
    @arguments {
      fn : iterator
      [context] : context of fn
      [initial] : original value (if not set, initial is the array[0]
    }
    @output 
      result
  */


  function fold(fn, context, initial){
    var self = this
      , hasInit = arguments.length > 2
      , reduced = hasInit ? initial : self[0]
      , index = hasInit ? 0 : 1
      , length = self.length

    for(;index < length; index++) reduced = fn.call(context, reduced, self[index], index, self)
    return reduced
  }
  
  /*
    Array.prototype.foldRight
    =======
    Iterates (backwards) over the array and returns the last value returned by the fn(item, next, index, array).
    =======
    @arguments {
      fn : iterator
      [context] : context of fn
      [initial] : original value (if not set, initial is the array[array.length - 1]
    }
    @output 
      result
  */
  
  
  function foldRight(fn, context, initial){
    var self = this
      , hasInit = arguments.length > 2
      , length = self.length
      , reduced = hasInit ? initial : self[length - 1]
      , index = hasInit ? length : length - 1
  
    for(;index--;) reduced = fn.call(context, reduced, self[index], index, self)
    return reduced
  }
  
  /*
    Array.prototype.find
    =======
    Return the index of the searched value (if not found, returns -1).
    =======
    @arguments {
      search : value to search
      [start] : start (if not set, is 0)
    }
    @output 
      number : index
  */

  function find(search, start){
    var self = this
      , index = typeof start == "number" && !isNaN(start) ? start : 0
      , length = self.length
    if(index < 0) index = 0
    if(index > self.length) return -1
    for(;index < length; index++) if(self[index] === search) return index
    return -1
  }
  
  /*
    Array.prototype.findLast
    =======
    Return the last index of the searched value (if not found, returns -1).
    =======
    @arguments {
      search : value to search
      [start] : start (if not set, is array.length)
    }
    @output 
      number : index
  */

  function findLast(search, start){
    var self = this
      , index = typeof start == "number" && !isNaN(start) ? start : self.length
    if(index > self.length) index = self.length
    if(index < 0) return -1
    for(;index--;) if(self[index] === search) return index
    return -1
  }
  
  /*
    Array.prototype.contains
    =======
    Returns the presence of the searched item in the array
    =======
    @arguments {
      value : value to search
    }
    @output 
      boolean : presence
  */


  function contains(value){
    return !!~find.call(this, value)
  }
  
  /*
    Array.prototype.pluck
    =======
    Returns an array filled with the given [property] of each item
    =======
    @arguments {
      property : property to get
    }
    @output 
      newArray
  */

  function pluck(property){
    var self = this
      , index = 0
      , length = self.length
      , plucked = Array(length)
    if(property == null) return self
    for(;index < length; index++) plucked[index] = self[index] != null ? self[index][property] : null

    return plucked
  }
  
  /*
    Array.prototype.isEmpty
    =======
    Returns the emptyness of the array
    =======
    @arguments {}
    @output 
      boolean : emptiness
  */

  function isEmpty(){
    var self = this
      , index = 0
      , length = self.length
    for(;index < length; index++) return false
    return true
  }
  
  /*
    Array.prototype.clone
    =======
    Returns a shallow copy of the array
    =======
    @arguments {}
    @output 
      array : cloned array
  */

  function clone(){
    return this.concat()
  }
  
  /*
    Array.prototype.clean
    =======
    Returns a new Array removing `false`, `null`, `undefined` & `[]` from the array.
    =======
    @arguments {}
    @output 
      cleaned array
  */

  function clean(){
    var self = this
      , cleaned = []
      , index = 0
      , length = self.length
      , item
    for(;index < length; index++) {
      item = self[index]
      if(typeof item != "number" && !item) continue
      if(isArray(item) && item.length === 0) continue
      cleaned.push(item)
    }
    return cleaned
  }
  
  /*
    Array.prototype.intersect
    =======
    Returns a new Array that returns items that are both present in the array and in values.
    =======
    @arguments {
      values : array to compare with
    }
    @output 
      intersection array
  */

  function intersect(values){
    var self = this
      , result = []
      , index = 0
      , length = self.length
      , item
    for(;index < length; index++) {
      item = self[index]
      if(values.contains(item)) result.push(item)
    }
    return result
  }
  
  
  /*
    Array.prototype.difference
    =======
    Returns a new Array that returns items that are in the array, but not in values.
    =======
    @arguments {
      values : array to compare with
    }
    @output 
      difference array
  */

  function difference(values){
    var self = this
      , result = []
      , index = 0
      , length = self.length
      , item
    for(;index < length; index++) {
      item = self[index]
      if(!values.contains(item)) result.push(item)
    }
    return result
  }
  
  /*
    Array.prototype.flatten
    =======
    Flattens the array
    =======
    @arguments {
      [deep] : boolean : flatten the array inside
    }
    @output 
      flattened array
  */

  function flatten(deep){
    return fold.call(this, function(a,b){ 
      if(deep && isArray(a)) a = flatten.call(a)
      if(deep && isArray(b)
      ) b = flatten.call(b)
      return a.concat(b) 
    }, null, [])
  }
  
  /*
    Array.prototype.sortBy
    =======
    Sorts the array by a property (and an optional custom algoritm)
    =======
    @arguments {
      property : string or number : property to sort
      [algoritm] : custom function 
    }
    @output 
      sorted array
  */

  function sortBy(property, algoritm){
    var self = this
    if(property == null) return self
    algoritm = algoritm || function(a,b){ return a < b ? -1 : 1 }
    return _sort.call(self, function(a, b){
      return algoritm(a[property], b[property])
    })
  }
  
  /*
    Array.prototype.groupBy
    =======
    Groups the array items by groups of `number` and optionnaly fills the missing last items by `fill`
    =======
    @arguments {
      number : groups size
      [fill] : replacement for last missing items
    }
    @output 
      grouped array
  */

  function groupBy(number, fill){
    var self = this
      , i = 0
      , l = Math.ceil(self.length / number)
      , cache = 0
      , result = []
      , last
    for(;i < l; i++) result.push(_slice.call(self, cache, cache += number))
    if(fill && result.last.length < number) while((last = result.last()).length < number) last.push(fill)
    return result
  }
  
  /*
    Array.prototype.last
    =======
    Returns the last item of the array or null if the array is empty
    =======
    @arguments {}
    @output 
      item
  */

  function last(){
    var self = this
    return self[self.length - 1]
  }
  
  /*
    Array.prototype.min
    =======
    Returns the minimum value of the array or null if the array is empty
    =======
    @arguments {
      [iterator] : fn to return a comparable value from fn(item) 
    }
    @output 
      minimum value
  */

  function min(iterator){
    return _sort.call(this, function(a, b){
      if(typeof iterator == "function") {
        a = iterator(a)
        b = iterator(b)
      }
      return a < b ? - 1 : 1
    })[0] || null
  }
  
  /*
    Array.prototype.max
    =======
    Returns the maximum value of the array or null if the array is empty
    =======
    @arguments {
      [iterator] : fn to return a comparable value from fn(item) 
    }
    @output 
      maximum value
  */

  function max(iterator){
    return _sort.call(this, function(a, b){
      if(typeof iterator == "function") {
        a = iterator(a)
        b = iterator(b)
      }
      return a > b ? - 1 : 1
    })[0] || null
  }
  
  /*
    Array.prototype.max
    =======
    Returns the groups of items having the same indexes in the array and in the arrays in arguments
    =======
    @arguments {
      [arr1 [,arr2 …] : arrays
    }
    @output 
      array of groups
  */

  function groupWith(){
    var self = this
      , arrays = [].slice.call(arguments)
    arrays.unshift(self)

    return collect.call(self, function(item, index){
      return arrays.pluck(index)
    })
  }
  
  
  function any(fn, ctx){
    var self = this 
      , length = self.length
      , i = 0
    for(;i < l; i++) if(fn.call(ctx, item, index, self)) return true
    return false
  }
  
  
  
  
  function all(fn, ctx){
    var self = this 
      , length = self.length
      , i = 0
    for(;i < l; i++) if(!fn.call(ctx, item, index, self)) return false
    return true
  }



  return {
      each: each
    , findLast : findLast
    , clone: clone
    , collect: collect
    , groupWith : groupWith
    , groupBy : groupBy
    , max: max
    , min : min
    , select: select
    , reject: reject
    , fold: fold
    , foldRight : foldRight
    , flatten: flatten
    , find: find
    , last : last
    , contains: contains
    , pluck: pluck
    , isEmpty: isEmpty
    , clean: clean
    , intersect: intersect
    , difference: difference
    , sortBy : sortBy
    , any : any
    , all : all
  }
})()


Array.implement(Arrays)

 /*
    Array.from
    =======
    Converts an array-like object into an array
    =======
    @arguments {
      arrayLike : object to convert
      [start] : index where to start iterating
    }
    @output 
      array
  */

Array.from = function(arrayLike, start){
  if(!isObject(arrayLike) || !("length" in arrayLike)) return []
  var i = start || 0
    , l = arrayLike.length
    , array = []
  if(i < 0) i = 0
  if(i > l) return []
  for(;i < l; i++) array.push(arrayLike[i])
  return array
}

  /*
    Array.range
    =======
    Generates an array of successive numbers
    =======
    @arguments {
      start : default 0
      [end] : index where to stop iterating
    }
    @output 
      array
  */

Array.range = function (start, end){
  if(typeof start != "number") return []
  var hasEnd = typeof end == "number"
    , result = [], leftToRight

  end = hasEnd ? end : start
  start = hasEnd ? start : 0
  leftToRight = start < end

  if(leftToRight) for(;start <= end; start++) result.push(start)
  else for(;start >= end; start--) result.push(start)

  return result
}





var functionMethods = (function(){

  var _arrayFrom = Array.from


  /*
    Function.prototype.attach
    =======
    Returns a function with context and n first arguments locked
    =======
    @arguments {
      context : function context
      [arg1[, arg2 …]] : first arguments
    }
    @output 
      attached function
  */

  function attach(context){
    var self = this
      , args = _arrayFrom(arguments, 1)
      
      function fn(){
        var t = this
        return self.apply(t instanceof fn && context != null ? t : context, args.concat(_arrayFrom(arguments)))
      }
      
    fn.prototype = Class.from(self.prototype)
    return fn
  }

  /*
    Function.prototype.partial
    =======
    Returns a function with n first arguments locked
    =======
    @arguments {
      arg1[, arg2 …] : first arguments
    }
    @output 
      attached function
  */


  function partial(){
    var self = this
      , args = _arrayFrom(arguments)
      
      function fn(){
        return self.apply(this, args.concat(_arrayFrom(arguments)))
      }
      
    fn.prototype = Class.from(self.prototype)
    return fn
  }

  /*
    Function.prototype.delay
    =======
    Delays a function of `time` seconds
    =======
    @arguments {
      time : duration in seconds
      arg1[, arg2 …] : first arguments
    }
    @output 
      setTimeout id
  */

  function delay(time){
    var self = this
      , args = _arrayFrom(arguments, 1)
    return window.setTimeout(function(){
      self.apply(undefined, args)
    }, time * 1000)
  }

  /*
    Function.prototype.every
    =======
    Executes a function every `time` seconds
    =======
    @arguments {
      time : duration in seconds
      arg1[, arg2 …] : first arguments
    }
    @output 
      setInterval id
  */


 function every(time){
    var self = this
      , args = _arrayFrom(arguments, 1)
    return window.setInterval(function(){
      self.apply(undefined, args)
    }, time * 1000)
  }

  /*
    Function.prototype.debounce
    =======
    Delays a callback of `time` seconds every time the returned function is executed. 
    If the timeout is still running when the function is executed, the timeout is reset
    =======
    @arguments {
      fn  : callback
      time : duration in seconds
    }
    @output 
      new function
  */

  function debounce(wait){
    var timeout, fn = this
    return function(){
      var args = arguments
      if(timeout) window.clearTimeout(timeout)
      timeout = window.setTimeout(function(){
        fn.apply(this, args)
        timeout = null
      }, wait * 1000)
    }
  }
  
  return {
      attach : attach
    , partial : partial
    , delay : delay
    , every : every
    , debounce : debounce
  }

})()

Function.implement(functionMethods)


var stringHelpers = (function(){

  /*
    String.parseJSON
    =======
    Parses JSON
    =======
    @arguments {
      str  : JSON string to parse
    }
    @output 
      js object
  */


  function parseJSON(str){
    if(window.JSON) return JSON.parse(str)
    if(!str.isJSON()) throw Object.error("syntax", "JSON Parse Error : " + str)
    // yeah, I know
    return Function("return " + str)()
  }

  /*
    String.compiler
    =======
    Returns a function that compiles the given str
    =======
    @arguments {
      str  : template (see String.prototype.compile)
    }
    @output 
      function : compiler
  */

  function compiler(str){
    return function(a){
      return str.compile(a)
    }
  }


  return {
      parseJSON : parseJSON
    , compiler : compiler
  }

})()

var stringMethods = (function(){

  var _trim = /^\s+|\s+$/g
    , _camelize = /(?:\-|\s)\D/g
    , _firstLetter = /^\w/
    , _firstLetters = /(?:\s|^)(\w)/g 
    , _caps = /\s+\w|[A-Z]/g
    , _whitespaceFirst = /^\s/
    , _compile = /#\{([\w\*\.]*?)\}/g
    , _compileString = /#\{\*\}/g
    , _separations = /[^\.]+/g
    , _primitiveTypes = /string|number/
    , _fold = [].fold

  /*
    String.prototype.isJSON
    =======
    Returns whether or not a string is JSON
    =======
    @arguments {}
    @output 
      boolean
  */

  function isJSON(){
    var str = this;
    if (/^\s*$/.test(str)) return false
    str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
    str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
    str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '')
    return (/^[\],:{}\s]*$/).test(str)
  }

  /*
    String.prototype.trim
    =======
    Trims the string (removes the whitespace before and after)
    NOTE : uses the native String.prototype.trim if available
    =======
    @arguments {}
    @output 
      string
  */

  function trim(){
    return this.replace(_trim, "")
  }

  /*
    String.prototype.camelize
    =======
    Camelizes a given string
    =======
    @arguments {}
    @output 
      string
  */

  function camelize(){
    var str = this
    if(str.indexOf("-") == -1 && str.search(/\s/) == -1) return str + ""
    return str.trim().toLowerCase().replace(_camelize, function(match, i){
      return i !== 0 ? match.charAt(1).toUpperCase() : match.charAt(1)
    })
  }

  /*
    String.prototype.dasherize
    =======
    Dasherizes a given string
    =======
    @arguments {}
    @output 
      string
  */

  function dasherize(){
    var str = this
    if(str.toUpperCase() == str) str = str.toLowerCase()
    return str.replace(_caps, function(match, i){
      return "-" + match.toLowerCase().replace(_whitespaceFirst, "")
    })
  }

  /*
    String.prototype.capitalize
    =======
    Capitalizes a given string
    =======
    @arguments {
      everyWord : boolean : Capitalize every word (default is only the first one)
    }
    @output 
      string
  */


  function capitalize(everyWord){
    return this.toLowerCase().replace(everyWord ? _firstLetters : _firstLetter, function(match){
      return match.toUpperCase()
    })
  }

  /*
    String.prototype.compile
    =======
    Fill the string #{path} elements with given data
    #{index} for an array or an object
    #{*} for a whole string
    =======
    @arguments {
      object : object, array or string to fill the string with
      [arg1 [,arg2 …] : multiples arguments are converted to an array
    }
    @output 
      string
  */

  function compile(object){
    var type = typeof object
    if(type == "string" || type == "number") return this.replace(_compileString, object)
    return this.replace(_compile, function(path, match){

      var find = match.match(_separations)
        , index = 0, length = find.length
        , reduced = object
        , type
      for(;index < length; index++) {
        type = typeof reduced
        if(index == length - 1 && type == "string" || type == "number") return "" + reduced 
        if(!reduced || type != "object") return ""
        reduced = reduced[find[index]]
        if(reduced == null) reduced = ""
      }
      return reduced
    })
  }

  return {
      isJSON : isJSON
    , trim : "".trim || trim
    , camelize : camelize
    , dasherize : dasherize
    , capitalize : capitalize
    , compile : compile
  }

})()

Object.extend(String, stringHelpers)
String.implement(stringMethods)



  var _isJavaScript = /javascript|ecmascript/
    , _isJSON = /json/
    , _isXML = /xml/
    , _isExternal = /\/\/([\w\d\-\_\.]+\.[\w]+)/
    , _defaults = {
        url : null
      , xml : true
      , evalJS : true
      , evalJSON : true
      , method : "GET"
      , async : true
      , headers : null
    }
    , doc = $(document.documentElement)
  
  function checkStatus(status){
    if((status >= 200 && status < 300) || status == 304) return "success"
    if((status < 200 || status > 300) && status != 304) return "error"
  }
  
  function parseResponse(request, type){
    var res = request.responseText
    if(request.evalJS && _isJavaScript.test(type)) {
        Function(res)()
        return true
    }
    
    if(request.evalJSON && _isJSON.test(type) && res.isJSON()) {
       return "JSON" in window ? JSON.parse(res) : Function("return " + res)()
    } 
    
    if(request.xml && _isXML.test(type)) {
      if(request.responseXML) return request.responseXML
      
      var parser = new DOMParser()
      return parser.parseFromString(res, "text/xml")
    }
    return res
  }

  /*
    Request
    =======
    Creates a XHR
    =======
    @arguments {
      [url]  : string : url to reach
      [object] : object {
        url : string : url
        xml : boolean : parse xml (default:true)
        evalJS : boolean : eval received JavaScript (default:true)
        evalJSON : boolean : eval received JSON (default:true)
        method : string : "GET" or "POST" (is automatically set to "POST" if a query is sent)
        async : boolean : perform the request asynchronously (default:true)
        headers : object : custom headers to send (default:null)
      }
    }
    @output 
      XHR
  */

  function Request(url, object){
    if(!("XMLHttpRequest" in window)) return null
    var request = new XMLHttpRequest()
    if(typeof object == "function") (object = {}).success = object
    if(typeof object == "object") object.url = url
    else {
      if(typeof url == "string") (object = {}).url = url
      else object = url
    }
    
    Object.extend(request, Request._defaults)
    if(typeof object == "object") Object.extend(request, object)
    request.onreadystatechange = function(){
      var readyState = request.readyState
      if(readyState == 2 && "loading" in request) request.loading()
      if(readyState == 4) {
        var status = checkStatus(request.status)
          , type = request.getResponseHeader("Content-Type")
          , result
        if(status == "success") {
          result = parseResponse(request, type)
          doc.fire("request:loaded", result)
          if(request.success) return request.success(result)
        }
        if(status == "error") {
          if(request.error) return request.error()
          doc.fire("request:failed")
        }
      }
    }
    
    /*
      Request#update
      =======
      Sends the request
      =======
      @arguments {
        [query]  : string : query to string if "POST"
      }
      @output 
        XHR
    */
    
    
    request.update = function(query){
      if(typeof request.url != "string") throw Object.error("Request exception : No url have been set")
      request.open((query || request.method == "POST") ? "POST" : "GET", request.url, request.async)
      if(query) {
         request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
         request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
       }
       if(isObject(request.headers)) {
         Object.each(request.headers, function(a,i){ request.setRequestHeader(i,a) }, request)
       } 
      request.send(query || null)
      return request
    }
  
    return request
  }
  
  /*
    Request.setDefaults
    =======
    Sets the defaults parameters for every request
    =======
    @arguments {
      object : default 
    }
    @output 
      object
  */
  
  Request._defaults = _defaults
  
  function setDefaults(object){
    return Object.extend(Request._defaults, object)
  }
  
  Request.setDefaults = setDefaults

  /*
    Request.JSONP
    =======
    Creates a JSONP request
    =======
    @arguments {
      url  : string : url to get
      [success] : function callback
    }
    @output 
      object
  */

  Request.JSONP = function(url, success){
    var callback = "request" + (+new Date())
      , options = {
          type : "text/javascript"
        , src : url + (!!~url.indexOf("?") ? "&" : "?") + "callback=" + callback
      }
      , script
      , o
  
    window[callback] = function(object){
      var parent
      if(script && (parent = script.parentNode)) parent.removeChild(script)
      doc.fire("request:loaded", object)
      if(typeof success == "function") success(object)
      script = null
      window[callback] = null
    }
    
    /*
      Request.JSONP#update
      =======
      Sends a JSONP request
      =======
      @arguments {}
      @output 
        object
    */
  
    o = {
      update : function(){
        var parent
        if(script && (parent = script.parentNode)) parent.removeChild(script)
        script = Object.extend(document.createElement("script"), options)
        $(function(){
          document.head.insertBefore(script, document.head.firstChild)
        })
        return o
      }
    }
    return o
  }
  
  /*
    Request.parallel
    =======
    Creates a parallel request
    =======
    @arguments {
      request : array of url or XHR|JSONP object
    }
    @output 
      request object
  */

  function parallel(requests){
    var self = this
      , i = 0, l = requests.length
      , o, item, url, match, request, uniqResponder, uniqError
      
    if(!(self instanceof parallel)) return new parallel(requests)
  
    self.stack = Array(l)
    self.requests = Array(l)
    self.performed = 0
    self.errorThrown = false
    self.errorSource = null
  
    function responder(index){
      return function(response){
        if(self.errorThrown) return
        self.stack[index] = response
        if((++self.performed) == l && typeof self.then == "function") self.then()
      }
    }
  
    function error(index){
      return function(){
        self.errorThrown = true
        self.errorSource = request[index]
        if(typeof self.error == "function") self.error()
      }
    }
  
    for(;i < l; i++) {
      item = requests[i]
      uniqResponder = responder(i)
      uniqError = error(i)
      o = Object.extend({}, _defaults)
      if(typeof item == "string") {
        Object.extend(o, {url:item})
        url = item
      }
      if(typeof item == "object") {
        Object.extend(o, item)
        url = object.url
      }
      Object.extend(o, {
          success : uniqResponder
        , error : uniqError
      })
      match = url.match(_isExternal)
      if(/\.js$/.test(url)) request = Request.getScript(url, uniqResponder)
      else if(match && match[0] != window.location.host) request = Request.JSONP(url, uniqResponder)
      else request = Request(o)
      self.requests[i] = request
    }
  
    return self
  }
  
  var parallelMethods = (function(){
    
    /*
      Request.parallel.prototype.start
      =======
      Lauches the request (make sure that done, error and loading function are declared before)
      =======
      @arguments {}
      @output 
        request object
    */
    
    function start(){
      var self = this, requests = self.requests, i = 0, l = requests.length
      if(typeof self.loading == "function") self.loading()
      for(;i < l; i++) requests[i].update()
      return self
    }
    
    /*
      Request.parallel.prototype.then
      =======
      Registers a callback function for the requests
      =======
      @arguments {
        fn : function
      }
      @output 
        request object
    */
    
    function then(fn){
      var self = this
      self.then = function(){
        fn.apply(null, self.stack)
      }
      return self
    }
    
    /*
      Request.parallel.prototype.error
      =======
      Registers a error function for the requests
      =======
      @arguments {
        fn : function
      }
      @output 
        request object
    */
    
    function error(fn){
      var self = this
      self.error = function(){
        fn(self.errorSource)
      }
      return self
    }
    
    /*
      Request.parallel.prototype.loading
      =======
      Registers a loading function for the requests
      =======
      @arguments {
        fn : function
      }
      @output 
        request object
    */
    
    function loading(fn){
      var self = this
      self.loading = fn
      return self
    }
    
    return {
        start : start
      , then : then
      , error : error
      , loading : loading
    }
  })()
  
  parallel.implement(parallelMethods)
  
  Request.parallel = parallel
  
  /*
    Request.getInlineScripts
    =======
    Gets the inline <script>*</script> elements in a string and returns a function that executes them
    =======
    @arguments {
      string : string to parse
    }
    @output 
      function
  */
  
  function getInlineScripts(string){
    var regExp = /<script[^>]*>([\s\S]*?)<\/script>/g
      , match = string.match(regExp)
      , i = 0, l, result = [], item
    if(!match) return function(){}
    l = match.length
    for(;i < l; i++) if(item = match[i].replace(regExp, "$1")) result.push(item)
    if(result) return new Function(result.join(";"))
  }
  
  function get(){
    var a = [].slice.call(arguments)
      , self = this
      
    if(!(this instanceof get)) return get.apply(new get(), arguments)

    self.requests = a.collect(function(item, index, arr){
      return new Request.parallel(item).then(function(){ 
         if(index < arr.length - 1) self.requests[index + 1].start() 
         else if(isFunction(self.then)) self.then()
      })
    })
    
    return self
  }
  
  
  function getThen(fn){
    this.then = fn
    return this
  }
  
  function getStart(){
    this.requests[0].start()
    return this
  }
  
  get.prototype.then = getThen
  get.prototype.start = getStart
  
  
  /*
    Request.images
    =======
    Loads images
    =======
    @arguments {
      array|string : image url(s) to load
      [fn] : callback
    }
    @output 
  */
  
  function images(urls, fn){
    var imgs, i = 0, l, item, loaded = 0
    urls = [].concat(urls)
    imgs = Array(l = urls.length)
    
    function onLoadImage(){
      var self = this
      writeAttr("height", self.height)(self)
      writeAttr("width", self.width)(self)
      writeAttr("alt", "")(self)
      if(++loaded == l) fn.apply(null, imgs)
    }
    
    for(;i < l; i++) {
      item = new Image()
      item.src = urls[i]
      item.onload = onLoadImage
      imgs[i] = item
    }
  }
  
  function getScript(url, callback){
    return {
      update : function(){
        var s = document.createElement("script")
          , ready = false
          , h = document.head || document.getElementsByName("head")[0] || document.documentElement
        s.src = url
        s.onload = s.onreadystatechange = function(){
          if(ready) return
          if(!s.readyState || !/in/.test(s.readyState)) {
            s.onload = s.onreadystatechange = null 
            ready = true
            if(callback) callback()
            if(s.parentNode) s.parentNode.removeChild(s)
            s = null
          }
        }
        h.insertBefore(s, h.firstChild) 
      }
    }
  }
  
  
  Request.get = get
  Request.getScript = getScript
  Request.images = images
  Request.getInlineScripts = getInlineScripts


var _matchSelectors = /([^,])+/g
  , _matchParts = /[\w\.\-#\>\+\~\]\[\='"\*]+/g
  , _movers = /^(?:\>|\+|\~|\-)$/
  , _id = /\#([\w\-]+)/g
  , _onlyid = /^\#([\w\-]+)$/
  , _class = /\.([\w\-]+)+/g
  , _attrs = /[^,='"]+/g
  , _tag = /(^[\w\d\*]+)/g
  , _attr = /\[(.+)\]/
  , _byname = /\[name=["']([^"']+)["']\]/
  , classList = document.createElement("i").classList
  , movers = {
       " " : function(element){return element}
     , ">" : function(element){return element.parentNode}
     , "+" : function(element){
       while(element = element.previousSibling) if(element.nodeType == 1) break
       return element
      }
     , "-" : function(element){
      while(element = element.nextSibling) if(element.nodeType == 1) break
      return element
      }
    }
  , cacheMatchers = {} // already used matchers go here
  
  function getByTag(tag, context){
    return context.getElementsByTagName(tag)
  }
  
  var getByClass = 
  document.getElementsByClassName && !Browser.Opera && document.querySelectorAll ?
    function(className, context){ return context.getElementsByClassName(className) } :
  document.querySelectorAll ? 
    function(className, context){ return context.querySelectorAll("." + className) } : 
  document.evaluate ? 
    function(className, context){
      var evaluation = document.evaluate(".//*[contains(concat(' ', @class, ' '), '" + className + "')]", context, null, 0, null), result = []
        , reg = new RegExp("(^|\\s)" + className + "(\\s|$)")
      while(cache = evaluation.iterateNext()) if(reg.test(cache.className)) result.push(cache)
      return result 
    } :
  function(className, context){
    var els = context.getElementsByTagName("*")
      , i = 0, l = els.length, result = []
      , reg = new RegExp("(^|\\s)" + className + "(\\s|$)")
    for(;i < l; i++) {
      cache = els[i]
      if(reg.test(cache.className)) result.push(cache)
    }
    return result
  }
              
 
  function getByName(name, context){
    return context.getElementsByName(name)
  }
  
  var isAncestor = 
    document.compareDocumentPosition ? 
      function(el, ctnr){ return !!el && (ctnr.compareDocumentPosition(el) & 16) == 16 } :
    document.documentElement.contains ?
      function(el, ctnr){ return !!el && ((ctnr.nodeType == 9 || isWindow(ctnr)) ? document.documentElement : ctnr) !== el && ctnr.contains(el) } :
    function(el, ctnr){
      var parent
      while(parent = el.parentNode) if(parent == ctnr) return true
      return false
    }

  function getById(id, context){
    var el = (context.ownerDocument || context).getElementById(id)
    if(!context.ownerDocument) return el ? [el] : []
    return isAncestor(el, context) ? [el] : []
  }
  
  function hasId(id){
    return function(element){
      return element.id == id
    }
  }
  
  function hasTag(tag){
    if(tag == "*") return function(){return true}
    var regExp = new RegExp("^" + tag.replace(/([\.\*\+\?\^\=\!\:\$\{\}\(\)\|\[\]\/\\])/g, "\\$1") + "$", "i")
    return function(element){return regExp.test(element.nodeName)}
  }
  
  var hasClass = 
    classList ? 
      function(classes){
        var l = classes.length
        classes = classes.collect(function(i){return i.substring(1)})
        return function(element){
          var i = 0
          for(;i < l; i++) if(!element.classList.contains(classes[i])) return false
          return true
        }
      } : 
      function (classes){
        var i = 0, l = classes.length, classesRegExp = Array(l)
        for(;i < l; i++) classesRegExp[i] = new RegExp("(^|\\s)" + classes[i].substring(1) + "(\\s|$)")
        return function(element){
          var i = 0
            , className = element.className
          for(;i < l; i++) if(!classesRegExp[i].test(className)) return false
          return true
        }
      }
  
  function hasAttr(array){
    var l = array.length
    return function(element){
      var i = 0
      for(;i < l;) if(element.getAttribute(array[i++]) !== array[i++]) return false
      return true
    }
  }

function matcher(selector, root, noBubbling, delegated){
  var checkers
  checkers = selector.collect(checker)
  return function(element){
    var i = selector.length - 1, match, uniq, first = noBubbling
    if(!~i) return true
    if(!noBubbling) {
      while(element && element != root){
        if(checkers[i](element)) break
        element = element.parentNode
        continue
      }
      if(!element || element == root) return !~i
      if(delegated) delegated = element
      i--
      if(!~i) return delegated || !~i
      first = false
    }
    while(element && element != root){
      
      if(first) {
        first = false
        if(checkers[i](element)) {
          i--
          if(!~i) break
          else continue
        } else {
          break
        }
      }
      
      match = selector[i].match(_movers)
      
      if(match) {
        uniq = true
        i--
        element = movers[match[0]](element)
        if(!element) break
      } else {
        uniq = false
        element = element.parentNode
      }
      if(checkers[i](element)) {
        i--
        if(!~i) break
        else continue
      } else {
        if(uniq) break
      }
    }
    return delegated || !~i
  } 
}

function dontCheck(){return true}

function checker(selector){
  var verifiers = []
    , match

  if(match = selector.match(_movers)) {
    verifiers.push(dontCheck)
  } else {
    if(match = selector.match(_id)) {
      verifiers.push(hasId(match[0].substring(1)))
    }
    if(match = selector.match(_class)) {
      verifiers.push(hasClass(match))
    }
    if(match = selector.match(_tag)) {
      verifiers.push(hasTag(match[0]))
    }
    if(match = selector.match(_attr)) {
      verifiers.push(hasAttr(match[1].match(_attrs)))
    }
  }

  return function(element){
    var i = 0, l = verifiers.length
    if(!l) return true
    for(;i < l; i++) if(!verifiers[i](element)) return false
    return true
  }
}

function getElements(selector, root){
  var match
  if(match = selector.match(_id)) return getById(match[0].substring(1), root)
  if(match = selector.match(_class)) return getByClass(match[0].substring(1), root)
  if(match = selector.match(_tag)) return getByTag(match[0], root)
  if(match = selector.match(_byname)) return getByName(match[1], root)
  return []
}

function Selector(string, context, constructor, maxLength){
  if(!string) return constructor ? new constructor() : []
  context = (isObject(context) && (context.nodeName != "FORM" && context.length) ? context[0] : context) || document
  if(typeof context == "string") context = Selector(context, null, null, maxLength)
  
  var selectors = string.match(_matchSelectors), i = 0, l = selectors.length, item 
    , results = constructor ? new constructor() : [] 
    , temp, j, k, element 
    , matches 
    , id
    , hasMaxLength = isNumber(maxLength)
  for(;i < l; i++) {
    if(i == "body" && _find.call(results, document.body) == -1) {
      results.push(document.body)
      continue
    }
    if(i == "html" && _find.call(results, document.documentElement) == -1) {
      results.push(document.documentElement)
      continue
    }
    if((id = selectors[i].match(_onlyid)) && (element = getById(id[1], context)[0]) && _find.call(results, element) == -1) {
        results.push(element)
        continue
      }
    if(hasMaxLength && results.length == maxLength) return results
    item = selectors[i].match(_matchParts)
    temp = getElements(item[item.length - 1], context)
    matches = Selector.matcher(selectors[i], context, true)
    for(j = 0, k = temp.length; j < k; j++) {
      element = temp[j]
      if(matches(element) && _find.call(results, element) == -1) results.push(element)
      if(hasMaxLength && results.length == maxLength) return results
    }
  }
  return results
}

Selector.isAncestor = isAncestor
var gen = Object.uniqueId.partial("root-")
Selector.matcher = function(selector, root, param, target){
  var cached, o, fn, uniq
  root = root || document
  param = isBoolean(param) ? param : true
  
  if(root.uniqRoot) uniq = root.uniqRoot
  else uniq = root.uniqRoot = gen()
  if(cached = cacheMatchers[selector + ":" + uniq + ":" + param]) return cached
  fn = matcher(selector.match(_matchParts), root || document, isBoolean(param) ? param : true, target)

  cacheMatchers[selector + ":" + uniq + ":" + param] = fn
  return fn
}




  var doesntBubble = /blur|focus/
    , _reject = [].reject
    , listener
    , unlistener
    , testEl = document.createElement("i")
    , ieCache = []

    
  function delegate(handler, selector, el){
    var selectors = selector.match(/([^,])+/g)
      , i = 0
      , l = selectors.length
      , checkers = []

    if(!selectors) return handler
    
    for(;i < l; i++) checkers.push(Selector.matcher(selectors[i], el, false, true))
    
    function matches(element){
      var i = 0, cache
      for(;i < l; i++) if(!(cache = checkers[i](element))) return false
      return cache
    }
    
    return function(ev){
      var target = ev.target || ev.srcElement, rightTarget
      if(!(rightTarget = matches(target))) return
      handler.call(rightTarget, ev)
    }
  }
  
  function preventDefault(event){
    var cache
    event = event || window.event
    if(event && typeof event.preventDefault == "function") event.preventDefault()
    else event.returnValue = false
  }
  
  function stopPropagation(event){
    var cache
    event = event || window.event
    if(event && typeof event.stopPropagation == "function")  event.stopPropagation()
    else event.cancelBubble = true
  }
  
  function target(event){
    event = event || window.event
    return event.target || event.srcElement
  }
  
  function stop(event){
    preventDefault(event)
    stopPropagation(event)
  }
  
  function safeTarget(el) {
    return el != document ? el :
      document.createEvent && !el.dispatchEvent ? document.documentElement :
      el
  }
  
  var fire = document.createEvent ? 
    function (el, ev, data, bubble){
      el = safeTarget(el)
      bubble = isBoolean(bubble) ? bubble : true
      var obj = document.createEvent("HTMLEvents")
      obj.initEvent("dataavailable", bubble, true)
      obj.eventName = ev
      obj.meta = data
      el.dispatchEvent(obj)
      return obj
    } : 
    function (el, ev, data, bubble){
      el = safeTarget(el)
      var obj = document.createEventObject()
        , type
      bubble = isBoolean(bubble) ? bubble : true
      type = obj.eventType = bubble ? "ondataavailable" : "onlosecapture"
      obj.eventName = ev
      obj.meta = data
      el.fireEvent(type, obj)
      return obj
    }
  
  var eventMethods = {
      preventDefault : preventDefault
    , stopPropagation : stopPropagation
    , target : target
    , stop : stop
    , fire : fire
  }
  
  if(window.Event) Object.extend(window.Event, eventMethods)
  else window.Event = eventMethods
  
  function createHandler(el, ev, handler, selector){
    var response = handler, handlerCache, realEvent
    if(!!~ev.indexOf(":")) {
      response = isString(selector) ? 
        function(evt){
          if(!evt.eventName || evt.eventName != ev) return false
          handler.call(this, evt)
        } : 
        function(evt){
          if(!evt.eventName || evt.eventName != ev) return false
          handler.call(el, evt)
        }
    }
    if(ev == "mouseenter" || ev == "mouseleave"){
      realEvent = ev == "mouseenter" ? "mouseover" : "mouseout"
      
      response = isString(selector) ? 
        function(ev){
          var el = this
          var rel = ev.relatedTarget || (realEvent == "mouseover" ? ev.fromElement : ev.toElement)
          if(rel && (rel == el || Selector.isAncestor(rel, el))) return
          handler.call(el, ev)
        } : 
          function(ev){
            var rel = ev.relatedTarget || (realEvent == "mouseover" ? ev.fromElement : ev.toElement)
            if(rel && (rel == el || Selector.isAncestor(rel, el))) return
            handler.call(el, ev)
          }
    }
    
    if(isString(selector)) {
      response = delegate(response, selector, el)
    }
    if(response == handler) {
      response = function(ev){
        handler.call(el, ev)
      }
    }
    register(el, ev, {
        handler : handler
      , response : response
      , actualEvent : realEvent || ev
      , capture : isString(selector)
    })
    return response
  }
  
  listener = testEl.addEventListener ? 
    function(el, ev, handler, capture){
      if(ev == "mouseenter" || ev == "mouseleave") ev = ev == "mouseenter" ? "mouseover" : "mouseout"
      if(!!~ev.indexOf(":")) {
        el.addEventListener("dataavailable", handler, capture)
        return el
      }
      el.addEventListener(ev, handler, capture)
      return el
    } : 
    function(el, ev, handler, capture){
      if(ev == "mouseenter" || ev == "mouseleave") ev = ev == "mouseenter" ? "mouseover" : "mouseout"
      if(!!~ev.indexOf(":")) {
        el.attachEvent("ondataavailable", handler)
        el.attachEvent("onlosecapture", handler)
      }
      el.attachEvent("on" + ev, handler)
      return el
    }
    
  unlistener = testEl.removeEventListener ? 
  function(el, ev, handler, capture){
    if(!!~ev.indexOf(":")) {
      el.removeEventListener("dataavailable", handler, capture)
      return el
    }
    el.removeEventListener(ev, handler, capture)
    return el
  } : 
  function(el, ev, handler, capture){
    if(!!~ev.indexOf(":")) {
      el.detachEvent("ondataavailable", handler)
      el.detachEvent("onlosecapture", handler)
    }
    if(capture && (ev == "focus" || ev == "blur")) ev = patches[ev]
    el.detachEvent("on" + ev, handler)
    return el
  }
    
  function register(el, ev, obj){
    var storage = el._craftevents_, arr
    if(!storage) storage = el._craftevents_ = {}
    arr = storage[ev] = storage[ev] || []
    arr.push(obj)
    if(Browser.IE) ieCache.push(el)
  }
  
  function unregister(el, ev, handler){
    var storage = el._craftevents_, arr
    if(!storage) return
    if(!ev) return Object.each(storage, function(item, index, obj){ 
      if(isArray(item)) {
        item.each(function(obj){ unlistener(el, obj.actualEvent, obj.response, obj.capture) })
      }
      obj[index] = []
    })
    arr = storage[ev]
    if(!arr) return
    if(!handler) {
      arr.each(function(obj){ 
        unlistener(el, obj.actualEvent, obj.response, obj.capture) 
      })
      storage[ev] = []
      return
    }
    storage[ev] = arr.reject(function(obj, index){
      if(handler && obj.handler == handler) {
        unlistener(el, obj.actualEvent, obj.response, obj.capture)
        return true
      }  
    })
  }
  
  function listen(el, ev, selector, handler){
    var delegated = isString(selector), response
    if(!delegated) {
      handler = selector
      selector = null
    }
    response = createHandler(el, ev, handler, selector)
    listener(el, ev, response, delegated)
  }
  
  function stopListening(el, ev, handler){
    unregister(el, ev, handler)
  }
  
  if(Browser.IE) listen(window, "unload", function(){ ieCache.each(function(item){ stopListening(item) }) })
  


  var regExpAttr = /^@([\w\-]+)/
    , _buggyAttributes = /class|for/
    , _collect = [].collect
    , _select = [].select
    , _contains = [].contains
    , _find = [].find
    , _pluck = [].pluck
    , _each = [].each
    , _ctnr = document.createElement("div")
    , _hasBuggyHref
    , _buggyHref = /href|src/
    , buggyNodeNames = /TABLE|TBODY|TFOOT|THEAD|TR/
    , prefixFloat = window.getComputedStyle ? "cssFloat" : "styleFloat"
    _ctnr.innerHTML = "<a href='#i'></a>"
    _hasBuggyHref = _ctnr.getElementsByTagName("a")[0].href != "#i"
        
  /*
    Elements
    =======
    Creates an array-like object from an array 
    =======
    @arguments {
      array : array to convert
    }
    @output 
      elements
  */
  
  function Elements(array){
    var self = this, i = 0, l
    if(!array) array = []
    if(!(self instanceof Elements)) return new Elements(array)
    if(isFragment(array)) array = _select.call(array.childNodes, isElement)
    if(typeof array == "object" && "nodeName" in array) array = [array]
    for(l = array.length; i < l; i++) self[i] = array[i]
    if(l) self.length = l
    return self
  }
  
  function readAttr(name){
    var match = name.match(_buggyAttributes)
    return function(element){
      var cache
      if(Browser.isIE) {
        if(match) return element[attributes[match[0]]]
        if(!!~name.indexOf(":") && (cache = element.attributes) && (cache = element.attributes[name])) return cache.nodeValue
        return null
      }
      if(_hasBuggyHref && _buggyHref.test(name)) {
        var attr = element.getAttribute(name, 2)
          , location = window.location.toString().replace(window.location.hash, "")
        if(attr.indexOf(location + "#") > -1 && attr == element.getAttribute(name)) return attr.replace(location, "")
        return attr
      }
     return element.getAttribute(name) 
    }
  }
  
  function writeAttr(name, value){
    if(value === false || value === null) return function(element){ element.removeAttribute(name) }
    if(value === true) return function(element){ element.setAttribute(name, name) }
    return function(element){ element.setAttribute(name, value) }
  }
  
  var elementHelpers = (function(){
    
    /*
      Elements.create
      =======
      Creates an element
      =======
      @arguments {
        nodeName : string (tag)
        object : properties (start attributes indexes with @)
      }
      @output 
        wrapped element
    */
       
    function create(name, properties){
      var element = document.createElement(name), match
      if(properties) Object.each(properties, function(item, index){
        if(index == "class") index = "className"
        if(match = index.match(regExpAttr)) {
          writeAttr(match[1], item)(element)
        } else {
          element[index] = item
        }
        
      })
      return new Elements(element)
    }
    
    /*
      Elements.from
      =======
      Creates an element from an html string
      =======
      @arguments {
        string : html
      }
      @output 
        element or fragment
    */
    
    
    function from(string, context){
      var wrapper = document.createElement("div")
        , childNodes, hasContext = isString(context)
      wrapper.innerHTML = hasContext ? "<" + context + ">" + string + "</" + context + ">" : string
      return new Elements(hasContext ? wrapper.children[0].childNodes : wrapper.childNodes)
    }
    
    /*
      Elements.fragment
      =======
      Shorthand for document.createDocumentFragment
      =======
      @arguments {}
      @output 
        fragment
    */
    
    function fragment(){
      return document.createDocumentFragment()
    }
    
    function matches(element, selector, root, noBubbling, delegated){
      return Selector.matcher(selector, root, noBubbling, delegated)(element)
    }
    
    return {
        create : create
      , from : from
      , fragment : fragment
      , matches : matches
    }
    
  })()
  
  Object.extend(Elements, elementHelpers)
  
  "collect fold foldRight find findLast contains pluck isEmpty groupBy last groupWith"
  .split(" ")
  .each(function(i){
     Elements.implement(i, function(){
       return Array.prototype[i].apply(this, arguments)
     })
   })
   
   "select reject intersect difference sortBy"
      .split(" ")
      .each(function(i){
        Elements.implement(i, function(){
          return new Elements(Array.prototype[i].apply(this, arguments))
        })
      })
  
  var elementMethods = (function(){
  
    var GET_COMPUTED = "getComputedStyle" in window
      , _formElements = /SELECT|INPUT|TEXTAREA|BUTTON/
      , _checkables = /checkbox|radio/
      , classList = document.createElement("i").classList
      , attributes = {
          "class" : "className"
        , "for" : "htmlFor"
      }
      , innerText = "innerText" in document.createElement("i") ? "innerText" : "textContent"
      
    
  
    function each(elements, fn){
      var i = 0, l = elements.length
      for(;i < l; i++) fn(elements[i])
      return elements
    }
    
    /*
      Elements.prototype.each
      =======
      Iterates over the elements and executes fn with (el, index, els) as arguments
      =======
      @arguments {
        fn : iterator
      }
      @output 
        elements
    */
    
    function forEach(fn, ctx){
      var elements = this, i = 0, l = elements.length
      for(;i < l; i++) fn.call(ctx, elements[i], i, elements)
      return elements
    }
    
    
    
    function escapeNodes(nodes, one){
      var l, frag, i = 0
      if(!nodes) return null
      if(isNode(nodes)) return nodes
      if(isObject(nodes) && (l = nodes.length)) {
        if(one) return nodes[0]
        if((l == 1) && isNode(nodes[0])) return nodes[0]
        frag = document.createDocumentFragment()
        for(;i < l; i++) if(isNode(nodes[i])) frag.appendChild(nodes[i])
        return frag
      } 
      else if(typeof nodes == "string") {
        return one ? $$(nodes)[0] : escapeNodes($(nodes))
      }
      return nodes
    }
    
    /*
      Elements.prototype.html
      =======
      Reads or writes the string contents of the elements
      =======
      @arguments {
        string : content
      }
      @output 
        elements|array 
    */
    
    function html(string) {
      var self = this
      if(isString(string)) return each(self, function(element){
        $(element).empty()
        if(buggyNodeNames.test(element.nodeName)) {
          $(element).append(Elements.from(string, element.nodeName)) 
        } else element.innerHTML = string
      })
      return isElement(self[0]) ? self[0].innerHTML : null
    }
    
    /*
      Elements.prototype.text
      =======
      Reads or writes the string contents of the elements (not html)
      =======
      @arguments {
        string : content
      }
      @output 
        elements|array 
    */
    
    function text(string) {
      var self = this, textNode
      if(isString(string)) {
        textNode = document.createTextNode(string)
        return each(self, function(element){
          $(element).empty().append(textNode.cloneNode(true))
        })
      }
      return isElement(self[0]) ? self[0][innerText] : null
    }
    
    
    /*
      Elements.prototype.append
      =======
      Takes the first element of the list and appends the appendix into it 
      =======
      @arguments {
        appendix : node to insert
      }
      @output 
        elements
    */
  
    function append(appendix){
      var self = this
      appendix = escapeNodes(appendix)
      if(self.length && appendix) self[0].appendChild(appendix)
      return self
    }
    
    /*
      Elements.prototype.ancestors
      =======
      Iterates over the elements and for each returns an array of ancestors
      =======
      @arguments {}
      @output 
        array of arrays
    */
  
    function ancestors(){
      var results = []
        , el = this[0]
        , result = []
      if(!el) return null
      while((el = el.parentNode) && el != document && !isFragment(el)) result.push(el)
      return result
    }
    
    /*
      Elements.prototype.appendTo
      =======
      Iterates over the elements and appends them into a given element
      =======
      @arguments {
        element
      }
      @output 
        elements
    */
  
    function appendTo(element){
      element = escapeNodes(element, true)
      element.appendChild(escapeNodes(this))
      return this
    }
    
    /*
      Elements.prototype.prepend
      =======
      Takes the first element of the list and prepends the appendix into it 
      =======
      @arguments {
        appendix : node to insert
      }
      @output 
        elements
    */
  
    function prepend(appendix) {
      var self = this
      appendix = escapeNodes(appendix)
      if(self.length && appendix) self[0].insertBefore(appendix, self[0].firstChild)
      return self
    }
    
    /*
      Elements.prototype.prependTo
      =======
      Iterates over the elements and prepends them into a given element
      =======
      @arguments {
        element
      }
      @output 
        elements
    */
  
    function prependTo(element) {
      var fragment = document.createDocumentFragment()
      element = escapeNodes(element, true)
      each(this, function(appendix){
        if(!element) return false
        fragment.appendChild(appendix)
      })
      element.insertBefore(fragment, element.firstChild)
      return this
    }
    
    /*
      Elements.prototype.insertAfter
      =======
      Inserts the appendix after the first element of the elements instance
      =======
      @arguments {
        appendix
      }
      @output 
        elements
    */
  
    function insertAfter(appendix){
      var self = this, item, parent, fragment = document.createDocumentFragment()
      if(isNode(item = self[0])) {
        item = self[0]
        parent = item.parentNode
        appendix = escapeNodes(appendix)
        if(parent && appendix) parent.insertBefore(appendix, item.nextSibling)
      }
      return self
    }
    
    /*
      Elements.prototype.insertBefore
      =======
      Inserts the appendix before the first element of the elements instance
      =======
      @arguments {
        appendix
      }
      @output 
        elements
    */
  
    function insertBefore(appendix){
      var self = this, item, parent
      if(self.length) {
        item = self[0]
        parent = item.parentNode
        appendix = escapeNodes(appendix)
        if(parent && appendix) parent.insertBefore(appendix, item)
      }
      return self
    }
    
    /*
      Elements.prototype.siblings
      =======
      Returns the siblings of the elements
      =======
      @arguments {
        [dismissElement] : (default:false) remove the elements from the list
      }
      @output 
        elements
    */
  
    function siblings(dismissElement){
      var result = []
        , element = this[0]
  
      if(!isNode(element)) return null
      
        var parent = element.parentNode
          , children
          , index
        if(!parent) return new Elements()
        each(parent.children, function(item){
          if(dismissElement && item == element) return
          if(!_contains.call(result, item)) result.push(item)
        })
  
      return new Elements(result)
    }
    
    /*
      Elements.prototype.siblingsBefore
      =======
      Returns the siblings before the elements
      =======
      @arguments {}
      @output 
        elements
    */
  
    function siblingsBefore(){
      var el = this[0], siblings
      if(!isNode(el)) return null
      siblings = $(el).siblings()
      return new Elements([].slice.call(siblings, 0, _find.call(siblings, el)))
    }
    
    
    
    function previous(){
      var self = this[0]
      if(self) while(self = self.previousSibling) if(isElement(self)) break
      return new Elements(self)
    }
    /*
      Elements.prototype.siblingsAfter
      =======
      Returns the siblings after the elements
      =======
      @arguments {}
      @output 
        elements
    */
  
    function siblingsAfter(){
      var el = this[0], siblings
      if(!isNode(el)) return null
      siblings = $(el).siblings()
      return new Elements([].slice.call(siblings, _find.call(siblings, el) + 1))
    }
    
    
    function next(){
      var self = this[0]
      if(self) while(self = self.nextSibling) if(isElement(self)) break
      return new Elements(self)
    }
    
    /*
      Elements.prototype.children
      =======
      Returns the children of the elements
      =======
      @arguments {}
      @output 
        elements
    */
  
    function children(){
      var element = this[0]
      if(!isNode(element)) return null
      return new Elements(Array.from(element.children))
    }
    
    /*
      Elements.prototype.getElements
      =======
      Get the elements matching the given selector inside the given elements 
      =======
      @arguments {
        selector : string : css selector
      }
      @output 
        elements
    */
  
    function getElements(selector){
      var result = [], els
        , element = this[0]
      if(!isNode(element)) return null
      return $(selector, element)
    }
    
    /*
      Elements.prototype.empty
      =======
      Empties the elements
      =======
      @arguments {}
      @output 
        elements
    */
  
    function empty(){
      return each(this, function(element){
        var c = element.childNodes
        , l = c.length
      for(;l--;) element.removeChild(c[l])
      })
    }
    
    /*
      Elements.prototype.remove
      =======
      Removes the elements
      =======
      @arguments {}
      @output 
        elements
    */
  
    function remove(){
      return each(this, function(element){
        var parent = element.parentNode
        if(parent) parent.removeChild(element)
        return element
      })
    }
    
  
    function getStyle(element, property){
      var style
      if(!isElement(element)) return null
      style = GET_COMPUTED ? window.getComputedStyle(element, false) : element.currentStyle
      if(isString(property)){
        return style[property == "float" ? prefixFloat : property.camelize().replace(/^moz/, "Moz").replace(/^o/, "O")]
      } 
      if(isArray(property)) {
        var o = {}
        property.each(function(item){
          o[item] = style[item == "float" ? prefixFloat : item.camelize().replace(/^moz/, "Moz").replace(/^o/, "O")]
        })
        return o
      }  
    }
  
    function suffix(property){
      if(typeof property == "number" && property) return property.toString() + "px"
      return property.toString()
    }
    
    /*
      Elements.prototype.css
      =======
      Collects the style objects, or sets them
      =======
      @arguments {}
      @output 
        elements
    */
  
  
    function css(property, property2){
      var self = this
        switch(arguments.length){
          case 1: 
            if(isObject(property) && !isArray(property)) return each(this, function(el){
              Object.each(property, function(item, index){
                el.style[index == "float" ? prefixFloat : index.camelize()] = suffix(item)
              })
            })
            if(isElement(self[0])) return getStyle(self[0], property)
            return null
          break
          case 2: 
            property = property == "float" ? prefixFloat : property.camelize()
            property2 = suffix(property2)
            return each(self, function(element){
              element.style[property] = property2
            })
          break
      } 
    }
    
    /*
      Elements.prototype.getValue
      =======
      Collects the values of the given elements
      =======
      @arguments {}
      @output 
        values
    */
  
    function getValue(){
      var element
      if(!isElement(element = this[0])) return null
        var tag = element.nodeName.match(_formElements)
          , options
        if(!tag || element.disabled) return null
        if(tag[0] == "SELECT"){
          options = element.options
          if(element.multiple) return _select.call(options, function(item){return !!item.selected}).pluck("value")
          return options[element.selectedIndex].value
        }
        if(_checkables.test(element.type)) return element.checked ? element.value : undefined
        return element.value
    }
    
    /*
      Elements.prototype.setValue
      =======
      Sets the values of the given elements
      =======
      @arguments {}
      @output 
        elements
    */
  
  
    function setValue(value){
      return each(this, function(element){
        var tag = element.nodeName.match(_formElements)
          , options
          , plucked
        if(!tag || element.disabled) return element
        if(tag[0] == "SELECT"){
          options = element.options
          if(element.multiple) each(options, function(item){item.selected = false})
          plucked = _pluck.call(options, "value")
          each([].concat(value), function(item){
            var index = isNumber(item) ? item : _find.call(plucked, item)
            if(index > -1 && options.length > index) options[index].selected = "selected"
          })
        } else if (tag[0] == "TEXTAREA"){
          $(element).empty().append(document.createTextNode(value))
        } else {
          element.value = value
        }
      })
    }
    
    /*
      Elements.prototype.index
      =======
      Return the index of the element in its parent children
      =======
      @arguments {}
      @output 
        number or null
    */
  
    function index(){
      return _collect.call(this, function(item){
        var parent = item.parentNode
        if(!parent) return null
        return _find.call(parent.children, item)
      })
    }
    
    /*
      Elements.prototype.serialize
      =======
      Collects objects of {name:value[,…]} of the form elements inside of the elements
      =======
      @arguments {}
      @output 
        array of objects
    */
  
    function serialize(){
        var elements = $(this[0]).getElements("input, select, textarea, button")
          , result = {}
          , values = _collect.call(elements, function(item){
            return $(item).getValue()
          })
        _each.call(elements, function(item, index){
          var name = item.name
            if(isUndefined(values[index]) || values[index] === "" || !name) return
            if(name in result) result[name] = [].concat(result[name]).concat(values[index])
            else result[name] = values[index]
        })
        return result
    }
    
    /*
      Elements.prototype.attr
      =======
      Reads of writes the elements attributes
      =======
      @arguments {
        name : string
        [value] : value
      }
      @output 
        elements or array of values
    */
  
    function attr(name, value){
      var self = this
      if(isUndefined(value) && isNode(self[0])) return readAttr(name)(self[0])
      each(self, writeAttr(name, value))
      return self
    }
    
    /*
      Elements.prototype.data
      =======
      Reads of writes the elements data attributes
      =======
      @arguments {
        name : string
        [value] : value
      }
      @output 
        elements or array of values
    */
  
    function data(name, value){
      return attr.call(this, "data-" + name, value)
    }
    
    /*
      Elements.prototype.clone
      =======
      Returns a set of cloned elements
      =======
      @arguments {
        deep : boolean 
      }
      @output 
        elements
    */
    
    function clone(deep){
      var results = []
      each(this, function(item){
        results.push(item.cloneNode(deep))
      })
      return new Elements(results)
    }
    
    /*
      Elements.prototype.layout
      =======
      Returns the first element's coords object (data are relative to viewport)
      =======
      @arguments {
        classes : string : classes, space separated
      }
      @output 
        {
          top : number
          left : number
          right : number
          bottom : number
          height : number
          width : number
        }
    */
    
    function coords(){
      var self = this, lyt, r = {}
      if(isNode(self[0])) {
        lyt = self[0].getBoundingClientRect()
          r.top = parseInt(lyt.top, 10) // fix rounding issue
          r.left = parseInt(lyt.left, 10)
          r.bottom = parseInt(lyt.bottom, 10)
          r.right = parseInt(lyt.right, 10)
          r.width = parseInt(lyt.width, 10) || (r.right - r.left) || 0
          r.height = parseInt(lyt.height, 10) || (r.bottom - r.top) || 0
          return r
      }
      return null
    }
    
    /*
      Elements.prototype.offset
      =======
      Returns the first element's offset object 
      =======
      @arguments {
        classes : string : classes, space separated
      }
      @output 
        {
          top : number
          left : number
          height : number
          width : number
        }
    */
    
    function offset(){
      var self = this, el, parent, elCoords, offsetParentCoords, scrolledTop, scrolledLeft
      if(isNode(el = self[0])) {
        parent = el
        while(parent) {
          parent = parent.parentNode
          if(parent == document.body) break
          if(getStyle(parent, "position") != "static") break
        }
        elCoords = self.coords()
        offsetParentCoords = $(parent).coords()
        return {
            top :  elCoords.top - offsetParentCoords.top
          , left : elCoords.left -  offsetParentCoords.left
          , parent : parent
        }
      }
      return null
    }
    
    
    /*
      Elements.prototype.offset
      =======
      Returns the first element's offset object 
      =======
      @arguments {
        classes : string : classes, space separated
      }
      @output 
        {
          top : number
          left : number
          height : number
          width : number
        }
    */
    
    function globalOffset(){
      var self = this, el, rect
      if(isNode(el = self[0])) {
        rect = self.coords()
        return {
            top : (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) + rect.top
          , left : (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0) + rect.left
        }
      }
      return null
    }
    
    /*
      Elements.prototype.classNames
      =======
      Returns the elements classNames
      =======
      @arguments {}
      @output 
        elements
    */
  
    function classNames(){
      var cn
      if(!isElement(this[0])) return null
      if(classList) return Array.from(this[0].classList).sort()
      return (cn = this[0].className.match(/\S+/g)) && cn.sort() || []
    }
    
    /*
      Elements.prototype.hasClass
      =======
      Returns whether or not the first element has a given class
      =======
      @arguments {
        class : string
      }
      @output 
        elements
    */
    
    function hasClass(className){
      var c
      if(!isElement(this[0])) return null
      if(classList) return this[0].classList.contains(className)
      if(c = this[0].className) return c.split(" ").contains(className)
      return false
    }
    
    
    /*
      Elements.prototype.addClass
      =======
      Adds the given classNames
      =======
      @arguments {
        classes : string : classes, space separated
      }
      @output 
        elements
    */
  
    function addClass(classes){
      if(classes == null) return this
      classes = classes.match(/\S+/g)
      var l = classes.length, i
      if(classList){
        return each(this, function(element){
          for(i=0; i < l; i++) element.classList.add(classes[i])
        })
      } else {
        return each(this, function(element){
          var classNames = element.className.match(/\S+/g) || [], klass
          for(i=0; i < l; i++) if(!_contains.call(classNames, klass = classes[i])) classNames.push(klass)
          element.className = classNames.join(" ")
        })
      }
    }
  
    /*
      Elements.prototype.removeClass
      =======
      Removes the given classNames
      =======
      @arguments {
        classes : string : classes, space separated
      }
      @output 
        elements
    */
  
    function removeClass(classes){
      if(classes == null) return this
      classes = classes.match(/\S+/g)
      var l = classes.length, i
      if(classList){
        return each(this, function(element){
          for(i=0; i < l; i++) element.classList.remove(classes[i])
        })
      } else {
        return each(this, function(element){
          var classNames = element.className.match(/\S+/g) || [], index
          for(i=0; i < l; i++) if(!!~(index = _find.call(classNames, classes[i]))) classNames.splice(index, 1)
          element.className = classNames.join(" ")
        })
      }
    }
    
    /*
      Elements.prototype.toggleClass
      =======
      Toggles the given classNames
      =======
      @arguments {
        classes : string : classes, space separated
      }
      @output 
        elements
    */
  
    function toggleClass(classes){
      if(classes == null) return this
      classes = classes.match(/\S+/g)
      var l = classes.length, i
      if(classList){
        return each(this, function(element){
          for(i=0; i < l; i++) element.classList.toggle(classes[i])
        })
      } else {
        return each(this, function(element){
          var classNames = element.className.match(/\S+/g) || [], klass, index
          for(i=0; i < l; i++) {
            if(~(index = _find.call(classNames, klass = classes[i]))) classNames.splice(index, 1)
            else classNames.push(klass)
          }
          element.className = classNames.join(" ")
        })
      }
    }

    return {
        constructor : Elements
      , length : 0
      , push : [].push
      , append : append
      , each : forEach
      , html : html
      , text : text
      , appendTo : appendTo
      , prepend : prepend
      , prependTo : prependTo
      , insertAfter : insertAfter
      , insertBefore : insertBefore
      , siblings : siblings
      , ancestors : ancestors
      , siblingsBefore : siblingsBefore
      , previous : previous
      , siblingsAfter : siblingsAfter
      , next : next
      , children : children
      , getElements : getElements
      , empty : empty
      , remove : remove
      , css : css
      , listen : function(events, selector, handler){
        return each(this, function(el){
          listen(el, events, selector, handler)
        })
      }
      , fire : function(evt, data, bubble){
        return each(this, function(el){
          fire(el, evt, data, bubble)
        })
      }
      , stopListening : function(events, handler){
        return each(this, function(el){
          stopListening(el, events, handler)
        })
      }
      , getValue : getValue
      , setValue : setValue
      , index : index
      , serialize : serialize
      , attr : attr
      , data : data
      , clone : clone
      , coords : coords
      , offset : offset
      , globalOffset : globalOffset
      , classNames : classNames
      , addClass : addClass
      , hasClass : hasClass
      , removeClass : removeClass
      , toggleClass : toggleClass
      , splice : [].splice
    }
  
  })()

  Elements.implement(elementMethods)
  
  function ready(fn){
    if(!isFunction(fn)) return
    if (ready.status) fn.delay(0)
    else ready.stack.push(fn)
  }
  
  function updateStatus(){ 
    if(!/in/.test(document.readyState) && document.body) {
      if(!document.head) document.head = document.getElementsByTagName("head")[0] // id fix
      ready.status = true
      ready.stack = ready.stack.reject(function(fn){ fn.delay(0); return true})
    }
    if(!ready.status) updateStatus.delay(0.001)
  }
  
  updateStatus.delay(0.001)
  ready.status = false
  ready.stack = []
  document.ready = ready 
    
  /*
    $
    =======
    Executes a given function onDomReady or gets elements from CSS selector
    =======
    @arguments {
      string : css selector or function to execute on domReady
      [context] : scope to find the elements
    }
    @output 
      elements|undefined
  */
  
  function $(string, context){
    if(typeof string == "function") return document.ready(string)
    if(string && typeof string == "object" && ("length" in string || "nodeType" in string)) return new Elements(string)
    return Selector(string, context, Elements)
  }
  
  $.create = Elements.create
  
  function $$(string, context, limit){
    return Selector(string, context, Elements, limit || 1)
  }



  window.Request = Request
  window.Elements = Elements
  window.Browser = Browser
  window.Class = Class
  var dollar = window.$
  window.$ = window.Craft = $
  window.$$ = $$
  $.noConflict = function(){
    window.$ = dollar
    return $
  }
  $.version = "2.0.0"
  $.implement = Function.prototype.implement.attach(Elements)

})(window, window.document)