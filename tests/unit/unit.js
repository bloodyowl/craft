
function unwrap(el) {
  return el instanceof DOM ? el[0] : el
}

Craft.extend(DOM.prototype, {
  passed : function(bool){
    var element = this,
        color = bool ? "#693" : "#c33";

    DOM.prototype.css.call(element, { "background-color" : color });
    
    return element
  }
})

var launchTests = function(event){
  
  DOM.getById("launcher").stopListening("click", launchTests).listen("click", function(e){Event.stop(e);}).addClass("deactivated");
  
  var __date = +new Date();

DOM.loaded(function(){
  
  function toArray(list, start) {
    start = start || 0;
    if(window.NodeList) return Array.prototype.slice.call(list, start);
    else {
      var result = [];
      for(var i = start, l = list.length; i < l; i++) {
        if(!list[i]) continue; result.push(list[i])
      }
      // return Array.prototype.filter.call(list, function(item, index){ return index >= start })
      return result
    }
  };
      
  
;(function(){
  
  var element = DOM.getById("type-of"), 
      test = Craft.typeOf([]);
  
  element.insert({
    bottom : test
  }).passed(test == "array")
  
  
})()


 ;(function(){

  var element = DOM.getById("type-of-2"), 
      test = Craft.typeOf(null);

  element.insert({
    bottom : test
  }).passed(test == "null")


})()

;(function(){

  var element = DOM.getById("extend"), 
      object = { foo : "bar" }
      Craft.extend(object, { bar : "baz" })

  element.insert({
    bottom : object.bar
  }).passed(object.bar == "baz")


})()


;(function(){

  var element = DOM.getById("extend-2"), 
      object = { foo : "bar" }
      Craft.extend(object, function(){ return {bar : "baz"} })

  element.insert({
    bottom : object.bar
  }).passed(object.bar == "baz")


})()


;(function(){

  var element = DOM.getById("browser"),
      test = Craft.Browser.toClassName()

  element.insert({
    bottom : test 
  }).passed(test)


})()

;(function(){

  var element = DOM.getById("browser-2"),
      test = Craft.Browser.isIE

  element.insert({
    bottom : "" + test 
  }).passed(test == /MSIE/.test(window.navigator.userAgent))


})()

;(function(){

  var element = DOM.getById("ajax"),
      test = new Craft.AJAX({ 
        url : "ajax.txt", 
        success : function(res){
          element.insert({
            bottom : res 
          }).passed(res == "AJAX loaded!")
        }
      }).update()


})()

;(function(){

  var element = DOM.getById("hash"),
      test = new Hash([1,2,3]).length

  element.insert({
    bottom : "" + test 
  }).passed(test == 3)


})()

;(function(){

  var element = DOM.getById("array-each"),
      test = "";
      [1,2,3].forEach(function(item){ test += item })


  element.insert({
    bottom : test
  }).passed(test == "123")


})()



;(function(){

  var element = DOM.getById("array-clone"),
      array = [1,2,3], 
      test,
      clonedArray = array.clone();
      clonedArray.push(4);
  
  test = array.length < clonedArray.length


  element.insert({
    bottom : "" + test
  }).passed(test == true)


})()

;(function(){

  var element = DOM.getById("array-map");

  test = [1,2,3,4,5].map(function(item){ return item * item }).join(",")


  element.insert({
    bottom : test
  }).passed(test == "1,4,9,16,25")


})()

;(function(){

  var element = DOM.getById("array-filter");

  test = [1,2,3,4,5].filter(function(item){ return item % 2 == 0 }).join(",")


  element.insert({
    bottom : test
  }).passed(test == "2,4")


})()


;(function(){

  var element = DOM.getById("array-reduce");

  test = [1,2,3,4,5].reduce(function(item, next){ return item + next })


  element.insert({
    bottom : "" + test
  }).passed(test == 15)


})()


;(function(){

  var element = DOM.getById("array-indexof");

  test = [1,2,3,4,5,3].indexOf(3)


  element.insert({
    bottom : "" + test
  }).passed(test == 2)


})()


;(function(){

  var element = DOM.getById("array-indexof-2");

  test = [1,2,3,4,5,3].indexOf(3,4)


  element.insert({
    bottom : "" + test
  }).passed(test == 5)


})()

;(function(){

  var element = DOM.getById("array-pluck");

  test = ["lorem", "ipsum", "foo", "bar"].pluck("length").join(",")


  element.insert({
    bottom : test
  }).passed(test == "5,5,3,3")


})()

;(function(){

  var element = DOM.getById("array-isempty");

  test = [].isEmpty()


  element.insert({
    bottom : "" + test
  }).passed(test == true)


})()


;(function(){

  var element = DOM.getById("array-isempty-2");

  test = [1,2].isEmpty()


  element.insert({
    bottom : "" + test
  }).passed(test == false)


})()



;(function(){

  var element = DOM.getById("array-invoke");

  var fragment = "<p></p><p></p>".toElement(),
      els = Craft.toArray(fragment.childNodes),
      test;
  
  els.invoke(DOM.prototype.addClass, "foo");
  
  test = new DOM(els[1]).hasClass("foo");


  element.insert({
    bottom : "" + test
  }).passed(test == true)


})()


;(function(){

  var element = DOM.getById("array-clean");

  var test = ["", 1, 2, undefined, 3, false, 4, null].clean().length;

  element.insert({
    bottom : "" + test
  }).passed(test == 4)


})()

;(function(){

  var element = DOM.getById("hash-toquerystring");

  var test = new Hash({foo:"bar", items : ["first", "third", "fifth"], color : undefined}).toQueryString();

  element.insert({
    bottom : test
  }).passed(test == "foo=bar&items=first&items=third&items=fifth")


})()



;(function(){

  var element = DOM.getById("hash-clone");
  var src = new Hash({foo:"bar"}),
      clone = src.clone().set("bar", "baz"),
      test = "bar" in src;

  element.insert({
    bottom : "" + test
  }).passed(test == false)


})()

;(function(){

  var element = DOM.getById("hash-keys");
  var test = new Hash({foo:1,bar:2,baz:3}).keys().join(",");
  
  element.insert({
    bottom : test
  }).passed(test == "foo,bar,baz")


})()

;(function(){

  var element = DOM.getById("hash-values");
  var test = new Hash({foo:1,bar:2,baz:3}).values().join(",");

  element.insert({
    bottom : test
  }).passed(test == "1,2,3")


})()

;(function(){

  var element = DOM.getById("hash-get");
  var test = new Hash({foo:"lorem ipsum"}).get("foo");

  element.insert({
    bottom : test
  }).passed(test == "lorem ipsum")


})()


;(function(){

  var element = DOM.getById("hash-set");
  var test = new Hash({foo:"lorem ipsum"}).set("foo", "dolor sic").get("foo")

  element.insert({
    bottom : test
  }).passed(test == "dolor sic")


})()

;(function(){

  var element = DOM.getById("hash-isempty");
  var test = new Hash().isEmpty()

  element.insert({
    bottom : "" + test
  }).passed(test == true)


})()
;(function(){

  var element = DOM.getById("hash-isempty-2");
  var test = new Hash({foo:"bar"}).isEmpty()

  element.insert({
    bottom : "" + test
  }).passed(test == false)


})()


;(function(){

  var element = DOM.getById("hash-invoke");
  
  var fragment = "<p></p><p></p>".toElement(),
      els = new Hash(fragment.childNodes),
      test;
  
  els.invoke(DOM.prototype.addClass, "foo");
  
  test = new DOM(els[1]).hasClass("foo");

  
  element.insert({
    bottom : "" + test
  }).passed(test == true)


})()

;(function(){

  var element = DOM.getById("function-bind");

  var myObj = {helloworld : "hi!"},
      myFunc = (function(foo, bar){ return [this.helloworld, foo, bar].join(" ") }).bind(myObj, "how are"),
      test = myFunc("you ?");


  element.insert({
    bottom : test
  }).passed(test == "hi! how are you ?")


})()


;(function(){

  var element = DOM.getById("function-curry");

  var myFunc = (function(foo, bar, baz){ return [foo, bar, baz].join(" ") }).curry("hi!", "how are"),
      test = myFunc("you ?");


  element.insert({
    bottom : test
  }).passed(test == "hi! how are you ?")


})()

;(function(){

  var element = DOM.getById("function-tohandler"),
      link = element.getByTag("a");
      
  var myFunc = function(e){ Event.stop(e); element.empty().insert({ bottom : " passed" }).passed(true) };
      
      link.invoke(DOM.prototype.listen, "click", myFunc)

  element.css({"background-color" : "#f90"})


})()



;(function(){

  var element = DOM.getById("function-delay");

  var date = +new Date();
  
  (function(){ 
    var duration = +new Date() - date; 
    element.insert({ bottom : "" + duration }).passed(duration > 995 && duration < 1005 )
     }).delay(1);

  element.css({"background-color" : "#f90"})


})()


;(function(){

  var element = DOM.getById("function-every");

  var date = +new Date(),
      i = 0;
  
  var func = (function(){ 
    
    if(i++ >= 3) {
      var duration = (+new Date() - date) / 4; 
      element.insert({ bottom : "4 iterations in " + duration + ".<br>  Expected 495 ~ 505" });
      element.passed(duration > 495 && duration < 505 );
      window.clearInterval(func)
    }
    
    }).every(.5);

  element.css({"background-color" : "#f90"})


})()

;(function(){

  var element = DOM.getById("string-parsejson");

  var test = '{"foo":"bar", "bar" : true, "baz" : ["one", "two", "three"]}'.parseJSON().baz[0];

  element.insert({
    bottom : test
  }).passed(test == "one")


})()


;(function(){

  var element = DOM.getById("string-trim");

  var test = "        foo bar baz     ".trim();

  element.insert({
    bottom : test
  }).passed(test == "foo bar baz")


})()

;(function(){

  var element = DOM.getById("string-camelize");

  var test = "border-top-width".camelize();

  element.insert({
    bottom : test
  }).passed(test == "borderTopWidth")


})()

;(function(){

  var element = DOM.getById("string-camelize-2");

  var test = "-webkit-transition".camelize();

  element.insert({
    bottom : test
  }).passed(test == "webkitTransition")


})()

;(function(){

  var element = DOM.getById("string-toelement");
  
  var init = "<p class='foo bar baz'></p>".toElement().childNodes[0];
  var test = new DOM(init).classNames().join(",");

  element.insert({
    bottom : test
  }).passed(test == "foo,bar,baz")


})()

;(function(){

  var element = DOM.getById("dom-create");

  var el = DOM.create("p", {id : "created-element"}).insert("passed").css({margin : 0});
  element.insert({
    bottom : el
  }).passed(el.getAttr("id") == "created-element")


})()

;(function(){

  var element = DOM.getById("dom-createfragment");

  var test = DOM.createFragment().get("nodeType");

  element.insert({
    bottom : "" + test
  }).passed(test == 11)


})()

;(function(){

  var element = DOM.getById("dom-get");

  var test = new DOM(document.body).get("nodeType");

  element.insert({
    bottom : "" + test
  }).passed(test == 1)


})()

;(function(){

  var element = DOM.getById("dom-set");

  var test = new DOM(document.body).set("__hiddenProperty__", "foo").get("__hiddenProperty__");

  element.insert({
    bottom : "" + test
  }).passed(test == "foo")


})()

;(function(){

  var element = DOM.getById("dom-clone");

  var test = new DOM(document.body).clone(false).get("nodeType");

  element.insert({
    bottom : "" + test
  }).passed(test == 1)


})()


;(function(){

  var element = DOM.getById("dom-empty");

  var test = new DOM.create("p", { innerHTML : "foo"}).empty().get("innerHTML");

  element.insert({
    bottom : "" + test
  }).passed(test == "")


})()

;(function(){

  var element = DOM.getById("dom-remove");

  element.getByTag("p").invoke(DOM.prototype.remove);
  
  var test = element.get("innerHTML")

  element.insert({
    bottom : "" + test
  }).passed(test == "")


})()

;(function(){

  var element = DOM.getById("dom-insert");

  element.insert({ top : "<i class='foo'></i>", bottom : "<i></i>" });
  element.getByClass("foo").invoke(DOM.prototype.insert, { before : "<i></i>", after : "<i></i>" });
  
  
  var test = element.get("childNodes").length;
  
  element.insert({
    bottom : "" + test
  }).passed(test == 4)

})()

;(function(){

  var element = DOM.getById("dom-insert-2");

  element.insert("passed");

  var test = element.get("innerHTML");

  element.passed(test == "passed")

})()

;(function(){

  var element = DOM.getById("dom-appendto"),
      el = DOM.create("p", {innerHTML : "passed"}).appendTo(element)

  var test = element.get("children").length;

  element.passed(test == 1)

})()

;(function(){

  var element = DOM.getById("dom-prependto"),
      el = DOM.create("p", {innerHTML : "passed"}).prependTo(element)

  var test = element.get("children").length;

  element.passed(test == 1)

})()

;(function(){

  var element = DOM.getById("dom-css"),
      el = element.css({ "background-color" : "#693", "border-radius" : 3 })

  var test = element.getAttr("style");

  element.insert(test).passed(!!test)

})()

;(function(){

  var element = DOM.getById("dom-children"),
      test = element.insert("<i></i><i></i><i></i>").children().get("length")

  element.insert("" + test).passed(test == 3)

})()

;(function(){

  var element = DOM.getById("dom-parent"),
      test = element.parent()._ == document.body

  element.insert("" + test).passed(test == true)

})()

;(function(){

  var element = DOM.getById("dom-siblings"),
      el = element.insert("<i></i><i></i><i></i><i></i>").getByTag("i").get(0),

      test = new DOM(el).siblings().get("length")

  element.insert("" + test).passed(test == 3)

})()

;(function(){

  var element = DOM.getById("dom-classnames"),
      test = element.classNames().join(",");


  element.insert(test).passed(test == "output,foo,bar,baz")

})()

;(function(){

  var element = DOM.getById("dom-hasclass"),
      test = element.hasClass("output");


  element.insert("" + test).passed(test == true)

})()

;(function(){

  var element = DOM.getById("dom-hasclass2"),
      test = element.hasClass("foo");


  element.insert("" + test).passed(test == false)

})()


;(function(){

  var element = DOM.getById("dom-addclass"),
      test = element.addClass("foo").classNames().join(",");


  element.insert(test).passed(test == "output,foo")

})()

;(function(){

  var element = DOM.getById("dom-addclass2"),
      test = element.addClass("foo bar baz").classNames().join(",");


  element.insert(test).passed(test == "output,foo,bar,baz")

})()

;(function(){

  var element = DOM.getById("dom-removeclass"),
      test = element.removeClass("foo").classNames().join(",");


  element.insert(test).passed(test == "output")

})()

;(function(){

  var element = DOM.getById("dom-removeclass2"),
      test = element.removeClass("foo bar baz").classNames().join(",");


  element.insert(test).passed(test == "output")

})()

;(function(){

  var element = DOM.getById("dom-toggleclass"),
      test = element.toggleClass("foo").classNames().join(",");


  element.insert(test).passed(test == "output")

})()

;(function(){

  var element = DOM.getById("dom-toggleclass2"),
      test = element.toggleClass("foo bar baz").classNames().join(",");


  element.insert(test).passed(test == "output,bar")

})()

;(function(){

  var element = DOM.getById("dom-getvalue"),
      test = DOM.getById("select-multiple").getValue().join(",");


  element.insert(test).passed(test == "foo-m,bar-m")

})()

;(function(){

  var element = DOM.getById("dom-getvalue2"),
      test = DOM.getById("select").getValue();


  element.insert(test).passed(test == "bar")

})()

;(function(){

  var element = DOM.getById("dom-getvalue3"),
      test = DOM.getById("text").getValue();


  element.insert(test).passed(test == "Lorem ipsum")

})()

;(function(){

  var element = DOM.getById("dom-setvalue"),
      test = DOM.getById("select-multiple").setValue(["foo-m", "baz-m"]).getValue().join(",");


  element.insert(test).passed(test == "foo-m,baz-m")

})()

;(function(){

  var element = DOM.getById("dom-setvalue2"),
      test = DOM.getById("select").setValue("foo").getValue();


  element.insert(test).passed(test == "foo")

})()

;(function(){

  var element = DOM.getById("dom-setvalue3"),
      test = DOM.getById("text").setValue("dolor sic amet").getValue();


  element.insert(test).passed(test == "dolor sic amet")

})()

;(function(){

  var element = DOM.getById("dom-serialize"),
      test = DOM.getById("form1").serialize().get("text");


  element.insert(test).passed(test == "dolor sic amet")

})()

;(function(){

  var element = DOM.getById("dom-getattr"),
      test = element.getAttr("data-test");


  element.insert(test).passed(test == "attribute!")

})()

;(function(){

  var element = DOM.getById("dom-setattr"),
      test = element.setAttr("data-test", "foo").getAttr("data-test");


  element.insert(test).passed(test == "foo")

})()


;(function(){

  var element = DOM.getById("dom-listen");
  
  var handler = function(e){ 
  Event.stop(e);
  element.css({ "background-color" : "#693" }).insert("passed"); 
  element.stopListening("mouseover", handler) }
  
  element.listen("mouseover", handler )
})()


;(function(){

  var element = DOM.getById("dom-invoke"),
      elements = element.getByTag("p");
    
    
    elements.invoke(DOM.prototype.css, {display : "block"});
    element.passed(true)
  })()

;(function(){

  var element = DOM.getById("dom-getbyid");

    element.insert("passed").passed(element._ == document.getElementById("dom-getbyid"))
  })()
  
;(function(){

  var element = DOM.getById("dom-getbyclass"),
      elements = DOM.getByClass("output");

    element.insert("passed").passed(elements._.indexOf(element.wrapped) != -1)
  })()

;(function(){

  var element = DOM.getById("dom-getbytag"),
      elements = DOM.getByTag("pre");

    element.insert("passed").passed(elements._.indexOf(element._) != -1)
  })()

})

DOM.getById("duration").empty().insert("Tests succeed in <strong>" + (+new Date() - __date) + "</strong> ms")

}

DOM.getById("launcher").listen("click", launchTests);
