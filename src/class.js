;(function(craft){
  
  function create(){
    var self = craft.create(this)
    if(typeof self.constructor == "function") {
      self.constructor.apply(self, arguments)
    }
    return self
  }
  
  function extendClass(fn){
    return defineClass(this, fn)
  }
  
  craft.extend = extend
  function extend(object, source){
    var keys = craft.getKeys(source)
      , index = -1, length = keys.length
      , key
    while(++index < length) {
      key = keys[index]
      object[key] = source[key]
    }
    return object
  }
  
  craft.defineClass = defineClass
  function defineClass(inherits, fn){
    var klass
    if(!fn) {
      fn = inherits
      inherits = null
    }
    klass = craft.create(inherits)
    klass.create = create
    klass.extend = extendClass
    if(typeof fn == "function") {
      fn.call(klass)
      return klass
    } 
    if(fn && typeof fn == "object") {
      extend(klass, fn)
      return klass
    }
    return klass
  }
  
})(craft)
