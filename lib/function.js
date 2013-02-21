var functionMethods = (function(){

  var _arrayFrom = Array.from


  /*
    Function.prototype.attach
    =======
    Returns a function with context and n first arguments locked
    =======
    @arguments {
      context : function context
      [arg1[, arg2 …]] : first arguments
    }
    @output 
      attached function
  */

  function attach(context){
    var self = this
      , args = _arrayFrom(arguments, 1)
      
      function fn(){
        var t = this
        return self.apply(t instanceof fn && context != null ? t : context, args.concat(_arrayFrom(arguments)))
      }
      
    fn.prototype = Class.from(self.prototype)
    return fn
  }

  /*
    Function.prototype.partial
    =======
    Returns a function with n first arguments locked
    =======
    @arguments {
      arg1[, arg2 …] : first arguments
    }
    @output 
      attached function
  */


  function partial(){
    var self = this
      , args = _arrayFrom(arguments)
      
      function fn(){
        return self.apply(this, args.concat(_arrayFrom(arguments)))
      }
      
    fn.prototype = Class.from(self.prototype)
    return fn
  }

  /*
    Function.prototype.delay
    =======
    Delays a function of `time` seconds
    =======
    @arguments {
      time : duration in seconds
      arg1[, arg2 …] : first arguments
    }
    @output 
      setTimeout id
  */

  function delay(time){
    var self = this
      , args = _arrayFrom(arguments, 1)
    return window.setTimeout(function(){
      self.apply(undefined, args)
    }, time * 1000)
  }

  /*
    Function.prototype.every
    =======
    Executes a function every `time` seconds
    =======
    @arguments {
      time : duration in seconds
      arg1[, arg2 …] : first arguments
    }
    @output 
      setInterval id
  */


 function every(time){
    var self = this
      , args = _arrayFrom(arguments, 1)
    return window.setInterval(function(){
      self.apply(undefined, args)
    }, time * 1000)
  }

  /*
    Function.prototype.debounce
    =======
    Delays a callback of `time` seconds every time the returned function is executed. 
    If the timeout is still running when the function is executed, the timeout is reset
    =======
    @arguments {
      fn  : callback
      time : duration in seconds
    }
    @output 
      new function
  */

  function debounce(wait){
    var timeout, fn = this
    return function(){
      var args = arguments
      if(timeout) window.clearTimeout(timeout)
      timeout = window.setTimeout(function(){
        fn.apply(this, args)
        timeout = null
      }, wait * 1000)
    }
  }
  
  return {
      attach : attach
    , partial : partial
    , delay : delay
    , every : every
    , debounce : debounce
  }

})()

Function.implement(functionMethods)