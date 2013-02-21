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