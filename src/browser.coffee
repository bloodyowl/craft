Browser = new ->

  that = @
  userAgent = window.navigator.userAgent.toLowerCase()
  className = []
  that.UA = userAgent
  
  $A("Webkit Firefox IE IE6 IE7 IE8 Opera Konqueror iPhone iPad iPod Android")
    .forEach((item) ->
      $item = item.toLowerCase()
      test = new RegExp($item.replace(/[6-8]/, (m) -> return " #{m}")).test(userAgent)
      that["is" + item] = test
      className.push($item) if test 
  )

  that.toClassName = -> className.join(" ")
  return

extend Craft, 
  Browser: Browser,
  typeOf: typeOf,
  extend: extend,
  AJAX: AJAX,
  toArray: $A
  version : "0.1.8"

extend window,
  Craft: Craft,
  Hash: Hash,
  DOM: DOM

return