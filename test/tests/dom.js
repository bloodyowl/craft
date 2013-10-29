module("DOM")

test(
    "craft.supportsCSSProperty"
  , function(){
      var transitionSupport = craft.supportsStyleProperty("transition")
      
      ok(
          transitionSupport === null || 
            typeof transitionSupport == "string"
        , "Returns a string or null"
      )
      
    }
)

test(
    "craft.createNodeList"
  , function(){
      
      var nodeList = craft.createNodeList()
      
      if("__proto__" in {}){
        equal(
            nodeList.__proto__ === Array.prototype
          , false
          , "__proto__ isn't Array.prototype"
        )
      } else {
        equal(
            nodeList instanceof Array
          , false
          , "Isn't a window Array"
        )
      }
      
      nodeList[0] = 1
      
      equal(
          nodeList[0]
        , 1
        , "Acts like an Array"  
      )
      
      equal(
          typeof nodeList.push
        , "function"
        , "Gets Array default's prototype"  
      )

      craft.nodeList.foo = "bar"
      
      equal(
          nodeList.foo
        , "bar"
        , "Prototypal inheritance is preserved"  
      )
      
      nodeList.length = 0
      
      equal(
          "0" in nodeList
        , false
        , "Can be emptied using .length = 0"
      )
      
      delete craft.nodeList.foo
      
    }
)


test(
    "craft.$"
  , function(){


      equal(
          ({}).isPrototypeOf.call(craft.nodeList, craft.$()) 
        , true
        , "returns an instanceof craft.nodeList"
      )
      
      
      equal(
          craft.$("div")[0].nodeName
        , "DIV"
        , "get elements by selector"
      )

      equal(
          craft.$(document.getElementsByTagName("div"))[0].nodeName
        , "DIV"
        , "converts proper nodelists"
      )

      equal(
          craft.$(document.body)[0].nodeName
        , "BODY"
        , "wraps elements passed in"
      )

      equal(
          craft.$().length
        , 0
        , "create empty if no arguments"
      )

      equal(
          craft.$(null).length
        , 0
        , "create empty if arg is null"
      )

    }
)


test(
    "craft.$$"
  , function(){

      equal(
          craft.$$("div").length
        , 1
        , "Returns the first element only"
      )
      
    }
)


test(
    "nodeList#each"
  , function(){
        
        var nodeList = craft.createNodeList(1,2,3)
          , i = 0
          , j = 0
          , thisValue = {foo:"nar"}
        
        equal(
            nodeList.each(function(item, index){
              i += item
              j += index
            })
          , nodeList
          , "Returns nodeList"
        )
        
        equal(
            i
          , 6
          , "Iterates correctly"
        )
        
        equal(
            j
          , 3
          , "Indexes are correctly passed"
        )
        
        craft.createNodeList(1).each(function(){
          equal(
              this
            , thisValue
            , "thisValue is passed"  
          )
        }, thisValue)
        
    }
)

test(
    "nodeList#matches"
  , function(){
        
      equal(
          craft.$("div").matches("#qunit")
        , true
        , "matches correctly 1/2"  
      )
      
      equal(
          craft.$("div").matches("#q-unit")
        , false
        , "matches correctly 2/2"  
      )
      
      equal(
          craft.$("div").matches("html body #qunit")
        , true
        , "matches correctly relative to doc"  
      )
      
    }
)


test(
    "nodeList#getStyle"
  , function(){
        
      equal(
          craft.$("#qunit-fixture").getStyle().position
        , "absolute"
        , "gets style without argument"  
      )
      
      equal(
          craft.$("#qunit-fixture").getStyle("position")
        , "absolute"
        , "gets style with argument" 
      )
      
    }
)


test(
    "nodeList#setStyle"
  , function(){
      
      var div = document.createElement("div")
        , $div = craft.$(div)
      document.body.appendChild(div)
      
      equal(
          $div.setStyle("transition", "foo")
        , $div
        , "Returns nodeList"
      )
    
  
      equal(
          craft.$(
            div
          )
          .setStyle("position", "absolute")
          .getStyle().position
        , "absolute"
        , "sets style with key-value"  
      )

      equal(
          craft.$(
            div
          )
          .setStyle({"position": "relative"})
          .getStyle().position
        , "relative"
        , "sets style with object" 
      )
      
      document.body.removeChild(div)

    }
)

test(
    "nodeList#addClass"
  , function(){
      
      var el = document.createElement("div")
        , $el = craft.$(el)
      
      equal(
          $el.addClass("foo")
        , $el
        , "Returns nodeList"
      )
      
      equal(
          el.className
        , "foo"
        , "Adds className"
      )
      
      el.className = ""
      
      $el.addClass("foo", "bar")
      
      ok(
          /^(foo bar|bar foo)$/.test(el.className)
        , "Adds multiple classNames"
      )
      
    }
)


test(
    "nodeList#removeClass"
  , function(){
      
      var el = document.createElement("div")
        , $el = craft.$(el)
      
      $el.addClass("foo")
            
      equal(
          $el.removeClass("foo")
        , $el
        , "Returns nodeList"
      )
      
      ok(
          /^$/.test(el.className)
        , "Removes className"
      )
      
      $el.removeClass("foo", "bar")
      
      ok(
          /^$/.test(el.className)
        , "Removes multiple classNames"
      )
      
    }
)

test(
    "nodeList#toggleClass"
  , function(){
      
      var el = document.createElement("div")
        , $el = craft.$(el)
      
      $el.addClass("foo")
            
      equal(
          $el.toggleClass("foo")
        , $el
        , "Returns nodeList"
      )
      
      $el.addClass("foo").toggleClass("foo", "bar")
      
      ok(
          /^bar$/.test(el.className)
        , "Toggles className"
      )

    }
)

test(
    "nodeList#hasClass"
  , function(){
      
      var el = document.createElement("div")
        , $el = craft.$(el)
      
      $el.addClass("foo", "bar", "baz")
            
      equal(
          $el.hasClass("foo")
        , true
        , "Tests for one class"
      )
      
      
      ok(
          $el.hasClass("foo", "bar", "baz")
        , "Tests for multiple class 1/2"
      )
      
      ok(
          !$el.hasClass("foo", "bar", "baz", "fooo")
        , "Tests for multiple class 2/2"
      )

    }
)

test(
    "nodeList#toFragment"
  , function(){
      
      var elements = [
              document.createElement("div")
            , document.createElement("span")
            , document.createElement("i")
          ]
        , nodeList = craft.$(elements)
        , fragment = nodeList.toFragment()
      
      equal(
          fragment.nodeType
        , 11
        , "Returns a fragment"
      )
      
      equal(
          fragment.childNodes.length
        , 3
        , "Contains the right amount of elements"
      )
      
      deepEqual(
          craft.pluck(fragment.childNodes, "nodeName")
        , ["DIV", "SPAN", "I"]
        , "Contains the right elements"
      )
    }  
)

test(
    "nodeList#append"
  , function(){
      
      var div = document.createElement("div")
        , elements = [
              div
            , document.createElement("span")
            , document.createElement("i")
          ]
        , nodeList = craft.$(elements)
        , element
        , span = document.createElement("span")
      
      div.appendChild(document.createElement("i"))
      
      equal(
          nodeList.append(span)
        , nodeList
        , "Returns nodeList"
      )
      
      deepEqual(
          craft.pluck(craft.pluck(nodeList, "children"), "length")
        , [2, 0, 0]
        , "Appends to the first element in the nodeList"
      )
      
      equal(
          nodeList[0].children[1]
        , span
        , "Contains the right elements"
      )

    }  
)

test(
    "nodeList#prepend"
  , function(){
      
      var div = document.createElement("div")
        , elements = [
              div
            , document.createElement("span")
            , document.createElement("i")
          ]
        , nodeList = craft.$(elements)
        , element
        , span = document.createElement("span")
      
      div.appendChild(document.createElement("i"))
      
      equal(
          nodeList.prepend(span)
        , nodeList
        , "Returns nodeList"
      )
      
      deepEqual(
          craft.pluck(craft.pluck(nodeList, "children"), "length")
        , [2, 0, 0]
        , "Prepends to the first element in the nodeList"
      )
      
      equal(
          nodeList[0].children[0]
        , span
        , "Contains the right elements"
      )

    }  
)

test(
    "nodeList#appendTo"
  , function(){
      
      var elements = [
              document.createElement("div")
            , document.createElement("span")
            , document.createElement("i")
          ]
        , nodeList = craft.$(elements)
        , element
        , div = document.createElement("div")
      
      div.appendChild(document.createElement("strong"))
      
      equal(
          nodeList.appendTo(div)
        , nodeList
        , "Returns nodeList"
      )
      
      equal(
          div.children.length
        , 4
        , "Appends all nodeList into target"
      )
      
      equal(
          div.children[0].nodeName
        , "STRONG"
        , "Appends after the present elements"
      )
      
      deepEqual(
          craft.pluck(nodeList, "parentNode")
        , [div, div, div]
        , "Contains the right elements"
      )
    }  
)

test(
    "nodeList#prependTo"
  , function(){
      
      var elements = [
              document.createElement("div")
            , document.createElement("span")
            , document.createElement("i")
          ]
        , nodeList = craft.$(elements)
        , element
        , div = document.createElement("div")
      
      div.appendChild(document.createElement("strong"))
      
      equal(
          nodeList.prependTo(div)
        , nodeList
        , "Returns nodeList"
      )
      
      equal(
          div.children.length
        , 4
        , "Prepends all nodeList into target"
      )
      
      equal(
          div.children[3].nodeName
        , "STRONG"
        , "Prepends after the present elements"
      )
      
      deepEqual(
          craft.pluck(nodeList, "parentNode")
        , [div, div, div]
        , "Contains the right elements"
      )
    }  
)


test(
    "nodeList#insertBefore"
  , function(){
      
      var div = document.createElement("div")
        , elements = [
              document.createElement("div")
            , document.createElement("span")
            , document.createElement("i")
          ]
        , nodeList = craft.$(elements)
        , child1 = document.createElement("div")
        , child2 = document.createElement("div")
      
      div.appendChild(child1)
      div.appendChild(child2)
      
      equal(
          nodeList.insertBefore(child2)
        , nodeList
        , "Returns nodeList"
      )
      
      equal(
          div.children.length
        , 5
        , "Right number of elements"
      )
      
      equal(
          div.children[4]
        , child2
        , "Elements inserted before target"
      )
      
      deepEqual(
          craft.pluck(div.children, "nodeName")
        , ["DIV", "DIV", "SPAN", "I", "DIV"]
        , "Elements inserted in the right order"
      )
    }
)


test(
    "nodeList#insertAfter"
  , function(){
      
      var div = document.createElement("div")
        , elements = [
              document.createElement("div")
            , document.createElement("span")
            , document.createElement("i")
          ]
        , nodeList = craft.$(elements)
        , child1 = document.createElement("div")
        , child2 = document.createElement("div")
      
      div.appendChild(child1)
      div.appendChild(child2)
      
      equal(
          nodeList.insertAfter(child2)
        , nodeList
        , "Returns nodeList"
      )
      
      equal(
          div.children.length
        , 5
        , "Right number of elements"
      )
      
      equal(
          div.children[1]
        , child2
        , "Elements inserted before target"
      )
      
      deepEqual(
          craft.pluck(div.children, "nodeName")
        , ["DIV", "DIV", "DIV",  "SPAN", "I"]
        , "Elements inserted in the right order"
      )
    }
)


test(
    "nodeList#empty"
  , function(){
      
      var div = document.createElement("div")
        , elements = [
              document.createElement("div")
            , document.createElement("span")
            , document.createElement("i")
          ]
        , nodeList = craft.$(elements)
     
      nodeList.each(function(item){
        item.innerHTML = "foo bar baz"
      })
      
      equal(
          nodeList.empty()
        , nodeList
        , "Returns nodeList"
      )
      
      deepEqual(
          craft.pluck(nodeList, "innerHTML")
        , ["", "", ""]
        , "Empties elements"
      )
     
    }
)

test(
    "nodeList#destroy"
  , function(){
    
        var elements = [
                document.createElement("div")
              , document.createElement("span")
              , document.createElement("i")
            ]
          , div = document.createElement("div")
          , nodeList = craft.$(elements)
        
        nodeList.appendTo(div)
        
        equal(
            nodeList.destroy()
          , nodeList
          , "nodeList is returned"  
        )
        
        equal(
            nodeList.length
          , 0
          , "nodeList is emptied"  
        )
        
        equal(
            div.children.length
          , 0
          , "Elements have been removed"
        )
    }  
)

test(
    "nodeList#remove"
  , function(){
    
        var elements = [
                document.createElement("div")
              , document.createElement("span")
              , document.createElement("i")
            ]
          , div = document.createElement("div")
          , nodeList = craft.$(elements)
        
        nodeList.appendTo(div)
        
        equal(
            nodeList.remove()
          , nodeList
          , "nodeList is returned"  
        )
        
        equal(
            div.children.length
          , 0
          , "Elements have been removed"
        )
    }  
)

test(
    "nodeList#getDimensions"
  , function(){
      
      var element = craft.$("#qunit")
        , dimensions = element.getDimensions()
      
      ok(
          parseInt(dimensions.height, 10) === dimensions.height
        , "Height is an integer"
      )
      
      ok(
          parseInt(dimensions.width, 10) === dimensions.width
        , "Width is an integer"
      )
      
    }  
)

test(
    "nodeList#getOffset"
  , function(){
      
      var element = craft.$("#qunit")
        , offset = element.getOffset()
      
      ok(
          parseInt(offset.height, 10) === offset.height
        , "Height is an integer"
      )
      
      ok(
          parseInt(offset.width, 10) === offset.width
        , "Width is an integer"
      )
      
      ok(
          parseInt(offset.top, 10) === offset.top
        , "Top is an integer"
      )
      
      ok(
          parseInt(offset.right, 10) === offset.right
        , "Right is an integer"
      )
      
      ok(
          parseInt(offset.bottom, 10) === offset.bottom
        , "Bottom is an integer"
      )
      
      ok(
          parseInt(offset.left, 10) === offset.left
        , "Left is an integer"
      )
      
    }  
)

test(
    "nodeList#getParent"
  , function(){
      
      var div = document.createElement("div")
        , span = document.createElement("span")
        , _isPrototypeOf = {}.isPrototypeOf
      
      div.appendChild(span)
      
      ok(
          _isPrototypeOf.call(craft.nodeList, craft.$(div).getParent())
        , "Returns a new nodeList"
      )
      
      equal(
          craft.$(span).getParent().length
        , 1
        , "Length is 1"
      )
      
      equal(
          craft.$(span).getParent()[0]
        , div
        , "Parent is correct"
      )
    }  
)


test(
    "nodeList#getParentChain"
  , function(){

      var div = document.createElement("div")
        , strong = document.createElement("strong")
        , span = document.createElement("span")
        , _isPrototypeOf = {}.isPrototypeOf

      div.appendChild(strong)
      strong.appendChild(span)

      ok(
          _isPrototypeOf.call(
              craft.nodeList
            , craft.$(span).getParentChain()
          )
        , "Returns a new nodeList"
      )

      equal(
          craft.$(span).getParentChain().length
        , 2
        , "Length is right"
      )

      equal(
          craft.$(span).getParentChain()[0]
        , strong
        , "Parent is correct 1/3"
      )
      
      equal(
          craft.$(span).getParentChain()[1]
        , div
        , "Parent is correct 2/3"
      )
      
      equal(
          craft.$(document.body).getParentChain()[0]
        , document.documentElement
        , "Parent is correct 3/3"
      )
      
      equal(
          craft.$(document.body).getParentChain()[1]
        , void 0
        , "Stops at ownerDocument.documentElement"
      )
    }  
)

test(
    "nodeList#getChildren"
  , function(){
      
      var element = document.createElement("div")
        , child1 = document.createElement("div")
        , child2 = document.createElement("span")
        , child3 = document.createElement("strong")
        , $element = craft.$(element)
        , _isPrototypeOf = {}.isPrototypeOf
      
      element.appendChild(child1)
      element.appendChild(child2)
      element.appendChild(child3)
      
      ok(
          _isPrototypeOf.call(craft.nodeList, $element.getChildren())
        , "Returns nodeList"
      )
      
      equal(
          $element.getChildren().length
        , 3
        , "Right length"  
      )
      
      deepEqual(
          craft.pluck($element.getChildren(), "nodeName")
        , ["DIV", "SPAN", "STRONG"]  
        , "Right elements"
      )
      
    }
)

test(
    "nodeList#getSiblings"
  , function(){

      var element = document.createElement("div")
        , child1 = document.createElement("div")
        , child2 = document.createElement("span")
        , child3 = document.createElement("strong")
        , $element = craft.$(child2)
        , _isPrototypeOf = {}.isPrototypeOf

      element.appendChild(child1)
      element.appendChild(child2)
      element.appendChild(child3)

      ok(
          _isPrototypeOf.call(craft.nodeList, $element.getSiblings())
        , "Returns nodeList"
      )

      equal(
          $element.getSiblings().length
        , 2
        , "Right length"  
      )

      deepEqual(
          craft.pluck($element.getSiblings(), "nodeName")
        , ["DIV", "STRONG"]  
        , "Right elements"
      )

    }
)

test(
    "nodeList#setValue"
  , function(){
      
      var div = document.createElement("div")
        , input = craft.$(document.createElement("input"))
        , textarea = craft.$(document.createElement("textarea"))
        , select = craft.$(document.createElement("select"))
        , multipleSelect = craft.$(document.createElement("select"))
    
      input.appendTo(div)
      textarea.appendTo(div)
      select.appendTo(div)
      multipleSelect.appendTo(div)
    
      div.style.display = "none"
      
      select[0]
        .appendChild(document.createElement("option")).value = "foo"
      select[0]
        .appendChild(document.createElement("option")).value = "bar"
      select[0]
        .appendChild(document.createElement("option")).value = "baz"
    
      multipleSelect[0].multiple = true
      
      multipleSelect[0]
        .appendChild(document.createElement("option")).value = "foo"
      multipleSelect[0]
        .appendChild(document.createElement("option")).value = "bar"
      multipleSelect[0]
        .appendChild(document.createElement("option")).value = "baz"
    
      equal(
          input.setValue("foo")
        , input
        , "Returns nodeList"
      )
     
      equal(
          input.get("value")
        , "foo"
        , "input"  
      )
      
      textarea.setValue("foo")
      
      equal(
          textarea.get("value")
        , "foo"
        , "textarea"  
      )
      
      
      select.setValue(["foo", "bar"])
      
      deepEqual(
          craft.pluck(select.getChildren(), "selected")
        , [true, false, false]
        , "select"  
      )

      
      multipleSelect.setValue(["foo", "bar"])
      
      deepEqual(
          craft.pluck(multipleSelect.getChildren(), "selected")
        , [true, true, false]
        , "select multiple"  
      )
     
    }  
)

test(
    "nodeList#getValue"
  , function(){

      var div = document.createElement("div")
        , input = craft.$(document.createElement("input"))
        , textarea = craft.$(document.createElement("textarea"))
        , select = craft.$(document.createElement("select"))
        , multipleSelect = craft.$(document.createElement("select"))

      input.appendTo(div)
      textarea.appendTo(div)
      select.appendTo(div)
      multipleSelect.appendTo(div)

      div.style.display = "none"

      select[0]
        .appendChild(document.createElement("option")).value = "foo"
      select[0]
        .appendChild(document.createElement("option")).value = "bar"
      select[0]
        .appendChild(document.createElement("option")).value = "baz"

      multipleSelect[0].multiple = true

      multipleSelect[0]
        .appendChild(document.createElement("option")).value = "foo"
      multipleSelect[0]
        .appendChild(document.createElement("option")).value = "bar"
      multipleSelect[0]
        .appendChild(document.createElement("option")).value = "baz"
    
      input.setValue("foo")

      equal(
          input.getValue()
        , "foo"
        , "input"  
      )

      textarea.setValue("foo")

      equal(
          textarea.getValue()
        , "foo"
        , "textarea"  
      )

      
      select.setValue(["foo", "bar"])
      
      deepEqual(
          select.getValue()
        , "foo"
        , "select"  
      )
      
      multipleSelect.setValue(["foo", "bar"])

      deepEqual(
          multipleSelect.getValue()
        , ["foo", "bar"]
        , "select multiple"  
      )

    }  
)


test(
    "nodeList#serialize"
  , function(){

      var div = document.createElement("div")
        , input = craft.$(document.createElement("input"))
        , input2 = craft.$(document.createElement("input"))
        , textarea = craft.$(document.createElement("textarea"))
        , select = craft.$(document.createElement("select"))
        , multipleSelect = craft.$(document.createElement("select"))

      input.appendTo(div)
      input2.appendTo(div)
      textarea.appendTo(div)
      select.appendTo(div)
      multipleSelect.appendTo(div)

      div.style.display = "none"

      select[0]
        .appendChild(document.createElement("option")).value = "foo"
      select[0]
        .appendChild(document.createElement("option")).value = "bar"
      select[0]
        .appendChild(document.createElement("option")).value = "baz"

      multipleSelect[0].multiple = true

      multipleSelect[0]
        .appendChild(document.createElement("option")).value = "foo"
      multipleSelect[0]
        .appendChild(document.createElement("option")).value = "bar"
      multipleSelect[0]
        .appendChild(document.createElement("option")).value = "baz"
    
      input[0].name = "foo"
      input.setValue("foo")
      textarea[0].name = "bar"
      textarea.setValue("foo")
      select.setValue(["foo", "bar"])
      select[0].name = "baz"
      multipleSelect.setValue(["foo", "bar"])
      multipleSelect[0].name = "plus"
       
      deepEqual(
          craft.$(div).serialize()
        , {
              "foo" : "foo"
            , "bar" : "foo"
            , "baz" : "foo"
            , "plus" : ["foo", "bar"]
          }
        , "serializes"  
      )

    }  
)

test(
    "nodeList#contains"
  , function(){
      
      var element = document.createElement("div")
        , span = document.createElement("span")
        
      element.appendChild(span)
      
      ok(
          craft.$(element).contains(span)
        , "Contained"  
      )
      
      ok(
          !craft.$(element).contains(element)
        , "Same element passed implies false"  
      )
      
      ok(
          !craft.$(element).contains(document.body)
        , "Not contained"  
      )
      
    }
)

test(
    "nodeList#get"
  , function(){
      
      var element = craft.$(document.createElement("div"))
      
      equal(
          element.get("nodeType")
        , 1
        , "Gets"
      )
      
    }  
)

test(
    "nodeList#set"
  , function(){
      
      var elements = craft.$([
            document.createElement("div")
          , document.createElement("div")
          ])
      
      elements.set("foo", "bar")
      
      deepEqual(
          craft.pluck(elements, "foo")
        , ["bar", "bar"]
        , "Sets"
      )
      
    }  
)


test(
    "nodeList#getAttribute"
  , function(){
      
      var element = craft.$(document.createElement("div"))
      element[0].setAttribute("data-foo", "bar")
      equal(
          element.getAttribute("data-foo")
        , "bar"
        , "Gets attribute"
      )
      
    }  
)

test(
    "nodeList#setAttribute"
  , function(){
      
      var elements = craft.$([
            document.createElement("div")
          , document.createElement("div")
          ])
      
      elements.setAttribute("data-foo", "bar")
      
      equal(
          elements.getAttribute("data-foo")
        , "bar"
        , "sets attribute"
      )
      
    }  
)

test(
    "nodeList array accessors"
  , function(){
      
      var _isPrototypeOf = {}.isPrototypeOf
        , nodeList = craft.$([1,2,3,4,5])  
      
      deepEqual(
          nodeList.slice(1, 3)
        , craft.$([2,3])
        , "Slice is correct"
      )
      
      ok(
          _isPrototypeOf.call(craft.nodeList, nodeList.slice(1, 3))
        , "Slice is a nodeList"
      )
      
      deepEqual(
          nodeList.concat([6,7])
        , craft.$([1,2,3,4,5,6,7])
        , "Concat is correct"
      )
      
      ok(
          _isPrototypeOf.call(craft.nodeList, nodeList.concat(1, 3))
        , "Concat is a nodeList"
      )
      
    }
)


test(
    "craft.createElement"
  , function(){
      
      var _isPrototypeOf = {}.isPrototypeOf
      
      ok(
          _isPrototypeOf.call(craft.nodeList, craft.createElement("div"))
        , "Returns a nodeList"
      )
      
      equal(
          craft.createElement("div")[0].nodeName
        , "DIV"
        , "Creates the right element"
      )
      
      equal(
          craft.createElement("div", {className:"block-Hello"})[0].className
        , "block-Hello"
        , "Sets properties"  
      )
    }  
)