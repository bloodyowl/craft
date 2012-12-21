test("Hash", function() {

  ok(Hash({foo:'bar', bar:'baz'}).get('foo') == 'bar')
});

test("Hash#each", function() {

  var hash = Hash({foo:'bar', bar:'baz'})

  ok(hash.each(function(item, i, _hash){
    if(i == "foo") {
      ok(item == "bar" && _hash == hash, "Returns the rights arguments")
    }
  }) == hash, "Correctly returns the hash")

});

test("Hash#keys", function() {

  var keys = Hash({foo:'bar', bar:'baz'}).keys()


  ok(keys.length == 2 && keys[0] == "foo", "Returns the right keys")


});

test("Hash#values", function() {

  var values = Hash({foo:'bar', bar:'baz'}).values()


  ok(values.length == 2 && values[0] == "bar", "Returns the right values")


});

test("Hash#get", function(){

  ok(Hash({foo:1, bar:2, baz:3}).get('bar') == 2)
  ok(Hash({foo:1, bar:2, baz:3}).get('a') == undefined)

})


test("Hash#set", function(){

  ok(Hash({foo:1, bar:2, baz:3}).set('bar',3).bar == 3)

})


test("Hash#toQueryString", function(){
  ok(Hash({foo:'one', bar:['two','three','four'], baz:'five'}).toQueryString() == "foo=one&bar=two&bar=three&bar=four&baz=five")

})



test("Hash#isEmpty", function() {


  ok(Hash().isEmpty())
  ok(!Hash({foo:"bar"}).isEmpty())

});


test("Hash#clone", function(){
  var a = Hash([1,2,3])
    , b = a.clone();

  b.set('2', 'foo');

  ok(a[2] == 3)
  ok(b[2] == "foo")


})
