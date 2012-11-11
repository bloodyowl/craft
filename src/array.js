  extend(Array.prototype, function(){
    
    function forEach(fn, context){
      var self = this
        , index = 0
        , length = self.length
      
      for(;index < length; index++) fn.call(context, self[index], index, self)
      
      return self 
    }
    
    function map(fn, context){
      var self = this
        , mapped = Array(self.length)
        , index = 0
        , length = self.length
      
      for(;index < length; index++) mapped[index] = fn.call(context, self[index], index, self)
      
      return mapped 
    }
    
    function filter (fn, context){
      var self = this
        , filtered = []
        , index = 0
        , length = self.length
      
      for(;index < length; index++) if(fn.call(context, self[index], index, self)) filtered.push(self[index])
      
      return filtered 
    }
  
    function reduce(fn, context){
      var self = this
        , reduced = self[0]
        , index = 1
        , length = self.length
      
      for(;index < length; index++) reduced = fn(reduced, self[index], index, self)    
      return reduced 
    }
    
    function indexOf(search, start){
      var self = this
        , index = start || 0
        , length = self.length
      for(;index < length; index++) if(self[index] === search) return index
      return -1
    }
    
    function contains(value){
      return !!~this.indexOf(value)
    }
    
    function pluck(property){
      var self = this
        , plucked = Array(self.length)
        , index = 0
        , length = self.length
      
      for(;index < length; index++) plucked[index] = self[index][property]
      
      return plucked 
    }
    
    function isEmpty(){
      var self = this
        , index = 0
        , length = self.length
      for(;index < length; index++) return false
      return true
    }
    
    function clone(){
      return this.concat()
    }
    
    function clean(){
      var self = this
        , cleaned = []
        , index = 0
        , length = self.length
        , item
      for(;index < length; index++) {
        item = self[index]
        if(typeof item != "number" && !item) continue
        if(typeof item == "object" && item.length === 0) continue
        cleaned.push(item)
      }
      return cleaned
    }
    
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
    
    function invoke(fn){
      var self = this
        , index = 0
        , length = self.length
        , args = toArray(arguments, 1)
        , result = []
      for(;index < length; index++) result[index] = (typeOf(fn) == "string" ? Element.methods[fn] : fn).apply($(self[index]), args)
      return result
    }
    
    
    function group(){
      return this.reduce(function(a,b){ return [].concat(a).concat(b) })
    }
    
    return {
      forEach: forEach,
      clone: clone,
      map: map,
      filter: filter,
      reduce: reduce,
      group: group,
      indexOf: indexOf,
      contains: contains,
      pluck: pluck,
      isEmpty: isEmpty,
      invoke: invoke,
      clean: clean,
      intersect: intersect,
      difference: difference
    }
  })