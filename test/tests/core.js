module("Core")

test(
    "craft"
  , function(){
      ok(
          Object.prototype.hasOwnProperty.call(window, "craft")
        , "`craft` in window"
      )
      ok(
          typeof craft == "object"
        , "`craft` is an object"
      )
      ok(
          typeof craft.version == "string"
        , "`craft` has a string version property"
      )
    }
)

test(
    "craft.parseInt"
  , function(){
      
      equal(
          craft.parseInt("10px")
        , 10
        , "Parses strings"
      )
      
      equal(
          craft.parseInt(10.34)
        , 10
        , "Parses Numbers"
      )
      
      
      equal(
          craft.parseInt((1 << 30) * (1 << 30))
        , 1152921504606847000
        , "Parses non-int32"
      )
      
      equal(
          craft.parseInt("060")
        , 60
        , "Parses in base 10 by default"
      )
      
      equal(
          craft.parseInt("060", 8)
        , 48
        , "Accepts a base argument"
      )
      
    }  
)