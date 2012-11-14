test("String#trim", function() {

  ok(('   foo bar   ').trim() == 'foo bar')
});

test("String#parseJSON", function() {

  ok(('{"foo":"bar", "bar":"baz"}').parseJSON().foo == 'bar')
});

test("String#camelize", function(){
	
 ok(('-webkit-border-radius').camelize() == "webkitBorderRadius")
})

test("String#capitalize", function(){
	
 ok(('this should be a title').capitalize() == "This Should Be A Title")
})

