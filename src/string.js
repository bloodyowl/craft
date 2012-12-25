  extend(String.prototype, function(){
    
    var _trim = /^\s+|\s+$/g
      , _camelize = /-\D/g
      , _capitalize = /^\w|\s\w/g
      , _compile = /\{\{([\w\*\.]*?)\}\}/g
    
    function parseJSON(){
      var self = this
      return "JSON" in window ? JSON.parse(self) : (new Function("return " + self))()
    }
    
    function trim(){
      return this.replace(_trim, "")
    }
    
    function camelize(){
      return this.replace(_camelize, function(match, i){
        return i !== 0 ? match.charAt(1).toUpperCase() : match.charAt(1)
      })
    }
    
    function capitalize(){
      return this.replace(_capitalize, function(match){
        return match.toUpperCase()
      })
    }
    
    function compile(object) {
      var objectIsString
      
      if(arguments.length > 1) object = toArray(arguments)
      
      objectIsString = typeOf(object) == "string"
      return this.replace(_compile, function(path, match){
        var split = match.split(".")
        if(objectIsString){
          if(match == "*") return object
          else return ""
        }
        return split.fold(function(previous, actual){
          return actual in previous ? previous[actual] : ""
        }, object)
      })
    }
    
    return {
      parseJSON : parseJSON,
      trim : String.prototype.trim || trim,
      camelize : camelize,
      capitalize : capitalize,
      compile : compile
    }
  })  