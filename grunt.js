module.exports = function(grunt){

  grunt.initConfig({
      meta : {
        banner : "/*!\n  Craft.js\n  2.0.0 \n*/"
      }
    , concat : {
          dist : {
              src : ["<banner>"
                , "lib/intro.js"
                , "lib/browser.js"
                , "lib/class.js"
                , "lib/core.js"
                , "lib/object.js"
                , "lib/array.js"
                , "lib/function.js"
                , "lib/string.js"
                , "lib/request.js"
                , "lib/selector.js"
                , "lib/event.js"
                , "lib/elements.js"
                , "lib/outro.js"
              ]
            , dest: "craft.js"
            , separator : "\n\n\n"
          }
      }
    , min : {
          "craft-min.js": ["<banner>", "craft.js"]
      }
    , lint : {
          afterconcat: ["<config:concat.dist.dest>"]
      }
    , server : {
          port : 8888
        , base : "."
      }
    , qunit : {
          all: ["http://localhost:8888"]
      }
    , jshint : {
          options: {
              asi: true
            , laxcomma: true
            , bitwise: false
            , eqeqeq: false
            , eqnull: true
            , boss: true
            , evil: true
            , browser: true
          }
      }
  })

  grunt.registerTask("server", function(){
    require("./test/server/launch")
  })
  grunt.registerTask("test", "server qunit")
  grunt.registerTask("default", "concat lint min")
  grunt.registerTask("travis", "lint server qunit")

}