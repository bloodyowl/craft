# String

## String.parseJSON 

`String.parseJSON` returns an object extracted from a `json` string. If this string isn't JSON, a `Syntax Error` will be thrown. 

```javascript
String.parseJSON("{\"foo\":\"bar\"}") 
  // -> Object
```

## String.compiler 

See [String.prototype.compile](#stringprototypecompile). 

Generates a simple templating function. 

```javascript
var comp = String.compiler("<p>#{*}</p>")
  // -> Function
comp("foo") 
  // -> "<p>foo</p>"
```

## String.prototype.isJSON 

Returns whether or not the given string is parsable JSON. 

```javascript
"".isJSON()
  // -> false
"{}".isJSON()
  // -> true
"{foo:'bar'}".isJSON()
  // -> false
"{\"foo\":\"bar\"}".isJSON()
  // -> true
```

## String.prototype.trim

Returns a new string without trailing whitespace. 

```javascript
"    foo ".trim()
  // -> "foo"
```

## Sting.prototype.camelize

Returns a camelized string

```javascript
"FOO BAR".camelize()
  // -> "fooBar"
"foo-bar".camelize()
  // -> "fooBar"
```

## String.prototype.dasherize

Returns a dasherized string

```javascript
"FOO BAR".dasherize()
  // -> "foo-bar"
"fooBar".dasherize()
  // -> "foo-bar"
```

## String.prototype.capitalize

Returns a capitalized string (optionally every word)

```javascript
"FOO BAR".capitalize()
  // -> "Foo bar"
"foo bar".capitalize(true)
  // -> "Foo Bar"
```

## String.prototype.compile

Simple templating utility. 

```javascript
"<li>#{foo}, #{bar}</li>".compile({foo:"hello", bar:"world"})
  // -> "<li>hello, world</li>"
"<li>#{foo}, #{bar.baz}</li>".compile({foo:"hello", bar:{baz:"world"}})
  // -> "<li>hello, world</li>"
"<li>#{*}</li>".compile("hello, world")
  // -> "<li>hello, world</li>"
```

### Patterns

Type | Pattern
--- | --- 
String | `#{*}`
Array | `#{index}`
Nested Array | `#{index.property}`
Object | `#{property}`
Nested object | `#{property.to.reach}`
