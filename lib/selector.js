var _matchSelectors = /([^,])+/g
  , _matchParts = /[\w\.\-#\>\+\~\]\[\='"\*]+/g
  , _movers = /^(?:\>|\+|\~|\-)$/
  , _id = /\#([\w\-]+)/g
  , _onlyid = /^\#([\w\-]+)$/
  , _class = /\.([\w\-]+)+/g
  , _attrs = /[^,='"]+/g
  , _tag = /(^[\w\d\*]+)/g
  , _attr = /\[(.+)\]/
  , _byname = /\[name=["']([^"']+)["']\]/
  , classList = doc.createElement("i").classList
  , movers = {
       " " : function(element){return element}
     , ">" : function(element){return element.parentNode}
     , "+" : function(element){
       while(element = element.previousSibling) if(element.nodeType == 1) break
       return element
      }
     , "-" : function(element){
      while(element = element.nextSibling) if(element.nodeType == 1) break
      return element
      }
    }
  , cacheMatchers = {} // already used matchers go here
  
  function getByTag(tag, context){
    return context.getElementsByTagName(tag)
  }
  
  var getByClass = 
  doc.getElementsByClassName && !Browser.Opera && doc.querySelectorAll ?
    function(className, context){ return context.getElementsByClassName(className) } :
  doc.querySelectorAll ? 
    function(className, context){ return context.querySelectorAll("." + className) } : 
  doc.evaluate ? 
    function(className, context){
      var evaluation = doc.evaluate(".//*[contains(concat(' ', @class, ' '), '" + className + "')]", context, null, 0, null), result = []
        , reg = new RegExp("(^|\\s)" + className + "(\\s|$)"), cache
      while(cache = evaluation.iterateNext()) if(reg.test(cache.className)) result.push(cache)
      return result 
    } :
  function(className, context){
    var els = context.getElementsByTagName("*")
      , i = 0, l = els.length, result = []
      , reg = new RegExp("(^|\\s)" + className + "(\\s|$)"), cache 
    for(;i < l; i++) {
      cache = els[i]
      if(reg.test(cache.className)) result.push(cache)
    }
    return result
  }
              
 
  function getByName(name, context){
    return context.getElementsByName(name)
  }
  
  var isAncestor = 
    doc.compareDocumentPosition ? 
      function(el, ctnr){ return !!el && (ctnr.compareDocumentPosition(el) & 16) == 16 } :
    doc.documentElement.contains ?
      function(el, ctnr){ return !!el && ((ctnr.nodeType == 9 || isWindow(ctnr)) ? doc.documentElement : ctnr) !== el && ctnr.contains(el) } :
    function(el, ctnr){
      var parent
      while(parent = el.parentNode) if(parent == ctnr) return true
      return false
    }

  function getById(id, context){
    var el = (context.ownerDocument || context).getElementById(id)
    if(!context.ownerDocument) return el ? [el] : []
    return isAncestor(el, context) ? [el] : []
  }
  
  function hasId(id){
    return function(element){
      return element.id == id
    }
  }
  
  function hasTag(tag){
    if(tag == "*") return function(){return true}
    var regExp = new RegExp("^" + tag.replace(/([\.\*\+\?\^\=\!\:\$\{\}\(\)\|\[\]\/\\])/g, "\\$1") + "$", "i")
    return function(element){return regExp.test(element.nodeName)}
  }
  
  var hasClass = 
    classList ? 
      function(classes){
        var l = classes.length
        classes = classes.collect(function(i){return i.substring(1)})
        return function(element){
          var i = 0
          for(;i < l; i++) if(!element.classList.contains(classes[i])) return false
          return true
        }
      } : 
      function (classes){
        var i = 0, l = classes.length, classesRegExp = Array(l)
        for(;i < l; i++) classesRegExp[i] = new RegExp("(^|\\s)" + classes[i].substring(1) + "(\\s|$)")
        return function(element){
          var i = 0
            , className = element.className
          for(;i < l; i++) if(!classesRegExp[i].test(className)) return false
          return true
        }
      }
  
  function hasAttr(array){
    var l = array.length
    return function(element){
      var i = 0
      for(;i < l;) if(element.getAttribute(array[i++]) !== array[i++]) return false
      return true
    }
  }

function matcher(selector, root, noBubbling, delegated){
  var checkers
  checkers = selector.collect(checker)
  return function(element){
    var i = selector.length - 1, match, uniq, first = noBubbling
    if(!~i) return true
    if(!noBubbling) {
      while(element && element != root){
        if(checkers[i](element)) break
        element = element.parentNode
        continue
      }
      if(!element || element == root) return !~i
      if(delegated) delegated = element
      i--
      if(!~i) return delegated || !~i
      first = false
    }
    while(element && element != root){
      
      if(first) {
        first = false
        if(checkers[i](element)) {
          i--
          if(!~i) break
          else continue
        } else {
          break
        }
      }
      
      match = selector[i].match(_movers)
      
      if(match) {
        uniq = true
        i--
        element = movers[match[0]](element)
        if(!element) break
      } else {
        uniq = false
        element = element.parentNode
        if(element == root) break
      }
      if(checkers[i](element)) {
        i--
        if(!~i) break
        else continue
      } else {
        if(uniq) break
      }
    }
    return delegated || !~i
  } 
}

function dontCheck(){return true}

function checker(selector){
  var verifiers = []
    , match

  if(match = selector.match(_movers)) {
    verifiers.push(dontCheck)
  } else {
    if(match = selector.match(_id)) {
      verifiers.push(hasId(match[0].substring(1)))
    }
    if(match = selector.match(_class)) {
      verifiers.push(hasClass(match))
    }
    if(match = selector.match(_tag)) {
      verifiers.push(hasTag(match[0]))
    }
    if(match = selector.match(_attr)) {
      verifiers.push(hasAttr(match[1].match(_attrs)))
    }
  }

  return function(element){
    var i = 0, l = verifiers.length
    if(!l) return true
    for(;i < l; i++) if(!verifiers[i](element)) return false
    return true
  }
}

function getElements(selector, root){
  var match
  if(match = selector.match(_id)) return getById(match[0].substring(1), root)
  if(match = selector.match(_class)) return getByClass(match[0].substring(1), root)
  if(match = selector.match(_tag)) return getByTag(match[0], root)
  if(match = selector.match(_byname)) return getByName(match[1], root)
  return []
}

function Selector(string, context, constructor, maxLength){
  if(!string) return constructor ? new constructor() : []
  context = (isObject(context) && (!isElement(context) && context.length) ? context[0] : context) || doc
  if(typeof context == "string") context = Selector(context, null, null, maxLength)[0]
  if(!context) return []
  var selectors = string.match(_matchSelectors), i = 0, l = selectors.length, item 
    , results = constructor ? new constructor() : [] 
    , temp, j, k, element 
    , matches 
    , id
    , hasMaxLength = isNumber(maxLength)
  for(;i < l; i++) {
    if(i == "body" && _find.call(results, doc.body) == -1) {
      results.push(doc.body)
      continue
    }
    if(i == "html" && _find.call(results, doc.documentElement) == -1) {
      results.push(doc.documentElement)
      continue
    }
    if((id = selectors[i].match(_onlyid)) && (element = getById(id[1], context)[0]) && _find.call(results, element) == -1) {
        results.push(element)
        continue
      }
    if(hasMaxLength && results.length == maxLength) return results
    item = selectors[i].match(_matchParts)
    temp = getElements(item[item.length - 1], context)
    matches = Selector.matcher(selectors[i], context, true)
    for(j = 0, k = temp.length; j < k; j++) {
      element = temp[j]
      if(matches(element) && _find.call(results, element) == -1) results.push(element)
      if(hasMaxLength && results.length == maxLength) return results
    }
  }
  return results
}

Selector.isAncestor = isAncestor
var gen = Object.uniqueId.partial("root-")
Selector.matcher = function(selector, root, param, target){
  var cached, fn, uniq
  root = root || doc
  param = isBoolean(param) ? param : true
  
  if(root.uniqRoot) uniq = root.uniqRoot
  else uniq = root.uniqRoot = gen()
  if(cached = cacheMatchers[selector + ":" + uniq + ":" + param]) return cached
  fn = matcher(selector.match(_matchParts), root || doc, isBoolean(param) ? param : true, target)

  cacheMatchers[selector + ":" + uniq + ":" + param] = fn
  return fn
}

