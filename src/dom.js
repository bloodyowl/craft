 var NATIVE_ELEMENT = "Element" in window
   , NATIVE_EVENT = "Event" in window
   , classList = "classList" in document.createElement("i")
   , formElementsRegExp = /SELECT|INPUT|TEXTAREA|BUTTON/
   , checkRegExp = /checkbox|radio/
   , eventListener = "addEventListener" in window
   , Element = NATIVE_ELEMENT ? window.Element : {}

 if(!NATIVE_ELEMENT) extend(window, {
    Element : Element
 })

 function $(element) {
   if(!element) return document.createElement("div")
   if(typeOf(element) == "string") return $(document.getElementById(element) || document.createElement("div"))
   if(element.nodeType == 11) return extend(element, Element.methods)
   if(NATIVE_ELEMENT) return element
   else return extend(element, Element.methods)
 }
 
 extend(window, {
   $ : $
 })
 
 if(!NATIVE_EVENT) extend(window, {
   Event : {}
 })
 
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
   }
 })
 
 function buildNodes(string){
   var el = document.createElement("div")
     , fragment = document.createDocumentFragment()
     , length
     , childNodes
     , index = 0
   el.innerHTML = string
   childNodes = toArray(el.childNodes)
   length = childNodes.length
   if(length == 1) return childNodes[0]
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
    create : function(tag, properties){
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
      else func()
    },
    getById : function(id){
      return $(id)
    },
    getByTag : function(tag){
      return toArray(document.getElementsByTagName(tag)).map(function(item){ return $(item)})
    },
    getByClass : function(klass){
      if("getElementsByClassName" in document){
        return toArray(document.getElementsByClassName(klass)).map(function(item){ return $(item)})
      } else {
        return toArray(document.getElementsByTagName("*")).map(function(item){return $(item) }).filter(function(item){return item.hasClass(klass)})
      }
    }
  })
  
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
        , nextSibling
        , firstChild
      if(!object) return this
      if(typeOf(object) == "string") return self.insert({ bottom : toNodes(object) })
      if(nodeType && (nodeType == 1 || nodeType == 11 || nodeType == 3)) return self.insert({ bottom : object })
      
      if(top = object.top) {
        if(firstChild = self.firstChild){
          self.insertBefore(toNodes(top), firstChild)
        } else {
          self.appendChild(toNodes(top))
        }
      }
      if(bottom = object.bottom) self.appendChild(toNodes(bottom))
      if(before = object.before) {
        if(parent = self.parentNode) parent.insertBefore(toNodes(before), self)
      }
      if(after = object.after) {
        if(parent = self.parentNode) {
          if(nextSibling = self.nextSibling){
            parent.insertBefore(toNodes(after), nextSibling)
          } else {
            parent.appendChild(toNodes(after))
          }
        }
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
      // enable insertBefore with firstChild, event if empty. 
      self.appendChild(document.createTextNode(""))
      return self
    },
    remove : function(){
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
      Hash(object).forEach(function(item, index){
        style[index.camelize()] = typeOf(item) == "number" && item !== 0 ? item + "px" : "" + item
      })
      return self
    },
    getChildren : function(){
      var self = this
        , result = []
      toArray(self.children).forEach(function(item){
        result.push($(item))
      })
      return result
    },
    getParent : function(){
      var parent = this.parentNode
      return parent ? $(parent) : null
    },
    getSiblings : function(){
      var self = this
        , parent = self.getParent()
      return parent && parent.getChildren().filter(function(item){
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
        if(self.multiple) return options.filter(function(item){return !!item.selected}).pluck("value")
        return options[self.selectedIndex].value
      }
      if(checkRegExp.test(self.type)) return self.checked ? self.value : undefined
      return self.value
    }, 
    setValue : function(value){
      var self = this
        , tag = self.nodeName
      if(!formElementsRegExp.test(tag) || self.disabled) return self
      if(tag == "SELECT"){
        options = toArray(self.options)
        if(self.multiple) options.forEach(function(item){item.selected = false})
        ;[].concat(value).forEach(function(item){
          var index = typeOf(item) == "number" ? item : options.pluck("value").indexOf(item)
          if(index > -1 && options.length > index) options[index].selected = true
        })
      } else {
        self.value = value
      } 
      return self
    },
    serialize : function(){
      var self = this
        , result = new Hash()
      toArray(self.elements).forEach(function(item){
        var value = Element.methods.getValue.call(item)
          , name = item.name
        if(typeOf(value) == "undefined" || !name) return
        if(name in result) {
          result[name] = [].concat(result[name]).concat(value)
          return
        } else {
          result[name] = value
        }
      })
      return result
    }, 
    listen : function(event, handler){
      var self = this
        , events = event.split(" ")
        , index = events.length
        , item
      while(index--){
        item = events[index]
        if(eventListener) self.addEventListener(item, handler)
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
      return toArray(this.getElementsByTagName(tag)).map(function(item){ return $(item)})
    },
    getByClass : function(klass){
      if("getElementsByClassName" in document){
        return toArray(this.getElementsByClassName(klass)).map(function(item){ return $(item)})
      } else {
        return toArray(this.getElementsByTagName("*")).map(function(item){return $(item) }).filter(function(item){return item.hasClass(klass)})
      }
    }
  }
  
  Element.extend(Element.methods)
  
  