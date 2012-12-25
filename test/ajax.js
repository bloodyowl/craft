test("Ajax", function() {

	var request = Ajax({url:'data.js'})

  ok(typeof request.get == "function", "Hash prototype is here")
  ok(request.url == "data.js", "Url attached")
  ok(typeof request.request != undefined, "Request created")
});

test("JSONP", function() {
  var request = Ajax({url:'//foo.fr/bar'})
  ok(typeof request.request == "function", "JSONP is detected")
});


test("JSONP can be deactivated", function() {
  var request = Ajax({url:'//foo.fr/bar', jsonp : false})
  ok(typeof request.request == "object")
});




asyncTest("JSONP update", 1, function(){
  
  Ajax({url:"http://mlb.li/jsonp/?foo=bar", success: function(res){    
    ok(typeof res == "object", "JSONP works")
    start()
    
  }}).update()
  

})


test("Ajax#update", function(){
	
	ok(Ajax({url:"ajax/index.txt", async: false}).update() == "AJAX passed")
	ok(Ajax({url:"ajax/index.xml", async: false, xml : true}).update().nodeType == 9)
	
})


asyncTest("Ajax#periodicalUpdate", 1, function(){
	
	var isDone = 0
	   
	   , interval = Ajax({
			url:"ajax/index2.txt", 
			loading: function(){
			  isDone++
			},
			success : function(res){
			  isDone++
			},
			error : function(){
  			isDone++
			}
	   }).periodicalUpdate(1)
	
	window.setTimeout(function(){
	  window.clearInterval(interval)
		ok(isDone >= 1, "Passed")
		start()
	}, 2000)
	
})

