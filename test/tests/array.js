;(function(){
  
  
  test("Array.prototype.each", function(){
    
    var arr = ["foo","bar","baz"]
      , expected = [true, true, true]
      , ctxTest
      , arrTest = []
      , isArr
      , ctx = { verified : true }
    
    arr.each(function(item, index, array){
      arrTest.push(arr[index] === item)
      isArr = array
      ctxTest = "verified" in ctx && ctx.verified
    }, ctx)
    
    deepEqual(arrTest, expected, "Indexes and items are right")
    equal(isArr, arr, "Array is passed")
    equal(ctxTest, ctx.verified, "Context is passed")
   
  })
  
  test("Array.prototype.collect", function(){
    
    var arr = ["foo","bar","baz"]
      , expected = [true, true, true]
      , ctxTest
      , arrTest = []
      , isArr
      , ctx = { verified : true }
      , collected 
      , collectedExpected = ["foofoo","barbar","bazbaz"]
    
    collected = arr.collect(function(item, index, array){
      arrTest.push(arr[index] === item)
      isArr = array
      ctxTest = "verified" in ctx && ctx.verified
      return item + item
    }, ctx)
    
    deepEqual(collected, collectedExpected, "Collection is right")
    deepEqual(arrTest, expected, "Indexes and items are right")
    equal(isArr, arr, "Array is passed")
    equal(ctxTest, ctx.verified, "Context is passed")
   
  })
  
  
  test("Array.prototype.select", function(){
    
    var arr = [1, 2, 3, 4]
      , expected = [true, true, true, true]
      , ctxTest
      , arrTest = []
      , isArr
      , ctx = { verified : true }
      , selected 
      , selectedExpected = [2, 4]
    
    selected = arr.select(function(item, index, array){
      arrTest.push(arr[index] === item)
      isArr = array
      ctxTest = "verified" in ctx && ctx.verified
      return !(item % 2)
    }, ctx)
    
    deepEqual(selected, selectedExpected, "Selection is right")
    deepEqual(arrTest, expected, "Indexes and items are right")
    equal(isArr, arr, "Array is passed")
    equal(ctxTest, ctx.verified, "Context is passed")
   
  })
  
  test("Array.prototype.reject", function(){
    
    var arr = [1, 2, 3, 4]
      , expected = [true, true, true, true]
      , ctxTest
      , arrTest = []
      , isArr
      , ctx = { verified : true }
      , rejected 
      , rejectedExpected = [1, 3]
      , reject
      
    reject = arr.reject(function(item, index, array){
      arrTest.push(arr[index] === item)
      isArr = array
      ctxTest = "verified" in ctx && ctx.verified
      return !(item % 2)
    }, ctx)
    
    deepEqual(reject, rejectedExpected, "Rejection is right")
    deepEqual(arrTest, expected, "Indexes and items are right")
    equal(isArr, arr, "Array is passed")
    equal(ctxTest, ctx.verified, "Context is passed")
   
  })
  
  
  test("Array.prototype.fold", function(){
    
    var arr = [1, 2, 3, 4]
      , expected = [true, true, true]
      , ctxTest
      , arrTest = []
      , isArr
      , ctx = { verified : true }
      , folded 
    
    folded = arr.fold(function(item, next, index, array){
      arrTest.push(arr[index] === next)
      isArr = array
      ctxTest = "verified" in ctx && ctx.verified
      return item + next
    }, ctx)
    
    equal(folded, 10, "Fold is right")
    deepEqual(arrTest, expected, "Indexes and items are right")
    equal(isArr, arr, "Array is passed")
    equal(ctxTest, ctx.verified, "Context is passed")
    
    
    var iarr = [1, 2, 3, 4]
      , iexpected = [true, true, true, true]
      , ictxTest
      , iarrTest = []
      , iisArr
      , ictx = { verified : true }
      , ifolded 
    
    ifolded = iarr.fold(function(item, next, index, array){
      iarrTest.push(arr[index] === next)
      iisArr = array
      ictxTest = "verified" in ctx && ctx.verified
      return item + next
    }, ctx, 0)
    
    equal(ifolded, 10, "Fold is right (with initial)")
    deepEqual(iarrTest, iexpected, "Indexes and items are right (with initial)")
    equal(iisArr, iarr, "Array is passed (with initial)")
    equal(ictxTest, ictx.verified, "Context is passed (with initial)")
   
  })
  
  
  
  test("Array.prototype.foldRight", function(){
    
    var arr = [1, 2, 3, 4]
      , expected = [true, true, true]
      , ctxTest
      , arrTest = []
      , isArr
      , ctx = { verified : true }
      , folded 
    
    folded = arr.foldRight(function(item, next, index, array){
      arrTest.push(arr[index] === next)
      isArr = array
      ctxTest = "verified" in ctx && ctx.verified
      return item - next
    }, ctx)
    
    equal(folded, -2, "foldRight is right")
    deepEqual(arrTest, expected, "Indexes and items are right")
    equal(isArr, arr, "Array is passed")
    equal(ctxTest, ctx.verified, "Context is passed")
    
    
    var iarr = [1, 2, 3, 4]
      , iexpected = [true, true, true, true]
      , ictxTest
      , iarrTest = []
      , iisArr
      , ictx = { verified : true }
      , ifolded 
    
    ifolded = iarr.foldRight(function(item, next, index, array){
      iarrTest.push(arr[index] === next)
      iisArr = array
      ictxTest = "verified" in ctx && ctx.verified
      return item - next
    }, ctx, 0)
    
    equal(ifolded, -10, "foldRight is right (with initial)")
    deepEqual(iarrTest, iexpected, "Indexes and items are right (with initial)")
    equal(iisArr, iarr, "Array is passed (with initial)")
    equal(ictxTest, ictx.verified, "Context is passed (with initial)")
   
  })
  
  test("Array.prototype.find", function(){
    
    var arr = [1,2,3,4,5,6,7,2,8]
    
    equal(arr.find(2), 1, "Finds correctly")
    equal(arr.find(9), -1, "Not present")
    equal(arr.find(2, -3), 1, "Finds correctly with negative start")
    equal(arr.find(2, 2), 7, "Finds correctly with custom start")
    equal(arr.find(2, 90), -1, "Returns -1 if start is > length")
    equal(arr.find(2, NaN), 1, "Start becomes 0 if NaN is set as start")
    
  })
  
  test("Array.prototype.findLast", function(){
    
    var arr = [1,2,3,4,5,6,7,2,8]
    
    equal(arr.findLast(2), 7, "Finds correctly")
    equal(arr.findLast(9), -1, "Not present")
    equal(arr.findLast(2, 8), 7, "Finds correctly with custom start")
    equal(arr.findLast(2, 90), 7, "Finds correctly with a > length start")
    equal(arr.findLast(2, -3), -1, "Returns -1 if start is < 0")
    equal(arr.findLast(2, NaN), 7, "Start becomes 0 if NaN is set as start")
    
  })
  
  test("Array.prototype.contains", function(){
    
    var arr = [1,2,3,4,5,6,7,2,8]
    
    equal(arr.contains(0), false, "Absent")
    equal(arr.contains(2), true, "Present")
    
  })
  
  test("Array.prototype.pluck", function(){
    
    var arr = ["a", "bcd", "efghig"]
      , expected = [1,3,6]
    
    deepEqual(arr.pluck("length"), expected, "Pluck works")
    
  })
  
  test("Array.prototype.isEmpty", function(){
    
    equal([].isEmpty(), true, "Empty")
    equal([1].isEmpty(), false, "Non empty")
    
  })
  
  test("Array.prototype.clone", function(){
    
    var arr = [1,2,3,4,5]
      , clone = arr.clone()
    
    deepEqual(arr, clone, "Arrays are the same")
    ok(arr !== clone, "Not the same reference")
    
  })
  
  test("Array.prototype.clean", function(){
    
    var arr = [0,1,false,2,[],3,null,4,undefined,5]
      , cleaned = arr.clean()
      , expected = [0,1,2,3,4,5]
    
    deepEqual(cleaned, expected, "Array is cleaned")
    
  })
  
  
  test("Array.prototype.intersect", function(){
    
    var arr1 = [1,2,3,4,5]
      , arr2 = [4,5,6,7,8]
      , inter = arr1.intersect(arr2)
      , expected = [4,5]
    
    deepEqual(inter, expected, "Intersection is okay")
    
  })
  
  test("Array.prototype.difference", function(){
    
    var arr1 = [1,2,3,4,5]
      , arr2 = [4,5,6,7,8]
      , inter = arr1.difference(arr2)
      , expected = [1,2,3]
    
    deepEqual(inter, expected, "Difference is okay")
    
  })
  
  test("Array.prototype.flatten", function(){
    
    var arr = [[[1], [2]], 3, [4]]
      , deep = [1,2,3,4]
      , shallow = [[1], [2], 3, 4]
    
    deepEqual(arr.flatten(true), deep, "Deep flatten")
    deepEqual(arr.flatten(), shallow, "Shallow flatten")
    
  })
  
  test("Array.prototype.sortBy", function(){
    
    var arr = [
            {i : 4}
          , {i : 1}
          , {i : 3}
          , {i : 2}
        ]
      , expected = [
            {i : 1}
          , {i : 2}
          , {i : 3}
          , {i : 4}
        ]
      , expected2 = [
          {i : 2}
        , {i : 4}
        , {i : 1}
        , {i : 3}
      ]
    
    deepEqual(arr.sortBy("i"), expected, "Simple sortBy")
    deepEqual(arr.sortBy("i", function(a,b){
      if(a % 2 === b % 2) return a > b ? 1 : -1
      if(a % 2 === 0 && b % 2 === 1) return -1
      if(b % 2 === 0 && a % 2 === 1) return 1
    }), expected2, "sortBy with custom iterator")
    deepEqual(arr.sortBy(), arr, "SortBy null is original array")
   //  deepEqual(arr.flatten(), shallow, "Shallow flatten")
    
  })
  
  test("Array.prototype.groupBy", function(){
    
    var arr = [1,2,3,4,5,6,7,8,9,10,11]
      , expected = [[1,2,3], [4,5,6], [7,8,9], [10, 11]]
      , expectedFill = [[1,2,3], [4,5,6], [7,8,9], [10, 11, 12]]
    
    deepEqual(arr.groupBy(3), expected, "Grouped")
    deepEqual(arr.groupBy(3, 12), expectedFill, "Grouped with last filled")
    
  })
  
  test("Array.prototype.last", function(){
    
    equal([1].last(), 1, "Last is first")
    equal([1,2,3].last(), 3, "Last")
    equal([].last(), undefined, "Empty")
    
  })
  
  test("Array.prototype.min", function(){
    var arr = [8, 6, 3, 4, 7, 1, 9, 11, 2, 5, 10]
      , arr2 = [1, 2, 3, -4]
    
    equal(arr.min(), 1, "Default min is right")
    equal(arr2.min(function(a){ return Math.pow(a,2)}), 1, "Iterator works")
  })
  
  test("Array.prototype.max", function(){
    var arr = [8, 6, 3, 4, 7, 1, 9, 11, 2, 5, 10]
      , arr2 = [1, 2, 3, -4]
    
    equal(arr.max(), 11, "Default max is right")
    equal(arr2.max(function(a){ return Math.pow(a,2)}), -4, "Iterator works")
  })
  
  test("Array.prototype.groupWith", function(){
    
    var arr = [1,2,3,4]
      , arr2 = [1,2,3,4]
      , arr3 = [1,2,3,4]
      , expected = [[1,1,1], [2,2,2], [3,3,3], [4,4,4]]
      , expected2 = [[1,1,null], [2,2,null], [3,3,null], [4,4,null]]
      
    deepEqual(arr.groupWith(arr2, arr3), expected, "groupWith works")
    deepEqual(arr.groupWith(arr2, null), expected2, "groupWith works with null")
    
  })
  
  test("Array.from", function(){
    
    var args = (function(){ return Array.from(arguments)})(1,2,3,4)
      , expected = [1,2,3,4]
      , frag = document.createDocumentFragment(), i
      , els
    
    for(;i < 10; i++) frag.appendChild(document.createElement("i"))
    
    els = Array.from(frag.childNodes)
        
    equal(Object.isArray(args), true, "output is a real Array")
    deepEqual(args, expected, "Converts arguments")
    equal(Object.isArray(els), true, "nodeLists are converted")
    equal(els.each, Array.prototype.each, "nodeLists are converted (2)")
  })
  
  test("Array.range", function(){
    
    var arr = [0,1,2,3,4,5]
      , arr2 = [4,5,6,7,8]
      , arr3 = [8,7,6,5,4]
      , arr4 = [-2, -1, 0, 1]
      , arr5 = [3,2,1,0,-1,-2]
              
    deepEqual(Array.range(5), arr, "Range is correct")
    deepEqual(Array.range(0, 5), arr, "Range is correct")
    deepEqual(Array.range(4, 8), arr2, "Range is correct")
    deepEqual(Array.range(8, 4), arr3, "Range is correct")
    deepEqual(Array.range(-2, 1), arr4, "Range is correct")
    deepEqual(Array.range(3, -2), arr5, "Range is correct")
    deepEqual(Array.range(), [], "No arguments -> Empty array")
  })
  
})()