  var regExpAttr = /^@([\w\-]+)/
    , _buggyAttributes = /class|for/
    , _collect = [].collect
    , _select = [].select
    , _contains = [].contains
    , _find = [].firstMatch
    , _pluck = [].pluck
    , _each = [].each
    , _ctnr = doc.createElement("div")
    , _hasBuggyHref
    , _buggyHref = /href|src/
    , buggyNodeNames = /TABLE|TBODY|TFOOT|THEAD|TR/
    , prefixFloat = win.getComputedStyle ? "cssFloat" : "styleFloat"
    , attributes = {
          "class" : "className"
        , "for" : "htmlFor"
      }
    _ctnr.innerHTML = "<a href='#i'></a>"
    _hasBuggyHref = _ctnr.getElementsByTagName("a")[0].href != "#i"
        
  /*
    Elements
    =======
    Creates an array-like object from an array 
    =======
    @arguments {
      array : array to convert
    }
    @output 
      elements
  */
  
  function Elements(array){
    var self = this, i = 0, l
    if(!array) array = []
    if(!(self instanceof Elements)) return new Elements(array)
    if(isFragment(array)) array = _select.call(array.childNodes, isElement)
    if(typeof array == "object" && "nodeName" in array) array = [array]
    for(l = array.length; i < l; i++) self[i] = array[i]
    if(l) self.length = l
    return self
  }
  
  function readAttr(name){
    if(attributes[name]) name = attributes[name]
    var match = name.match(_buggyAttributes)
    return function(element){
      var cache
      if(Browser.isIE) {
        if(match) return element.attributes[match[0]]
        if(!!~name.indexOf(":") && (cache = element.attributes) && (cache = element.attributes[name])) return cache.nodeValue
      }
      if(_hasBuggyHref && _buggyHref.test(name)) {
        var attr = element.getAttribute(name, 2)
          , location = win.location.toString().replace(win.location.hash, "")
        if(attr.indexOf(location + "#") > -1 && attr == element.getAttribute(name)) return attr.replace(location, "")
        return attr
      }
     return element.getAttribute(name) 
    }
  }
  
  function writeAttr(name, value){
    if(attributes[name]) name = attributes[name]
    if(value === false || value === null) return function(element){ element.removeAttribute(name) }
    if(value === true) return function(element){ element.setAttribute(name, name) }
    return function(element){ element.setAttribute(name, value) }
  }
  
  var elementHelpers = (function(){
    
    /*
      Elements.create
      =======
      Creates an element
      =======
      @arguments {
        nodeName : string (tag)
        object : properties (start attributes indexes with @)
      }
      @output 
        wrapped element
    */
       
    function create(name, properties){
      var element = doc.createElement(name), match
      if(properties) Object.each(properties, function(item, index){
        if(index == "class") index = "className"
        if(match = index.match(regExpAttr)) {
          writeAttr(match[1], item)(element)
        } else {
          element[index] = item
        }
        
      })
      return new Elements(element)
    }
    
    /*
      Elements.from
      =======
      Creates an element from an html string
      =======
      @arguments {
        string : html
      }
      @output 
        element or fragment
    */
    
    
    function from(string, context){
      var wrapper = doc.createElement("div")
        , hasContext = isString(context)
      wrapper.innerHTML = hasContext ? "<" + context + ">" + string + "</" + context + ">" : string
      return new Elements(hasContext ? wrapper.children[0].childNodes : wrapper.childNodes)
    }
    
    /*
      Elements.fragment
      =======
      Shorthand for document.createDocumentFragment
      =======
      @arguments {}
      @output 
        fragment
    */
    
    function fragment(){
      return doc.createDocumentFragment()
    }
    
    function matches(element, selector, root, noBubbling, delegated){
      return Selector.matcher(selector, root, noBubbling, delegated)(element)
    }
    
    return {
        create : create
      , from : from
      , fragment : fragment
      , matches : matches
    }
    
  })()
  
  Object.extend(Elements, elementHelpers)
  
  "each collect fold foldRight firstMatch lastMatch contains pluck isEmpty groupBy last groupWith any all"
  .split(" ")
  .each(function(i){
     Elements.implement(i, function(){
       return Array.prototype[i].apply(this, arguments)
     })
   })
   
   "select reject intersect difference sortBy"
      .split(" ")
      .each(function(i){
        Elements.implement(i, function(){
          return new Elements(Array.prototype[i].apply(this, arguments))
        })
      })
  
  var elementMethods = (function(){
  
    var GET_COMPUTED = "getComputedStyle" in win
      , _formElements = /SELECT|INPUT|TEXTAREA|BUTTON/
      , _checkables = /checkbox|radio/
      , classList = doc.createElement("i").classList
      , innerText = "innerText" in doc.createElement("i") ? "innerText" : "textContent"
      
    
  
    function each(elements, fn){
      var i = 0, l = elements.length
      for(;i < l; i++) fn(elements[i])
      return elements
    }
    
    
    function escapeNodes(nodes, one){
      var l, frag, i = 0
      if(!nodes) return null
      if(isNode(nodes)) return nodes
      if(isObject(nodes) && (l = nodes.length)) {
        if(one) return nodes[0]
        if((l == 1) && isNode(nodes[0])) return nodes[0]
        frag = doc.createDocumentFragment()
        for(;i < l; i++) if(isNode(nodes[i])) frag.appendChild(nodes[i])
        return frag
      } 
      else if(typeof nodes == "string") {
        return one ? $$(nodes)[0] : escapeNodes($(nodes))
      }
      return nodes
    }
    
    /*
      Elements.prototype.html
      =======
      Reads or writes the string contents of the elements
      =======
      @arguments {
        string : content
      }
      @output 
        elements|array 
    */
    
    function html(string) {
      var self = this
      if(isString(string)) return each(self, function(element){
        $(element).empty()
        if(buggyNodeNames.test(element.nodeName)) {
          $(element).append(Elements.from(string, element.nodeName)) 
        } else element.innerHTML = string
      })
      return isElement(self[0]) ? self[0].innerHTML : null
    }
    
    /*
      Elements.prototype.text
      =======
      Reads or writes the string contents of the elements (not html)
      =======
      @arguments {
        string : content
      }
      @output 
        elements|array 
    */
    
    function text(string) {
      var self = this, textNode
      if(isString(string)) {
        textNode = doc.createTextNode(string)
        return each(self, function(element){
          $(element).empty().append(textNode.cloneNode(true))
        })
      }
      return isElement(self[0]) ? self[0][innerText] : null
    }
    
    
    /*
      Elements.prototype.append
      =======
      Takes the first element of the list and appends the appendix into it 
      =======
      @arguments {
        appendix : node to insert
      }
      @output 
        elements
    */
  
    function append(appendix){
      var self = this
      appendix = escapeNodes(appendix)
      if(self.length && appendix) self[0].appendChild(appendix)
      return self
    }
    
    /*
      Elements.prototype.ancestors
      =======
      Iterates over the elements and for each returns an array of ancestors
      =======
      @arguments {}
      @output 
        array of arrays
    */
  
    function ancestors(){
      var el = this[0]
        , result = []
      if(!el) return null
      while((el = el.parentNode) && el != doc && !isFragment(el)) result.push(el)
      return result
    }
    
    /*
      Elements.prototype.appendTo
      =======
      Iterates over the elements and appends them into a given element
      =======
      @arguments {
        element
      }
      @output 
        elements
    */
  
    function appendTo(element){
      element = escapeNodes(element, true)
      element.appendChild(escapeNodes(this))
      return this
    }
    
    /*
      Elements.prototype.prepend
      =======
      Takes the first element of the list and prepends the appendix into it 
      =======
      @arguments {
        appendix : node to insert
      }
      @output 
        elements
    */
  
    function prepend(appendix) {
      var self = this
      appendix = escapeNodes(appendix)
      if(self.length && appendix) self[0].insertBefore(appendix, self[0].firstChild)
      return self
    }
    
    /*
      Elements.prototype.prependTo
      =======
      Iterates over the elements and prepends them into a given element
      =======
      @arguments {
        element
      }
      @output 
        elements
    */
  
    function prependTo(element) {
      var fragment = doc.createDocumentFragment()
      element = escapeNodes(element, true)
      each(this, function(appendix){
        if(!element) return false
        fragment.appendChild(appendix)
      })
      element.insertBefore(fragment, element.firstChild)
      return this
    }
    
    /*
      Elements.prototype.insertAfter
      =======
      Inserts the appendix after the first element of the elements instance
      =======
      @arguments {
        appendix
      }
      @output 
        elements
    */
  
    function insertAfter(appendix){
      var self = this, item, parent
      if(isNode(item = self[0])) {
        item = self[0]
        parent = item.parentNode
        appendix = escapeNodes(appendix)
        if(parent && appendix) parent.insertBefore(appendix, item.nextSibling)
      }
      return self
    }
    
    /*
      Elements.prototype.insertBefore
      =======
      Inserts the appendix before the first element of the elements instance
      =======
      @arguments {
        appendix
      }
      @output 
        elements
    */
  
    function insertBefore(appendix){
      var self = this, item, parent
      if(self.length) {
        item = self[0]
        parent = item.parentNode
        appendix = escapeNodes(appendix)
        if(parent && appendix) parent.insertBefore(appendix, item)
      }
      return self
    }
    
    /*
      Elements.prototype.siblings
      =======
      Returns the siblings of the elements
      =======
      @arguments {
        [dismissElement] : (default:false) remove the elements from the list
      }
      @output 
        elements
    */
  
    function siblings(dismissElement){
      var result = []
        , element = this[0]
  
      if(!isNode(element)) return null
      
        var parent = element.parentNode
        if(!parent) return new Elements()
        each(parent.children, function(item){
          if(dismissElement && item == element) return
          if(!_contains.call(result, item)) result.push(item)
        })
  
      return new Elements(result)
    }
    
    /*
      Elements.prototype.siblingsBefore
      =======
      Returns the siblings before the elements
      =======
      @arguments {}
      @output 
        elements
    */
  
    function siblingsBefore(){
      var el = this[0], siblings
      if(!isNode(el)) return null
      siblings = $(el).siblings()
      return new Elements([].slice.call(siblings, 0, _find.call(siblings, el)))
    }
    
    
    
    function previous(){
      var self = this[0]
      if(self) while(self = self.previousSibling) if(isElement(self)) break
      return new Elements(self)
    }
    /*
      Elements.prototype.siblingsAfter
      =======
      Returns the siblings after the elements
      =======
      @arguments {}
      @output 
        elements
    */
  
    function siblingsAfter(){
      var el = this[0], siblings
      if(!isNode(el)) return null
      siblings = $(el).siblings()
      return new Elements([].slice.call(siblings, _find.call(siblings, el) + 1))
    }
    
    
    function next(){
      var self = this[0]
      if(self) while(self = self.nextSibling) if(isElement(self)) break
      return new Elements(self)
    }
    
    /*
      Elements.prototype.children
      =======
      Returns the children of the elements
      =======
      @arguments {}
      @output 
        elements
    */
  
    function children(){
      var element = this[0]
      if(!isNode(element)) return null
      return new Elements(Array.from(element.children))
    }
    
    /*
      Elements.prototype.getElements
      =======
      Get the elements matching the given selector inside the given elements 
      =======
      @arguments {
        selector : string : css selector
      }
      @output 
        elements
    */
  
    function getElements(selector){
      var element = this[0]
      if(!isNode(element)) return null
      return $(selector, element)
    }
    
    /*
      Elements.prototype.empty
      =======
      Empties the elements
      =======
      @arguments {}
      @output 
        elements
    */
  
    function empty(){
      return each(this, function(element){
        var c = element.childNodes
        , l = c.length
      for(;l--;) element.removeChild(c[l])
      })
    }
    
    /*
      Elements.prototype.remove
      =======
      Removes the elements
      =======
      @arguments {}
      @output 
        elements
    */
  
    function remove(){
      return each(this, function(element){
        var parent = element.parentNode
        if(parent) parent.removeChild(element)
        return element
      })
    }
    
  
    function getStyle(element, property){
      var style
      if(!isElement(element)) return null
      style = GET_COMPUTED ? win.getComputedStyle(element, false) : element.currentStyle
      if(isString(property)){
        return style[property == "float" ? prefixFloat : property.camelize().replace(/^moz/, "Moz").replace(/^o/, "O")]
      } 
      if(isArray(property)) {
        var o = {}
        property.each(function(item){
          o[item] = style[item == "float" ? prefixFloat : item.camelize().replace(/^moz/, "Moz").replace(/^o/, "O")]
        })
        return o
      }  
    }
  
    function suffix(property){
      if(typeof property == "number" && property) return property.toString() + "px"
      return property.toString()
    }
    
    /*
      Elements.prototype.css
      =======
      Collects the style objects, or sets them
      =======
      @arguments {}
      @output 
        elements
    */
  
  
    function css(property, property2){
      var self = this
        switch(arguments.length){
          case 1: 
            if(isObject(property) && !isArray(property)) return each(this, function(el){
              Object.each(property, function(item, index){
                el.style[index == "float" ? prefixFloat : index.camelize()] = suffix(item)
              })
            })
            if(isElement(self[0])) return getStyle(self[0], property)
            return null
          break
          case 2: 
            property = property == "float" ? prefixFloat : property.camelize()
            property2 = suffix(property2)
            return each(self, function(element){
              element.style[property] = property2
            })
          break
      } 
    }
    
    /*
      Elements.prototype.getValue
      =======
      Collects the values of the given elements
      =======
      @arguments {}
      @output 
        values
    */
  
    function getValue(){
      var element
      if(!isElement(element = this[0])) return null
        var tag = element.nodeName.match(_formElements)
          , options
        if(!tag || element.disabled) return null
        if(tag[0] == "SELECT"){
          options = element.options
          if(element.multiple) return _select.call(options, function(item){return !!item.selected}).pluck("value")
          return options[element.selectedIndex].value
        }
        if(_checkables.test(element.type)) return element.checked ? element.value : undefined
        return element.value
    }
    
    /*
      Elements.prototype.setValue
      =======
      Sets the values of the given elements
      =======
      @arguments {}
      @output 
        elements
    */
  
  
    function setValue(value){
      return each(this, function(element){
        var tag = element.nodeName.match(_formElements)
          , options
          , plucked
        if(!tag || element.disabled) return element
        if(tag[0] == "SELECT"){
          options = element.options
          if(element.multiple) each(options, function(item){item.selected = false})
          plucked = _pluck.call(options, "value")
          each([].concat(value), function(item){
            var index = isNumber(item) ? item : _find.call(plucked, item)
            if(index > -1 && options.length > index) options[index].selected = "selected"
          })
        } else if (tag[0] == "TEXTAREA"){
          $(element).empty().append(doc.createTextNode(value))
        } else {
          element.value = value
        }
      })
    }
    
    /*
      Elements.prototype.index
      =======
      Return the index of the element in its parent children
      =======
      @arguments {}
      @output 
        number or null
    */
  
    function index(){
      if(!isNode(this[0])) return null
      var item = this[0]
        , parent = item.parentNode
        if(!parent) return null
        return _find.call(parent.children, item)
    }
    
    /*
      Elements.prototype.serialize
      =======
      Collects objects of {name:value[,…]} of the form elements inside of the elements
      =======
      @arguments {}
      @output 
        array of objects
    */
  
    function serialize(){
        var elements = $(this[0]).getElements("input, select, textarea, button")
          , result = {}
          , values = _collect.call(elements, function(item){
            return $(item).getValue()
          })
        _each.call(elements, function(item, index){
          var name = item.name
            if(isUndefined(values[index]) || values[index] === "" || !name) return
            if(name in result) result[name] = [].concat(result[name]).concat(values[index])
            else result[name] = values[index]
        })
        return result
    }
    
    /*
      Elements.prototype.attr
      =======
      Reads of writes the elements attributes
      =======
      @arguments {
        name : string
        [value] : value
      }
      @output 
        elements or array of values
    */
  
    function attr(name, value){
      var self = this
      if(isUndefined(value) && isNode(self[0])) return readAttr(name)(self[0])
      each(self, writeAttr(name, value))
      return self
    }
    
    /*
      Elements.prototype.data
      =======
      Reads of writes the elements data attributes
      =======
      @arguments {
        name : string
        [value] : value
      }
      @output 
        elements or array of values
    */
  
    function data(name, value){
      return attr.call(this, "data-" + name, value)
    }
    
    /*
      Elements.prototype.clone
      =======
      Returns a set of cloned elements
      =======
      @arguments {
        deep : boolean 
      }
      @output 
        elements
    */
    
    function clone(deep){
      var results = []
      each(this, function(item){
        results.push(item.cloneNode(deep))
      })
      return new Elements(results)
    }
    
    function parent(){
      var self = this
      if(isNode(self[0])) return new Elements(self[0].parentNode)
      return new Elements()
    }
    
    /*
      Elements.prototype.layout
      =======
      Returns the first element's coords object (data are relative to viewport)
      =======
      @arguments {
        classes : string : classes, space separated
      }
      @output 
        {
          top : number
          left : number
          right : number
          bottom : number
          height : number
          width : number
        }
    */
    
    function coords(){
      var self = this, lyt, r = {}
      if(isNode(self[0])) {
        lyt = self[0].getBoundingClientRect()
          r.top = parseInt(lyt.top, 10) // fix rounding issue
          r.left = parseInt(lyt.left, 10)
          r.bottom = parseInt(lyt.bottom, 10)
          r.right = parseInt(lyt.right, 10)
          r.width = parseInt(lyt.width, 10) || (r.right - r.left) || 0
          r.height = parseInt(lyt.height, 10) || (r.bottom - r.top) || 0
          return r
      }
      return null
    }
    
    /*
      Elements.prototype.offset
      =======
      Returns the first element's offset object 
      =======
      @arguments {
        classes : string : classes, space separated
      }
      @output 
        {
          top : number
          left : number
          height : number
          width : number
        }
    */
    
    function offset(){
      var self = this, el, parent, elCoords, offsetParentCoords
      if(isNode(el = self[0])) {
        parent = el
        while(parent) {
          parent = parent.parentNode
          if(parent == doc.body) break
          if(getStyle(parent, "position") != "static") break
        }
        elCoords = self.coords()
        offsetParentCoords = $(parent).coords()
        return {
            top :  elCoords.top - offsetParentCoords.top
          , left : elCoords.left -  offsetParentCoords.left
          , parent : parent
        }
      }
      return null
    }
    
    
    /*
      Elements.prototype.offset
      =======
      Returns the first element's offset object 
      =======
      @arguments {
        classes : string : classes, space separated
      }
      @output 
        {
          top : number
          left : number
          height : number
          width : number
        }
    */
    
    function globalOffset(){
      var self = this, el, rect
      if(isNode(el = self[0])) {
        rect = self.coords()
        return {
            top : (win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop || 0) + rect.top
          , left : (win.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft || 0) + rect.left
        }
      }
      return null
    }
    
    /*
      Elements.prototype.classNames
      =======
      Returns the elements classNames
      =======
      @arguments {}
      @output 
        elements
    */
  
    function classNames(){
      var cn
      if(!isElement(this[0])) return null
      if(classList) return Array.from(this[0].classList).sort()
      return (cn = this[0].className.match(/\S+/g)) && cn.sort() || []
    }
    
    /*
      Elements.prototype.hasClass
      =======
      Returns whether or not the first element has a given class
      =======
      @arguments {
        class : string
      }
      @output 
        elements
    */
    
    function hasClass(className){
      var c
      if(!isElement(this[0])) return null
      if(classList) return this[0].classList.contains(className)
      if(c = this[0].className) return c.split(" ").contains(className)
      return false
    }
    
    
    /*
      Elements.prototype.addClass
      =======
      Adds the given classNames
      =======
      @arguments {
        classes : string : classes, space separated
      }
      @output 
        elements
    */
  
    function addClass(classes){
      if(classes == null) return this
      classes = classes.match(/\S+/g)
      var l = classes.length, i
      if(classList){
        return each(this, function(element){
          for(i=0; i < l; i++) element.classList.add(classes[i])
        })
      } else {
        return each(this, function(element){
          var classNames = element.className.match(/\S+/g) || [], klass
          for(i=0; i < l; i++) if(!_contains.call(classNames, klass = classes[i])) classNames.push(klass)
          element.className = classNames.join(" ")
        })
      }
    }
  
    /*
      Elements.prototype.removeClass
      =======
      Removes the given classNames
      =======
      @arguments {
        classes : string : classes, space separated
      }
      @output 
        elements
    */
  
    function removeClass(classes){
      if(classes == null) return this
      classes = classes.match(/\S+/g)
      var l = classes.length, i
      if(classList){
        return each(this, function(element){
          for(i=0; i < l; i++) element.classList.remove(classes[i])
        })
      } else {
        return each(this, function(element){
          var classNames = element.className.match(/\S+/g) || [], index
          for(i=0; i < l; i++) if(!!~(index = _find.call(classNames, classes[i]))) classNames.splice(index, 1)
          element.className = classNames.join(" ")
        })
      }
    }
    
    /*
      Elements.prototype.toggleClass
      =======
      Toggles the given classNames
      =======
      @arguments {
        classes : string : classes, space separated
      }
      @output 
        elements
    */
  
    function toggleClass(classes){
      if(classes == null) return this
      classes = classes.match(/\S+/g)
      var l = classes.length, i
      if(classList){
        return each(this, function(element){
          for(i=0; i < l; i++) element.classList.toggle(classes[i])
        })
      } else {
        return each(this, function(element){
          var classNames = element.className.match(/\S+/g) || [], klass, index
          for(i=0; i < l; i++) {
            if(~(index = _find.call(classNames, klass = classes[i]))) classNames.splice(index, 1)
            else classNames.push(klass)
          }
          element.className = classNames.join(" ")
        })
      }
    }

    return {
        constructor : Elements
      , length : 0
      , push : [].push
      , append : append
      , html : html
      , text : text
      , appendTo : appendTo
      , prepend : prepend
      , prependTo : prependTo
      , insertAfter : insertAfter
      , insertBefore : insertBefore
      , siblings : siblings
      , ancestors : ancestors
      , siblingsBefore : siblingsBefore
      , previous : previous
      , siblingsAfter : siblingsAfter
      , next : next
      , children : children
      , getElements : getElements
      , empty : empty
      , remove : remove
      , css : css
      , listen : function(events, selector, handler){
        return each(this, function(el){
          listen(el, events, selector, handler)
        })
      }
      , fire : function(evt, data, bubble){
        return each(this, function(el){
          fire(el, evt, data, bubble)
        })
      }
      , stopListening : function(events, handler){
        return each(this, function(el){
          stopListening(el, events, handler)
        })
      }
      , getValue : getValue
      , setValue : setValue
      , index : index
      , serialize : serialize
      , attr : attr
      , data : data
      , clone : clone
      , parent : parent
      , coords : coords
      , offset : offset
      , globalOffset : globalOffset
      , classNames : classNames
      , addClass : addClass
      , hasClass : hasClass
      , removeClass : removeClass
      , toggleClass : toggleClass
      , splice : [].splice
    }
  
  })()

  Elements.implement(elementMethods)
  
  function ready(fn){
    if(!isFunction(fn)) return
    if (ready.status) fn.delay(0)
    else ready.stack.push(fn)
  }
  
  function updateStatus(){ 
    if(!/in/.test(doc.readyState) && doc.body) {
      if(!doc.head) doc.head = doc.getElementsByTagName("head")[0] // id fix
      ready.status = true
      ready.stack = ready.stack.reject(function(fn){ fn.delay(0); return true})
    }
    if(!ready.status) updateStatus.delay(0.001)
  }
  
  updateStatus.delay(0.001)
  ready.status = false
  ready.stack = []
  doc.ready = ready 
    
  /*
    $
    =======
    Executes a given function onDomReady or gets elements from CSS selector
    =======
    @arguments {
      string : css selector or function to execute on domReady
      [context] : scope to find the elements
    }
    @output 
      elements|undefined
  */
  
  function $(string, context){
    if(typeof string == "function") return doc.ready(string)
    if(string && typeof string == "object" && ("length" in string || "nodeType" in string)) return new Elements(string)
    return Selector(string, context, Elements)
  }
  
  $.create = Elements.create
  
  function $$(string, context, limit){
    return Selector(string, context, Elements, limit || 1)
  }
