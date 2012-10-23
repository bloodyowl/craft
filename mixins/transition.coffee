Craft.extend DOM::,
  transition : (transition, persistent) ->
    # @transition : String (ex: ".3s ease-out all")
    # @persistent : Boolean (if false, transition only occures once)
    element = @
    hash = new Hash
    prop = if "TransitionEvent" of window then 0 else if "WebKitTransitionEvent" of window then 1 else if +opera.version() > 10.49 then 2 else if "mozTransitionEvent" of window then 3 else if "msTransitionEvent" of window then 4 else -1
    # prop =
    # 0 : W3C, FF16+
    # 1 : Webkit
    # 2 : Opera
    # 3 : FF15-
    # 4 : IE
    # 5 : TransitionEvent non supported
  
  
    event = Craft.toArray("transitionend webkitTransitionEnd oTransitionEnd mozTransitionEnd msTransitionEnd")[prop] # defines the matching event name
  
    Craft.toArray("-webkit- -moz- -o- ").forEach((item) -> hash.set((item + "transition").camelize(), transition)) # the browser removes by itself the non recognized properties
  
    element.css(hash)
  
    return if persistent is true or prop is -1
  
    element.listen(event, (handler = ->
      emptyProperties = hash.clone()
      emptyProperties.forEach((item, index) -> emptyProperties[index] = "" )
      element.css(emptyProperties)
      element.stopListening(event, handler)
    ))
    return element