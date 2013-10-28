;(function(craft){

  craft.events = craft.defineClass(Object.prototype, function(){
    
    var self = this
      , _isPrototypeOf = {}.isPrototypeOf
    
    self.constructor = Events
    function Events(parent){
      var self = this
      self._events = craft.create(null)
      self._parent = parent
      return self
    }
    
    self._events = null
    self._parent = null

    self.listen = listen
    function listen(eventName, callback){
      var self = this
        , eventsObject = self._events
      if(!eventsObject[eventName]) {
        eventsObject[eventName] = []
      }
      eventsObject[eventName].push(callback)
      return self
    }
    
    self.listenOnce = listenOnce
    function listenOnce(eventName, callback){
      var self = this
      self.listen(eventName, handler)
      function handler(){
        callback.apply(this, arguments)
        self.stopListening(eventName, handler)
      }
    }
    
    function removeCallback(callbackList, callback){
      var i = -1, l = callbackList.length
      while(++i < l) {
        if(callback === callbackList[i]) {
          callbackList.splice(i, 1)
          --i
          --l
        }
      }
    }
    
    function removeAllListeners(object){
      var i
      for(i in object) {
        delete object[i]
      }
    }
    
    self.stopListening = stopListening
    function stopListening(eventName, callback){
      var self = this
        , eventsObject = self._events
        , eventsObjectCallbacks
      if(!eventsObject) return self
      if(!eventName) {
        removeAllListeners(eventsObject)
        return
      }
    
      eventsObjectCallbacks = eventsObject[eventName]
      if(!eventsObjectCallbacks) return self
    
      if(callback) {
        removeCallback(eventsObjectCallbacks, callback)
      } else {
        eventsObjectCallbacks.length = 0
      }
      return self
    }
    
    self.fire = fire
    function fire(eventName, data, thisValue){
      var self = this
        , eventsObject = self._events
        , eventsObjectCallbacks
        , i = -1, l
        , parent
        , eventWalker
    
      if(!_isPrototypeOf.call(craft.eventObject, data)) {
        eventWalker = craft.create(craft.eventObject)
        eventWalker.data = data
      } else {
        eventWalker = data
      }
    
      if(!eventsObject) return self
    
      eventsObjectCallbacks = eventsObject[eventName]
    
      if(eventsObjectCallbacks) {
        craft.each(eventsObjectCallbacks, function(item){
          setTimeout(function(){
            item.call(thisValue, eventWalker)
          }, 0)
        })
      }
    
      if((parent = self._parent) && !eventWalker._stopped) {
        fire.call(parent, eventName, eventWalker)
      }
      return self
    }

    
  })
  
  craft.eventObject = craft.defineClass(function(){
    
    var self = this
    
    self._stopped = false
    
    self.stop = stop
    function stop(){
      this._stopped = true
    }
    
  })

})(craft)
