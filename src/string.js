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
    }
  })  