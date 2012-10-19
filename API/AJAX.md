# AJAX 


## Craft.AJAX

```js
var myRequest = new Craft.AJAX({
  url : "path/to/request",
  method : "POST" // or "GET" (default : "GET"),
  success : function(res){},
  loading : function(){},
  async : true // or false (default : true),
  query : "foo=bar&bar=baz" // if method is "POST"
}) 
// -> AJAX instance
```

**NOTE** : The AJAX Object owns the `Hash.prototype`. 

## Craft.AJAX#update

```js
myRequest.update() // -> responseText if async is set to false
```

Sends the request and executes the callback. If the request is synchronous, the responseText is returned. 

## Update periodically

Simply use : 

```js 
myRequest.update.every(15)
```