# Craft


## Get it 

```
git clone -b alpha https://github.com/mlbli/Craft.git
```


## Build
If you don't have CoffeeScript, install it through the npm command line

```
[sudo] npm install -g coffee-script
```
and then 

```
cd src

coffee -j ../craft.js -c core array hash function string dom browser
```

I recommand the use of **UglifyJS** to minify the scripts. Install it: 

```
[sudo] npm install -g uglify-js
```
and then

```
uglifyjs -o craft-min.js craft.js
```

## Tests

To run the unit tests, run a local server on the cloned repository and reach `/tests/unit/index.html` (required for `Craft.AJAX`). 

## API

**Browse the** API/ folder. 

## Changelog

**18/10/2012** : 

* Removed `Function#toHandler` and created `Event.stop(eventObject)` instead. 
* Fixed `Craft.AJAX` issues. 
* `Craft.AJAX#send` has been rename to `Craft.AJAX#update`.
* API created

**17/10/2012** : Initial commit. 