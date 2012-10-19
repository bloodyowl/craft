###
String @ Craft.js
https://github.com/mlbli/Craft
###

extend String::, ->

   parseJSON = ->
      string = @
      if "JSON" of window then JSON.parse string else (new Function "return #{string}")()
      
   trim = ->
      @replace /^\s+|\s+$/g, ""
      
   camelize = ->
      @replace /-\D/g, (match, i)->
         if i isnt 0 then match.charAt(1).toUpperCase() else match.charAt(1)
         
   toElement = ->
      sandbox = document.createElement "div"
      fragment = document.createDocumentFragment()
      sandbox.innerHTML = @
      childNodes = $A sandbox.childNodes
      
      fragment.appendChild(item) for item, i in childNodes
      fragment
      
   parseJSON: parseJSON,
   trim: trim,
   camelize: camelize,
   toElement: toElement