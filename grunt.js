module.exports = function(grunt){
  grunt.initConfig({
    meta : {
      banner : "/*!\n  Craft.js" +
               "\n  1.2.1 \n*/"
    },
    concat: {
      dist: {
        src: ['<banner>', 'src/before.js', 'src/core.js',  'src/array.js', 'src/hash.js', 'src/function.js', 'src/string.js', 'src/ajax.js', 'src/dom.js', 'src/defer.js', 'src/browser.js', 'src/after.js'],
        dest: 'craft.js',
        separator : '\n\n\n'
      }
    },
    min: {
      "craft-min.js": [ "<banner>", "craft.js" ]
    },
    lint: {
      afterconcat: ['<config:concat.dist.dest>']
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
}