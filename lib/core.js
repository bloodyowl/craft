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
      if(isBoolean(object)) return "boolean"
      if(isNumber(object)) return "number"
      if(isString(object)) return "string"
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
     return typeof object == "string" || _toString.call(object) == "[object String]"
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
     return typeof object == "number" || _toString.call(object) == "[object Number]"
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
     return typeof bool == "boolean" || _toString.call(bool) == "[object Boolean]"
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
  
   function isWindow(wind){
     return wind ? wind.window == wind : false
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
   
  
