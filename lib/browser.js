var Browser = (function(){
  var ua = navigator.userAgent
    , opera = !!win.opera
    , ie = !!win.attachEvent && !opera
  
  return {
      IE : ie
    , IE7 : ie && !!~ua.indexOf("IE 7")
    , IE8 : ie && !!~ua.indexOf("IE 8")
    , IE9 : ie && !!~ua.indexOf("IE 9")
    , Gecko : !!~ua.indexOf("Gecko") && !~ua.indexOf("KHTML")
    , WebKit : !!~ua.indexOf("AppleWebKit/")
    , Opera : opera
    , toString : function(){
      var self = this, arr = [], i
      for(i in self) if(Object.owns(self, i) && i != "toString" && self[i]) arr.push(i.toLowerCase())
      return arr.join(" ")
    }
  }

})()