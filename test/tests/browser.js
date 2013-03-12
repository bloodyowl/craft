/*jshint forin:true, eqnull:true, noarg:true, noempty:true, boss:true, loopfunc:true, unused:true, browser:true, maxerr:50, asi:true, laxcomma:true */


;(function(){
  
  var _hasOwn = {}.hasOwnProperty
  
  test("Browser", function(){
    
    var cache = false
      , i
      , _toString = Browser.toString()
    
    for(i in Browser) if(_hasOwn.call(Browser, i) && Browser[i] === true) cache = true
    equal(cache, true, "Detects at least one browser. ")
    
    ok(_toString !== "", "toString methods returns a filled string : " + _toString)
    
  })
  
})()