test("Array.convert", function() {

  var converted = (function(){
    return Array.convert(arguments)
  })("foo","bar")
   , el = document.createElement("div")

   el.innerHTML = "<i></i><i></i><i></i>"

  var nodeList = Array.convert(el.children)

	ok(Object.prototype.toString.call(converted) == "[object Array]" && converted.length == 2, "Converting Arguments to Array");
  ok(Object.prototype.toString.call(nodeList) == "[object Array]" && nodeList.length == 3, "Converting NodeList to Array");
});


test("Array#each", function() {

  var object = {foo:1234}
    , array = [1,2,3,4,5,6,7]
    , testArray = []

  ok(array.each(function(item, i, arr){
    if(i == 0) {
      ok(item == i + 1 && arr == array, "Returns the rights arguments")
      ok(this.foo == 1234, "Set the context correctly")
    }
    if(i < 3) testArray[i] = item
  }, object) == array, "Correctly returns the array")

  ok(testArray.length == 3 && testArray[testArray.length - 1] == testArray.length, "Correctly iterates")

});

test("Array#collect", function() {

  var object = {foo:1234}
    , array = [1,2,3,4,5,6,7]
    , testArray

  ok((testArray = array.collect(function(item, i, arr){
    if(i == 0) {
      ok(item == i + 1 && arr == array, "Returns the rights arguments")
      ok(this.foo == 1234, "Set the context correctly")
    }
    return item * item
  }, object))[2] == 9, "Correctly returns the new array")

  ok(testArray.length == 7 && testArray[testArray.length - 1] == 49, "Correctly iterates")

});

test("Array#select", function() {

  var object = {foo:1234}
    , array = [1,2,3,4,5,6,7]
    , testArray

  ok((testArray = array.select(function(item, i, arr){
    if(i == 0) {
      ok(item == i + 1 && arr == array, "Returns the rights arguments")
      ok(this.foo == 1234, "Set the context correctly")
    }
    return item % 2 == 0
  }, object)).length == 3, "Correctly returns the new array")

  ok(testArray[0] == 2, "Correctly iterates")

});

test("Array#fold", function() {

  var array = [1,2,3,4,5,6,7]
    , testArray

  ok((testArray = array.fold(function(item, next, i, arr){
    if(i == 0) {
      ok(item == i && arr == array, "Returns the rights arguments")
      ok(item == 0, "Set the initial value correctly")
    }
    return item - next
  }, 0)) == -28, "Correctly returns the value")

});

test("Array#find", function() {

  var array = [1,2,3,4,5,6,7]

  ok(array.find(3) == 2)
  ok(array.find(12) == -1)

});

test("Array#contains", function() {

  var array = [1,2,3,4,5,6,7]

  ok(array.contains(3))
  ok(!array.contains(12))

});

test("Array#pluck", function() {

  var array = ["this", "is", "test"].pluck("length")

  ok(array[1] == 2)
  ok(array[2] == 4)

});

test("Array#isEmpty", function() {


  ok([].isEmpty())
  ok(![1].isEmpty())

});

test("Array#clone", function() {

  var array = [1,2,3,4]
    , array2 = array.clone()

  array2[0] = 0

  ok(array[0] == 1)
  ok(array2[0] == 0)
});


test("Array#clean", function() {

  var array = [1, 2, null, 3, 0, undefined, 4, []]
    , array2 = array.clean()

  ok(array2.length == 5)
});


test("Array#group", function() {

  var array = [[1,2,3], [4,5,6], [7,8,9]].group()

  ok(array.length == 9)
  ok(typeof array[0] == "number")
});


test("Array#intersect", function() {

  var array = [1,2,3,4,5,6,7,8,9,10].intersect([4,6,'foo',9,1])


  ok(array.length == 4)
  ok(array[0] == 1)
});


test("Array#difference", function() {

  var array = [1,2,3,4,5,6,7,8,9,10].difference([4,6,'foo',9,1])


  ok(array.length == 6)
  ok(array[0] == 2)
});


