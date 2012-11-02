###
Core @ Craft.js
https://github.com/mlbli/Craft
###
Craft = (fn) ->
  fn Craft, @, @.document

###
$A = toArray (splits strings with " ")
###
$A = (list, start = 0) ->
  return list.split " " if typeOf(list) is "string"
  newList = []
  newList[_i] = i for i in list
  newList.slice(start)

###
typeOf 
adds "array" and "null" to the native typeof
###
typeOf = (object) ->
  type = typeof object
  return type unless type is "object"
  return "null" if object is null
  return "array" if object instanceof Array
  return "object"

###
easily extend a Function, an Object, a Prototype
###
extend = (object, source) ->
  source = source() if typeOf(source) is "function"
  object[i] = source[i] for own i of source
  return object

nameSpace = (object, key) ->
  ns = key.split(".")
  i = 0
  l = ns.length
  cache = object
  while i < l
    return if not cache or not cache.hasOwnProperty(ns[i])
    cache = cache[ns[i]] 
    i++
  cache
  
###
Craft.AJAX

@params
  url : @string
  method : @string (default : "GET")
  success : @function 
  loading : @function
  async : @boolean (default : true) 

::update
  sends the request
###

AJAX = (params) ->
  return if not params
  request = if "XMLHttpRequest" of window then new XMLHttpRequest() else ActiveXObject("Microsoft.XMLHTTP")
  that = @
  that.request = request
  that.url = params.url
  that.method = params.method or "GET"
  that.success = params.success
  that.loading = params.loading
  that.async = if typeOf(params.async) is "boolean" then params.async else true
  request.onreadystatechange = ->
    that.loading() if that.loading and request.readyState is 2
    that.success(request.responseText) if that.success and request.readyState is 4
    return
  that.update = ->
    request.open that.method, that.url, that.async
    if that.method is "POST"
      request.setRequestHeader "X-Requested-With", "XMLHttpRequest"
      request.getRequestHeander "Content-type", "application/x-www-form-urlencoded"
    request.send params.query || null
    return request.responseText if that.async is false
  return
  
reduceToArray = (a,b) -> [].concat(a).concat(b)