  
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
      
      var xml, jsonp, headers, string
      
      if(item instanceof Ajax) {
        xml = item.xml
        jsonp = item.jsonp
        headers = item.headers
        string = item.url
      } else {
        if(typeof item == "string") string = item
        else return
      }
      
      item = Ajax({
        url : string, 
        xml : xml,
        jsonp : jsonp, 
        headers : headers,
        success : function(res){
          push(index, res, self.callback)
        },
        error : function(res){
          if("error" in self && !oneFailed) self.error(item.url + " can't be reached.")
          oneFailed = true
        }
        }).update()
    })
    return self
  }
  
  extend(Defer.prototype, {
    then : function(callback){
      var self = this
      self.callback = callback
      return self
    },
    fail : function(callback){
      var self = this
      self.error = callback
      return self
    },
    init : function(callback){
      callback()
      return this
    }
  })
  
  window.Defer = Defer