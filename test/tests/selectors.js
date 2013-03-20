/*jshint forin:true, eqnull:true, noarg:true, noempty:true, boss:true, loopfunc:true, unused:true, browser:true, asi:true, laxcomma:true */


;(function(){
  
  var div = document.createElement("div")
      div.id = "foo"
      div.innerHTML = "<span>" + Array(16).join("</span><span>") + "</span>"
      div.innerHTML += "<i class='foo bar'>" + Array(16).join("</i><i class='foo bar'>") + "</i>"
      div.innerHTML += "<i class='foo'><span class='el'><span class='el'></span></span>" + Array(16).join("</i><i class='foo'><span class='el'></span>") + "</i>"
      div.innerHTML += "<i id='bar' data-foo='bar'></i>"
      div.appendChild(document.createElement("section"))
      
   test("Selector instances", function(){
     
     ok($() instanceof Elements, "Results instance of elements")
     equal($(null).length, 0, "null|undefined as argument makes an empty Elements instance")
     
   })
   
   asyncTest("Selector :id", function(){
     
     expect(2)
     
     $(function(){
         
       equal($("#qunit")[0], document.getElementById("qunit"), "id found")
       notDeepEqual($("#qunit, #qunit-fixture")[0], [document.getElementById("qunit"), document.getElementById("qunit-fixture")], "multiple ids found")
       start()
     
     })
   
   })
   
    test("Selector :class", function(){
     
             
       equal($(".foo", div).length, 32, "class found")
       equal($(".foo.bar", div).length, 16, "multiple class found")
       equal($(".bar .el", div).length, 0, "ancestors 1")
       equal($(".foo .el", div).length, 17, "ancestors 2")
       equal($(".foo > .el", div).length, 16, "children")
       equal($(".foo + .foo", div).length, 31, "children")
       equal($(".foo - .foo", div).length, 31, "children")
       equal($(".el > .el", div).length, 1, "children 2")
       //notDeepEqual($("#qunit, #qunit-fixture")[0], , "multiple ids found")
     
   
   })
   
   test("Selector :tag", function(){
     
     equal($("i", div).length, 33, "tag")
     equal($("i[data-foo='bar']", div).length, 1, "attr 1")
     equal($("i[data-foo='baz']", div).length, 0, "attr 2")
     equal($("*", div).length, 67, "tag")
     equal($("section", div).length, 1, "html5 elements")
   })
   
   test("Element.matches", function(){
     
     equal(Elements.matches($("#qunit-banner")[0], "#qunit > h2"), true, "Matches")
     equal(Elements.matches($("#qunit")[0], "#qunit > h2"), false, "Matches")
     
   })
    
})()