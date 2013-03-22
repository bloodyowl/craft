var Arrays = (function(){
  
  var _arr = []
    , _sort = _arr.sort
    , _slice = _arr.slice
  
  /*
    Array.prototype.each
    =======
    Iterates over the array and returns it
    =======
    @arguments {
      fn : iterator
      [context] : context of fn
    }
    @output 
      array
  */

  function each(fn, context){
    var self = this
      , index = 0
      , length = self.length
    if(arguments.length > 1){
      for(;index < length; index++) if(fn.call(context, self[index], index, self) === false) break
    } else {
      for(;index < length; index++) if(fn(self[index], index, self) === false) break
    }

    return self
  }
  
  /*
    Array.prototype.collect
    =======
    Iterates over the array and returns a newArray with the values of fn(item, index, array)
    =======
    @arguments {
      fn : iterator
      [context] : context of fn
    }
    @output 
      array : newArray
  */

  function collect(fn, context){
    var self = this
      , mapped = Array(self.length)
      , index = 0
      , length = self.length

    if(arguments.length > 1){
      for(;index < length; index++) mapped[index] = fn.call(context, self[index], index, self)
    } else {
      for(;index < length; index++) mapped[index] = fn(self[index], index, self)
    }

    return mapped
  }
  
  /*
    Array.prototype.select
    =======
    Iterates over the array and returns a newArray with the items for which fn(item, index, array) returned true
    =======
    @arguments {
      fn : iterator
      [context] : context of fn
    }
    @output 
      array : newArray
  */

  function select (fn, context){
    var self = this
      , filtered = []
      , index = 0
      , length = self.length
      , cache

    if(arguments.length > 1){
      for(;index < length; index++) {
        cache = self[index]
        if(fn.call(context, cache, index, self)) filtered.push(cache)
      }
    } else {
      for(;index < length; index++) {
        cache = self[index]
        if(fn(cache, index, self)) filtered.push(cache)
      }
    }

    return filtered
  }
  
  /*
    Array.prototype.reject
    =======
    Iterates over the array and returns a newArray with the items for which fn(item, index, array) returned false
    =======
    @arguments {
      fn : iterator
      [context] : context of fn
    }
    @output 
      array : newArray
  */

  function reject (fn, context){
    var self = this
      , filtered = []
      , index = 0
      , length = self.length
      , cache

    if(arguments.length > 1) {
      for(;index < length; index++) {
        cache = self[index]
        if(!fn.call(context, cache, index, self)) filtered.push(cache)
      } 
    } else {
      for(;index < length; index++) {
        cache = self[index]
        if(!fn(cache, index, self)) filtered.push(cache)
      } 
    }
    return filtered
  }
  
  /*
    Array.prototype.fold
    =======
    Iterates over the array and returns the last value returned by the fn(item, next, index, array).
    =======
    @arguments {
      fn : iterator
      [context] : context of fn
      [initial] : original value (if not set, initial is the array[0]
    }
    @output 
      result
  */


  function fold(fn, context, initial){
    var self = this
      , hasInit = arguments.length > 2
      , reduced = hasInit ? initial : self[0]
      , index = hasInit ? 0 : 1
      , length = self.length

    for(;index < length; index++) reduced = fn.call(context, reduced, self[index], index, self)
    return reduced
  }
  
  /*
    Array.prototype.foldRight
    =======
    Iterates (backwards) over the array and returns the last value returned by the fn(item, next, index, array).
    =======
    @arguments {
      fn : iterator
      [context] : context of fn
      [initial] : original value (if not set, initial is the array[array.length - 1]
    }
    @output 
      result
  */
  
  
  function foldRight(fn, context, initial){
    var self = this
      , hasInit = arguments.length > 2
      , length = self.length
      , reduced = hasInit ? initial : self[length - 1]
      , index = hasInit ? length : length - 1
  
    for(;index--;) reduced = fn.call(context, reduced, self[index], index, self)
    return reduced
  }
  
  /*
    Array.prototype.find
    =======
    Return the index of the searched value (if not found, returns -1).
    =======
    @arguments {
      search : value to search
      [start] : start (if not set, is 0)
    }
    @output 
      number : index
  */

  function firstMatch(search, start, thisValue){
    var self = this
      , index = typeof start == "number" && !isNaN(start) ? start : 0
      , length = self.length
    if(index < 0) index = 0
    if(index > self.length) return -1
    if(Object.isFunction(search)) {
      for(;index < length; index++) if(search.call(thisValue, self[index], index, self)) return index
    } else if(Object.isRegExp(search)) {
      for(;index < length; index++) if(typeof self[index] == "string" && search.test(self[index])) return index
    } else {
      for(;index < length; index++) if(self[index] === search) return index
    }
    return -1
  }
  
  /*
    Array.prototype.findLast
    =======
    Return the last index of the searched value (if not found, returns -1).
    =======
    @arguments {
      search : value to search
      [start] : start (if not set, is array.length)
    }
    @output 
      number : index
  */

  function lastMatch(search, start, thisValue){
    var self = this
      , index = typeof start == "number" && !isNaN(start) ? start : self.length
    if(index > self.length) index = self.length
    if(index < 0) return -1
    if(Object.isFunction(search)) {
      for(;index--;) if(search.call(thisValue, self[index], index, self)) return index
    } else if(Object.isRegExp(search)) {
      for(;index--;) if(typeof self[index] == "string" && search.test(self[index])) return index
    } else {
      for(;index--;) if(self[index] === search) return index
    }
    return -1
  }
  
  /*
    Array.prototype.contains
    =======
    Returns the presence of the searched item in the array
    =======
    @arguments {
      value : value to search
    }
    @output 
      boolean : presence
  */


  function contains(value){
    var self = this
      , index = 0, l = self.length
    for(;index < l; index++) if(value === self[index]) return true
    return false
  }
  
  /*
    Array.prototype.pluck
    =======
    Returns an array filled with the given [property] of each item
    =======
    @arguments {
      property : property to get
    }
    @output 
      newArray
  */

  function pluck(property){
    var self = this
      , index = 0
      , length = self.length
      , plucked = Array(length)
    if(property == null) return self
    for(;index < length; index++) plucked[index] = self[index] != null ? self[index][property] : null

    return plucked
  }
  
  /*
    Array.prototype.isEmpty
    =======
    Returns the emptyness of the array
    =======
    @arguments {}
    @output 
      boolean : emptiness
  */

  function isEmpty(){
    var self = this
      , index = 0
      , length = self.length
    for(;index < length; index++) return false
    return true
  }
  
  /*
    Array.prototype.clone
    =======
    Returns a shallow copy of the array
    =======
    @arguments {}
    @output 
      array : cloned array
  */

  function clone(){
    return this.concat()
  }
  
  /*
    Array.prototype.clean
    =======
    Returns a new Array removing `false`, `null`, `undefined` & `[]` from the array.
    =======
    @arguments {}
    @output 
      cleaned array
  */

  function clean(){
    var self = this
      , cleaned = []
      , index = 0
      , length = self.length
      , item
    for(;index < length; index++) {
      item = self[index]
      if(typeof item != "number" && !item) continue
      if(isArray(item) && item.length === 0) continue
      cleaned.push(item)
    }
    return cleaned
  }
  
  /*
    Array.prototype.intersect
    =======
    Returns a new Array that returns items that are both present in the array and in values.
    =======
    @arguments {
      values : array to compare with
    }
    @output 
      intersection array
  */

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
  
  
  /*
    Array.prototype.difference
    =======
    Returns a new Array that returns items that are in the array, but not in values.
    =======
    @arguments {
      values : array to compare with
    }
    @output 
      difference array
  */

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
  
  /*
    Array.prototype.flatten
    =======
    Flattens the array
    =======
    @arguments {
      [deep] : boolean : flatten the array inside
    }
    @output 
      flattened array
  */

  function flatten(deep){
    return fold.call(this, function(a,b){ 
      if(deep && isArray(a)) a = flatten.call(a)
      if(deep && isArray(b)
      ) b = flatten.call(b)
      return a.concat(b) 
    }, null, [])
  }
  
  /*
    Array.prototype.sortBy
    =======
    Sorts the array by a property (and an optional custom algoritm)
    =======
    @arguments {
      property : string or number : property to sort
      [algoritm] : custom function 
    }
    @output 
      sorted array
  */

  function sortBy(property, algoritm){
    var self = this
    if(property == null) return self
    algoritm = algoritm || function(a,b){ return a < b ? -1 : 1 }
    return _sort.call(self, function(a, b){
      return algoritm(a[property], b[property])
    })
  }
  
  /*
    Array.prototype.groupBy
    =======
    Groups the array items by groups of `number` and optionnaly fills the missing last items by `fill`
    =======
    @arguments {
      number : groups size
      [fill] : replacement for last missing items
    }
    @output 
      grouped array
  */

  function groupBy(number, fill){
    var self = this
      , i = 0
      , l = Math.ceil(self.length / number)
      , cache = 0
      , result = []
      , last
    for(;i < l; i++) result.push(_slice.call(self, cache, cache += number))
    if(fill && result.last.length < number) while((last = result.last()).length < number) last.push(fill)
    return result
  }
  
  /*
    Array.prototype.last
    =======
    Returns the last item of the array or null if the array is empty
    =======
    @arguments {}
    @output 
      item
  */

  function last(){
    var self = this
    return self[self.length - 1]
  }
  
  /*
    Array.prototype.min
    =======
    Returns the minimum value of the array or null if the array is empty
    =======
    @arguments {
      [iterator] : fn to return a comparable value from fn(item) 
    }
    @output 
      minimum value
  */

  function min(iterator){
    return _sort.call(this, function(a, b){
      if(typeof iterator == "function") {
        a = iterator(a)
        b = iterator(b)
      }
      return a < b ? - 1 : 1
    })[0] || null
  }
  
  /*
    Array.prototype.max
    =======
    Returns the maximum value of the array or null if the array is empty
    =======
    @arguments {
      [iterator] : fn to return a comparable value from fn(item) 
    }
    @output 
      maximum value
  */

  function max(iterator){
    return _sort.call(this, function(a, b){
      if(typeof iterator == "function") {
        a = iterator(a)
        b = iterator(b)
      }
      return a > b ? - 1 : 1
    })[0] || null
  }
  
  /*
    Array.prototype.max
    =======
    Returns the groups of items having the same indexes in the array and in the arrays in arguments
    =======
    @arguments {
      [arr1 [,arr2 …] : arrays
    }
    @output 
      array of groups
  */

  function groupWith(){
    var self = this
      , arrays = [].slice.call(arguments)
    arrays.unshift(self)

    return collect.call(self, function(item, index){
      return arrays.pluck(index)
    })
  }
  
  
  function any(fn, ctx){
    var self = this 
      , l = self.length
      , i = 0
    for(;i < l; i++) if(fn.call(ctx, self[i], i, self)) return true
    return false
  }
  
  
  
  
  function all(fn, ctx){
    var self = this 
      , l = self.length
      , i = 0

    for(;i < l; i++) if(!fn.call(ctx, self[i], i, self)) return false
    return true
  }



  return {
      each: each
    , lastMatch : lastMatch
    , clone: clone
    , collect: collect
    , groupWith : groupWith
    , groupBy : groupBy
    , max: max
    , min : min
    , select: select
    , reject: reject
    , fold: fold
    , foldRight : foldRight
    , flatten: flatten
    , firstMatch: firstMatch
    , last : last
    , contains: contains
    , pluck: pluck
    , isEmpty: isEmpty
    , clean: clean
    , intersect: intersect
    , difference: difference
    , sortBy : sortBy
    , any : any
    , all : all
  }
})()


Array.implement(Arrays)
Object.extend(Array, Object.collect(Arrays, function(a){return function(i){return a.apply(i, [].slice.call(arguments, 1))}}))

 /*
    Array.from
    =======
    Converts an array-like object into an array
    =======
    @arguments {
      arrayLike : object to convert
      [start] : index where to start iterating
    }
    @output 
      array
  */

Array.from = function(arrayLike, start){
  if(!isObject(arrayLike) || !("length" in arrayLike)) return []
  var i = start || 0
    , l = arrayLike.length
    , array = []
  if(i < 0) i = 0
  if(i > l) return []
  for(;i < l; i++) array.push(arrayLike[i])
  return array
}

  /*
    Array.range
    =======
    Generates an array of successive numbers
    =======
    @arguments {
      start : default 0
      [end] : index where to stop iterating
    }
    @output 
      array
  */

Array.range = function (start, end){
  if(typeof start != "number") return []
  var hasEnd = typeof end == "number"
    , result = [], leftToRight

  end = hasEnd ? end : start
  start = hasEnd ? start : 0
  leftToRight = start < end

  if(leftToRight) for(;start <= end; start++) result.push(start)
  else for(;start >= end; start--) result.push(start)

  return result
}


