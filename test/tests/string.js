;(function(){
  
  test("String.parseJSON", function(){
    
    deepEqual(String.parseJSON("{\"foo\":\"bar\",\"bar\":null,\"baz\":20}"), {"foo":"bar","bar":null,"baz":20}, "JSON parses object")
    deepEqual(String.parseJSON("[\"foo\",\"bar\", null, 30]"), ["foo", "bar", null, 30], "JSON parses array")
    
    throws(function(){
      String.parseJSON("")
    }
    , SyntaxError
    , "Throws an error if JSON isn't valid")
    
  })
  
  test("String.compiler", function(){
    
    var compiler = String.compiler("hello #{*}!")
      , compiler2 = String.compiler("hello #{0}#{1}")
      , compiler3 = String.compiler("hello #{w}#{a}")
    
    equal(compiler("world"), "hello world!", "one argument")
    equal(compiler3({w:"world",a:"!"}),"hello world!", "object")
    equal(compiler3({w:"world",a:0}),"hello world0", "numbers in object")
    equal(compiler3({w:"world"}),"hello world", "if not in object, \"\"")
    
  })
  
  
  test("String.prototype.isJSON", function(){
    ok("{\"foo\":\"bar\",\"bar\":null,\"baz\":20}".isJSON(), "JSON")
    ok("[\"foo\",\"bar\", null, 30]".isJSON(), "JSON")
    ok(!"{\"foo\":\"bar\",\"bar\":null,\"baz\":20};".isJSON(), "JSON + semicolon")
    ok(!"".isJSON(), "empty string")
    ok(!"f".isJSON(), "letter")
  })
  
  test("String.prototype.trim", function(){
    equal(" foo ".trim(), "foo")
    equal("   foo ".trim(), "foo")
    equal("  foo  ".trim(), "foo")
    equal("\t foo\t ".trim(), "foo")
  })
  
  test("String.prototype.camelize", function(){
    equal("border-radius".camelize(), "borderRadius")
    equal("BORDER-RADIUS".camelize(), "borderRadius")
    equal("BORDER RADIUS".camelize(), "borderRadius")
    equal("border radius".camelize(), "borderRadius")
    equal("borderRadius".camelize(), "borderRadius")
  })
  
  test("String.prototype.dasherize", function(){
    
    equal("FooBarBaz".dasherize(), "-foo-bar-baz")
    equal("fooBarBaz".dasherize(), "foo-bar-baz")
    equal("FOO BAR BAZ".dasherize(), "foo-bar-baz")
    equal("foo bar baz".dasherize(), "foo-bar-baz")
    equal("Foo Bar Baz".dasherize(), "-foo-bar-baz")
  })
  
  test("String.prototype.capitalize", function(){
    
    equal("foo bar baz".capitalize(), "Foo bar baz")
    equal("foo bar baz".capitalize(true), "Foo Bar Baz")
    equal("FOO BAR BAZ".capitalize(), "Foo bar baz")
    equal("FOO BAR BAZ".capitalize(true), "Foo Bar Baz")
  })
  
  test("String.prototype.compile", function(){
    equal(('Hello #{*}').compile("John"),"Hello John", "String as argument")
    equal(('Hello #{foo} #{bar}').compile({foo:"John",bar:"Doe"}), "Hello John Doe", "Object as argument")
    equal(('Hello #{0} #{1}').compile(["John", "Doe"]), "Hello John Doe", "Array as argument")
    equal(('Hello #{foo.foo} #{foo.bar}#{foo.nothing}#{foo.nothing.deeper}').compile({foo:{foo:"John",bar:"Doe"}}), "Hello John Doe", "Nesting")
  })
  
})()