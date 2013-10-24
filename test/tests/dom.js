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