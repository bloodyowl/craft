# Request

## Requests Classes

Craft has four different kinds of Requests : `Request.get`, `Request.post`, `Request.script`, `Request.jsonp`. 

### Initialization 

```javascript
Request.get(url) // request object
Request.post(url) // request object
Request.script(url) // request object
Request.jsonp(url) // request object
```

### .update (`get`, `post`, `script`, `jsonp`)

`request#update` launches the request. 

If the request is a `post` one, the function can take a first argument 

```javascript
myRequest
  .then(function(response){

  })
```

### .then (`get`, `post`, `script`, `jsonp`)

`request#then` executes a callback when the request is done with loading. You can set as many `then` callbacks as you want, and they will be executed in the order you've set them. 

If the request is an XHR (get or post), callback's `this` is the `XHR`. 

```javascript
myRequest
  .then(function(response){

  })
```

### .fail (`get`, `post`, `script`, `jsonp`)

`request#fail` executes a callback when the request failed. You can set as many `fail` callbacks as you want, and they will be executed in the order you've set them. 

If the request is an XHR (get or post), callback's `this` is the `XHR`. 

```javascript
myRequest
  .fail(function(){

  })
```

### .always (`get`, `post`, `script`, `jsonp`)

`request#always` executes a callback when the request is initialized. You can set as many `always` callbacks as you want, and they will be executed in the order you've set them. 

```javascript
myRequest
  .always(function(){

  })
```

### .async (`get`, `post`)

`request#async` lets you set whether or not you want the request to be asynchronous (default is `true`). 

```javascript
myRequest
  .async(false)
```

### .withCredentials (`get`, `post`)

`request#withCredentials` lets you set whether or not you want the `XHR.withCredentials` to be true. 

```javascript
myRequest
  .withCredentials(true)
```

### .setHeader (`get`, `post`)

`request#setHeader` lets you set a request header.  

```javascript
myRequest
  .setHeader(name, value)
```

### .setHeaders (`get`, `post`)

`request#setHeaders` lets you set several request headers (key = name, value = value).  

```javascript
myRequest
  .setHeaders(object)
```

## Request method

The `Request` method is a dead-simple way to perform requests (you don't even need an `.update`) : 

```javascript
Request(["post(queryString):foo", "jsonp:bar", myRequest])
  .then(function(postRes, jsonpRes, otherRequest){
    console.log("went right : ", arguments)
  })
  .fail(function(){})
  .always(function(){})
  .then(function(){})
```

The string patterns are : 

Type | Pattern
--- | ---
`"GET"` | `"#{url}"`
`"POST"` | `"post(#{queryString}):#{url}"`
`"Script"` | `"script:#{url}"`
`"JSONP"` | `"jsonp:#{url}"`

but you can as well pass Request objects in the array of requests. 