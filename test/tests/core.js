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