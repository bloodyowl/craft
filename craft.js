/*!
  Craft.js
  1.2.2 
*/



;(function(window, document){


  var Craft = Craft || { version : "1.2.2" }
    , hasOwn = Object.prototype.hasOwnProperty
    , extend

  function typeOf(object){
    var type = typeof object
    if(object instanceof RegExp) return "regexp"
    if(object === null) return "null"
    if(object instanceof Array) return "array"
    return type
  }

  function toArray(list, start){
    if(!("length" in list)) return []
    var array = []
      , index = start || 0
      , length = list.length
    for(;index < length; index++) array.push(list[index])
    return array
  }

  extend = Object.extend = function(object, source, noCall){
    var index
    if(!noCall && typeOf(source) == "function") source = source()
    for(index in source) if(hasOwn.call(source, index)) object[index] = source[index]
    return object
  }

  window.Craft = Craft
  Object.typeOf = typeOf
  Array.convert = toArray



  extend(Array.prototype, function(){

    function each(fn, context){
      var self = this
        , index = 0
        , length = self.length

      for(;index < length; index++) fn.call(context, self[index], index, self)

      return self
    }

    function collect(fn, context){
      var self = this
        , mapped = Array(self.length)
        , index = 0
        , length = self.length

      for(;index < length; index++) mapped[index] = fn.call(context, self[index], index, self)

      return mapped
    }

    function select (fn, context){
      var self = this
        , filtered = []
        , index = 0
        , length = self.length

      for(;index < length; index++) if(fn.call(context, self[index], index, self)) filtered.push(self[index])

      return filtered
    }

    function fold(fn, initial){
      var self = this
        , hasInit = arguments.length != 1
        , reduced = hasInit ? initial : self[0]
        , index = hasInit ? 0 : 1
        , length = self.length

      for(;index < length; index++) reduced = fn(reduced, self[index], index, self)
      return reduced
    }

    function find(search, start){
      var self = this
        , index = start || 0
        , length = self.length
      for(;index < length; index++) if(self[index] === search) return index
      return -1
    }

    function contains(value){
      return !!~this.find(value)
    }

    function pluck(property){
      var self = this
        , plucked = Array(self.length)
        , index = 0
        , length = self.length

      for(;index < length; index++) plucked[index] = self[index][property]

      return plucked
    }

    function isEmpty(){
      var self = this
        , index = 0
        , length = self.length
      for(;index < length; index++) return false
      return true
    }

    function clone(){
      return this.concat()
    }

    function clean(){
      var self = this
        , cleaned = []
        , index = 0
        , length = self.length
        , item
      for(;index < length; index++) {
        item = self[index]
        if(typeof item != "number" && !item) continue
        if(typeof item == "object" && item.length === 0) continue
        cleaned.push(item)
      }
      return cleaned
    }

    function intersect(values){
      var self = this
        , result = []
        , index = 0
        , length = self.length
        , item
      for(;index < length; index++) {
        item = self[index]
        if(values.contains(item)) result.push(item)
      }
      return result
    }

    function difference(values){
      var self = this
        , result = []
        , index = 0
        , length = self.length
        , item
      for(;index < length; index++) {
        item = self[index]
        if(!values.contains(item)) result.push(item)
      }
      return result
    }

    function group(){
      return this.fold(function(a,b){ return a.concat(b) }, [])
    }

    return {
      each: each,
      clone: clone,
      collect: collect,
      select: select,
      fold: fold,
      group: group,
      find: find,
      contains: contains,
      pluck: pluck,
      isEmpty: isEmpty,
      clean: clean,
      intersect: intersect,
      difference: difference
    }
  })


extend(Array.prototype, function(){

  function invoke(fn){
    var self = this
      , index = 0
      , length = self.length
      , args = toArray(arguments, 1)
      , argsL = args.length
      , result = []
      , method = typeOf(fn) == "string" ? Element.methods[fn] : fn
    
    if(argsL === 0) for(;index < length; index++) result[index] = method.call($(self[index]))
    if(argsL == 1) for(;index < length; index++) result[index] = method.call($(self[index]), args[0])
    if(argsL == 2) for(;index < length; index++) result[index] = method.call($(self[index]), args[0], args[1])
    if(argsL == 3) for(;index < length; index++) result[index] = method.call($(self[index]), args[0], args[1], args[2])
    if(argsL >= 4) for(;index < length; index++) result[index] = method.apply($(self[index]), args)
    
    return result
  }
  
  return {
    invoke: invoke
  }
})


  function Hash(object){
    var self = this
      , length
    
    if(!(self instanceof Hash)) return new Hash(object)
    extend(self, object, true)
    if(object && (length = object.length)) self.length = length
  }
  
  extend(Hash.prototype, function(){
    
    function each(fn, context){
      var self = this
        , index
      for(index in self) if(hasOwn.call(self, index)) fn.call(context, self[index], index, self)
      return self
    }
    
    function clone(){
      return new Hash(this)
    }
    
    function keys(){
      var array = []
      this.each(function(item, index){array.push(index)}) 
      return array
    }
    
    function values(){
      var array = []
      this.each(function(item){ array.push(item) })
      return array
    }
    
    function get(key){
      return this[key]
    }
    
    function set(key, value){
      var self = this
      self[key] = value
      return self
    }
    
    function isEmpty(){
      var self = this
        , index
      for(index in self) if(hasOwn.call(self, index)) return false
      return true
    }
    
    function toQueryString(){
      var self = this
        , queryString = ""
      self.each(function(item, index){
        if(!item) return
        queryString += index + "=" + [].concat(item).join("&" + index + "=") + "&"
      })
      queryString = queryString.slice(0, -1)
      return "encodeURI" in window ? encodeURI(queryString) : escape(queryString)
    }
    
    return {
      each: each,
      clone: clone,
      keys: keys,
      values: values,
      get: get,
      extend: extend,
      set: set,
      isEmpty: isEmpty,
      toQueryString: toQueryString
    }
  })
  
  extend(window, {
    Hash: Hash
  })


  extend(Function.prototype, {
    attach : function(context){
      var self = this
        , args = toArray(arguments, 1)
      return function(){
        return self.apply(context, args.concat(toArray(arguments)))
      }
    },
    partial : function(){
      var self = this
        , args = toArray(arguments)

      return function(){
        return self.apply(this, args.concat(toArray(arguments)))
      }
    },
    delay : function(time){
      var self = this
        , args = toArray(arguments, 1)
      return window.setTimeout(function(){
        self.apply(undefined, args)
      }, time * 1000)
    },
    every : function(time){
      var self = this
        , args = toArray(arguments, 1)
      return window.setInterval(function(){
        self.apply(undefined, args)
      }, time * 1000)
    }
  })


  extend(String.prototype, function(){
    
    var _trim = /^\s+|\s+$/g
      , _camelize = /-\D/g
      , _capitalize = /^\w|\s\w/g
      , _compile = /\{\{([\w\*\.]*?)\}\}/g
    
    function parseJSON(){
      var self = this
      return "JSON" in window ? JSON.parse(self) : (new Function("return " + self))()
    }
    
    function trim(){
      return this.replace(_trim, "")
    }
    
    function camelize(){
      return this.replace(_camelize, function(match, i){
        return i !== 0 ? match.charAt(1).toUpperCase() : match.charAt(1)
      })
    }
    
    function capitalize(){
      return this.replace(_capitalize, function(match){
        return match.toUpperCase()
      })
    }
    
    function compile(object) {
      var objectIsString
      
      if(arguments.length > 1) object = toArray(arguments)
      
      objectIsString = typeOf(object) == "string"
      return this.replace(_compile, function(path, match){
        var split = match.split(".")
        if(objectIsString){
          if(match == "*") return object
          else return ""
        }
        return split.fold(function(previous, actual){
          return actual in previous ? previous[actual] : ""
        }, object)
      })
    }
    
    return {
      parseJSON : parseJSON,
      trim : String.prototype.trim || trim,
      camelize : camelize,
      capitalize : capitalize,
      compile : compile
    }
  })  


  var _external = /\/\//

  function getJSONP(url, self){
    return function(){
      var callback = "request" + (+new Date())
        , success
        , script = Element.make("script", {
          type : "text/javascript",
          src: url + (!!~url.indexOf("?") ? "&" : "?") + "callback=" + callback
        })
    
      window[callback] = function(object){
        if(success = self.success) success(object)
        script.remove()
        window[callback] = null
      }
    
     
        script.appendTo(document.body)
      }
    
  }

  function Ajax(params){
    var request = (params.jsonp === true || (_external.test(params.url) && params.jsonp !== false)) ? getJSONP(params.url, this) :"XMLHttpRequest" in window ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
      , self = this

    if(!(self instanceof Ajax)) return new Ajax(params)

    extend(self, params)
    extend(self, {request : request})

    if(!self.method) self.method = "GET"
    if(typeOf(self.async) != "boolean") self.async = true

    if(typeOf(request) != "function") self.request.onreadystatechange = function(){
      var readyState = self.request.readyState
        , status, loading, success, error

      if(readyState == 2 && (loading = self.loading)) loading()
      if(readyState == 4 && (status = self.request.status) && ((status >= 200 && status < 300) || status == 304) && (success = self.success)) success(self.request[self.xml ? "responseXML" : "responseText"])
      if(readyState == 4 && (status = self.request.status) + 1 && ((status < 200 || status > 300) && status != 304) && (error = self.error)) error(status)
    }
  }

  extend(Ajax.prototype, Hash.prototype)

  extend(Ajax.prototype, {
    update : function(){
      var self = this
        , method = self.method
        , request = self.request
        , url = self.url
        , xml = self.xml
        , async = self.async
        , query = self.query
        , headers = self.headers
        , index
        
      if(typeof request == "function") {
        request()
        return self
      } 

      request.open(method, url, async)

      if(method == "POST") {
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      }
      for(index in headers) if(hasOwn.call(headers, index)) request.setRequestHeader(index, headers[index])

      request.send(query || null)
      if(!async) return request[xml ? "responseXML" : "responseText"]
      return self
    },
    periodicalUpdate : function(time){
      var self = this
      return (function(){ self.update() }).every(time)
    }
  })

  window.Ajax = Ajax


 var NATIVE_ELEMENT = !!document.createElement("div").constructor
   , NATIVE_EVENT = "Event" in window
   , classList = "classList" in document.createElement("i")
   , formElementsRegExp = /SELECT|INPUT|TEXTAREA|BUTTON/
   , checkRegExp = /checkbox|radio/
   , eventListener = "addEventListener" in window
   , Element = NATIVE_ELEMENT ? window.Element : {}
   , nativeRemove = document.createElement("div").remove
 
 if(!NATIVE_ELEMENT) window.Element = Element
 
 function $(element) {
   if(!element) return document.createElement("div")
   if(typeOf(element) == "string") return $(document.getElementById(element) || document.createElement("div"))
   if(element.nodeType == 11) return extend(element, Element.methods)
   if(NATIVE_ELEMENT) return element
   else return extend(element, Element.methods)
 }
 
 Craft.noConflict = function(){
     if(window.$ == $) window.Craft.$ = $
     return $
   }
 
 window.$ = $
 
 if(!NATIVE_EVENT) window.Event = {}
 
 extend(Event, {
   stop : function(eventObject){
     eventObject = eventObject || window.event
     if(eventListener){
        eventObject.preventDefault()
        eventObject.stopPropagation()
     } else {
       eventObject.returnValue = false
       eventObject.cancelBubble = true
     }
   },
   listen : function(element, event, selector, handler){
     return Element.methods.listen.call(element, event, selector, handler)
   },
   stopListening : function(element, event, handler){
     return Element.methods.stopListening.call(element, event, handler)
   }
 })
 
 function buildNodes(string){
   var el = document.createElement("div")
     , fragment
     , length
     , childNodes
     , index = 0
   el.innerHTML = string
   childNodes = toArray(el.childNodes)
   length = childNodes.length
   if(length == 1) return childNodes[0]
   fragment = document.createDocumentFragment()
   for(;index < length; index++) fragment.appendChild(childNodes[index])
   return fragment
 }
 
 function toNodes(object){
   var nodeType = object.nodeType
   if(typeOf(object) == "string") return buildNodes(object)
   if(nodeType && (nodeType == 1 || nodeType == 11 || nodeType == 3)) return object
   else return document.createTextNode("")
 }
 
  extend(Element, {
    extend : function(object){
      extend(Element.methods, object)
      if(NATIVE_ELEMENT) extend(Element.prototype, object)
    },
    make : function(tag, properties){
      var element = document.createElement(tag)
        , index
      for(index in properties) if(hasOwn.call(properties, index)) element[index] = properties[index]
      return $(element)
    },
    from : function(string){
      return $(buildNodes(string))
    },
    createFragment : function(){
      return $(document.createDocumentFragment())
    },
    ready : function(func){
      if (/in/.test(document.readyState) || !document.body) (function(){ Element.ready(func) }).delay(0.01)
      else func.delay(0)
    },
    getById : function(id){
      return $(id)
    },
    getByTag : function(tag){
      return toArray(document.getElementsByTagName(tag)).collect(function(item){ return $(item)})
    },
    getByClass : function(klass){
      if("getElementsByClassName" in document){
        return toArray(document.getElementsByClassName(klass)).collect(function(item){ return $(item)})
      } else {
        return toArray(document.getElementsByTagName("*")).collect(function(item){return $(item) }).select(function(item){return item.hasClass(klass)})
      }
    }
  })
  
  
  var _splitSelector = /\s*,\s*/
    , _mustForceBubble = /blur|focus/
    , _replacements = {
      "blur" : "focusout",
      "focus" : "focusin"
    }
  
  function matches(element, selector, ancestor){
    var result
      , firstChar = selector.charAt(0)
    if(!element) return false
    while(element && "nodeName" in element && element != ancestor){
      if(firstChar == ".") result = $(element).hasClass(selector.slice(1))
      else if(firstChar == "#") result = $(element).id == selector.slice(1)
      else result = element.nodeName.toLowerCase() == selector
      if(result) return element
      element = element.parentNode
    }
  }
  
  function delegate(handler, selector, self){
    return function _handler(e){
      e = e || window.event 
      var target = e.target || e.srcElement
        , element
        , selectors = selector.split(_splitSelector)
        , index = 0
        , length = selectors.length
      for(;index < length; index++) if(element = matches(target, selectors[index], self)) {
        handler(e, $(element), _handler)
        return
      }
    }
  }
 
  Element.methods = {
    get : function(key){
      return this[key]
    },
    set : function(key, value){
      var self = this
      self[key] = value
      return self
    },
    insert : function(object){
      var self = this
        , nodeType = object.nodeType
        , top
        , bottom
        , before
        , after
        , parent
      if(!object) return this
      if(typeOf(object) == "string") return self.insert({ bottom : toNodes(object) })
      if(nodeType && (nodeType == 1 || nodeType == 11 || nodeType == 3)) return self.insert({ bottom : object })
 
      if(top = object.top) self.insertBefore(toNodes(top), self.firstChild)
      if(bottom = object.bottom) self.appendChild(toNodes(bottom))
      if(before = object.before) {
        if(parent = self.parentNode) parent.insertBefore(toNodes(before), self)
      }
      if(after = object.after) {
        if(parent = self.parentNode) parent.insertBefore(toNodes(after), self.nextSibling)
      }
      return self
    },
    appendTo : function(container){
      var self = this
      Element.methods.insert.call(container, {
        bottom : self
      })
      return self
    },
    prependTo : function(container){
      var self = this
      Element.methods.insert.call(container, {
        top : self
      })
      return self
    },
    empty : function(){
      var self = this
        , childNodes = self.childNodes
        , index = childNodes.length
      while(index--) self.removeChild(childNodes[index])
      return self
    },
    remove : nativeRemove || function(){
      var self = this
        , parent
      if(parent = self.parentNode) parent.removeChild(self)
      return self
    },
    css : function(object){
      var self = this
        , style = self.style
      if(!object) return style.cssText
      if(typeOf(object) == "function") object = object.call(self, style)
      Hash(object).each(function(item, index){
        style[index.camelize()] = typeOf(item) == "number" && item !== 0 ? item + "px" : "" + item
      })
      return self
    },
    getChildren : function(){
      var self = this
        , children = self.children
        , length = children.length
        , result = Array(length)
        , index = 0
      for(;index < length; index++) result[index] = $(children[index])
      return result
    },
    getParent : function(){
      var parent = this.parentNode
      return parent ? $(parent) : null
    },
    getSiblings : function(){
      var self = this
        , parent = self.getParent()
      return parent && parent.getChildren().select(function(item){
        return item != self
      })
    },
    classNames : function(){
      var self = this
        , className
      if (classList) return toArray(self.classList)
      if (className = self.className) return className.split(" ")
      return []
    },
    hasClass : function (string){
      var self = this
      if(classList) return self.classList.contains(string)
      return self.classNames().contains(string)
    },
    addClass : function(classes){
      var self = this
        , index, classNames, item
 
      classes = classes.split(" ")
      index = classes.length
 
      if(classList) while(index--) self.classList.add(classes[index])
      else {
        classNames = self.classNames()
        while(index--) {
          item = classes[index]
          if(classNames.contains(item)) continue
          classNames.push(item)
        }
        self.className = classNames.join(" ")
      }
      return self
    },
    removeClass : function(classes){
      var self = this
        , index
 
      classes = classes.split(" ")
      index = classes.length
 
      if(classList) while(index--) self.classList.remove(classes[index])
      else self.className = self.classNames().difference(classes).join(" ")
      return self
    },
    toggleClass : function(classes){
      var self = this
        , index, item
 
      classes = classes.split(" ")
      index = classes.length
 
      if(classList) while(index--) self.classList.toggle(classes[index])
      else {
        while(index--){
          item = classes[index]
          if(self.hasClass(item)) self.removeClass(item)
          else self.addClass(item)
        }
      }
      return self
    },
    getValue : function(){
      var self = this
        , tag = self.nodeName
        , options
      if(!formElementsRegExp.test(tag) || self.disabled) return
      if(tag == "SELECT"){
        options = toArray(self.options)
        if(self.multiple) return options.select(function(item){return !!item.selected}).pluck("value")
        return options[self.selectedIndex].value
      }
      if(checkRegExp.test(self.type)) return self.checked ? self.value : undefined
      return self.value
    },
    setValue : function(value){
      var self = this
        , tag = self.nodeName
        , options
      if(!formElementsRegExp.test(tag) || self.disabled) return self
      if(tag == "SELECT"){
        options = toArray(self.options)
        if(self.multiple) options.each(function(item){item.selected = false})
        ;[].concat(value).each(function(item){
          var index = typeOf(item) == "number" ? item : options.pluck("value").find(item)
          if(index > -1 && options.length > index) options[index].selected = true
        })
      } else if (tag == "TEXTAREA"){
        self.empty().insert(value)
      } else {
        self.value = value
      }
      return self
    },
    serialize : function(){
      var self = this
        , result = new Hash()
      toArray(self.elements).each(function(item){
        var value = Element.methods.getValue.call(item)
          , name = item.name
        if(typeOf(value) == "undefined" || !name) return
        if(name in result) {
          result[name] = [].concat(result[name]).concat(value)
          return
        } else {
          result[name] = value
        }
      })
      return result
    },
    listen : function(event, selector, handler){
      if(!handler) {
        handler = selector
        selector = null
      } else {
        handler = delegate(handler, selector, this)
      }
      var self = this
        , events = event.split(" ")
        , index = events.length
        , item
        , capture
      while(index--){
        item = events[index]
        if(selector && _mustForceBubble.test(item)) {
          if(eventListener) capture = true
          else item = _replacements[item]
        }
        if(eventListener) self.addEventListener(item, handler, capture)
        else self.attachEvent("on" + item, handler)
      }
      return self
    },
    stopListening : function(event, handler){
      var self = this
        , events = event.split(" ")
        , index = events.length
        , item
      if(!handler) return
      while(index--){
        item = events[index]
        if(eventListener) self.removeEventListener(item, handler)
        else self.detachEvent("on" + item, handler)
      }
      return self
    },
    getById : function(id){
      return $(id)
    },
    getByTag : function(tag){
      return toArray(this.getElementsByTagName(tag)).collect(function(item){ return $(item)})
    },
    getByClass : function(klass){
      if("getElementsByClassName" in document){
        return toArray(this.getElementsByClassName(klass)).collect(function(item){ return $(item)})
      } else {
        return toArray(this.getElementsByTagName("*")).collect(function(item){return $(item) }).select(function(item){return item.hasClass(klass)})
      }
    }
  }
 
  Element.extend(Element.methods)


  
  var slice = [].slice
  
  function makePusher(array, length){
    return function(index, value, callback){
      var i = 0
      array[index] = value
      if(array.length == length) {
        for(;i < length; i++) if(array[i] === undefined) return 
        if(callback) callback.apply(null, array)
      } 
    }
  }
  
  function Defer(){
    var args = slice.call(arguments)
      , self = this
      , i = 0
      , length = args.length
      , item
      , stack = self.stack = []
      , push = makePusher(stack, length)
      , oneFailed = false
      
    if(!(self instanceof Defer)) return Defer.apply(new Defer(), arguments)
    
    args.each(function(item, index){
      
      var type = typeof item
      if(type != "object" && type != "string" && type != "function") {
        window.setTimeout(function(){
          if("error" in self && !oneFailed) self.error(type + " isn't a valid type. ")
          oneFailed = true
        }, 16)
        return
      }
      
      if(type == "function") {
        window.setTimeout(function(){
          push(index, item(), self.callback)
        }, 16)
        return
      }
      
      var xml, jsonp, headers, string
      
      if(typeof item == "string") item = Ajax({url : item})
      if(!(item instanceof Ajax)) return
      item.set("success", function(res){
          push(index, res, self.callback)
        })
        .set("error",function(res){
          if("error" in self && !oneFailed) self.error(item.url + " can't be reached.")
          oneFailed = true
        })
        .update()
    })
    return self
  }
  
  extend(Defer.prototype, {
    then : function(callback){
      var self = this
      self.callback = callback
      return self
    },
    fail : function(callback){
      var self = this
      self.error = callback
      return self
    },
    init : function(callback){
      callback()
      return this
    }
  })
  
  window.Defer = Defer


  function Browser(){
    var self = this
      , userAgent = window.navigator.userAgent.toLowerCase()
      , className = []
  
    self.UA = userAgent
  
    ;("Webkit Firefox IE IE6 IE7 IE8 Opera Konqueror iPhone iPad iPod Android")
      .split(" ")
      .each(function(item){
        var _item = item.toLowerCase()
          , test = new RegExp(_item.replace(/[6-9]/, " $&")).test(userAgent)
  
        self["is" + item] = test
        if(test) className.push(_item) 
      })
  
    self.toClassName = function(){return className.join(" ")} 
  }
  
  Craft.Browser = new Browser()


})(this, this.document)