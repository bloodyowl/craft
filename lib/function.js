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
      , fn
      , length = self.length - args.length
      
      if(args.length) {
        fn = function fn(){
          var t = this
            , ctx = t instanceof fn && context != null ? t : context
          return arguments.length ? 
            self.apply(ctx, args.concat(_arrayFrom(arguments))) : 
            self.apply(ctx, args)
        }
      } 
      fn = function fn(){
          var t = this
            , ctx = t instanceof fn && context != null ? t : context
          return arguments.length ? 
            self.apply(ctx, args.concat(_arrayFrom(arguments))) : 
            self.apply(ctx, args)
        }
      
    fn.prototype = Class.from(self.prototype)
    fn.__length__ = length
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
      , length = self.length - args.length
      
      function fn(){
        return arguments.length ? 
          self.apply(this, args.concat(_arrayFrom(arguments))) : 
            self.apply(this, args)
      }
      
    fn.prototype = Class.from(self.prototype)
    fn.__length__ = length
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
    return win.setTimeout(function(){
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
      if(timeout) win.clearTimeout(timeout)
      timeout = win.setTimeout(function(){
        fn.apply(this, args)
        timeout = null
      }, wait * 1000)
    }
  }
  
  
  function getLength(){
    var self = this
    return self.__length__ || self.length || 0
  }
  
  return {
      attach : attach
    , partial : partial
    , delay : delay
    , debounce : debounce
    , getLength : getLength
  }

})()

Function.implement(functionMethods)