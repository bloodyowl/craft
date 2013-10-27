;(function(craft){
  
  var request = craft.events.extend(requestProto)
    , _toString = {}.toString
    , _hasOwnProperty = {}.hasOwnProperty
    , STRING_CLASS = "[object String]"
  
  craft.request = request
  
  function requestProto(){
    
    var self = this
    
    self.PENDING = 0
    self.ACTIVE = 1
    self.DONE = 2
    self.SUCCESS = 4
    self.ERROR = 8
    
    self.status = self.PENDING
    
    self.headers = null
    self.method = "GET"
    self.url = null
    self.queryString = null
    self.data = null

    self.xhr = null
        
    self.constructor = Request
    function Request(params){
      var self = this
      craft.events.constructor.call(self)
      if(!params) return self
      if(_toString.call(params) == STRING_CLASS) {
        params = {url:params}
      }
      if(params.headers) self.headers = params.headers
      if(params.method) self.method = params.methods
      if(params.url) self.url = params.url
      if(params.queryString) self.queryString = params.queryString
      if(params.data) self.data = params.data
      if("withCredentials" in params) {
        self.withCredentials = params.withCredentials
      }
      return self
    }
    
    function createXHRCallback(self){
      return function(){
        var xhr = this
          , readyState = xhr.readyState
          , status = xhr.status
        if(readyState != 4) return
        self.fire("done", xhr.responseText, xhr)
        self.status &= ~self.ACTIVE
        self.status |= self.DONE
        if(status >= 200 && status < 300 || status == 304) {
          self.fire("success", xhr.responseText, xhr)
          self.status &= ~self.ERROR
          self.status |= self.SUCCESS
        }
        if((status < 200 || 300 < status) && status != 304) {
          self.fire("error", xhr.responseText, xhr)
          self.status &= ~self.SUCCESS
          self.status |= self.ERROR
        }
        self.fire(status, xhr.responseText, xhr)
      }
    }
    
    self.start = start
    function start(){
      var self = this
        , callback = createXHRCallback(self)
        , xhr = new XMLHttpRequest()
        , method = self.method
        , headers = self.headers
        , url = 
              self.url + 
              (self.queryString ? (self.url.indexOf("?") != 1 ? "&" : "?") +
              self.queryString : "")
        , i 
      self.xhr = xhr
      xhr.open(method, url, true)
      if(method == "POST") {
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      }
      if(headers){
        for(i in headers) {
          if(!_hasOwnProperty.call(headers, i)) continue
          xhr.setRequestHeader(i, headers[i])
        }
      }
      xhr.withCredentials = self.withCredentials || false
      xhr.onreadystatechange = createXHRCallback(self)
      xhr.send(self.data || null)
      self.status = self.ACTIVE
      return self
    }
    
    self.stop = stop
    function stop(){
      var self = this
      if(self.xhr && self.xhr.readyState != 4) {
        self.xhr.abort()
        self.status = self.PENDING
      }
      return self
    }
    
  }
  
})(craft)
