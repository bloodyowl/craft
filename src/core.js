  var Craft = Craft || { version : "0.2.0" }
    , hasOwn = Object.prototype.hasOwnProperty
    , extend

  function typeOf(object){
    var type = typeof object;
    if(object instanceof RegExp) return "regexp"
    if(object === null) return "null"
    if(object instanceof Array) return "array"
    return type
  }
  
  function toArray(list, start){
    var array = []
      , index = start || 0
      , length = list.length
    for(;index < length; index++) array.push(list[index])
    return array
  }
  
  extend = Object.extend = function(object, source, noCall){
    var index
    if(!noCall && typeOf(source) == "function") source = source()
    for(index in source) if(hasOwn.call(source, index)) object[index] = source[index]
    return object
  }
  
  extend(window, {
    Craft : Craft
  })
  
  extend(Object, {
    typeOf : typeOf
  })
  
  extend(Array, {
    convert : toArray
  })
  