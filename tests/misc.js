test("Object.typeOf", function() {
	ok(Object.typeOf([]) == "array", "Detecting Array");
	ok(Object.typeOf(/.*/) == "regexp", "Detecting RegExp");
	ok(Object.typeOf({}) == "object", "Detecting Object");
	ok(Object.typeOf("") == "string", "Detecting String");
	ok(Object.typeOf(null) == "null", "Detecting Null");
	ok(Object.typeOf(undefined) == "undefined", "Detecting Undefined");
	ok(Object.typeOf(function(){}) == "function", "Detecting Function");
	ok(Object.typeOf(true) == "boolean", "Detecting Boolean");
	ok(Object.typeOf(1) == "number", "Detecting Number");
});

test("Object.extend", function() {

  var object = {}

  Object.extend(object, {
    foo : true,
    bar : true
  })

  Object.extend(object, {
    bar : false
  })

	ok(object.foo == true, "Extending once");
	ok(object.bar == false, "Extending twice");

});


