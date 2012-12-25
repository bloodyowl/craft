asyncTest("Defer", 2, function(){
  
     new Defer(function(){return 1}, function(){ return 2})
       .then(function(a,b){
         ok(a == 1 && b == 2, "Defer passes variables correctly")
         start()
       })
       .init(function(){
         ok(true, "Init is evaluated")
       })
       
   })
       
   asyncTest("Defer errors", 1, function(){
     new Defer(1)
        .fail(function(a){
          ok(a == "number isn't a valid type. ", "Defer handles errors correctly")
          start()
      })
   })
   
   asyncTest("Defer AJAX", 1, function(){
        new Defer("file1.txt", "file2.txt")
           .then(function(a, b){
             ok(a == "foo" && b == "bar", "Defer handles Ajax")
             start()
           })
           .fail(function(err){
              ok(err == "file1.txt can't be reached." || err == "file2.txt can't be reached.", "Defer handles Ajax")
               start()
           })
     })