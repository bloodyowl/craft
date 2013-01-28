/*!
  Craft.js
  1.2.2 
*/



;(function(window, document){


  var Craft = Craft || { version : "1.2.2" }
    , hasOwn = Object.prototype.hasOwnProperty
    , extend

  function typeOf(object){
    var type = typeof object
    if(object instanceof RegExp) return "regexp"
    if(object === null) return "null"
    if(object instanceof Array) return "array"
    return type
  }

  function toArray(list, start){
    if(!("length" in list)) return []
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

  window.Craft = Craft
  Object.typeOf = typeOf
  Array.convert = toArray



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
      clean: clean,
      intersect: intersect,
      difference: difference
    }
  })


  function Hash(object){
    var self = this
      , length
    
    if(!(self instanceof Hash)) return new Hash(object)
    extend(self, object, true)
    if(object && (length = object.length)) self.length = length
  }
  
  extend(Hash.prototype, function(){
    
    function each(fn, context){
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
      this.each(function(item, index){array.push(index)}) 
      return array
    }
    
    function values(){
      var array = []
      this.each(function(item){ array.push(item) })
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
      self.each(function(item, index){
        if(!item) return
        queryString += index + "=" + [].concat(item).join("&" + index + "=") + "&"
      })
      queryString = queryString.slice(0, -1)
      return "encodeURI" in window ? encodeURI(queryString) : escape(queryString)
    }
    
    return {
      each: each,
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


  extend(Function.prototype, {
    attach : function(context){
      var self = this
        , args = toArray(arguments, 1)
      return function(){
        return self.apply(context, args.concat(toArray(arguments)))
      }
    },
    partial : function(){
      var self = this
        , args = toArray(arguments)

      return function(){
        return self.apply(this, args.concat(toArray(arguments)))
      }
    },
    delay : function(time){
      var self = this
        , args = toArray(arguments, 1)
      return window.setTimeout(function(){
        self.apply(undefined, args)
      }, time * 1000)
    },
    every : function(time){
      var self = this
        , args = toArray(arguments, 1)
      return window.setInterval(function(){
        self.apply(undefined, args)
      }, time * 1000)
    }
  })


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


})(this, this.document)