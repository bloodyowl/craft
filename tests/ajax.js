test("Ajax", function() {

	var request = Ajax({url:'data.js'})

  ok(typeof request.get == "function", "Hash prototype is here")
  ok(request.url == "data.js", "Url attached")
  ok(typeof request.request != undefined, "Request created")
});

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
			}
	   }).periodicalUpdate(0.1)
	
	window.setTimeout(function(){
		ok(isDone >= 1)
		window.clearInterval(interval)
		start()
	}, 150)
	
})

