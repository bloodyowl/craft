module.exports = function(grunt){
  grunt.initConfig({
    meta : {
      banner : "/*!\n  Craft.js" +
               "\n  1.2.2 \n*/"
    },
    concat: {
      dist: {
        src: ['<banner>', 'src/before.js', 'src/core.js',  'src/array.js', 'src/invoke.js', 'src/hash.js', 'src/function.js', 'src/string.js', 'src/ajax.js', 'src/dom.js', 'src/defer.js', 'src/browser.js', 'src/after.js'],
        dest: 'craft.js',
        separator : '\n\n\n'
      },
      server: {
        src: ['<banner>', 'src/before.js', 'src/core.js',  'src/array.js', 'src/hash.js', 'src/function.js', 'src/string.js', 'src/after.js'],
        dest: 'craft-server.js',
        separator : '\n\n\n'
      }
    },
    min: {
      "craft-min.js": [ "<banner>", "craft.js" ]
    },
    lint: {
      afterconcat: ['<config:concat.dist.dest>', '<config:concat.server.dest>']
    },
    qunit: {
      all: ['http://localhost:8000/test/', 'http://localhost:8000/test/server.html']
    },
    server: {
      port: 8000,
      base: '.'
    },
    jshint: {
      options: {
        asi: true,
        laxcomma: true,
        bitwise: false,
        eqeqeq: false,
        boss: true,
        evil: true,
        browser: true
      }
    }
  });

  grunt.registerTask('test', 'server qunit');
  grunt.registerTask('default', 'concat concat:server lint min server qunit');
  grunt.registerTask('travis', 'lint server qunit');
}

