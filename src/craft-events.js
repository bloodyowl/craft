;(function(craft){

  craft.events = craft.defineClass(Object.prototype, function(){
    
    var self = this
      , _isPrototypeOf = {}.isPrototypeOf

    function recursiveAsyncEach(array, fn){
      var index = -1
        , length = array.length
      array = array.concat()
      function iterator(){
        if(++index >= length) return
        setTimeout(function(){
          fn(array[index], index, array)
          iterator()
        }, 0)
      }
      iterator()
    }
    
    self.constructor = Events
    function Events(parent){
      var self = this
      self.__events__ = craft.create(null)
      self.__parent__ = parent
      return self
    }
    
    self.__events__ = null
    self.__parent__ = null

    self.listen = listen
    function listen(eventName, callback){
      var self = this
        , eventsObject = self.__events__
      if(!eventsObject[eventName]) eventsObject[eventName] = []
      eventsObject[eventName].push(callback)
      return self
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
        , eventsObject = self.__events__
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
    function fire(eventName, data){
      var self = this
        , eventsObject = self.__events__
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
        recursiveAsyncEach(function(item){
          item(eventWalker)
        })
      }
    
      if((parent = self.__parent__) && !eventWalker.__stopped__) {
        fire.call(parent, eventName, eventWalker)
      }
      return self
    }

    
  })
  
  craft.eventObject = craft.defineClass({}, function(){
    
    var self = this
    
    self.__stopped__ = false
    
    self.stop = stop
    function stop(){
      this.__stopped__ = true
    }
    
  })

})(craft)
