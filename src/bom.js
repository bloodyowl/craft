;(function(craft){
  
  var animationFrame = 
        win.requestAnimationFrame || 
        win.webkitRequestAnimationFrame || 
        win.mozRequestAnimationFrame || 
        win.oRequestAnimationFrame || 
        win.msRequestAnimationFrame || 
        animationFramePolyfill 
  , cancelAnimationFrame = 
        win.cancelAnimationFrame || 
        win.webkitCancelAnimationFrame || 
        win.mozCancelAnimationFrame || 
        win.oCancelAnimationFrame || 
        win.msCancelAnimationFrame || 
        cancelAnimationFramePolyfill 
  
  function animationFramePolyfill(callback){
    return setTimeout(function(){
      callback()
    }, 1000 / 60)
  }
  
  function cancelAnimationFramePolyfill(id){
    clearTimeout(id)
  }
  
  craft.requestAnimationFrame = function(fn){
    return animationFrame(fn)
  }
  
  craft.cancelAnimationFrame = function(n){
    return cancelAnimationFrame(n)
  }
  
  craft.debounceAnimationFrame = debounceAnimationFrame
  function debounceAnimationFrame(fn, wait){
    return craft.debounce(function(){
      var args = arguments
      animationFrame(function(){
        fn.apply(null, args)
      })
    }, wait)
  }
  
})(craft)
