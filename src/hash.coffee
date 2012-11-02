###
Hash @ Craft.js
https://github.com/mlbli/Craft
###

Hash = (object) ->
  return if not object
  for own i of object
    @[i] = object[i]
  @length = object.length if object.length
  return
  
extend Hash::, ->

  forEach = (fn) ->
    hash = @
    for own i of hash
         fn(hash[i], i, hash)
    @
    
  
  toQueryString = ->
    hash = @
    queryString = ""
    for own i, item of hash
      continue if not item
      if typeOf(item) is "array"
        queryString += "#{i}=" + item.join("&" + i + "=") + "&"
      else 
        queryString += "#{i}=#{item}&"
    queryString = queryString.slice 0, -1
    if "encodeURI" of window then encodeURI queryString else escape queryString
    
  clone = ->
    new Hash @
  
  keys = ->
    hash = @
    i for own i of hash

  values = ->
    hash = @
    item for own i, item of hash
    
  get = (key)->
    nameSpace(@, key)
    
  set = (key, value)->
    hash = @
    hash[key] = value
    return hash
    
  isEmpty = ->
    hash = @
    for own i of hash
      return false
    true
    
  invoke = (method, args ...) ->
    hash = @
    for own i, item of hash
      continue if i is "length"
      method.apply item, args
    @
    
  forEach: forEach,
  toQueryString: toQueryString,
  clone: clone,
  keys: keys,
  values: values,
  get: get,
  set: set,
  isEmpty: isEmpty,
  invoke: invoke

AJAX:: = Hash::