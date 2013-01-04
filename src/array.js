  extend(Array.prototype, function(){

    function each(fn, context){
      var self = this
        , index = 0
        , length = self.length

      for(;index < length; index++) fn.call(context, self[index], index, self)

      return self
    }

    function collect(fn, context){
      var self = this
        , mapped = Array(self.length)
        , index = 0
        , length = self.length

      for(;index < length; index++) mapped[index] = fn.call(context, self[index], index, self)

      return mapped
    }

    function select (fn, context){
      var self = this
        , filtered = []
        , index = 0
        , length = self.length

      for(;index < length; index++) if(fn.call(context, self[index], index, self)) filtered.push(self[index])

      return filtered
    }

    function fold(fn, initial){
      var self = this
        , hasInit = arguments.length != 1
        , reduced = hasInit ? initial : self[0]
        , index = hasInit ? 0 : 1
        , length = self.length

      for(;index < length; index++) reduced = fn(reduced, self[index], index, self)
      return reduced
    }

    function find(search, start){
      var self = this
        , index = start || 0
        , length = self.length
      for(;index < length; index++) if(self[index] === search) return index
      return -1
    }

    function contains(value){
      return !!~this.find(value)
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
        , argsL = args.length
        , result = []
        , method = typeOf(fn) == "string" ? Element.methods[fn] : fn
      
      if(argsL == 1) for(;index < length; index++) result[index] = method.call($(self[index]), args[0])
      if(argsL == 2) for(;index < length; index++) result[index] = method.call($(self[index]), args[0], args[1])
      if(argsL == 3) for(;index < length; index++) result[index] = method.call($(self[index]), args[0], args[1], args[2])
      if(argsL >= 4) for(;index < length; index++) result[index] = method.apply($(self[index]), args)
      
      return result
    }


    function group(){
      return this.fold(function(a,b){ return a.concat(b) }, [])
    }

    return {
      each: each,
      clone: clone,
      collect: collect,
      select: select,
      fold: fold,
      group: group,
      find: find,
      contains: contains,
      pluck: pluck,
      isEmpty: isEmpty,
      invoke: invoke,
      clean: clean,
      intersect: intersect,
      difference: difference
    }
  })