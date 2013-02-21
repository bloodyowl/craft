;(function(){
  
  asyncTest("Request", function(){
    
    expect(2)
    
    
    var r = Request("./text", {
      success : function(res){
        equal(this, r, "Request is the context of the function")
        equal(res, "Hello world!", "Receives txt")
        start()
      }
    })
    
    r.update()
    
  })
  
  asyncTest("Request JS", function(){
    
    expect(1)
    
    
    var r = Request("./javascript", {
      success : function(res){
        equal(document.requestDone, 1, "Receives and evals JS")
        start()
      }
    })
    
    r.update()
    
  })
  
  
  asyncTest("Request JSON", function(){
    
    expect(1)
    
    
    var r = Request("./json", {
      success : function(json){
        deepEqual(json, {foo : ["bar", "baz"]}, "Receives and evals JSON")
        start()
      }
    })
    
    r.update()
    
  })
  
  asyncTest("Request XML", function(){
    
    expect(1)
    
    
    var r = Request("./xml", {
      success : function(xml){
        document.parsedXML = xml
        deepEqual(Object.isDocument(xml), true, "Receives and evals XML")
        start()
      }
    })
    
    r.update()
    
  })
  
  asyncTest("Request headers", function(){
    
    expect(2)
    
    var r = Request("./headers", {
      headers : {
          "Sent-by" : "craft2"
      },
      success : function(json){
        
        equal(json["sent-by"], "craft2", "Sets headers correctly")
        equal(r.getResponseHeader("Content-Type"), "application/json", "Receives the right response headers")
        start()
      }
    })
    
    r.update()
  })
  
  asyncTest("Request post data", function(){
    
    expect(1)
    
    
    var expected = {
            foo : "bar"
          , bar : "baz"
        }
      , r = Request("./query", {
            success : function(json){
              deepEqual(json, expected, "Post data query is correctly sent")
              start()
            }
        })
          
    r.update("foo=bar&bar=baz")
  })
  
  asyncTest("Request handles errors", function(){
    
    expect(2)
    
    
    var r = Request("./404", {
            error : function(){
              equal(this, r, "Context is passed in error function")
              equal(this.status, 404, "Errors are handled")
              start()
            }
        })
          
    r.update()
  })
  
  asyncTest("Loading function works", function(){
    
    expect(2)
    var i = []
    
    var r = Request("./text", {
            loading : function(){
              equal(this, r, "Context is passed in loading function")
              i.push("loading")
            }
          , success : function(){
              i.push("success")
              deepEqual(i, ["loading", "success"], "Loading is fired before")
              start()
          }
        })
          
    r.update()
  })
  
  
  asyncTest("Request can prevent from JS eval", function(){
    
    expect(1)
    var i = []
    
    var r = Request("./javascript", {
            evalJS : false
          , success : function(a){
              equal(typeof a, "string", "JS is a string")
              start()
          }
        })
          
    r.update()
  })
  
  
  asyncTest("Request can prevent from JSON eval", function(){
    
    expect(1)
    var i = []
    
    var r = Request("./json", {
            evalJSON : false
          , success : function(a){
              equal(typeof a, "string", "JSON is a string")
              start()
          }
        })
          
    r.update()
  })
  
  asyncTest("JSONP", function(){
    
    var scripts, i = 0, l, hasRemoved = true
    
    expect(2)
    
    Request.JSONP("./jsonp", function(res){
      deepEqual(res, {foo:"bar", bar:"baz"}, "Object is passed")
      scripts = document.scripts
      l = scripts.length
      for(;i < l; i++) if(!!~scripts[i].src.indexOf("./jsonp")) hasRemoved = false
      equal(hasRemoved, true, "Script element has been removed")
      start()
    }).update()
    
  })
  
  asyncTest("Request.parallel", function(){
        
    expect(2)
    
    var expected = {
        one : {id : "1"}
      , two : {id : "2"}
      , three : {id : "3"}
    }
      , i = 0
    
    Request
      .parallel(["1", "2", "3"])
      .then(function(one, two, three){
        equal(i, 1, "loading has been fired")
        deepEqual({ one : one , two : two, three : three}, expected, "Parallel requests work")
        start()
      }) 
      .loading(function(){
        i++
      })
      .start()
  })
  
  asyncTest("Request.error", function(){
        
    expect(2)
    var i = 0
    
    Request
      .parallel(["1", "2", "3","404"])
      .error(function(){
        equal(i, 0, "Done isn't fired")
        ok(true, "Error is fired")
        start()
      })
      .then(function(){
        i++
      })
      .start()
  })
  
  test("Request.setDefaults", function(){
    
    Request.setDefaults({ async : false })
    
    equal(Request().async, false, "setDefaults work")
    
    Request.setDefaults({async : true})
    
  })

  asyncTest("Request.getInlineScripts", function(){
    
    expect(2)
    var str = "<p>Hello world!</p><script>document.inlineScripts = []</script><script>document.inlineScripts.push(1)</script>"
      , fn = Request.getInlineScripts(str)
    
    equal(typeof fn, "function", "Result is a function")
   
   fn()
   
   window.setTimeout(function(){
     deepEqual(document.inlineScripts, [1], "Contents are parsed (multiple)")
     start()
   }, 30)
    
  })
  
  asyncTest("Request.images", function(){
    
    expect(2)

    Request.images(["./images/30.png", "./images/20.png", "./images/10.png"], function(one, two, three){
      equal(one && two && three.nodeName == "IMG", true, "Images are passed")
      equal(one.height, "30", "Images are sized")
      start()
    })
        
  })

})()