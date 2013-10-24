;(function(craft){

  craft.animation = animation
  function animation(callback){
    return function(state){
      var self = this
      state = state > 1 ? 1 : state < 0 ? 0 : state
      craft.requestAnimationFrame(function(){
        callback.call(self, state, 1 - state)
      })
    }
  }
  
  craft.timer = timer
  function timer(duration, step, callback){
    var start, end
    step = step || 20
    function fn(){
      var current
      if(!start) {
        start = +new Date
        end = start + duration
      }
      current = +new Date
      if(current > end) {
        callback(1)
        return
      }
      callback((current - start) / duration)
      setTimeout(fn, step)
    }
    return fn
  }
  
  
})(craft)
