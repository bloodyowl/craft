  var dollar = window.$
  $.noConflict = function(){
    window.$ = dollar
    return $
  }
  $.version = "2.0.0"
  $.implement = Function.prototype.implement.attach(Elements)
  

  var output = {
      Request : Request
    , Elements : Elements
    , Browser : Browser
    , Class : Class
    , $ : $
    , Craft : $
  }

  var i
  if (typeof define == "function" && define.amd) define(function(){ return output }) 
  else {
    for(i in output) if(Object.prototype.hasOwnProperty.call(output, i)) win[i] = output[i]
  }

})();