###
Function @ Craft.js
https://github.com/mlbli/Craft
###

extend Function::, ->
  
  bind = (context, args ...) ->
    fn = @
    (otherArgs ...)->
      fn.apply context, args.concat(otherArgs)
      
  curry = (args ...) ->
    fn = @
    (otherArgs ...) ->
      fn.apply this, args.concat(otherArgs)
            
  delay = (time, args ...) ->
    fn = @
    window.setTimeout ->
      fn.apply @, args
    , time * 1000
    
  every = (time, args ...) ->
    fn = @
    window.setInterval ->
      fn.apply @, args
    , time * 1000

  bind: bind,
  curry: curry,
  delay: delay,
  every: every