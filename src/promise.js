;(function(craft){
  
  var promise = craft.defineClass(craft.events, _promise)
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
      craft.events.constructor.call(self)
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
      self.fire("fulfill", value, self)
      self[self.FULFILLED] = value
      run(self, self.status)
      return self
    }
    
    self.reject = reject
    function reject(reason){
      var self = this
      if(self.status) return self
      self.status = self.REJECTED
      self.fire("reject", reason, self)
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
        , result
        , callbackObject
      craft.each(callbacks, function(cb){
        if(cb.state & (~state | self.EXECUTED)) return
        setTimeout(function(){
          try {
            if(self._isWhenPromise) {
              result = cb.callback.apply(null, self[state])
            } else {
              result = cb.callback.call(null, self[state])
            }
            cb.state |= self.EXECUTED
          } catch(e){
              cb.state |= self.EXECUTED
              setTimeout(function(){
                cb.boundPromise.reject(e)
              }, 0)
            return
          }
          if(promise.isPromise(result)) {
            result.then(function(value){
              cb.boundPromise.fulfill(value)
            }, function(value){
              cb.boundPromise.reject(value)
            })
            return
          }
          
          if(cb.state & self.FULFILLED) {
            cb.boundPromise.fulfill(result)
          } else {
            cb.boundPromise.reject(result)
          }
        }, 0)
      })
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
