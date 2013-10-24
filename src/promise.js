;(function(craft){
  
  var promise = craft.defineClass(_promise)
    , _isPrototypeOf = {}.isPrototypeOf
    , _hasOwnProperty = {}.hasOwnProperty
  
  craft.promise = promise
  
  function _promise(){
    
    var self = this
    
    self.PENDING = 0
    self.FULFILLED = 1
    self.REJECTED = 2
    self.EXECUTED = 4
    
    self.status = 0
    
    self.constructor = Promise
    function Promise(){
      var self = this
      self.callbacks = []
      return self
    }
    
    self.isPromise = isPromise
    function isPromise(object){
      return _isPrototypeOf.call(promise, object)
    }
    
    self.fulfill = fulfill
    function fulfill(value){
      var self = this
      if(self.status) return self
      self.status = self.FULFILLED
      self[self.FULFILLED] = value
      run(self, self.status)
      return self
    }
    
    self.reject = reject
    function reject(reason){
      var self = this
      if(self.status) return self
      self.status = self.REJECTED
      self[self.REJECTED] = reason
      run(self, self.status)
      return self
    }
    
    self.then = then
    function then(fulfillCallback, errorCallback){
      var self = this
        , returnedPromise = promise.create()
      push(self, fulfillCallback, 1, returnedPromise)
      push(self, errorCallback, 2, returnedPromise)
      run(self, self.status)
      return returnedPromise
    }
    
    function push(self, callback, state, boundPromise){
      if(typeof callback == "function"){
        self.callbacks.push({
            callback : callback
          , state : state
          , boundPromise : boundPromise
        })
      }
    }
    
    function run(self, state){
      var index = -1
        , callbacks = self.callbacks
        , length = self.callbacks.length
      while(++index < length) (function(){
        var callbackObject = callbacks[index]
        
        if(callbackObject.state & (~state | self.EXECUTED)) return
        
        setTimeout(function(){
          var result = callbackObject.callback[self._isWhenPromise ? "apply" : "call"](self, self[state])
          callbackObject.state |= self.EXECUTED
          
          if(promise.isPromise(result)) {
            return result.then(function(value){
              callbackObject.boundPromise.fulfill(value)
            }, function(value){
              callbackObject.boundPromise.reject(value)
            })
          } 

          callbackObject.boundPromise
            [callbackObject.state & self.FULFILLED ? "fulfill" : "reject"]
              (result)
                    
        }, 0)
        
      })()
    }
    
  }
  
  craft.when = promise.extend(function(){
    
    var self = this
    
    self._isWhenPromise = 1

    self.constructor = When
    function When(){
      var self = this
        , promises = arguments
        , length = promises.length
        , values = Array(length)
        , index = -1
        , current
      
      self.callbacks = []

      while(++index < length) {
        current = promises[index]
        if(!promise.isPromise(current)) {
          current = promise.create().fulfill(current)
        }
        current.then(fulfill(index), reject(index))
      }
      
      function fulfill(index){
        return function(value){
          var l = length
          values[index] = value
          while(--l > -1) {
            if(!_hasOwnProperty.call(values, l)) return
          }
          self.fulfill(values)
        }
      }
      
      function reject(index){
        return function(reason){
          self.reject(reason)
        }
      }
    }


  })
    
  
})(craft)
