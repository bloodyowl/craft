exports.run = function(){

  var express = require("express")
     , http = require("http")
     , path = require("path")
     , app = express()
     , file = require("fs")
  
  app.configure(function(){
    app.set("port", process.env.PORT || 8080)
    app.use(express.bodyParser())
   // app.use(express.logger("dev"))
    app.use(express.static(path.join(__dirname, './../../')))
  })
  
  app.get("/", function(req, res){
    res.redirect('/test/')
  })
  
  app.get("/test/headers", function(req, res){
    res.set("Content-Type", "application/json")
    res.send(JSON.stringify(req.headers))
  })
  
  app.post("/test/query", function(req, res){
    res.set("Content-Type", "application/json")
    res.send(JSON.stringify(req.body))
  })
  
  app.get("/test/javascript", function(req, res){
    res.set("Content-Type", "text/javascript")
    res.send(file.readFileSync("./test/requests/foo.js", "utf-8"))
  })
  
  app.get("/test/json", function(req, res){
    res.set("Content-Type", "text/json")
    res.send(file.readFileSync("./test/requests/foo.json", "utf-8"))
  })
  
  app.get("/test/text", function(req, res){
    res.set("Content-Type", "text/plain")
    res.send(file.readFileSync("./test/requests/text.txt", "utf-8"))
  })
  
  app.get("/test/xml", function(req, res){
    res.set("Content-Type", "text/xml")
    res.send(file.readFileSync("./test/requests/xml.xml", "utf-8"))
  })
  
  app.get("/test/404", function(req, res){
    res.status(404).set("Content-Type", "text/json")
    res.send(JSON.stringify({errorStatus : 404}))
  })
  
  app.get("/test/jsonp", function(req, res){
    var callback = req.query.callback
      , content = JSON.stringify({foo:"bar", bar:"baz"})
    res.set("Content-Type", "text/javascript")
    if(callback) res.send(callback + "(" + content + ");")
    else  res.send(content)
  })
  
  ;["1", "2", "3"].forEach(function(item){
    
    app.get("/test/" + item, function(req, res){
      res.set("Content-Type", "text/json")
      res.send(JSON.stringify({id:item}))
    })
    
  })
  
  http.createServer(app).listen(app.get("port"), function(){
    console.log("\nUnit Test server running on port " + app.get("port") + "\n")
  })

}