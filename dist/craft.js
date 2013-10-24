;(function(win){
  
  var doc = win.document
    , docEl = doc.documentElement
    , craft = {}
    , exposed

  craft.version = "3.0.0dev"
  
  craft.create = Object.create ? 
    function(object) {
      return Object.create(object)
    } : 
    function(object){
      function K(){}
      K.prototype = object
      return new K()
    }


  ;(function(craft){
    
    function create(){
      var self = craft.create(this)
      if(typeof self.constructor == "function") {
        self.constructor.apply(self, arguments)
      }
      return self
    }
    
    function extendClass(fn){
      return defineClass(this, fn)
    }
    
    function extend(object, source){
      var keys = craft.getKeys(source)
        , index = -1, length = keys.length
        , key
      while(++index < length) {
        key = keys[index]
        object[key] = source[key]
      }
    }
    
    craft.defineClass = defineClass
    function defineClass(inherits, fn){
      var klass
      if(!fn) {
        fn = inherits
        inherits = null
      }
      klass = craft.create(inherits)
      klass.create = create
      klass.extend = extendClass
      if(typeof fn == "function") {
        fn.call(klass)
        return klass
      } 
      if(fn && typeof fn == "object") {
        extend(klass, fn)
        return klass
      }
      return klass
    }
    
  })(craft)
  

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
  

  ;(function(craft){
  
    craft.events = craft.defineClass({}, function(){
      
      var self = this
        , _isPrototypeOf = {}.isPrototypeOf
  
      
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
          if(i == "__parent__" || i == "__events__") continue
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
          l = eventsObjectCallbacks.length
          while(++i < l) {
            (function(callback){
              setTimeout(function(){
                callback(eventWalker)
              }, 0) 
            })(eventsObjectCallbacks[i])
          }
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
  
  
  exposed = craft.events.create()
  craft.each(craft, function(item, index){
    exposed[index] = item
  })
  craft = win.craft = exposed
  

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
  

  ;(function(craft){
    
    var supportsProto = typeof {}.__proto__ == "object"
      , supportsGetComputedStyle = typeof win.getComputedStyle == "function"
      , supportsClassList = "classList" in document.createElement("div")
      , fragment = doc.createDocumentFragment()
      , nodeList = supportsProto ? [] : getExternalArray()
      , createNodeList
      , _hasOwnProperty = {}.hasOwnProperty
      , nativeMatchesSelector = 
          docEl.matchesSelector || 
          docEl.webkitMatchesSelector || 
          docEl.mozMatchesSelector || 
          docEl.oMatchesSelector ||
          docEl.msMatchesSelector
      , matchesSelector = nativeMatchesSelector || matchesPolyfill
      , cssSupportMap = {}
      , wordsRE = /\S+/g
      , prefixes = "webkit O ms Moz css".match(wordsRE)
      , styleTest = doc.createElement("div").style
      , nativeSlice = [].slice
      , trimRE = /^\s+|\s+$/g
      , trim = "".trim || function(){ return this.replace(trimRE, "") }
      , trash = doc.createElement("div")
    
    craft.nodeList = nodeList
    craft.__matchesSelector__ = matchesSelector
    
    craft.supportsStyleProperty = supportsStyleProperty
    function supportsStyleProperty(name){
      var index = -1
        , length = prefixes.length
        , property
      if(property = cssSupportMap[name]) return property
      if(typeof styleTest[name] == "string") {
        cssSupportMap[name] = name
        return name
      }
      name = name.charAt(0).toUpperCase() + name.slice(1)
      while(++index < length) {
        if(typeof styleTest[property = prefixes[index] + name] == "string") {
          cssSupportMap[name] = property
          return property
        }
      }
      return null
    }
    
    function matchesPolyfill(selector){
      var node = this
        , parent = node.parentNode
        , query, index, length
      if(!parent || parent.nodeType != 1) {
        return false
      }
      query = parent.querySelectorAll(selector)
      index = -1
      length = query.length 
      while(++index < length) {
        if(query[index] == node) return true
      }
      return false
    }
    
    function getExternalArray(){
      var context = doc.createElement("iframe")
        , proto, contextDoc
      context.style.display = "none"
      docEl.insertBefore(context, docEl.firstChild)
      contextDoc = context.contentWindow.document
      contextDoc.write("<script>parent.craft.__externalArray__=Array<\/script>")
      contextDoc.close()
      proto = craft.__externalArray__.prototype
      craft.__externalArray__ = null
      fragment.appendChild(context)
      return proto
    }
    
    craft.createNodeList = createNodeList
    function createNodeList(){
      var array = nodeList.constructor.apply(null, arguments)
      if(supportsProto) array.__proto__ = nodeList
      return array
    }
    
    function toNodeList(selector, context){
      var nodeList = createNodeList()
        , index = -1, length
        , match, currentSandbox
      
      if(!selector) return nodeList
      
      if(typeof selector == "string") {
        if(arguments.length < 2) context = doc
        selector = context.querySelectorAll ? 
          context.querySelectorAll(selector) : 
            []
      }
      
      if(selector.nodeType || selector == win && selector.window == selector) {
        selector = [selector]
      }
      
      if(_hasOwnProperty.call(selector, "length")) {
        if(_hasOwnProperty.call(selector, (length = selector.length) - 1)){
          while(++index < length) nodeList[index] = selector[index]
        }
      }
      
      return nodeList
    }
    
    nodeList.each = each
    function each(fn, thisValue){
      var self = this
        , index = -1
        , length = self.length
      while(++index < length) {
        if(fn.call(thisValue, self[index], index, self) === false) break
      }
      return self
    }
    
    nodeList.matches = matches
    function matches(selector){
      var self = this
      return self[0] ? matchesSelector.call(self[0], selector) : false
    }
    
    nodeList.getStyle = getStyle
    function getStyle(key){
      var self = this
        , el = self[0]
        , currentStyle
      
      if(!el) return null
      if(supportsGetComputedStyle){
        currentStyle =  win.getComputedStyle(el, null)
      } else {
        currentStyle = el.currentStyle
      }
      return key ? currentStyle[supportsStyleProperty(key)] : currentStyle
    }
    
    nodeList.setStyle = setStyle
    function setStyle(key, value){
      var self = this
        , values
        , keys
        , length 
  
      if(arguments.length > 1) {
        keys = [key]
        values = [value]
      } else {
        keys = craft.getKeys(key)
        values = craft.getValues(key)
      }
      length = keys.length 
      return each.call(self, function(item){
        var index = -1
        while(++index < length) {
          item.style[keys[index]] = values[index]
        }
      })
    }
    
    function createClassListCallback(action){
      return function(item){
        var classNames = this
          , length = classNames.length
        while(--length > -1) {
          item.classList[action](classNames[length])
        }
      }
    }
    
    var classListAddCallback = createClassListCallback("add")
      , classListRemoveCallback = createClassListCallback("remove")
      , classListToggleCallback = createClassListCallback("toggle")
  
    function classListHasCallback(item){
      var classNames = this
        , length = classNames.length
      while(--length > -1) {
        if(!item.classList.contains(classNames[length])) {
          return false
        }
      }
      return true
    }
    
    function hasCallback(item){
      var classNames = this
        , length = classNames.length
        , itemClassName = " " + item.className + " "
      while(--length > -1) {
        if(!~itemClassName.indexOf(" " + classNames[length] + " ")) {
          return false
        }
      }
      return true
    }
  
    function addCallback(item){
      var classNames = this
        , length = classNames.length
        , itemClassName = " " + item.className + " "
        , klass
      while(--length > -1) {
        if(!~itemClassName.indexOf(" " + (klass = classNames[length] + " "))) {
          itemClassName += klass
        }
      }
      item.className = trim.call(itemClassName)
    }
    
    function removeCallback(item){
      var classNames = this
        , length = classNames.length
        , itemClassName = " " + item.className + " "
        , klass
      while(--length > -1) {
        if(~itemClassName.indexOf(klass = " " + classNames[length] + " ")) {
          itemClassName = itemClassName.replace(klass, " ")
        }
      }
      item.className = trim.call(itemClassName)
    }
    
    
    function toggleCallback(item){
      var classNames = this
        , length = classNames.length
        , itemClassName = " " + item.className + " "
        , klass
      while(--length > -1) {
        if(~itemClassName.indexOf(klass = " " + classNames[length] + " ")) {
          itemClassName = itemClassName.replace(klass, " ")
        } else {
          itemClassName += klass.slice(1)
        }
      }
      item.className = trim.call(itemClassName)
    }
    
    nodeList.addClass = addClass
    function addClass(){
      var classNames = nativeSlice.call(arguments)
      return this.each(supportsClassList ? classListAddCallback : addCallback, classNames)
    }
    
    nodeList.removeClass = removeClass
    function removeClass(){
      var classNames = nativeSlice.call(arguments)
      return this.each(supportsClassList ? classListRemoveCallback : removeCallback, classNames)
    }
    
    nodeList.toggleClass = toggleClass
    function toggleClass(){
      var classNames = nativeSlice.call(arguments)
      return this.each(supportsClassList ? classListToggleCallback : toggleCallback, classNames)
    }
    
    nodeList.hasClass = hasClass
    function hasClass(){
      var self = this
        , first = self[0]
        , classNames = nativeSlice.call(arguments)
      return first ? 
        (supportsClassList ? classListHasCallback : hasCallback).call(classNames, first) : 
          null
    }
    
    nodeList.toFragment = toFragment
    function toFragment(){
      var self = this
        , fragment = doc.createDocumentFragment()
      self.each(function(item){
        fragment.appendChild(item)
      })
      return fragment
    }
  
    nodeList.append = append
    function append(node){
      var self = this
        , first = self[0]
        , fragment
      if(!first) return self
      fragment = toNodeList.apply(null, arguments).toFragment()
      first.appendChild(fragment)
      return self
    }
    
    nodeList.prepend = prepend
    function prepend(node){
      var self = this
        , first = self[0]
        , fragment
      if(!first) return self
      fragment = toNodeList.apply(null, arguments).toFragment()
      first.insertBefore(fragment, first.firstChild)
      return self
    }
    
    nodeList.appendTo = appendTo 
    function appendTo(node){
      var self = this
      toNodeList.apply(null, arguments).append(self)
      return self
    }
    
    nodeList.prependTo = prependTo 
    function prependTo(node){
      var self = this
      toNodeList.apply(null, arguments).prepend(self)
      return self
    }
    
    nodeList.insertBefore = insertBefore
    function insertBefore(node){
      var self = this
        , first = self[0]
        , parent
        , fragment
      if(!first) return self
      parent = first.parentNode
      if(!parent) return self
      fragment = toNodeList.apply(null, arguments).toFragment()
      parent.insertBefore(fragment, first)
      return self
    }
    
    nodeList.insertAfter = insertAfter
    function insertAfter(node){
      var self = this
        , first = self[0]
        , parent
        , fragment
      if(!first) return self
      parent = first.parentNode
      if(!parent) return self
      fragment = toNodeList.apply(null, arguments).toFragment()
      parent.insertBefore(fragment, first.nextSibling)
      return self
    }
    
    function emptyCallback(item){
      item.innerHTML = ""
    }
    
    nodeList.empty = empty
    function empty(){
      return this.each(emptyCallback)
    }
    
    function destroyCallback(item){
      trash.appendChild(item)
      trash.innerHTML = ""
    }
    
    nodeList.destroy = destroy
    function destroy(){
      this.each(destroyCallback)
    }
    
    craft.$ = $
    function $(selector, context){
      return toNodeList.apply(null, arguments)
    }
    
  })(craft)
  

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
  

  ;(function(craft){
    
    var animationFrame = 
          win.requestAnimationFrame || 
          win.webkitRequestAnimationFrame || 
          win.mozRequestAnimationFrame || 
          win.oRequestAnimationFrame || 
          win.msRequestAnimationFrame || 
          animationFramePolyfill 
    , cancelAnimationFrame = 
          win.cancelAnimationFrame || 
          win.webkitCancelAnimationFrame || 
          win.mozCancelAnimationFrame || 
          win.oCancelAnimationFrame || 
          win.msCancelAnimationFrame || 
          cancelAnimationFramePolyfill 
    
    function animationFramePolyfill(callback){
      return setTimeout(function(){
        callback()
      }, 1000 / 60)
    }
    
    function cancelAnimationFramePolyfill(id){
      clearTimeout(id)
    }
    
    craft.requestAnimationFrame = function(fn){
      return animationFrame(fn)
    }
    
    craft.cancelAnimationFrame = function(n){
      return cancelAnimationFrame(n)
    }
    
    craft.debounceAnimationFrame = debounceAnimationFrame
    function debounceAnimationFrame(fn, wait){
      return craft.debounce(function(){
        var args = arguments
        animationFrame(function(){
          fn.apply(null, args)
        })
      }, wait)
    }
    
  })(craft)
  

  ;(function(craft){
  
    craft.animation = animation
    function animation(callback){
      return function(state){
        var self = this
        state = state > 1 ? 1 : state < 0 ? 0 : state
        craft.requestAnimationFrame(function(){
          callback.call(self, state, 1 - state)
        })
      }
    }
    
    craft.timer = timer
    function timer(duration, step, callback){
      var start, end
      step = step || 20
      function fn(){
        var current
        if(!start) {
          start = +new Date
          end = start + duration
        }
        current = +new Date
        if(current > end) {
          callback(1)
          return
        }
        callback((current - start) / duration)
        setTimeout(fn, step)
      }
      return fn
    }
    
    
  })(craft)
  

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
  
  
})(this.window)
