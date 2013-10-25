;(function(win){
  
  var doc = win.document
    , docEl = doc.documentElement
    , craft = {}
    , exposed

  craft.version = "3.0.0dev"

  craft.create = Object.create ? 
    function(object) {
      return Object.create(object)
    } : 
    function(object){
      function K(){}
      K.prototype = object
      return new K()
    }
  
  craft.parseInt = craftParseInt
  function craftParseInt(number, base){
    return parseInt(number, base || 10)
  }
  
  //= ./src/class.js
  //= ./src/iterators.js
  //= ./src/craft-events.js
  
  exposed = craft.events.create()
  craft.each(craft, function(item, index){
    exposed[index] = item
  })
  craft = win.craft = exposed
  
  //= ./src/functions.js
  //= ./src/dom.js
  //= ./src/dom-events.js
  //= ./src/bom.js
  //= ./src/animation.js
  //= ./src/promise.js
  
})(this.window)
