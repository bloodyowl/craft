  var doesntBubble = /blur|focus/
    , listener
    , unlistener
    , testEl = doc.createElement("i")
    , ieCache = []

    
  function delegate(handler, selector, el){
    var selectors = selector.match(/([^,])+/g)
      , i = 0
      , l = selectors.length
      , checkers = []

    if(!selectors) return handler
    
    for(;i < l; i++) checkers.push(Selector.matcher(selectors[i], el, false, true))
    
    function matches(element){
      var i = 0, cache
      for(;i < l; i++) if(!(cache = checkers[i](element))) return false
      return cache
    }
    
    return function(ev){
      var target = ev.target || ev.srcElement, rightTarget
      if(!(rightTarget = matches(target))) return
      handler.call(rightTarget, ev)
    }
  }
  
  function preventDefault(event){
    event = event || win.event
    if(event && typeof event.preventDefault == "function") event.preventDefault()
    else event.returnValue = false
  }
  
  function stopPropagation(event){
    event = event || win.event
    if(event && typeof event.stopPropagation == "function")  event.stopPropagation()
    else event.cancelBubble = true
  }
  
  function target(event){
    event = event || win.event
    return event.target || event.srcElement
  }
  
  function stop(event){
    preventDefault(event)
    stopPropagation(event)
  }
  
  function safeTarget(el) {
    return el != doc ? el :
      doc.createEvent && !el.dispatchEvent ? doc.documentElement :
      el
  }
  
  var fire = doc.createEvent ? 
    function (el, ev, data, bubble){
      el = safeTarget(el)
      bubble = isBoolean(bubble) ? bubble : true
      var obj = doc.createEvent("HTMLEvents")
      obj.initEvent("dataavailable", bubble, true)
      obj.eventName = ev
      obj.meta = data
      el.dispatchEvent(obj)
      return obj
    } : 
    function (el, ev, data, bubble){
      el = safeTarget(el)
      var obj = doc.createEventObject()
        , type
      bubble = isBoolean(bubble) ? bubble : true
      type = obj.eventType = bubble ? "ondataavailable" : "onlosecapture"
      obj.eventName = ev
      obj.meta = data
      el.fireEvent(type, obj)
      return obj
    }
  
  var eventMethods = {
      preventDefault : preventDefault
    , stopPropagation : stopPropagation
    , target : target
    , stop : stop
    , fire : fire
  }
  
  if(win.Event) Object.extend(win.Event, eventMethods)
  else win.Event = eventMethods
  
  function createHandler(el, ev, handler, selector){
    var response = handler, realEvent
    if(!!~ev.indexOf(":")) {
      response = isString(selector) ? 
        function(evt){
          if(!evt.eventName || evt.eventName != ev) return false
          handler.call(this, evt)
        } : 
        function(evt){
          if(!evt.eventName || evt.eventName != ev) return false
          handler.call(el, evt)
        }
    }
    if(ev == "mouseenter" || ev == "mouseleave"){
      realEvent = ev == "mouseenter" ? "mouseover" : "mouseout"
      
      response = isString(selector) ? 
        function(ev){
          var el = this
          var rel = ev.relatedTarget || (realEvent == "mouseover" ? ev.fromElement : ev.toElement)
          if(rel && (rel == el || Selector.isAncestor(rel, el))) return
          handler.call(el, ev)
        } : 
          function(ev){
            var rel = ev.relatedTarget || (realEvent == "mouseover" ? ev.fromElement : ev.toElement)
            if(rel && (rel == el || Selector.isAncestor(rel, el))) return
            handler.call(el, ev)
          }
    }
    
    if(isString(selector)) {
      response = delegate(response, selector, el)
    }
    if(response == handler) {
      response = function(ev){
        handler.call(el, ev)
      }
    }
    register(el, ev, {
        handler : handler
      , response : response
      , actualEvent : realEvent || ev
      , capture : isString(selector)
    })
    return response
  }
  
  listener = testEl.addEventListener ? 
    function(el, ev, handler, capture){
      if(ev == "mouseenter" || ev == "mouseleave") ev = ev == "mouseenter" ? "mouseover" : "mouseout"
      if(!!~ev.indexOf(":")) {
        el.addEventListener("dataavailable", handler, capture)
        return el
      }
      el.addEventListener(ev, handler, capture)
      return el
    } : 
    function(el, ev, handler, capture){
      if(ev == "mouseenter" || ev == "mouseleave") ev = ev == "mouseenter" ? "mouseover" : "mouseout"
      if(capture && doesntBubble.test(ev)) ev = ev == "focus" ? "focusin" : "focusout"
      if(!!~ev.indexOf(":")) {
        el.attachEvent("ondataavailable", handler)
        el.attachEvent("onlosecapture", handler)
      }
      el.attachEvent("on" + ev, handler)
      return el
    }
    
  unlistener = testEl.removeEventListener ? 
  function(el, ev, handler, capture){
    if(!!~ev.indexOf(":")) {
      el.removeEventListener("dataavailable", handler, capture)
      return el
    }
    el.removeEventListener(ev, handler, capture)
    return el
  } : 
  function(el, ev, handler, capture){
    if(!!~ev.indexOf(":")) {
      el.detachEvent("ondataavailable", handler)
      el.detachEvent("onlosecapture", handler)
    }
    if(capture && (ev == "focus" || ev == "blur")) ev = ev == "focus" ? "focusin" : "focusout"
    el.detachEvent("on" + ev, handler)
    return el
  }
  
  var window_events = {}
    
  function register(el, ev, obj){
    var storage = el == window ? window_events : el._craftevents_, arr
    if(!storage) storage = el._craftevents_ = {}
    arr = storage[ev] = storage[ev] || []
    arr.push(obj)
    if(Browser.IE) ieCache.push(el)
  }

  
  function unregister(el, ev, handler){
    var storage = el == window ? window_events : el._craftevents_, arr
    if(!storage) return
    if(!ev) return Object.each(storage, function(item, index, obj){ 
      if(isArray(item)) {
        item.each(function(obj){ unlistener(el, obj.actualEvent, obj.response, obj.capture) })
      }
      obj[index] = []
    })
    arr = storage[ev]
    if(!arr) return
    if(!handler) {
      arr.each(function(obj){ 
        unlistener(el, obj.actualEvent, obj.response, obj.capture) 
      })
      storage[ev] = []
      return
    }
    storage[ev] = arr.reject(function(obj){
      if(handler && obj.handler == handler) {
        unlistener(el, obj.actualEvent, obj.response, obj.capture)
        return true
      }  
    })
  }
  
  function listen(el, ev, selector, handler){
    var delegated = isString(selector), response
    if(!delegated) {
      handler = selector
      selector = null
    }
    response = createHandler(el, ev, handler, selector)
    listener(el, ev, response, delegated)
  }
  
  function stopListening(el, ev, handler){
    unregister(el, ev, handler)
  }
  
  Object.extend(window.Event, {
      listen : listen
    , stopListening : stopListening
  })
  
  if(Browser.IE) listen(window, "unload", function(){ ieCache.each(function(item){ stopListening(item) }) })
  