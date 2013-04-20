module.exports = function(grunt){
  
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-qunit')

  grunt.initConfig({
      meta : {
        banner : "/*!\n  Craft.js\n  2.0.9 \n*/"
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
            , dest: "./dist/craft.js"
            , separator : "\n\n\n"
          }
        , docs : {
            src : [
                "docs/README.md"
              , "docs/browser.md"
              , "docs/object.md"
              , "docs/class.md"
              , "docs/array.md"
              , "docs/elements.md"
              , "docs/event.md"
              , "docs/selector.md"
              , "docs/string.md"
              , "docs/request.md"
              , "docs/function.md"
            ]
          , dest : "./dist/docs.md"
          , separator : "\n\n"
        }
      }
    , uglify : {
          "./dist/craft-min.js": ["<banner>", "./dist/craft.js"]
      }
    , qunit : {
          all : {
              options : {
                  urls: ["http://localhost:8080/", "http://localhost:8080/test/require.html"]
              }
          }
      }
    , jshint : {
          afterconcat: ["./dist/craft.js"]
        , options: {
              asi: true
            , laxcomma: true
            , bitwise: false
            , eqeqeq: false
            , eqnull: true
            , boss: true
            , evil: true
            , browser: true
            , undef : true
            , unused : true
            , validthis : true
            , newcap : false
            , globals : {
              define : true
            }
          }
      }
  })
  
  grunt.event.on("qunit.testStart", function(name){
    grunt.log.ok("Running test: " + name)
  })

  grunt.event.on('qunit.testDone', function (name, failed, passed) {
    grunt.log.ok(failed + " failed, " + passed + " passed. ");
  })
  
  grunt.registerTask("server", function(){
    require("./test/server/launch")
  })
  grunt.registerTask("test", ["concat", "jshint", "server", "qunit"])
  grunt.registerTask("default", ["concat", "jshint", "uglify", "test"])

}