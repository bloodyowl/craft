function Browser(){
  var self = this
    , userAgent = window.navigator.userAgent.toLowerCase()
    , className = []

  self.UA = userAgent

  ;("Webkit Firefox IE IE6 IE7 IE8 Opera Konqueror iPhone iPad iPod Android")
    .split(" ")
    .forEach(function(item){
      var _item = item.toLowerCase()
        , test = new RegExp(_item.replace(/[6-9]/, function(m){ return " " + m })).test(userAgent)

      self["is" + item] = test
      if(test) className.push(_item) 
    })

  self.toClassName = function(){return className.join(" ")} 
}

extend(Craft, {
  Browser: new Browser()
})