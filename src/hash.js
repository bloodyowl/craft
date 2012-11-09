  function Hash(object){
    var self = this
      , length
    
    if(!(self instanceof Hash)) return new Hash(object)
    extend(self, object, true)
    if(object && (length = object.length)) self.length = length
  }
  
  extend(Hash.prototype, function(){
    
    function forEach(fn, context){
      var self = this
        , index
      for(index in self) if(hasOwn.call(self, index)) fn.call(context, self[index], index, self)
      return self
    }
    
    function clone(){
      return new Hash(this)
    }
    
    function keys(){
      var array = []
      this.forEach(function(item, index){array.push(index)}) 
      return array
    }
    
    function values(){
      var array = []
      this.forEach(function(item){ array.push(item) })
      return array
    }
    
    function get(key){
      return this[key]
    }
    
    function set(key, value){
      var self = this
      self[key] = value
      return self
    }
    
    function isEmpty(){
      var self = this
        , index
      for(index in self) if(hasOwn.call(self, index)) return false
      return true
    }
    
    function toQueryString(){
      var self = this
        , queryString = ""
      self.forEach(function(item, index){
        if(!item) return
        queryString += index + "=" + [].concat(item).join("&" + index + "=") + "&"
      })
      queryString = queryString.slice(0, -1)
      return "encodeURI" in window ? encodeURI(queryString) : escape(queryString)
    }
    
    return {
      forEach: forEach,
      clone: clone,
      keys: keys,
      values: values,
      get: get,
      extend: extend,
      set: set,
      isEmpty: isEmpty,
      toQueryString: toQueryString
    }
  })
  
  extend(window, {
    Hash: Hash
  })