  window.Request = Request
  window.Elements = Elements
  window.Browser = Browser
  window.Class = Class
  var dollar = window.$
  window.$ = window.Craft = $
  window.$$ = $$
  $.noConflict = function(){
    window.$ = dollar
    return $
  }
  $.version = "2.0.0"
  $.implement = Function.prototype.implement.attach(Elements)

})(window, window.document)