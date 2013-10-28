module("Class")

test("craft.defineClass", function(){
  
  var klass = craft.defineClass({foo:"bar"})
    , klassFn = craft.defineClass(function(){
        this.foo = "bar"
      })
    , subKlass = craft.defineClass(klass, {bar:"foo"})
    , hasOwn = {}.hasOwnProperty
    , subKlass2 = klass.extend({bar:"foo"})

  
  equal(
      typeof klass.create
    , "function"
    , "definedClass.create method"
  )
  
  equal(
      klass.create().foo
    , "bar"
    , "Extended correctly"
  )
  
  equal(
      hasOwn.call(klass.create(), "foo")
    , false
    , "Call on .create() creates an instance"
  )
  
  equal(
      typeof klassFn.create
    , "function"
    , "Function called: definedClass.create method"
  )
  
  equal(
      klassFn.create().foo
    , "bar"
    , "Function called: Extended correctly"
  )
  
  equal(
      hasOwn.call(klassFn.create(), "foo")
    , false
    , "Function called: Call on .create() creates an instance"
  )
  
  equal(
      subKlass.bar
    , "foo"
    , "SubClass, own properties"  
  )
  
  
  equal(
      subKlass.foo
    , "bar"
    , "SubClass, inheritance"  
  )
  
  klass.foo = "baz"
  
  equal(
      subKlass.foo
    , "baz"
    , "SubClass, inheritance preserved through references"  
  )
  
  
  deepEqual(
      subKlass
    , subKlass2
    , "Extends is define(this, object)"
  )
  
})