;(function(craft){
    
  var stack = []
    , domReadyRE = /interactive|complete|loaded/
    , isReady = false
  
  craft.domReady = domReadyInterface
  function domReadyInterface(fn){
    if(typeof fn != "function") {
      return craft
    }
    if(isReady) {
      run(fn)
      return craft
    }
    stack.push(fn)
    return craft
  }
  
  function run(fn){
    setTimeout(function(){
      fn(craft)
    }, 0)
  }
  
  function checkStatus(){
    var item
    if(isReady) return
    if(domReadyRE.test(doc.readyState)) {
      isReady = true
      while(item = stack.shift()) run(item)
      return
    }
    setTimeout(checkStatus, 10)
  }
  
  checkStatus()
  
})(craft)
