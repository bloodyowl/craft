  extend(Function.prototype, {
    attach : function(context){
      var self = this
        , args = toArray(arguments, 1)
      return function(){
        return self.apply(context, args.concat(toArray(arguments)))
      }
    },
    curry : function(){
      var self = this
        , args = toArray(arguments)
      
      return function(){
        return self.apply(this, args.concat(toArray(arguments)))
      }
    },
    delay : function(time){
      var self = this
        , args = toArray(arguments, 1)
      return window.setTimeout(function(){
        self.apply(undefined, args)
      }, time * 1000)
    },
    every : function(time){
      var self = this
        , args = toArray(arguments, 1)
      return window.setInterval(function(){
        self.apply(undefined, args)
      }, time * 1000)
    }
  })