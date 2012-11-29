  extend(String.prototype, {
    parseJSON : function(){
      var self = this
      return "JSON" in window ? JSON.parse(self) : (new Function("return " + self))()
    },
    trim : function(){
      return this.replace(/^\s+|\s+$/g, "")
    },
    camelize : function(){
      return this.replace(/-\D/g, function(match, i){
        return i !== 0 ? match.charAt(1).toUpperCase() : match.charAt(1)
      })
    },
    capitalize : function(){
      return this.replace(/^\w|\s\w/g, function(match){
        return match.toUpperCase()
      })
    },
    compile : function(object) {
      if(arguments.length > 1) object = toArray(arguments)
    
      return this.replace(/\{\{([\w\*\.]*?)\}\}/g, function(path, match){
        var split = match.split(".")
        if(typeOf(object) == "string"){
          if(match == "*") return object
          else return ""
        }
        return split.fold(function(previous, actual){
          return actual in previous ? previous[actual] : ""
        }, object)
      })
    }
  }, false, true)  