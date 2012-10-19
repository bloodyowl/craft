###
Iterator & Array.range
###

Craft.extend Hash, 
  Iterator : (hash) ->
    hash = new Hash(hash)
    that = @
    that.active = 0
    keys = hash.keys()
    values = hash.values()
    i = keys.length
    that.length = i
    that[i] = [keys[i], values[i]] while i--
    return
  
Craft.extend Hash.Iterator::,
  next : -> 
    return if @active < @length then @[@active++] else null

Array.range = (start, end) ->
  i for i in [start ... (if end > start then end + 1 else end - 1)]