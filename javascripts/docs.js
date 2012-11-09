Element.ready(function(){
  
  $(document.documentElement).addClass(Craft.Browser.toClassName())
  
  function smoothScroll(a,b){var c="pageYOffset"in window?window.pageYOffset:document.documentElement.scrollTop,d=+new Date,e=d+b,f=a+window.innerHeight>document.height?document.height-window.innerHeight:a,g=0>f-c?!0:!1,h=setInterval(function(){var a=+new Date;e>=a?scrollTo(0,g?c-(a-d)/(e-d)*c+f:c+(a-d)/(e-d)*(f-c)):(scrollTo(0,f),clearInterval(h))},10)}
  
  Element.extend({
    getOffsetTop : function(){
      var self = this
        , value = 0;
      while(self != null){
        value += self.offsetTop
        self = self.offsetParent
      }
      return value
    },
    toggleItem : function(first){
      var self = this
      self.addClass("active").getSiblings().invoke("removeClass", "active")
      return self
    },
    scrollTo : function(){
      var self = this
      window.scrollTo(0, self.getOffsetTop() - 10)
    }
  });
  
  var nav = $("nav")
  , main = $("items")
  , Docs
  
  function handlerDemos(e){
    var ele = $(this)
      ele.stopListening("click", handlerDemos).listen("click", function(e){Event.stop(e)})
      ele.addClass("done")
      Event.stop(e)
      var el = $(this.previousSibling).getChildren()[0]
        , text = el.get("innerHTML")
      el.set("innerHTML", text + "<br><span class='c'>" + new Function("return " + (text ? text.replace(/&lt;/g, "<").replace(/&gt;/, ">") : "undefined"))() + "</span>")
  }

  function activateDemos(){
    $("items").getByTag("a").filter(function(item){return item.hasClass("run-it")}).forEach(function(item){
      item.listen("click", handlerDemos.bind(item))
    })
  }
  
  function activateTitles(){
    $("items").getByTag("h2").invoke("getChildren").reduce(function(a,b){ return [].concat(a).concat(b)}).forEach(function(item){
      item.listen("click", function(){
        item.scrollTo()
      })
    })
  }
  
  Docs = {
    templates : {
      list : function(data){
        var fragment = Element.createFragment()
        Hash(data).forEach(function(item, title){
          var escapedTitle = title.replace(/^\#|^\./, "").replace(/\./g, "_").replace(/\s/g, "-")
          
          if(title == "Introduction") {
            fragment.insert("<div class='item'><a href='#!/" + window.location.hash.match(/\!\/([\w]*)\/?/)[1] + "/" + escapedTitle +" '>" + title + "</a><p>" + item +  "</p></div>")
            return
          }
          fragment.insert(
            "<div class='item'>" +
            "<h2 id='" + escapedTitle + "'><a href='#!/" + window.location.hash.match(/\!\/([\w]*)\/?/)[1] + "/" + escapedTitle +" '>" + title + "</a></h2>" + 
            "<h3>Description</h3>" + 
            "<p>" + item.description + "</p>" + 
            "<h3>Usage</h3>" + 
            "<pre><code>" + item.usage + "</code></pre>" + 
            "<dl>" + 
            [].concat(item.arguments).map(function(i){
              var hash = Hash(i)
                , key = hash.keys()[0]
              return "<dt><code"+ (key == "output" ? " class='output'" : "")  +">" + key + "</code></dt><dd>" + hash.values()[0] + "</dd>"
            }).join("") +
            "</dl><h3>Demo</h3>" + 
            "<pre><code>" + item.demo + "</code></pre>" +
            "<a href='#' class='button run-it'>Run it</a>" + 
            "<div class='clearfix'></div>" +
            "</div>"
          )
        })
        main.empty().insert(fragment)
      }
   },
    addNav : function(items){
      var fragment = Element.createFragment()
      
      items.forEach(function(item){
        var lwcs = "#!/" + item
          , el
         fragment.insert(el = Element.create("a", {href : lwcs}).insert(item).listen("click", function(e){
           Event.stop(e)
           window.location.hash = lwcs
           Docs.templates.list(Docs.data.get(item))
           activateTitles()
           activateDemos()
           $("items").scrollTo()
           $(el).toggleItem()
        }))
      })
      
      
      nav.insert(fragment)
    },
    parse : function(object){
      var items
        , hash = window.location.hash.match(/\!\/([\w]*)\/?([\w-]*)?/)
        , section = hash && hash[1]
        , item = hash != null ? (hash[2] != null && hash[2]) != "" ? hash[2] : "items" : document.body
      
      if(!hash) window.location.hash = "!/Array"
      Docs.data = Hash(object)
      items = Docs.data.keys()
      Docs.addNav(items)
      
      Docs.templates.list(Docs.data.get(section || items[0]))
      $(item).scrollTo()
      Element.getById("nav").getChildren()[(section && items.indexOf(section)) || 0].toggleItem()
      activateTitles()
      activateDemos()
    }
  }
  
  Object.extend(window, {
    Docs : Docs
  })
  
  Element.create("script", {
    src : "data/data.min.js",
    type : "text/javascript"
  }).appendTo(document.body)
  
})