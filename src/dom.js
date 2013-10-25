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
  
  nodeList.getDimensions = getDimensions
  function getDimensions(){
    var dimensions
      , style = getStyle.call(this)
    if(!style) return null
    dimensions = {}
    dimensions.height = craftParseInt(style.height)
    dimensions.width = craftParseInt(style.width)
    return dimensions
  }
  
  nodeList.getOffset = getOffset
  function getOffset(){
    var dimensions, clientRect
      , first = this[0]
      , top, left
    if(!first) return null
    top = win.pageYOffset || docEl.scrollTop || doc.body.scrollTop || 0
    left = win.pageXOffset || docEl.scrollLeft || doc.body.scrollLeft || 0
    clientRect = first.getBoundingClientRect()
    dimensions = {}
    dimensions.top = craftParseInt(top + clientRect.top)
    dimensions.right = craftParseInt(left + clientRect.right)
    dimensions.bottom = craftParseInt(top + clientRect.bottom)
    dimensions.left = craftParseInt(left + clientRect.left)
    dimensions.height = craftParseInt(clientRect.right - clientRect.left)
    dimensions.width = craftParseInt(clientRect.bottom - clientRect.top)
    return dimensions
  }
  
  craft.$ = $
  function $(selector, context){
    return toNodeList.apply(null, arguments)
  }
  
})(craft)
