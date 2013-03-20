var Request = Class.create({
        _script : /^script\:/
      , _jsonp : /^jsonp\:/
      , _post : /^post\((.*)\)\:(.*)/
      , done : 0
      , initialize : function(urls){

          var args = [].concat(urls)
            , l = args.length
            , self = this
          if(!(self instanceof Request)) return new Request(urls)
          self.stack = []
            
          self.requests = args.collect(function(item, index){
            var match, req
              , responder = function(response){
                self.stack[index] = response
                if((++self.done) == l) {
                  self._done = true
                  ;(self._then || []).each(function(a){a.apply(null, self.stack)})
                  self._then = []
                }
              }
              , failer = function(){
                self._failed = true
                ;(self._fail || []).each(function(i){i()})
                self._fail = []
              }

            if(Object.isString(item)) {
              if(self._script.test(item)) return new Request.script(item.replace(self._script, "")).then(responder).fail(failer)
              if(self._jsonp.test(item)) return new Request.jsonp(item.replace(self._jsonp, "")).then(responder).fail(failer)
              if(match = item.match(self._post)) {
                req = new Request.post(item.replace(match[2])).then(responder).fail(failer)
                req.update = req.update.attach(req, match[1])
                return req
              }
              return new Request.get(item).then(responder).fail(failer)
            }
            if(Object.isObject(item)) return item.then(responder).fail(failer)
            if(Object.isFunction(item)) return new item.then(responder).fail(failer)
          }).each(function(a){a.update()})

          return self

        }
      , then : function(fn){
          var self = this
          if(self._done) {
            fn.apply(null, self.stack)
            return self
          }
          self._then = self._then || []
          self._then.push(fn)
          return self
        }
      , fail : function(fn){
          var self = this
          if(self._failed) {
            fn()
            return self
          }
          self._fail = self._fail || []
          self._fail.push(fn)
          return self
        }
      , always : function(fn){
          var self = this
          fn()
          return self
        }
    })
  , req = Class.create({
        async : function(a){
          var self = this
          self.async = !!a
          return self
        }
      , withCredentials : function(a){
          var self = this
          self.withCredentials = a
          return self
        }
      , setHeader : function(a,b){
          var self = this
          self.headers = self.headers || {}
          self.headers[a] = b
          return self
        }
      , setHeaders : function(obj){
          var self = this
          self.headers = self.headers || {}
          Object.extend(self.headers, obj)
          return self
        }
      , then : function(fn){
          var self = this
          self._then = self._then || []
          self._then.push(fn)
          return self
        }
      , fail : function(fn){
          var self = this
          self._fail = self._fail || []
          self._fail.push(fn)
          return self
        }
      , always : function(fn){
          var self = this
          self._always = self._always || []
          self._always.push(fn)
          return self
        }
    })

  function xhr(self){
    var req = win.XMLHttpRequest ? new XMLHttpRequest() : null 
    if(req === null) throw new Error("Browser (" + Browser.toString() +") cannot handle Requests")
    self.request = req
    return req
  }

function parseResponse(request, type){
  var res = request.responseText
  if(/xml/.test(type)) return request.responseXML
  if(res.isJSON()) return "JSON" in win ? JSON.parse(res) : Function("return " + res)()
  return res
}

function checkStatus(status){
      if((status >= 200 && status < 300) || status == 304) return "success"
      if((status < 200 || status > 300) && status != 304) return "error"
    }

function makeXHR(method, self, request, querystring){
  request.open(method, self.url, self.async)
  if(method == "POST") {
   request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
   request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
 }
  if(Object.isObject(self.headers)){
    Object.each(self.headers, function(a,i){
      request.setRequestHeader(i,a)
    })
  }
  if(self.withCredentials) request.withCredentials = true
  request.onreadystatechange = function(){
    var readyState = request.readyState
    if(readyState == 2 && self._always) self._always.each(function(i){i()})
    if(readyState == 4) {
      var status = checkStatus(request.status)
        , result
      if(status == "success") {
        result = parseResponse(request, request.getResponseHeader("Content-Type"))
        $("html").fire("request:loaded", result)
        if(self._then) return self._then.each(function(i){i.call(request, result)})
      }
      if(status == "error") {
        if(self._fail) return self._fail.each(function(i){i.call(request, request.status)})
        $("html").fire("request:failed")
      }
    }
  }
  request.send(querystring || null)
}

Request.get = Class.create(req, {
      initialize : function(url){
        var self = this
        if(!(self instanceof Request.get)) return new Request.get(url)
        self.url = url
        return self
      }
    , update : function(){
      var self = this, request = xhr(self)
      makeXHR("GET", self, request)
      return self.async ? self : request
    }
})

Request.post = Class.create(req, {
    initialize : function(url){
        var self = this
        if(!(self instanceof Request.post)) return new Request.post(url)
        self.url = url
        return self
      }
    , update : function(queryString){
      var self = this, request = xhr(self)
      makeXHR("POST", self, request, queryString)
      return self.async ? self : request
    }
})

Request.script = Class.create(req, {
      initialize : function(url){
        var self = this
        if(!(self instanceof Request.script)) return new Request.script(url)
        self.url = url
        return self
      }
    , update : function(jsonp){
      var self = this, s, ready = false, h
      s = $.create("script", {src : self.url})[0]
      s.onload = s.onreadystatechange = function(){
        if(ready) return
        if(!s.readyState || !/in/.test(s.readyState)) {
          s.onload = s.onreadystatechange = null 
          ready = true
          if(s.parentNode) s.parentNode.removeChild(s)
          s = null
          if(!jsonp && self._then) self._then.each(function(i){i()})
          $("html").fire("request:loaded")
        }
      }
      s.onerror = function(){
        if(self._fail) self._fail.each(function(i){i()})
      }
      h = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement
      h.insertBefore(s, h.firstChild)
      if(self._always) self._always.each(function(i){i()})
      return self
    }
})

Request.jsonp = function(url){
  var callback = "request" + (+new Date())
    , src = url + (!!~url.indexOf("?") ? "&" : "?") + "callback=" + callback
    , self = new Request.script(src)

  win[callback] = function(obj){
    if(self._then) self._then.each(function(i){i(obj)})
    win[callback] = null
  }

  self.update = self.update.attach(self, true)

  return self
}

Request.evaluate = function(string){
  var regExp = /<script[^>]*>([\s\S]*?)<\/script>/g
    , match = string.match(regExp)
    , i = 0, l, result = [], item
  if(!match) return function(){}
  l = match.length
  for(;i < l; i++) if(item = match[i].replace(regExp, "$1")) result.push(item)
  if(result) return new Function(result.join(";"))
}