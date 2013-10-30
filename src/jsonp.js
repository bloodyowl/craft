;(function(craft){
  
  var uniq = -1
    , prefix = "craftjsonp"
  
  craft.jsonp = jsonp
  function jsonp(url, callbackName, waitTimeout){
    var object = craft.promise.create()
      , parent = 
          doc.head || 
          doc.getElementsByTagName("head")[0] || 
          doc.documentElement
      , script = doc.createElement("script")
      , uniqCallback = prefix + (++uniq)
      , timeout
    
    script.type = "text/javascript"
    
    if(!callbackName) callbackName = "callback"
    script.src = 
          url + 
          (url.indexOf("?") == -1 ? "?" : "&") + 
          callbackName + "=" +
          uniqCallback
    
    script.onerror = function(){
      object.reject(new Error("Script errored"))
      win[uniqCallback] = null
      parent.removeChild(script)
    }
    
    script.onreadystatechange = function(){
      if(timeout) return
      if(script.readyState == "loaded") {
        timeout = setTimeout(function(){
          object.reject(new Error("Script timed out"))
          win[uniqCallback] = null
        }, waitTimeout)
        script.onreadystatechange = null
      }
    }
    
    win[uniqCallback] = function(value){
      if(timeout) {
        clearTimeout(timeout)
      }
      object.fulfill(value)
      win[uniqCallback] = null
      parent.removeChild(script)
    }
    
    parent.appendChild(script)
    
    return object
  }
  
})(craft)