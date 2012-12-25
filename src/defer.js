  
  var slice = [].slice
  
  function makePusher(array, length){
    return function(index, value, callback){
      var i = 0
      array[index] = value
      if(array.length == length) {
        for(;i < length; i++) if(array[i] === undefined) return 
        if(callback) callback.apply(null, array)
      } 
    }
  }
  
  function Defer(){
    var args = slice.call(arguments)
      , self = this
      , i = 0
      , length = args.length
      , item
      , stack = self.stack = []
      , push = makePusher(stack, length)
      , oneFailed = false
      
    if(!(self instanceof Defer)) return Defer.apply(new Defer(), arguments)
    
    args.each(function(item, index){
      
      var type = typeof item
      if(type != "object" && type != "string" && type != "function") {
        window.setTimeout(function(){
          if("error" in self && !oneFailed) self.error(type + " isn't a valid type. ")
          oneFailed = true
        }, 16)
        return
      }
      
      if(type == "function") {
        window.setTimeout(function(){
          push(index, item(), self.callback)
        }, 16)
        return
      }
      if(item instanceof Ajax) item = item.url
      if(type == "string") item = Ajax({
        url : item, 
        success : function(res){
          push(index, res, self.callback)
        },
        error : function(res){
          if("error" in self && !oneFailed) self.error(item.url + " can't be reached.")
          oneFailed = true
        }
        })
      item.update()
    })
    return self
  }
  
  Defer.prototype.then = function(callback){
    var self = this
    self.callback = callback
    return self
  }
  
  Defer.prototype.fail = function(callback){
    var self = this
    self.error = callback
    return self
  }
  
  Defer.prototype.init = function(callback){
    callback()
    return this
  }
  
  window.Defer = Defer