
test("$", function() {
 ok($(document.createElement("div")).nodeType == 1, "Dollar function")
})


test("Element#get", function() {
	ok($(document.createElement("div")).get("nodeType") == 1)
})

test("Element#set", function() {
	ok($(document.createElement("div")).set("className", "bar").className == "bar", "Element#set")
})

 test("Element#insert", function() {
 ok($(document.createElement("div")).insert("foo").innerHTML == "foo", "simple")

 ok($(document.createElement("div")).insert({
	 top : "<i></i>",
	 bottom : "<i></i>"
 }).children.length == 2, " object")

 })

 test("Element#appendTo", function(){

 var appendTo = document.createElement("div")

 $(document.createElement("div")).appendTo(appendTo)


 ok(appendTo.children[0].nodeName == "DIV", "Element#appendTo")

 })

 test("Element#prependTo", function(){

  var prependTo = document.createElement("div")

 $(document.createElement("div")).prependTo(prependTo)


 ok(prependTo.children[0].nodeName == "DIV", "Element#prependTo")

 })

 test("Element#empty", function(){

	var div = document.createElement("div")
	div.innerHTML = "lorem ipsum dolor sic amet"

	ok($(div).empty().innerHTML == "")
 })

 test("Element#remove", function(){

	var div = document.createElement("div")
	  , child = document.createElement("div")

	div.appendChild(child)

	$(child).remove()

	ok(div.innerHTML == "")
 })

 test("Element#css", function(){

	var div = document.createElement("div")

	$(div).css({
		"height" : 100,
		"position" : "absolute"
	})


	ok(div.style.height == "100px" && div.style.position == "absolute")

 })


  test("Element#classNames", function(){

	var div = document.createElement("div")
	  , classNames

	div.className = "foo bar baz"

	classNames = $(div).classNames()


	ok(Object.prototype.toString.call(classNames) == "[object Array]", "returns an array")
	ok(classNames.length == 3, "Correct length")

 })

  test("Element#hasClass", function(){

	var div = document.createElement("div")

	div.className = "foo bar"


	ok($(div).hasClass("foo"))
	ok(!$(div).hasClass("baz"))

 })

 test("Element#removeClass", function(){

	var div = document.createElement("div")

	div.className = "foo bar baz"

	$(div).removeClass("foo bar")


	ok(div.className == "baz")
 })

 test("Element#addClass", function(){

	var div = document.createElement("div")

	div.className = "foo baz"

	$(div).addClass("foo bar")


	ok(!!~div.className.indexOf("baz"))
	ok(!!~div.className.indexOf("bar"))
	ok(!!~div.className.indexOf("foo"))

 })

  test("Element#toggleClass", function(){

	var div = document.createElement("div")

	div.className = "foo baz"

	$(div).toggleClass("foo bar")


	ok(!!~div.className.indexOf("baz"))
	ok(!!~div.className.indexOf("bar"))
	ok(!~div.className.indexOf("foo"))

 })


 test("Element#getValue", function(){


	 var select 
	   , option1 = document.createElement("option")
	   , option2 = document.createElement("option")
       , option3 = document.createElement("option")
       , value
       
    try{
     select= document.createElement("<select multiple>")
    } catch (e){
      select= document.createElement("select")
      select.multiple = true
    }

	 
	 option1.selected = true
	 option1.value = "Foo"
	 option2.value = "Bar"
	 option3.selected = true
	 option3.value = "Baz"

	 select.appendChild(option1)
	 select.appendChild(option2)
	 select.appendChild(option3)

	 value = $(select).getValue()

	 ok(value.length == 2 && value[1] == "Baz" , "Select Multiple Element")

	 var select2 = document.createElement("select")
	   , option21 = document.createElement("option")
	   , option22 = document.createElement("option")

	 select2.appendChild(option21)
	 select2.appendChild(option22)

	 option21.value = "foo"
	 option22.selected = true
	 option22.value = "bar"

	 var value2 = $(select2).getValue()

	 ok(value2 == "bar", "Select Element")

	var input = document.createElement("input")

	input.value = "Foo"

	ok($(input).getValue() == "Foo", "Input Element")

	var textarea = document.createElement("textarea")
	   textarea.innerHTML = "Lorem ipsum"

	ok($(textarea).getValue() == "Lorem ipsum", "TextArea Element")

 })

  test("Element#setValue", function(){


	 var select
	   , option1 = document.createElement("option")
	   , option2 = document.createElement("option")
       , option3 = document.createElement("option")
       , value
       
      try{
       select= document.createElement("<select multiple>")
      } catch (e){
        select= document.createElement("select")
        select.multiple = true
      }


	 option1.value = "Foo"
	 option2.value = "Bar"
	 option3.value = "Baz"

	 select.appendChild(option1)
	 select.appendChild(option2)
	 select.appendChild(option3)

	 value = $(select).setValue([0, "Baz"]).getValue()

	 ok(value.length == 2 && value[1] == "Baz" , "Select Element")

	 	 var select2 = document.createElement("select")
	   , option21 = document.createElement("option")
	   , option22 = document.createElement("option")

	 select2.appendChild(option21)
	 select2.appendChild(option22)

	 option21.value = "foo"
	 option22.value = "bar"


	 var value2 = $(select2).setValue("bar").getValue()

	 ok(value2 == "bar")

	var input = document.createElement("input")

	$(input).setValue("Foo")

	ok($(input).getValue() == "Foo", "Input Element")

	var textarea = document.createElement("textarea")

	   $(textarea).setValue("Lorem ipsum")

	ok($(textarea).getValue() == "Lorem ipsum", "TextArea Element")

 })


  test("Element#serialize", function(){

	 var form = document.createElement("form")
	 var select = document.createElement("select")
	   , option1 = document.createElement("option")
	   , option2 = document.createElement("option")
       , option3 = document.createElement("option")
       , value

	 select.multiple = true
	 option1.selected = true
	 option1.value = "Foo"
	 option2.value = "Bar"
	 option3.selected = true
	 option3.value = "Baz"

	 select.appendChild(option1)
	 select.appendChild(option2)
	 select.appendChild(option3)

	 select.name = "first"

	var input = document.createElement("input")

	input.value = "Foo"
	input.name = "second"

	var textarea = document.createElement("textarea")
	   textarea.innerHTML = "Lorem ipsum"
	   textarea.name = "third"

	  form.appendChild(select)
	  form.appendChild(input)
	  form.appendChild(textarea)

	 var serialized = $(form).serialize()


	 ok(serialized instanceof Hash)
	 ok(Object.prototype.toString.call(serialized.first) == "[object Array]")
	 ok(serialized.second == "Foo")
	 ok(serialized.third == "Lorem ipsum")
 })

