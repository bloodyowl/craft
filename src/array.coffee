###
Array @ Craft.js
https://github.com/mlbli/Craft
###

extend Array::, ->
   
   ###
   Faster-than-native [].forEach polyfill 
   ###
   forEach = (fn) ->
      array = @
      fn i, _i, array for i in array
      array
      
      
   clone = ->
      @concat()
   
   ###
   ECMAScript 5th Edition Methods
   ###  
   map = (fn) ->
      array = @
      mapped = []
      for i in array
         mapped[_i] = fn(i, _i, array) 
      mapped
      

   filter = (fn)->
      array = @
      filtered = []
      for i in array
        filtered.push(i) if fn i, _i, array 
      filtered
      
   reduce = (fn) ->
      array = @
      i = 0
      result = array[i]
      while ++i < array.length
         result = fn result, array[i], i, array
      result
      
   indexOf = (search, start = 0) ->
      array = @
      for [start .. array.length]
         return _i if array[_i] is search
      -1
   
   pluck = (property) ->
      @map((item) ->
         item[property]
      )
   
   isEmpty = ->
      array = @
      return false for own i of array
      true
      
   invoke = (method, args ...) ->
      array = @
      method.apply i, args for i in array
      @
   
   clean = ->
      array = @
      result = []
      for i in array
         continue if not i or (typeof i is "object" and i.length is 0)
         result.push(i)
      result
      
   intersect = (values) ->
      array = @
      result = []
      for i in array
         result.push(i) if values.indexOf(i) isnt -1
      result
   
   difference = (values) ->
      array = @
      result = []
      for i in array
         result.push(i) if values.indexOf(i) is -1
      result

   forEach: forEach,
   clone: clone,
   map: map,
   filter: filter,
   reduce: reduce,
   indexOf: indexOf,
   pluck: pluck,
   isEmpty: isEmpty,
   invoke: invoke,
   clean: clean,
   intersect: intersect,
   difference: difference