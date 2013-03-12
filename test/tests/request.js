/*jshint forin:true, eqnull:true, noarg:true, noempty:true, boss:true, loopfunc:true, unused:true, browser:true, asi:true, laxcomma:true */


;(function(){
  
  asyncTest("Request", function(){
    
    expect(2)
    
    
    var r = Request.get("./text")
              .then(function(res){
                  equal(!!this.responseText, true, "Context is passed in error function")
                  equal(res, "Hello world!", "Receives txt")
                  start()
                })
    
    r.update()
    
  })
  
  asyncTest("Request JS", function(){
    
    expect(1)
    
    
    var r = Request.script("./javascript")
        .then(function(){
          equal(document.requestDone, 1, "Receives and evals JS")
          start()
        })
    
    r.update()
    
  })
  
  
  asyncTest("Request JSON", function(){
    
    expect(1)
    
    
    var r = Request.get("./json")
      .then(function(json){
        deepEqual(json, {foo : ["bar", "baz"]}, "Receives and evals JSON")
        start()
      })
    
    r.update()
    
  })
  
  asyncTest("Request XML", function(){
    
    expect(1)
    
    
    var r = Request.get("./xml")
        .then(function(xml){
        document.parsedXML = xml
        deepEqual(Object.isDocument(xml), true, "Receives and evals XML")
        start()
      })
    
    r.update()
    
  })
  
  asyncTest("Request headers", function(){
    
    expect(2)
    
    var r = Request.get("./headers")
            .setHeader("Sent-by", "craft2")
            .then(function(json){
                equal(json["sent-by"], "craft2", "Sets headers correctly")
                equal(this.getResponseHeader("Content-Type"), "application/json", "Receives the right response headers")
                start()
              })
    
    r.update()
  })
  
  asyncTest("Request post data", function(){
    
    expect(1)
    
    
    var expected = {
            foo : "bar"
          , bar : "baz"
        }
      , r = Request.post("./query")
            .then(function(json){
                  deepEqual(json, expected, "Post data query is correctly sent")
                  start()
              })
          
    r.update("foo=bar&bar=baz")
  })
  
  asyncTest("Request handles errors", function(){
    
    expect(2)
    
    
    var r = Request.get("./404")
          .fail(function(){
              equal(!!this.responseText, true, "Context is passed in error function")
              equal(this.status, 404, "Errors are handled")
              start()
            })
          
    r.update()
  })
  
  asyncTest("Loading function works", function(){
    
    expect(1)
    var i = []
    
    var r = Request.get("./text")
            .always(function(){
              i.push("loading")
            })
            .then(function(){
              i.push("success")
              deepEqual(i, ["loading", "success"], "Loading is fired before")
              start()
          })
          
    r.update()
  })
  
  
  asyncTest("JSONP", function(){
    
    var scripts, i = 0, l, hasRemoved = true
    
    expect(1)
    
    Request.jsonp("./jsonp")
      .then(function(res){
        deepEqual(res, {foo:"bar", bar:"baz"}, "Object is passed")
        scripts = document.scripts || document.getElementsByTagName("script")
        l = scripts.length
        for(;i < l; i++) if(!!~scripts[i].src.indexOf("./jsonp")) hasRemoved = false
        start()
      }).update()
    
  })

})()