  var _external = /\/\//

  function getJSONP(url, done){
    return function(){
    
      var callback = "request" + (+new Date())
        , script = Element.make("script", {
          type : "text/javascript",
          src: url + (!!~url.indexOf("?") ? "&" : "?") + "callback=" + callback
        })
    
      window[callback] = function(object){
        done(object)
        script.remove()
        window[callback] = null
      }
    
     
        script.appendTo(document.body)
      }
    
  }

  function Ajax(params){
    var request = (params.jsonp === true || (_external.test(params.url) && params.jsonp !== false)) ? getJSONP(params.url, params.success) :"XMLHttpRequest" in window ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
      , self = this

    if(!(self instanceof Ajax)) return new Ajax(params)

    extend(self, params)
    extend(self, {request : request})

    if(!self.method) self.method = "GET"
    if(typeOf(self.async) != "boolean") self.async = true

    if(typeOf(request) != "function") self.request.onreadystatechange = function(){
      var readyState = self.request.readyState
        , status, loading, success, error

      if(readyState == 2 && (loading = self.loading)) loading()
      if(readyState == 4 && (status = self.request.status) && ((status >= 200 && status < 300) || status == 304) && (success = self.success)) success(self.request.responseText)
      if(readyState == 4 && (status = self.request.status) + 1 && ((status < 200 || status > 300) && status != 304) && (error = self.error)) error(status)
    }
  }

  extend(Ajax.prototype, Hash.prototype)

  extend(Ajax.prototype, {
    update : function(){
      var self = this
        , method = self.method
        , request = self.request
        , url = self.url
        , xml = self.xml
        , async = self.async
        , query = self.query
        , headers = self.headers
        , index
        
      if(typeof request == "function") {
        request()
        return self
      } 

      request.open(method, url, async)

      if(method == "POST") {
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      }
      for(index in headers) if(hasOwn.call(headers, index)) request.setRequestHeader(index, headers[index])

      request.send(query || null)
      if(!async) return request[xml ? "responseXML" : "responseText"]
      return self
    },
    periodicalUpdate : function(time){
      var self = this
      return (function(){ self.update() }).every(time)
    }
  })

  window.Ajax = Ajax