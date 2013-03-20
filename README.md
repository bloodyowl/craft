![Craft](http://f.cl.ly/items/3z2l3I3G1N1V370W1913/craft-2.png)

**NOTE** : Craft 2 is still alpha. 

## Introduction 

Craft is a lightweight, nevertheless powerful JavaScript toolbelt. 

## Documentation 

Comming soon. 

## Build

Just open your terminal and go for :

```
$ cd path/to/craft
$ grunt
```

Your build is waiting for you in `./dist/`

## Test it in a specific browser

```
$ cd path/to/craft
$ node test/server/launch.js
```

and go to `http://localhost:8080`

## Browser compatibility

Craft has been fully-tested in : 

* Opera 9.6+
* Firefox 3.6+
* IE7+
* Safari 4+
* Chrome 7+

## RequireJS support

```javascript
require.config({
    // ***
  , paths: {
        "craft": "craft"
    }
    // ***
})

require(["craft"]
, function(Craft){
  /* 
    Craft object contains the properties 
    that are otherwise placed in the global object.
  */
})
```

## Contribute 

To contribute, please follow the [coding style guidelines](https://github.com/mlbli/guidelines#javascript), update the unit-tests and the docs if your pull-request has an impact on it. 
