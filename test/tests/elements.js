;(function(){
  
  function makeElementSet(){
    var stack = [], i = 3, el
    for(;i--;) {
      el = document.createElement("div")
      if(i % 2 == 0) el.className = "foo"
      if(i == 2) el.className = "foo bar"
      el.innerHTML = "<p>hello!</p>"
      stack.push(el)
    }
    return new Elements(stack)
  }
  
  
  test("Elements.create", function(){
    
    var el = Elements.create("a", {
        "class" : "foo bar baz"
      , "@data-foo" : "bar"
      , "@href" : "#foo"
    })
    
    equal(el[0].nodeName, "A", "nodeName")
    equal(el[0].className, "foo bar baz", "properties")
    equal(el[0].getAttribute("data-foo"), "bar", "attributes")
    equal(el[0].getAttribute("href"), "#foo", "attributes")
  })
  
  test("Elements.from", function(){
    
    var el = Elements.from("<a class='foo bar baz' data-foo='bar' href='#foo'></a>")
    
    equal(el[0].nodeName, "A", "nodeName")
    equal(el[0].className, "foo bar baz", "properties")
    equal(el[0].getAttribute("data-foo"), "bar", "attributes")
    equal(el.attr("href"), "#foo", "attributes")
    equal(Elements.from("<tbody></tbody>", "table")[0].nodeName, "TBODY", "Table elements")
  })
  
  
  test("Elements.fragment", function(){
  
    
    equal(Elements.fragment().nodeType, 11, "fragment created")

  })
  
  test("Elements.prototype.each", function(){

    var els = makeElementSet()
      , expected = [true, true, true]
      , ctxTest
      , arrTest = []
      , isArr
      , ctx = { verified : true }
    
    els.each(function(item, index, array){
      arrTest.push(els[index] === item)
      isArr = array
      ctxTest = "verified" in ctx && ctx.verified
    }, ctx)
    
    deepEqual(arrTest, expected, "Indexes and items are right")
    equal(isArr, els, "Array is passed")
    equal(ctxTest, ctx.verified, "Context is passed")
  })
  
  test("Elements.prototype.html", function(){
    
    var els = makeElementSet()
      , table = Elements.create("table")
      , p
      , el = Elements.create("div").append(p = Elements.create("div")).html("")
    
    table.html("<tbody></tbody>")
    
    deepEqual(els.html().toLowerCase(), "<p>hello!</p>", "reads")
    equal(p[0].nodeName, "DIV", "Reference of old elements is kept")
    deepEqual(els.html("foo").html(), "foo", "writes")
    equal(table[0].children[0].nodeName, "TBODY", "Table elements work")
  })
  
  test("Elements.prototype.text", function(){
    
    var els = makeElementSet()
    
    deepEqual(els.text(), "hello!", "reads")
    deepEqual(els.text("foo").text(), "foo", "writes")
    
  })
  
  test("Elements.prototype.append", function(){
    
    var els = makeElementSet()
      , parent = Elements.create("div")
      , cache = Elements.create("div").html("<div class='foo'></div>")
      , fragment = Elements.fragment()
      
    fragment.appendChild(document.createElement("div"))
    fragment.appendChild(document.createElement("div"))
    fragment.appendChild(document.createElement("div"))
    
    equal(parent.append(els)[0].children.length, 3, "appends Elements in Elements instance")
    equal(parent[0].children[0].className, "foo bar", "appends Elements in the right order")
    parent.empty()
    equal(parent.append(document.createTextNode("foo"))[0].innerHTML, "foo", "appends textNodes in Elements instance")
    parent.empty()
    equal(parent.append(Array.from(els))[0].children.length, 3, "appends Elements in Array")
    parent.empty()
    equal(parent.append($(".foo", cache))[0].children.length, 1, "appends Element")
    parent.empty()
    equal(parent.append(fragment)[0].children.length, 3, "appends Fragment")
  })
  
  test("Elements.prototype.ancestors", function(){
    var el = Elements.create("span")
      , div = Elements.create("div")
      , section = Elements.create("section")
    div.appendTo(section)
    el.appendTo(div)
    deepEqual(el.ancestors().pluck("nodeName").join(" ").toUpperCase(), "DIV SECTION")
  })
  
  test("Elements.prototype.appendTo", function(){
    
    var els = makeElementSet(), els2 = makeElementSet(), els3 = makeElementSet()
      , p, f, d
    
    els.appendTo(p = Elements.create("div"))
    
    deepEqual(Array.prototype.pluck.call(els, "parentNode").pluck("nodeName"), ["DIV", "DIV", "DIV"])
    deepEqual(p[0].children[0].className, "foo bar")
    
    els2.appendTo(f = Elements.fragment())
    
    deepEqual(Array.prototype.pluck.call(els2, "parentNode").pluck("nodeType"), [11, 11, 11])
    deepEqual(f.childNodes[0].className, "foo bar")
    
    els3.appendTo(d = Elements.create("div")[0])
    
    deepEqual(Array.prototype.pluck.call(els3, "parentNode").pluck("nodeName"), ["DIV", "DIV", "DIV"])
    deepEqual(d.children[0].className, "foo bar")
    
  })
  
  
  test("Elements.prototype.prepend", function(){
    
    var els = makeElementSet()
      , parent = Elements.create("div")
      , cache = Elements.create("div").html("<div class='foo'></div>")
      , fragment = Elements.fragment()
      
    fragment.appendChild(document.createElement("div"))
    fragment.appendChild(document.createElement("div"))
    fragment.appendChild(document.createElement("div"))
    
    equal(parent.prepend(els)[0].children.length, 3, "appends Elements in Elements instance")
    parent.prepend(Elements.create("div", {"class": "hello"}))
    equal(parent[0].children[0].className, "hello", "appends Elements in the right order")
    parent.empty()
    equal(parent.prepend(document.createTextNode("foo"))[0].innerHTML, "foo", "appends textNodes in Elements instance")
    parent.empty()
    equal(parent.prepend(Array.from(els))[0].children.length, 3, "appends Elements in Array")
    parent.empty()
    equal(parent.prepend($(".foo", cache))[0].children.length, 1, "appends Element")
    parent.empty()
    equal(parent.prepend(fragment)[0].children.length, 3, "appends Fragment")
  })
  
  test("Elements.prototype.prependTo", function(){
    
    var els = makeElementSet(), els2 = makeElementSet(), els3 = makeElementSet()
      , p, f, d
    
    els.prependTo(p = Elements.create("div"))
    
    deepEqual(Array.prototype.pluck.call(els, "parentNode").pluck("nodeName"), ["DIV", "DIV", "DIV"])
    deepEqual(p[0].children[0].className, "foo bar")
    
    els2.prependTo(f = Elements.fragment())
    
    deepEqual(Array.prototype.pluck.call(els2, "parentNode").pluck("nodeType"), [11, 11, 11])
    deepEqual(f.childNodes[0].className, "foo bar")
    
    els3.prependTo(d = Elements.create("div")[0])
    
    deepEqual(Array.prototype.pluck.call(els3, "parentNode").pluck("nodeName"), ["DIV", "DIV", "DIV"])
    deepEqual(d.children[0].className, "foo bar")
    
  })
  
  
  test("Elements.prototype.insertAfter", function(){
    
    var els = makeElementSet(), els2 = makeElementSet(), els3 = makeElementSet()
      , p, f, d
      , p1, f1, d1
    
    p1 = Elements.create("div")
      .append(p = Elements.create("div"))
      .append(Elements.create("div"))
    
    p.insertAfter(els)
    
    deepEqual(p1[0].children[1].className, "foo bar")
    })
  
  test("Elements.prototype.insertBefore", function(){
    
    var els = makeElementSet(), els2 = makeElementSet(), els3 = makeElementSet()
      , p, f, d
      , p1, f1, d1
    
    p1 = Elements.create("div")
      .append(Elements.create("div"))
      .append(p = Elements.create("div"))
    
    p.insertBefore(els)
    
    deepEqual(p1[0].children[1].className, "foo bar")
    })
    
    
    test("Elements.prototype.siblings", function(){
      
      var els = makeElementSet(), els2 = makeElementSet(), els3 = makeElementSet()
        , p, f, d
        , p1, f1, d1
      
      p1 = Elements.create("div")
        .append(Elements.create("div"))
        .append(p = Elements.create("div"))
        .append(els)
            
      deepEqual(p.siblings().length, 5, "foo bar")
      deepEqual(p.siblings(true).length, 4, "foo bar")
      })
      
      test("Elements.prototype.siblingsBefore", function(){
        
        var els = makeElementSet(), els2 = makeElementSet(), els3 = makeElementSet()
          , p, f, d
          , p1, f1, d1
        
        p1 = Elements.create("div")
          .append(Elements.create("div"))
          .append(p = Elements.create("div").addClass("test"))
          .append(els)
              
        deepEqual(p.siblingsBefore().length, 1)
        })
        
        
        test("Elements.prototype.siblingsAfter", function(){
          
          var els = makeElementSet(), els2 = makeElementSet(), els3 = makeElementSet()
            , p, f, d
            , p1, f1, d1
          
          p1 = Elements.create("div")
            .append(Elements.create("div"))
            .append(p = Elements.create("div").addClass("test"))
            .append(els)
                
          deepEqual(p.siblingsAfter().length, 3)
          })

        test("Elements.prototype.children", function(){
          
          var els = makeElementSet(), els2 = makeElementSet(), els3 = makeElementSet()
            , p, f, d
            , p1, f1, d1
          
          p1 = Elements.create("div")
            .append(Elements.create("div"))
            .append(p = Elements.create("div").addClass("test"))
            .append(els)
                
          deepEqual(p1.children().length, 5)
          deepEqual(p1.children() instanceof Elements, true)
      })
      
      
        test("Elements.prototype.getElements", function(){
          
          var els = makeElementSet(), els2 = makeElementSet(), els3 = makeElementSet()
            , p, f, d
            , p1, f1, d1
          
          p1 = Elements.create("div")
            .append(Elements.create("span"))
            .append(p = Elements.create("span").addClass("test"))
            .append(els)
                
          deepEqual(p1.getElements("div").length, 3)
          deepEqual(p1.getElements(".test").length, 1)
      })
      
      test("Elements.prototype.empty", function(){
          
          var els = makeElementSet(), els2 = makeElementSet(), els3 = makeElementSet()
            , p, f, d
            , p1, f1, d1
          
          p1 = Elements.create("div")
            .append(Elements.create("span"))
            .append(p = Elements.create("span").addClass("test"))
            .append(els)
            
          p1.empty()
                
          deepEqual(p1[0].childNodes.length, 0)
          deepEqual(p[0].nodeName, "SPAN")
      })
      
      test("Elements.prototype.remove", function(){
          
          var els = makeElementSet(), els2 = makeElementSet(), els3 = makeElementSet()
            , p, f, d
            , p1, f1, d1
          
          p1 = Elements.create("div")
            .append(Elements.create("span"))
            .append(p = Elements.create("span").addClass("test"))
            .append(els)
            
          p1.children().remove()
                
          deepEqual(p1[0].children.length, 0)
          deepEqual(p[0].nodeName, "SPAN")
      })
      
      
      asyncTest("Elements.prototype.css", function(){
        expect(5)
          $(function(){
            p1 = Elements.create("div").appendTo(document.body)
                            
            deepEqual(p1.css("display"), "block")
            deepEqual(p1.css(["display", "float"]), {"display":"block","float":"none"})
            deepEqual(p1.css("display","inline").css("display"), "inline")
            deepEqual(p1.css("float","left").css("float"), "left")
            deepEqual(p1.css({
              "float":"right"
            , "display":"block"
            }).css(["float","display"]), {"float":"right", "display":"block"})
          start()
          })
       
      })
      
      
      
        test("Element#classNames", function(){
      
        var div = document.createElement("div")
          , classNames
      
        div.className = "foo bar baz"
      
        classNames = $(div).classNames()
      
      
        ok(Object.prototype.toString.call(classNames) == "[object Array]", "returns an array")
        ok(classNames.length == 3, "Correct length")
      
       })
      
        test("Element#hasClass", function(){
      
        var div = document.createElement("div")
      
        div.className = "foo bar"
      
      
        ok($(div).hasClass("foo"))
        ok(!$(div).hasClass("baz"))
      
       })
      
       test("Element#removeClass", function(){
      
        var div = document.createElement("div")
      
        div.className = "foo bar baz"
      
        $(div).removeClass("foo bar")
      
      
        ok(div.className == "baz")
       })
      
       test("Element#addClass", function(){
      
        var div = document.createElement("div")
      
        div.className = "foo baz"
      
        $(div).addClass("foo bar")
      
      
        ok(!!~div.className.indexOf("baz"))
        ok(!!~div.className.indexOf("bar"))
        ok(!!~div.className.indexOf("foo"))
      
       })
      
        test("Element#toggleClass", function(){
      
        var div = document.createElement("div")
      
        div.className = "foo baz"
      
        $(div).toggleClass("foo bar")
      
      
        ok(!!~div.className.indexOf("baz"))
        ok(!!~div.className.indexOf("bar"))
        ok(!~div.className.indexOf("foo"))
      
       })
      
      
       test("Element#getValue", function(){
      
      
         var select 
           , option1 = document.createElement("option")
           , option2 = document.createElement("option")
             , option3 = document.createElement("option")
             , value
      
          try{
           select= document.createElement("<select multiple>")
          } catch (e){
            select= document.createElement("select")
            select.multiple = true
          }
      
      
         option1.selected = true
         option1.value = "Foo"
         option2.value = "Bar"
         option3.selected = true
         option3.value = "Baz"
      
         select.appendChild(option1)
         select.appendChild(option2)
         select.appendChild(option3)
      
         value = $(select).getValue()
         ok(value.length == 2 && value[1] == "Baz" , "Select Multiple Element")
      
         var select2 = document.createElement("select")
           , option21 = document.createElement("option")
           , option22 = document.createElement("option")
      
         select2.appendChild(option21)
         select2.appendChild(option22)
      
         option21.value = "foo"
         option22.selected = true
         option22.value = "bar"
      
         var value2 = $(select2).getValue()
      
         ok(value2 == "bar", "Select Element")
      
        var input = document.createElement("input")
      
        input.value = "Foo"
      
        ok($(input).getValue() == "Foo", "Input Element")
      
        var textarea = document.createElement("textarea")
           textarea.innerHTML = "Lorem ipsum"
      
        ok($(textarea).getValue() == "Lorem ipsum", "TextArea Element")
      
       })
      
        test("Element#setValue", function(){
      
      
         var select
           , option1 = document.createElement("option")
           , option2 = document.createElement("option")
             , option3 = document.createElement("option")
             , value
      
            try{
             select= document.createElement("<select multiple>")
            } catch (e){
              select= document.createElement("select")
              select.multiple = true
            }
      
      
         option1.value = "Foo"
         option2.value = "Bar"
         option3.value = "Baz"
      
         select.appendChild(option1)
         select.appendChild(option2)
         select.appendChild(option3)
      
         value = $(select).setValue([0, "Baz"]).getValue()
      
         ok(value.length == 2 && value[1] == "Baz" , "Select Element")
      
            var select2 = document.createElement("select")
           , option21 = document.createElement("option")
           , option22 = document.createElement("option")
        
          option21.value = "foo"
          option22.value = "bar"
        
         select2.appendChild(option21)
         select2.appendChild(option22)
               
         var value2 = $(select2).setValue("bar").getValue()
      
         equal(value2, "bar")
      
        var input = document.createElement("input")
      
        $(input).setValue("Foo")
      
        ok($(input).getValue() == "Foo", "Input Element")
      
        var textarea = document.createElement("textarea")
      
           $(textarea).setValue("Lorem ipsum")
      
        ok($(textarea).getValue() == "Lorem ipsum", "TextArea Element")
      
       })
      
      
        test("Element#serialize", function(){
      
         var form = document.createElement("form")
         var select = document.createElement("select")
           , option1 = document.createElement("option")
           , option2 = document.createElement("option")
             , option3 = document.createElement("option")
             , value
      
         select.multiple = true
         option1.selected = true
         option1.value = "Foo"
         option2.value = "Bar"
         option3.selected = true
         option3.value = "Baz"
      
         select.appendChild(option1)
         select.appendChild(option2)
         select.appendChild(option3)
      
         select.name = "first"
      
        var input = document.createElement("input")
      
        input.value = "Foo"
        input.name = "second"
      
        var textarea = document.createElement("textarea")
           textarea.innerHTML = "Lorem ipsum"
           textarea.name = "third"
      
          form.appendChild(select)
          form.appendChild(input)
          form.appendChild(textarea)
      
         var serialized = $(form).serialize()
      
         deepEqual(serialized, {
            "first": [
              "Foo",
              "Baz"
            ],
            "second": "Foo",
            "third": "Lorem ipsum"
          })
         equal(Object.prototype.toString.call(serialized.first), "[object Array]")
         equal(serialized.second, "Foo")
         equal(serialized.third,"Lorem ipsum")
       })
       
       test("Element#index", function(){
         
         var el = Elements.create("div")
            , p 
         el.append(makeElementSet())
         el.append(p = Elements.create("div"))
         
         equal(p.index(), 3)
         
       })
       
       test("Element#attr", function(){
         
         var el = Elements.create("a")
         
         equal(el.attr("foo", "bar").attr("foo"), "bar")
         equal(el[0].getAttribute("foo"), "bar")
         equal(el.attr("href", "#foo").attr("href"), "#foo")
         
       })
       
       test("Element#data", function(){
         
         var el = Elements.create("a")
         
         equal(el.data("foo", "bar").data("foo"), "bar")
         equal(el[0].getAttribute("data-foo"), "bar")
         equal(el.data("href", "#foo").data("href"), "#foo")
         
       })
       
       test("Element#data", function(){
         
         var el = Elements.create("a")
         
         equal(el.data("foo", "bar").data("foo"), "bar")
         equal(el[0].getAttribute("data-foo"), "bar")
         equal(el.data("href", "#foo").data("href"), "#foo")
         
       })
       
       test("Element#clone", function(){
         
         var el = Elements.create("a").text("foo")
         
         notEqual(el.clone()[0], el[0])
         notEqual(el.clone()[0].innerHTML, el[0].innerHTML)
         equal(el.clone(true)[0].innerHTML, el[0].innerHTML)

         
       })
       
       asyncTest("Element#coords", function(){
         
         expect(6)
         
         $(function(){
           
           var coords = $("#qunit").coords()
           
           ok(Object.isNumber(coords.top))
           ok(Object.isNumber(coords.left))
           ok(Object.isNumber(coords.right))
           ok(Object.isNumber(coords.bottom))
           ok(Object.isNumber(coords.height))
           ok(Object.isNumber(coords.width))
           
           start()
           
         })
         
       })
         
         
         asyncTest("Element#offset", function(){
           
           expect(4)
           
           $(function(){
             
             var offset = $("#qunit").offset()
             
             ok(Object.isNumber(offset.top))
             ok(Object.isNumber(offset.left))
             ok(Object.isElement(offset.parent))
             ok($(offset.parent).css("position") != "static" || offset.parent == document.body)
             
             
             start()
             
           })
         
         })
         asyncTest("Element#globalOffset", function(){
           
           expect(2)
           
           $(function(){
             
             var offset = $("#qunit").globalOffset()
             
             ok(Object.isNumber(offset.top))
             ok(Object.isNumber(offset.left))
             
             
             start()
             
           })
        
        })
      
      test("Element.classNames", function(){
        
        deepEqual(Elements.create("div").classNames(), [])
        deepEqual(Elements.create("div", {"class" : "foo bar"}).classNames(), ["bar","foo"])
        
      })
      
      test("Element.hasClass", function(){
        
        deepEqual(Elements.create("div").addClass("foo bar").hasClass("bar"), true)
        deepEqual(Elements.create("div").hasClass("foo"), false)
        
      })
      
      test("Element.addClass", function(){
        
        deepEqual(Elements.create("div").addClass("foo bar").classNames(), ["bar","foo"])
        deepEqual(Elements.create("div").addClass("foo").classNames(), ["foo"])
        
      })
      
      test("Element.removeClass", function(){
        
        deepEqual(Elements.create("div").addClass("foo bar").removeClass("foo").classNames(), ["bar"])
        
        deepEqual(Elements.create("div").addClass("foo bar").removeClass("foo bar").classNames(), [])
        
      })

      test("Element.toggleClass", function(){
        
        deepEqual(Elements.create("div").toggleClass("foo bar").classNames(),  ["bar","foo"])
        
        deepEqual(Elements.create("div", {"class":"foo"}).toggleClass("foo bar").classNames(), ["bar"])
        
      })
      
      asyncTest("document.ready", function(){
        
        expect(2)
        
        document.ready(function(){
          
          equal(!!document.body, true)
          equal(!!document.head, true)
          start()
          
        })
        
      })

      
     

         
      

    
})()