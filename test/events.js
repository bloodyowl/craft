;(function(){
  
 
  function fireEvent(obj, evt) {
      var fireOnThis = obj;
      if (document.createEvent) {
        var evObj = document.createEvent("MouseEvents");
        evObj.initEvent(evt, true, false);
        fireOnThis.dispatchEvent(evObj);
      }
      else if (document.createEventObject) {
        fireOnThis.fireEvent("on" + evt);
      }
    }
  
  var clicProto = "click" in document.createElement("div")
  
  function click(el, evt){
    if(clicProto){
      el.click()
    } else {
      fireEvent(el, "click")
    }
  }
  
  asyncTest("Element#listen", function(){
  
    var el = document.createElement("div")
  
  
    $(el).listen("click", function(){
  
      ok(true)
      start()
  
    })
  
    Element.ready(function(){
      click($(el).appendTo(document.body))
    })
  
  })
  
  
  asyncTest("Element#listen with delegation", function(){
  
    var el = document.createElement("div")
    var subel  = document.createElement("div")
    el.appendChild(subel)
  
    $(el).listen("click", "div", function(){
  
      ok(true)
      start()
  
    })
  
    Element.ready(function(){
      $(el).appendTo(document.body)
      click($(subel))
    })
  
  })
  
  asyncTest("Element#listen with delegation (focus & blur bubble)", 2, function(){
  
    var el = document.createElement("div")
    var subel = document.createElement("input")
    
    el.appendChild(subel)
  
    $(el).listen("focus", "input", function(){
  
      ok(true, "focus")
      start()
  
    })
    
    $(el).listen("blur", "input", function(){
    
      ok(true, "blur")
      start()
    
    })
  
    Element.ready(function(){
      $(el).appendTo(document.body)
      $(subel).focus()
      $(subel).blur()
      $(el).remove()
    })
  
  })
  
  asyncTest("Element#stopListening", 1, function(){
  
    var el = document.createElement("div")
      , isStopped = false
      , handler
      , i = 0
  
  
    $(el).listen("click", handler = function(){
      isStopped = !isStopped
      i++
      $(el).stopListening("click", handler)
  
      if (i == 1) ok(!isStopped == false)
  
      start()
    })	
  
    Element.ready(function(){
      click($(el).appendTo(document.body))
      click($(el))
    })
  
  })
  
  asyncTest("Element.stop", 1, function(){
  
    var el = document.createElement("a")
      , handler
  
     el.href = "#foo"	
    
    $(el).listen("click", handler = function(e){
      Event.stop(e)
      $(el).stopListening("click", handler)  
  
      window.setTimeout(function(){
        ok(window.location.hash == "" || !clicProto)
        start()
      }, 100)
    })	
    
  
    Element.ready(function(){
      click($(el).appendTo(document.body))
    })
  
  
  
  })
  
})()

