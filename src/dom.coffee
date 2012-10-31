###
DOM @ Craft.js
https://github.com/mlbli/Craft
###

classList = "classList" of document.createElement("i") # Detect DOM classList support (saves memory on decent browsers)
eventListener = "addEventListener" of window # is (add || remove)EventListener present

###
DOM
-> return an Object with the wrapped given argument. 
Enables the possibility to extend the DOM without breaking it (window.Element is a mess in IE)
###
DOM = (arg) ->
   return DOM.create "div" if not arg # Creates an empty <div> if arg doesn't exist
   return arg if arg instanceof DOM
   @_ = arg # Wraps the element or Array of Elements inside the "_" property of the created object. 
   return
   

window.Event = window.Event or {}; # Old Browsers support

###
Event.stop
-> Cancels the behavior of the given event object
###

window.Event.stop = (eventObject) ->
  if(eventListener) 
     eventObject.preventDefault()
     eventObject.stopPropagation()
  else 
     eventObject.returnValue = false
     eventObject.cancelBubble = true
  return

extend DOM, ->
   
   ###
   DOM.create
   @tag : tagName
   @props : object (w/ Element properties)
   returns a new Element
   ###
   
   create = (tag, props) ->
     element = document.createElement tag
     for own i, item of props
        element[i] = item
     new DOM element
   
   ###
   DOM.createFragment
   returns a DocumentFragment
   (usefull if you manipulate DOM content and don't want performance to be broken)
   ###
   
   createFragment = ->
     new DOM document.createDocumentFragment()
      
   ###
   Shorthands
   ###
   
   getById = (id)-> 
     new DOM document.getElementById(id)
     
   getByClass = (klass) ->
      DOM::getByClass.call(document, klass)
      
   getByTag = (tag) ->
      new DOM $A document.getElementsByTagName(tag)
   ###
   Dead simple DOM Ready
   Thanks to Dustin Diaz for this piece of code
   http://dustindiaz.com/smallest-domready-ever
   ###
   loaded = (func) ->
      if /in/.test(document.readyState)
      then (-> DOM.loaded(func) ).delay(.01)
      else func()
      
   create : create
   createFragment : createFragment
   getById : getById
   getByClass : getByClass
   getByTag : getByTag
   loaded : loaded

###
Adds Array custom methods to the DOM prototype
###
$A("clean difference forEach filter indexOf intersect isEmpty map reduce pluck").forEach (item) ->
   DOM::[item] = -> 
     new DOM( Array::[item].apply @_, arguments )
   return

extend DOM::, ->
   ###
   Shorthand to unwrap DOM instances
   ###
   _get = (elements) ->
      if elements instanceof DOM then elements._ else elements
   
   ###
   Returns Element from string, DOM Object or Element itself
   ###
   _extract = (element) ->
      if typeOf(element) is "string" then element.toElement() else _get element

   get = (key) ->
      return _get(@) if key is undefined or key is null
      _get(@)[key]
   
   set = (key, value) ->
      _get(@)[key] = value
      @
   
   getElement = (number, end) ->
      return new DOM(@get(number))
   
   clone = (bool) ->
      new DOM(_get(@).cloneNode(bool))
   
   empty = ->
      element = _get(@)
      childNodes = element.childNodes
      i = childNodes.length
      while i--
         element.removeChild(childNodes[i]) # works this way because of the buggy behavior within <table>. 
      @
   
   remove = ->
      element = _get(@)
      element.parentNode.removeChild(element)
   
   ###
   DOM insertion
   ###
   insert = (object) ->
      element = _get(@)
      
      if typeOf(object) is "string"
         element.appendChild object.toElement()
         return @
         
      if object instanceof DOM
         element.appendChild _get(object)
         return @

      top = object.top
      bottom = object.bottom
      before = object.before
      after = object.after
            
      if top
         element.insertBefore _extract(top), element.firstChild
      if bottom
         element.appendChild _extract(bottom)
      if before
         parent = element.parentNode
         if parent
            parent.insertBefore _extract(before), element
      if after
         parent = element.parentNode
         nextSibling = element.nextSibling
         if parent
            if nextSibling isnt null
               parent.insertBefore _extract(after), nextSibling
            else parent.appendChild _extract(after)
      @
      
   appendTo = (container) ->
      insert.call container, bottom : @
      @
   prependTo = (container) ->
      insert.call container, top : @
      @
      
   css = (object) ->
      cssObject = _get(@).style
      object.call _get(@), cssObject if typeOf(object) is "function"
      new Hash(object).forEach (item, index) ->
         cssObject[index.camelize()] = if typeOf(item) is "number" then item + "px" else item
      @
   
   children = -> 
      new DOM $A _get(@).children
   
   parent = ->
      new DOM _get(@).parentNode
   
   siblings = ->
      element = _get(@)
      new DOM $A(element.parentNode.children)
         .filter (item) -> 
            item isnt element
      
   classNames = ->
      element = _get(@)
      return $A(element.classList) if classList 
      return $A(element.className) if !!element.className
      []

   hasClass = (string) ->
      element = _get(@)
      return element.classList.contains(string) if classList
      @classNames().indexOf(string) isnt -1      

   addClass = (classes) ->  
      element = _get(@)
      classes = $A classes
      if classList
      then element.classList.add item for item in classes
      else 
         actualClasses = new DOM(element).classNames()
         for item in classes
            continue if actualClasses.indexOf(item) isnt -1 
            actualClasses.push item
         element.className = actualClasses.join(" ")
      @
      
   removeClass = (classes) ->
      element = _get(@)
      classes = $A classes
      if classList
      then element.classList.remove item for item in classes
      else element.className = new DOM(element).classNames().difference(classes).join(" ")
      @
      
   toggleClass = (classes) ->
      element = _get(@)
      classes = $A(classes)
      if classList
      then element.classList.toggle item for item in classes
      else 
         wrappedElement = new DOM(element)
         for item in classes
            if wrappedElement.hasClass item then wrappedElement.removeClass item else wrappedElement.addClass item
      @
   
   getValue = ->
      element = _get(@)
      tag = element.nodeName
      return if not /SELECT|INPUT|TEXTAREA|BUTTON/.test(tag) or element.disabled
      if tag is "SELECT"
         options = $A element.options
         if element.multiple
            return options
               .filter((item) -> item.selected).pluck("value")
         return options[element.selectedIndex].value
      type = element.type
      if /checkbox|radio/.test(element.type)
         return element.value if element.checked
         return
      element.value
      
   setValue = (value) ->
      element = _get(@)
      tag = element.nodeName
      return @ if not /SELECT|INPUT|TEXTAREA|BUTTON/.test(tag) or element.disabled
      if tag is "SELECT"
         options = $A element.options
         options.forEach((item) -> item.selected = false) if element.multiple
         Array::concat.call([], value).forEach((item) -> 
            index = if typeOf(item) is "number" then item else options.pluck("value").indexOf item
            if index > -1 and options.length > index
               options[index].selected = true
               return
         )
      else 
         element.value = value
      @
   
   serialize = ->
      element = _get(@)
      result = {}
      $A(element.elements).forEach((item) ->
         value = getValue.call item
         name = item.name
         return if typeOf(value) is "undefined" or not name
         if name of result
            result[name] = [].concat(result[name]).concat(value)
            return
         else
            result[name] = value
            return
      )
      new Hash result
      
   getAttr = (attribute) ->
      element = _get(@)
      output = element.getAttribute attribute
      return element.style.cssText if attribute is "style"
      return output
   
   setAttr = (attribute, value) ->
      _get(@).setAttribute attribute, value
      @
   
   listen = (event, handler) ->
      element = _get(@)
      events = $A event
      
      for item in events
         if eventListener
         then element.addEventListener item, handler, false       
         else element.attachEvent "on#{item}", handler
      @
   
   stopListening = (event, handler) ->
      element = _get(@)
      events = $A event
      return if not handler
      for item in events
         if eventListener
         then element.removeEventListener item, handler 
         else element.detachEvent "on#{item}", handler
      @
   
   invoke = (method, args ...) ->
      elements = Array::concat.call [], _get(@)
      for item in elements
         method.apply new DOM(item), args
      @
   
   getById = (id) ->
      return new DOM document.getElementById(id)
   
   getByTag = (tag) ->
      new DOM Array::concat.call([], _get(@))
         .map((item) -> $A item.getElementsByTagName(tag))
         .reduce(reduceToArray)
   
   if "getElementsByClassName" of document
   then getByClass = (klass) ->
         new DOM Array::concat.call([], _get(@))
            .map((item) -> $A item.getElementsByClassName(klass))
            .reduce(reduceToArray)
   
   else getByClass = (klass) ->
         new DOM Array::concat.call([], _get(@))
            .map((item) -> $A item.getElementsByTagName("*"))
            .reduce(reduceToArray)
            .filter((item) -> new DOM(item).hasClass(klass))
            
            
   get: get,
   set: set,
   listen: listen,
   stopListening: stopListening,
   empty: empty,
   remove: remove,
   clone: clone,
   insert: insert,
   appendTo: appendTo,
   prependTo: prependTo,
   css: css,
   children: children,
   getElement: getElement,
   parent: parent,
   siblings: siblings,
   classNames: classNames,
   hasClass: hasClass,
   addClass: addClass,
   removeClass: removeClass,
   toggleClass: toggleClass,
   getValue: getValue,
   setValue: setValue,
   serialize: serialize,
   getAttr: getAttr,
   setAttr: setAttr,
   getById: getById,
   getByClass: getByClass,
   getByTag: getByTag,
   invoke: invoke