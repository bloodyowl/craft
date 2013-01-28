extend(Array.prototype, function(){

  function invoke(fn){
    var self = this
      , index = 0
      , length = self.length
      , args = toArray(arguments, 1)
      , argsL = args.length
      , result = []
      , method = typeOf(fn) == "string" ? Element.methods[fn] : fn
    
    if(argsL === 0) for(;index < length; index++) result[index] = method.call($(self[index]))
    if(argsL == 1) for(;index < length; index++) result[index] = method.call($(self[index]), args[0])
    if(argsL == 2) for(;index < length; index++) result[index] = method.call($(self[index]), args[0], args[1])
    if(argsL == 3) for(;index < length; index++) result[index] = method.call($(self[index]), args[0], args[1], args[2])
    if(argsL >= 4) for(;index < length; index++) result[index] = method.apply($(self[index]), args)
    
    return result
  }
  
  return {
    invoke: invoke
  }
})