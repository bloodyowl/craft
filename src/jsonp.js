;(function(craft){
  
  var uniq = -1
    , prefix = "craftjsonp"
  
  craft.jsonp = jsonp
  function jsonp(url, callbackName){
    var object = craft.promise.create()
      , parent = 
          doc.head || 
          doc.getElementsByTagName("head")[0] || 
          doc.documentElement
      , script = doc.createElement("script")
      , uniqCallback = prefix + (++uniq)
    
    if(!callbackName) callbackName = "callback"
    script.src = 
          url + 
          (url.indexOf("?") == -1 ? "?" : "&") + 
          callbackName + "=" +
          uniqCallback
    
    win[uniqCallback] = function(value){
      object.fulfill(value)
      win[uniqCallback] = null
      parent.removeChild(script)
    }
    
    parent.appendChild(script)
    return object
  }
  
})(craft)