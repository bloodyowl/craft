Element.extend({
	addedMethod : function(){
		return this
	}
})

test("Element.create", function(){
	
	var el = Element.create("div", { className : "foo" })
	ok(el.nodeType == 1 && el.className == "foo")
	
})

test("Element.createFragment", function(){
	
	var el = Element.createFragment()
	ok(el.nodeType == 11)
	
})

test("Element.from", function(){
	
	var el = Element.from("<i>foo</i>")
	ok(el.nodeName == "I" && el.innerHTML == "foo")
	
	var nodes = Element.from("<i>foo</i> ")
	ok(nodes.nodeType == 11)
	
})


asyncTest("Element.ready", 1, function(){
	
	Element.ready(function(){

		ok(!/in/.test(document.readyState) && !!document.body)
		start()
	})
	
})



asyncTest("Element.getById (alias $)", 1, function(){
	
	Element.ready(function(){

		ok($("getById") == document.getElementById("getById"))
		
		start()
	})
	
})

asyncTest("Element.getByClass", 1, function(){
	
	Element.ready(function(){

		ok(Element.getByClass("cn").length == 7)
		
		start()
	})
	
})

asyncTest("Element.getByTag", 1, function(){
	
	Element.ready(function(){

		ok(Element.getByTag("i").length == 7)
		
		start()
	})
	
})



asyncTest("Element#getById", 1, function(){
	
	Element.ready(function(){

		ok($(document.body).getById("getById") == document.getElementById("getById"))
		
		start()
	})
	
})

asyncTest("Element#getByClass", 1, function(){
	
	Element.ready(function(){

		ok($("getById").getByClass("cn").length == 7)
		
		start()
	})
	
})

asyncTest("Element#getByTag", 1, function(){
	
	Element.ready(function(){

		ok($("getById").getByTag("i").length == 7)
		
		start()
	})
	
})

asyncTest("Element.extend", 1, function(){
	
	Element.ready(function(){

		ok(typeof $("getById").addedMethod == "function")
		
		start()
	})
	
})

asyncTest("Array#invoke", 1, function(){
	
	Element.ready(function(){
		var els = $("getById").getByTag("i")
		els.invoke("addClass", "foo")
		ok(els[0].className == "foo" && els[els.length-1].className == "foo")
		
		start()
	})
	
})