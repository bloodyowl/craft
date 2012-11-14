asyncTest("Element#listen", function(){

	var el = document.createElement("div")
	
	
	$(el).listen("click", function(){
	
		ok(true)
		start()
	
	})
	
	Element.ready(function(){
	  $(el).appendTo(document.body).click()
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
	  $(el).appendTo(document.body).click()
	  $(el).click()
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
		  ok(window.location.hash == "")
		  start()
	  }, 100)
	})	
	
	Element.ready(function(){
	  $(el).appendTo(document.body).click()
  })
	
	

})