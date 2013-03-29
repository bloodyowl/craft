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
    if(win.JSON) return JSON.parse(str)
    if(!str.isJSON()) throw new SyntaxError("JSON Parse Error : " + str)
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
    return str.replace(_caps, function(match){
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
    #{index} for an array or an object
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
