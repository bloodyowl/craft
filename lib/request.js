  var _isJavaScript = /javascript|ecmascript/
    , _isJSON = /json/
    , _isXML = /xml/
    , _isExternal = /\/\/([\w\d\-\_\.]+\.[\w]+)/
    , _defaults = {
        url : null
      , xml : true
      , evalJS : true
      , evalJSON : true
      , method : "GET"
      , async : true
      , headers : null
    }
    , doc = $(document.documentElement)
  
  function checkStatus(status){
    if((status >= 200 && status < 300) || status == 304) return "success"
    if((status < 200 || status > 300) && status != 304) return "error"
  }
  
  function parseResponse(request, type){
    var res = request.responseText
    if(request.evalJS && _isJavaScript.test(type)) {
        Function(res)()
        return true
    }
    
    if(request.evalJSON && _isJSON.test(type) && res.isJSON()) {
       return "JSON" in window ? JSON.parse(res) : Function("return " + res)()
    } 
    
    if(request.xml && _isXML.test(type)) {
      if(request.responseXML) return request.responseXML
      
      var parser = new DOMParser()
      return parser.parseFromString(res, "text/xml")
    }
    return res
  }

  /*
    Request
    =======
    Creates a XHR
    =======
    @arguments {
      [url]  : string : url to reach
      [object] : object {
        url : string : url
        xml : boolean : parse xml (default:true)
        evalJS : boolean : eval received JavaScript (default:true)
        evalJSON : boolean : eval received JSON (default:true)
        method : string : "GET" or "POST" (is automatically set to "POST" if a query is sent)
        async : boolean : perform the request asynchronously (default:true)
        headers : object : custom headers to send (default:null)
      }
    }
    @output 
      XHR
  */

  function Request(url, object){
    if(!("XMLHttpRequest" in window)) return null
    var request = new XMLHttpRequest()
    if(typeof object == "function") (object = {}).success = object
    if(typeof object == "object") object.url = url
    else {
      if(typeof url == "string") (object = {}).url = url
      else object = url
    }
    
    Object.extend(request, Request._defaults)
    if(typeof object == "object") Object.extend(request, object)
    request.onreadystatechange = function(){
      var readyState = request.readyState
      if(readyState == 2 && "loading" in request) request.loading()
      if(readyState == 4) {
        var status = checkStatus(request.status)
          , type = request.getResponseHeader("Content-Type")
          , result
        if(status == "success") {
          result = parseResponse(request, type)
          doc.fire("request:loaded", result)
          if(request.success) return request.success(result)
        }
        if(status == "error") {
          if(request.error) return request.error()
          doc.fire("request:failed")
        }
      }
    }
    
    /*
      Request#update
      =======
      Sends the request
      =======
      @arguments {
        [query]  : string : query to string if "POST"
      }
      @output 
        XHR
    */
    
    
    request.update = function(query){
      if(typeof request.url != "string") throw Object.error("Request exception : No url have been set")
      request.open((query || request.method == "POST") ? "POST" : "GET", request.url, request.async)
      if(query) {
         request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
         request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
       }
       if(isObject(request.headers)) {
         Object.each(request.headers, function(a,i){ request.setRequestHeader(i,a) }, request)
       } 
      request.send(query || null)
      return request
    }
  
    return request
  }
  
  /*
    Request.setDefaults
    =======
    Sets the defaults parameters for every request
    =======
    @arguments {
      object : default 
    }
    @output 
      object
  */
  
  Request._defaults = _defaults
  
  function setDefaults(object){
    return Object.extend(Request._defaults, object)
  }
  
  Request.setDefaults = setDefaults

  /*
    Request.JSONP
    =======
    Creates a JSONP request
    =======
    @arguments {
      url  : string : url to get
      [success] : function callback
    }
    @output 
      object
  */

  Request.JSONP = function(url, success){
    var callback = "request" + (+new Date())
      , options = {
          type : "text/javascript"
        , src : url + (!!~url.indexOf("?") ? "&" : "?") + "callback=" + callback
      }
      , script
      , o
  
    window[callback] = function(object){
      var parent
      if(script && (parent = script.parentNode)) parent.removeChild(script)
      doc.fire("request:loaded", object)
      if(typeof success == "function") success(object)
      script = null
      window[callback] = null
    }
    
    /*
      Request.JSONP#update
      =======
      Sends a JSONP request
      =======
      @arguments {}
      @output 
        object
    */
  
    o = {
      update : function(){
        var parent
        if(script && (parent = script.parentNode)) parent.removeChild(script)
        script = Object.extend(document.createElement("script"), options)
        $(function(){
          document.head.insertBefore(script, document.head.firstChild)
        })
        return o
      }
    }
    return o
  }
  
  /*
    Request.parallel
    =======
    Creates a parallel request
    =======
    @arguments {
      request : array of url or XHR|JSONP object
    }
    @output 
      request object
  */

  function parallel(requests){
    var self = this
      , i = 0, l = requests.length
      , o, item, url, match, request, uniqResponder, uniqError
      
    if(!(self instanceof parallel)) return new parallel(requests)
  
    self.stack = Array(l)
    self.requests = Array(l)
    self.performed = 0
    self.errorThrown = false
    self.errorSource = null
  
    function responder(index){
      return function(response){
        if(self.errorThrown) return
        self.stack[index] = response
        if((++self.performed) == l && typeof self.then == "function") self.then()
      }
    }
  
    function error(index){
      return function(){
        self.errorThrown = true
        self.errorSource = request[index]
        if(typeof self.error == "function") self.error()
      }
    }
  
    for(;i < l; i++) {
      item = requests[i]
      uniqResponder = responder(i)
      uniqError = error(i)
      o = Object.extend({}, _defaults)
      if(typeof item == "string") {
        Object.extend(o, {url:item})
        url = item
      }
      if(typeof item == "object") {
        Object.extend(o, item)
        url = object.url
      }
      Object.extend(o, {
          success : uniqResponder
        , error : uniqError
      })
      match = url.match(_isExternal)
      if(/\.js$/.test(url)) request = Request.getScript(url, uniqResponder)
      if(/^js\:/.test(url)) request = Request.getScript(url.replace(/^js\:/, ""), uniqResponder)
      if(/^jsonp\:/.test(url)) request = Request.JSONP(url.replace(/^jsonp\:/, ""), uniqResponder)
      else if(match && match[0] != window.location.host) request = Request.JSONP(url, uniqResponder)
      else request = Request(o)
      self.requests[i] = request
    }
  
    return self
  }
  
  var parallelMethods = (function(){
    
    /*
      Request.parallel.prototype.start
      =======
      Lauches the request (make sure that done, error and loading function are declared before)
      =======
      @arguments {}
      @output 
        request object
    */
    
    function start(){
      var self = this, requests = self.requests, i = 0, l = requests.length
      if(typeof self.loading == "function") self.loading()
      for(;i < l; i++) requests[i].update()
      return self
    }
    
    /*
      Request.parallel.prototype.then
      =======
      Registers a callback function for the requests
      =======
      @arguments {
        fn : function
      }
      @output 
        request object
    */
    
    function then(fn){
      var self = this
      self.then = function(){
        fn.apply(null, self.stack)
      }
      return self
    }
    
    /*
      Request.parallel.prototype.error
      =======
      Registers a error function for the requests
      =======
      @arguments {
        fn : function
      }
      @output 
        request object
    */
    
    function error(fn){
      var self = this
      self.error = function(){
        fn(self.errorSource)
      }
      return self
    }
    
    /*
      Request.parallel.prototype.loading
      =======
      Registers a loading function for the requests
      =======
      @arguments {
        fn : function
      }
      @output 
        request object
    */
    
    function loading(fn){
      var self = this
      self.loading = fn
      return self
    }
    
    return {
        start : start
      , then : then
      , error : error
      , loading : loading
    }
  })()
  
  parallel.implement(parallelMethods)
  
  Request.parallel = parallel
  
  /*
    Request.getInlineScripts
    =======
    Gets the inline <script>*</script> elements in a string and returns a function that executes them
    =======
    @arguments {
      string : string to parse
    }
    @output 
      function
  */
  
  function getInlineScripts(string){
    var regExp = /<script[^>]*>([\s\S]*?)<\/script>/g
      , match = string.match(regExp)
      , i = 0, l, result = [], item
    if(!match) return function(){}
    l = match.length
    for(;i < l; i++) if(item = match[i].replace(regExp, "$1")) result.push(item)
    if(result) return new Function(result.join(";"))
  }
  
  function get(){
    var a = [].slice.call(arguments)
      , self = this
      
    if(!(this instanceof get)) return get.apply(new get(), arguments)

    self.requests = a.collect(function(item, index, arr){
      return new Request.parallel(item).then(function(){ 
         if(index < arr.length - 1) self.requests[index + 1].start() 
         else if(isFunction(self.then)) self.then()
      })
    })
    
    return self
  }
  
  
  function getThen(fn){
    this.then = fn
    return this
  }
  
  function getStart(){
    this.requests[0].start()
    return this
  }
  
  get.prototype.then = getThen
  get.prototype.start = getStart
  
  
  /*
    Request.images
    =======
    Loads images
    =======
    @arguments {
      array|string : image url(s) to load
      [fn] : callback
    }
    @output 
  */
  
  function images(urls, fn){
    var imgs, i = 0, l, item, loaded = 0
    urls = [].concat(urls)
    imgs = Array(l = urls.length)
    
    function onLoadImage(){
      var self = this
      writeAttr("height", self.height)(self)
      writeAttr("width", self.width)(self)
      writeAttr("alt", "")(self)
      if(++loaded == l) if(fn) fn.apply(null, imgs)
    }
    
    for(;i < l; i++) {
      item = new Image()
      item.src = urls[i]
      item.onload = onLoadImage
      imgs[i] = item
    }
  }
  
  function getScript(url, callback){
    return {
      update : function(){
        var s = document.createElement("script")
          , ready = false
          , h = document.head || document.getElementsByName("head")[0] || document.documentElement
        s.src = url
        s.onload = s.onreadystatechange = function(){
          if(ready) return
          if(!s.readyState || !/in/.test(s.readyState)) {
            s.onload = s.onreadystatechange = null 
            ready = true
            if(callback) callback()
            if(s.parentNode) s.parentNode.removeChild(s)
            s = null
          }
        }
        h.insertBefore(s, h.firstChild) 
      }
    }
  }
  
  
  Request.get = get
  Request.getScript = getScript
  Request.images = images
  Request.getInlineScripts = getInlineScripts