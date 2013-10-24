;(function(craft){
  
  var eventClass = craft.defineClass(craftEventClass)
    , nodeList = craft.nodeList
    , standard = !!docEl.addEventListener
    , _matches = craft.__matchesSelector__
    , wordsRE = /(\S+)/g
    , _toString = {}.toString
    , STRING_CLASS = "[object String]"
    , ARRAY_CLASS = "[object Array]"
  
  craft.eventClass = eventClass
  
  function preventDefault(){
    this.returnValue = false
  }
  
  function stopPropagation(){
    this.cancelBubble = true
  }
  
  function eventObject(evt){
    var object = craft.create(evt)
      , charCodeExists
      , button = object.button
    
    if(!("target" in evt)) object.target = evt.srcElement
    if(!("preventDefault" in evt)) object.preventDefault = preventDefault
    if(!("stopPropagation" in evt)) object.stopPropagation = stopPropagation

    if(object.which == null) {
      if(object.charCode != null || object.keyCode != null) {
        object.which = object.charCode != null ? object.charCode : object.keyCode
      }
      if(button != null) {
        object.which = 0
        if(button & 1) object.which = 1
        if(button & 2) object.which = 3
        if(button & 4) object.which = 2
      }
    } 
    return object
  }
  
  
  function craftEventClass(){
  
    var self = this
    
    self.constructor = EventClass
    function EventClass(node){
      var self = this
      self.thisValue = node
      node.events = self
      self.router = function(evt){
        return self.handleEvent(evt)
      }
    }
    
    self.handleEvent = handleEvent
    function handleEvent(evt){
      var self = this
        , list = self[evt.type]
        , target
      if(!list) return self
      evt = eventObject(evt)
      craft.each(list, function(item){ 
        if(item.selector){
          evt.delegated = matches(evt.target, item.selector)
          if(!evt.delegated) return
        }
        if(_toString.call(item.listener) == STRING_CLASS) {
          item.listener = self[item.listener]
        }
        if(typeof item.listener != "function") return
        item.listener.call(self.thisValue, evt)
      })
    }
    
    self.fire = fire
    function fire(type, evt){
      var self = this
        , object
        
      if(standard) {
        object = doc.createEvent("HTMLEvents")
        object.initEvent(type, true, true, win, 1)
        self.thisValue.dispatchEvent(object)
      } else {
        self.thisValue.fireEvent("on" + type, doc.createEventObject())
      }
      return self
    }
    
    self.push = push
    function push(type, object){
      var self = this
      ;(self[type] || (self[type] = []))
        .push(object)
    }
    
    self.pull = pull
    function pull(type, object){
      var self = this
        , listener = self[type].listener
      self[type] = craft.filter(self[type], function(item){
        var key
        for(key in object) {
          if(item[key] != object[key]) return true
        }
        return false
      })
      self[type].listener = listener
    }
    
    self.register = register
    function register(type, useCapture){
      var self = this
      if(self[type] && self[type].listener) return
      self[type].listener = true
      if(standard) {
        self.thisValue.addEventListener(type, self, useCapture)
        return 
      }
      self.thisValue.attachEvent("on" + type, self.router)
    }
    
    self.unregister = unregister
    function unregister(type, useCapture){
      var self = this
      if(!self[type] || !self[type].listener) return
      self[type].listener = false
      if(standard) {
        self.thisValue.removeEventListener(type, self, useCapture)
        return 
      }
      self.thisValue.detachEvent("on" + type, self.router)
    }
    
    self.add = add
    function add(type, selector, listener, useCapture){
      var self = this
        , object = {}
      
      if(typeof selector == "function") {
        useCapture = listener
        listener = selector
        selector = null
      }

      object.selector = selector
      object.listener = listener
      object.useCapture = !!useCapture

      self.push(type, object)
      self.register(type, object.useCapture)
    }
    
    self.remove = remove
    function remove(type, selector, listener, useCapture){
      var self = this
        , object = {}
      
      if(typeof selector == "function") {
        listener = selector
        selector = null
      }
      if(listener) object.listener = listener
      if(selector) object.selector = selector

      self.pull(type, object)
      self.unregister(type, object.useCapture)
    }
    
    self.bindAll = bindAll
    function bindAll(){
      craft.each(this, function(item, index){
        if(_toString.call(item) == ARRAY_CLASS) {
          if(!item.length) return
          self.register(index)
        }
      })
    }
    
    self.clear = clear
    function clear(){
      craft.each(this, function(item, index){
        if(_toString.call(item) == ARRAY_CLASS) {
          self[index].length = 0
          self.unregister(index)
        }
      })
    }
        
    function matches(node, selector){
      if(_matches.call(node, selector)) return node
      while(node = node.parentNode) {
        if(node.nodeType != 1) break
        if(_matches.call(node, selector)) return node
      }
      return false
    }
    
  }
  
  function getEventStorage(node){
    return node.events || eventClass.create(node)
  }
  
  
  
  function listenEach(node){
    var storage = getEventStorage(node)
    storage.add.apply(storage, this)
  }
  
  nodeList.listen = listen
  function listen(){
    return this.each(listenEach, arguments)
  }
  
  
  
  function stopListeningEach(node){
    var storage = getEventStorage(node)
    storage.remove.apply(storage, this)
  }
  
  nodeList.stopListening = stopListening
  function stopListening(){
    return this.each(stopListeningEach, arguments)
  }
  
  
  
  function fireEach(node){
    var storage = getEventStorage(node)
    storage.fire.apply(storage, this)
  }
  
  nodeList.fire = fire
  function fire(){
    return this.each(fireEach, arguments)
  }


})(craft)
