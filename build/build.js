;(function(){

  var fs = require("fs")
    , encoding = {encoding:"utf-8"}
    , parameters = process.argv.slice(2)
    , str = ""
    , mainFile
    , _require = /\n([^\S\n]*)\/\/=\s*([^\s\n]+)/g
    , _newLine = /\n/
    , files = []
    , write
    , options = {
        output : "", 
        input : "", 
        watch : false
      }
    , uglifyJS = require("uglify-js");
  
  ;(function parseArguments(params){
    var i = -1, l = params.length, param

    while(++i < l) {
      param = params[i]
      if(param == "-o") {
        options.output = params[++i]
        continue
      }
      if(param == "-w") {
        options.watch = true
        continue
      }
      options.input = param
    }
    if(!options.output) {
      options.output += options.input.replace(/\.js$/, ".build.js")
    }
    
    options.outputMin = options.output.replace(/\.js$/, ".min.js")
  })(parameters)
  
  function requireFiles(str, preWhiteSpace, isRoot){
    if(arguments.length > 1) {
      str = preWhiteSpace + str.split(_newLine).join("\n" + preWhiteSpace)
    }
    str = (isRoot ? "" : "\n\n") + str
    if(!_require.test(str)) return str
    return str.replace(_require, function(item, whiteSpace, path){
      if(options.watch) watch(path)
      return requireFiles(fs.readFileSync(path, encoding), whiteSpace)
    })
  }

  function watch(file){
    if(files.indexOf(file) != -1) return
    console.log("  \033[33mwatching\033[0m " + file)
    files.push(file)
    fs.watchFile(file, { interval: 300 }, function (a,b) {
      if(a.currtime <= b.currtime) return
      str = fs.readFileSync(options.input, encoding)
      write(requireFiles(str, "", 1))
    })
  }

  function makeWriter(file, minFile){
    return function(str){
      var minified
      fs.writeFileSync(file , str, encoding)
      minified = uglifyJS.minify(file)
      fs.writeFileSync(minFile, minified.code, encoding)
      console.log("  \033[33mcompiled\033[0m " + file)
    }
  }
  
  mainFile = fs.readFileSync(options.input, encoding)
  write = makeWriter(options.output, options.outputMin)
  if(options.watch) watch(options.input)
  str = requireFiles(mainFile, "", 1)
  write(str)

})()
