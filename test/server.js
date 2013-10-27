var express = require("express")
  , http = require("http")
  , path = require("path")
  , app = express()
  , parameters = process.argv.slice(2)
  , port = 8080
  , colors = {
        green : function(str){ return "\033[0m\033[32m" + str + "\033[0m" }
      , blue : function(str){ return "\033[0m\033[34m" + str + "\033[0m" }
      , red : function(str){ return "\033[0m\033[33m" + str + "\033[0m" }
  }

  console.log("\n  " + colors.red("craftjs.\n  server.\n") +  "  ---\n")

  app.configure(function(){
    app.use(express.compress())
    app.set("port", port)
    app.use(express.bodyParser())
    app.use(express.logger("dev"))
    app.use(express.static(path.join(__dirname, '../')))
  })

  http.createServer(app).listen(app.get("port"), function(){
    console.log(colors.blue("  Test server running on port ") + colors.green(app.get("port")) + "\n")
  })

  app.get("/request", function(req, res){
    res.set("Content-Type", "text/html")
    res.send("Helloworld!")
  })