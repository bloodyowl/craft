;(function(craft){
  
  var nativeConcat = [].concat
    , nativeSlice = [].slice
    , hasOwnProperty = {}.hasOwnProperty
  
  function createCurried(fn, args, length, thisValue){
    function curried(){
      var currentArgs = nativeConcat.apply(args, arguments)
      if(length - currentArgs.length <= 0) {
        return fn.apply(thisValue === void 0 ? this : thisValue, currentArgs)
      }
      return createCurried(fn, currentArgs, length, thisValue)
    }
    curried.prototype = fn.prototype
    return curried
  }
  
  craft.curry = curry
  function curry(fn, length, thisValue){
    length = typeof length == "number" ? length : fn.length
    return createCurried(fn, [], length, thisValue)
  }
  
  craft.partial = partial
  function partial(fn){
    var args = nativeSlice.call(arguments, 1)
    function partialFn(){
      var currentArgs = nativeConcat.apply(args, arguments)
      return fn.apply(this, currentArgs)
    }
    partialFn.prototype = fn.prototype
    return partialFn
  }
  
  function composeRunner(value, fn){
    return fn(value)
  }
  
  craft.compose = compose
  function compose(){
    var args = nativeSlice.call(arguments)
      , last = args.pop()
    return function(){
      return craft.reduceRight(args, composeRunner, last.apply(null, arguments))
    }
  }
  
  craft.after = after
  function after(times, callback){
    var ran = false
    function afterInterface(){
      var args = arguments
      if(ran) return null
      if(--times > 0) return
      ran = true
      setTimeout(function(){
        callback.apply(null, args)
      }, 0)
    }
    return afterInterface
  }
  
  craft.delay = delay
  function delay(fn, wait){
    var args = nativeSlice.call(arguments, 2)
    return setTimeout(function(){
      fn.apply(null, args)
    }, typeof wait == "number" ? wait : 0)
  }
  
  craft.debounce = debounce
  function debounce(fn, wait){
    var timeoutId = null
    return function(){
      var args = arguments
      if(timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(function(){
        fn.apply(null, args)
      }, wait)
    }
  }
  
  function defaultHasher(value){
    return value
  }
  
  craft.memoize = memoize
  function memoize(fn, hasher, limit){
    var cache = {}
      , i = -1
    limit = limit || Infinity
    hasher = hasher || defaultHasher
    return function(){
      var self = this
        , args = arguments
        , key = hasher.apply(self, args)
      if(hasOwnProperty.call(cache, key)) {
        return cache[key]
      }
      if(++i < limit) {
        return cache[key] = fn.apply(self, args)
      }
      return fn.apply(self, args)
    }
  }
  
})(craft)
