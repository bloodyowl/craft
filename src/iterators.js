;(function(craft){
  
  var objectPrototype = Object.prototype
      // IE enum bug
    , enumBugProperties = [
          "constructor"
        , "hasOwnProperty"
        , "isPrototypeOf"
        , "propertyIsEnumerable",
        , "toLocaleString"
        , "toString"
        , "valueOf"
      ]
    , hasEnumBug = !objectPrototype.propertyIsEnumerable.call({constructor:K}, "constructor")
    , hasObjectKeys = typeof Object.keys == "function"
    , objectKeys = Object.keys
    , _hasOwnProperty = objectPrototype.hasOwnProperty  
    , callbacks = [
          function(fn, thisValue){
            return function(){
              return fn.call(thisValue)
            }
          }
        , function(fn, thisValue){
            return function(a){
              return fn.call(thisValue, a)
            }
          }
        , function(fn, thisValue){
            return function(a,b){
              return fn.call(thisValue, a, b)
            }
          }
        , function(fn, thisValue){
            return function(a,b,c){
              return fn.call(thisValue, a, b, c)
            }
          }
        , function(fn, thisValue){
            return function(a,b,c,d){
              return fn.call(thisValue, a, b, c, d)
            }
          }
        , function(fn, thisValue){
            return function(){
              return fn.apply(thisValue, arguments)
            }
          }
      ]

  function K(){}

  craft.getKeys = getKeys
  function getKeys(object){
    var index
      , keys
      , length
      , enumKey
      , ctor
      , proto
      
    if(object == null) return []
    if(hasObjectKeys) return objectKeys(object)
    keys = []
    for(index in object) {
      if(_hasOwnProperty.call(object, index)) keys.push(index)
    }
    if(hasEnumBug) {
      index = -1
      length = enumBugProperties.length
      while(++index < length) {
        enumKey = enumBugProperties[index]
        if(_hasOwnProperty.call(object, enumKey)) {
          keys.push(enumKey)
        }
      }
    }
    return keys
  }
  
  
  craft.getValues = getValues
  function getValues(object){
    var keys = getKeys(object)
      , index = -1, length = keys.length
      , values = [], key
    while(++index < length) {
      key = keys[index]
      values[index] = object[key]
    }
    return values
  }
  
  function createCallback(fn, thisValue, length){
    if(thisValue === void 0) {
      return fn
    }
    if(length in callbacks) {
      return callbacks[length](fn, thisValue)
    }
    return callbacks[callbacks.length - 1](fn, thisValue)
  }
  
  function isArrayLike(object){
    var l
    return object && 
        parseInt(l = object.length, 10) === l && 
        _hasOwnProperty.call(object, l - 1)
  }
  
  craft.each = craft.forEach = each
  function each(collection, fn, thisValue){
    var index = -1, length
      , keys, key
      , callback = createCallback(fn, thisValue, 3)
    if(!collection) return collection
    if(isArrayLike(collection)) {
      length = collection.length
      while(++index < length) {
        if(callback(collection[index], index, collection) === false) break
      }
      return collection
    }
    keys = getKeys(collection)
    length = keys.length
    while(++index < length) {
      key = keys[index]
      if(callback(collection[key], key, collection) === false) break
    }
    return collection
  }
  
  craft.map = craft.collect = map
  function map(collection, fn, thisValue){
    var index = -1, length
      , keys, key
      , callback = createCallback(fn, thisValue, 3)
      , result
    if(!collection) return null
    if(isArrayLike(collection)) {
      length = collection.length
      result = Array(length)
      while(++index < length) {
        result[index] = callback(collection[index], index, collection)
      }
      return result
    }
    keys = getKeys(collection)
    result = {}
    length = keys.length
    while(++index < length) {
      key = keys[index]
      result[key] = callback(collection[key], key, collection)
    }
    return result
  }
  
  
  craft.pluck = pluck
  function pluck(collection, propertyName){
    var index = -1, length, item
      , keys, key
      , result
    if(!collection) return null
    if(isArrayLike(collection)) {
      length = collection.length
      result = Array(length)
      while(++index < length) {
        result[index] = (item = collection[index]) != null ? item[propertyName] : null
      }
      return result
    }
    keys = getKeys(collection)
    result = {}
    length = keys.length
    while(++index < length) {
      key = keys[index]
      result[key] = (item = collection[key]) != null ? item[propertyName] : null
    }
    return result
  }
  
  
  craft.filter = craft.select = filter
  function filter(collection, fn, thisValue){
    var index = -1, length
      , keys, key
      , callback = createCallback(fn, thisValue, 3)
      , result, item
    if(!collection) return null
    if(isArrayLike(collection)) {
      length = collection.length
      result = []
      while(++index < length) {
        if(callback(item = collection[index], index, collection)) {
          result.push(item)
        }
      }
      return result
    }
    keys = getKeys(collection)
    result = {}
    length = keys.length
    while(++index < length) {
      key = keys[index]
      if(callback(item = collection[key], key, collection)) {
        result[key] = item
      }
    }
    return result
  }
  
  craft.reject = reject
  function reject(collection, fn, thisValue){
    var index = -1, length
      , keys, key
      , callback = createCallback(fn, thisValue, 3)
      , result, item
    if(!collection) return null
    if(isArrayLike(collection)) {
      length = collection.length
      result = []
      while(++index < length) {
        if(!callback(item = collection[index], index, collection)) {
          result.push(item)
        }
      }
      return result
    }
    keys = getKeys(collection)
    result = {}
    length = keys.length
    while(++index < length) {
      key = keys[index]
      if(!callback(item = collection[key], key, collection)) {
        result[key] = item
      }
    }
    return result
  }
  
  
  craft.reduce = craft.fold = reduce
  function reduce(collection, fn, initialValue, thisValue){
    var index = -1, length
      , keys, key
      , callback = createCallback(fn, thisValue, 4)
      , result
    if(!collection) return null
    if(isArrayLike(collection)) {
      length = collection.length
      result = arguments.length > 2 ? initialValue : collection[++index]
      while(++index < length) {
        result = callback(result, collection[index], index, collection)
      }
      return result
    }
    keys = getKeys(collection)
    length = keys.length
    result = arguments.length > 2 ? initialValue : collection[keys[++index]]
    while(++index < length) {
      key = keys[index]
      result = callback(result, collection[key], key, collection)
    }
    return result
  }
  
  craft.reduceRight = craft.foldRight = reduceRight
  function reduceRight(collection, fn, initialValue, thisValue){
    var length
      , keys, key
      , callback = createCallback(fn, thisValue, 4)
      , result
    if(!collection) return null
    if(isArrayLike(collection)) {
      length = collection.length
      result = arguments.length > 2 ? initialValue : collection[--length]
      while(--length > -1) {
        result = callback(result, collection[length], length, collection)
      }
      return result
    }
    keys = getKeys(collection)
    length = keys.length
    result = arguments.length > 2 ? initialValue : collection[keys[--length]]
    while(--length > -1) {
      key = keys[length]
      result = callback(result, collection[key], key, collection)
    }
    return result
  }
  
})(craft)
