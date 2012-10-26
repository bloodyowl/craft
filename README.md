# Craft


## Get it 

```
git clone https://github.com/mlbli/Craft.git
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

**26/10/2012** : Fixed IE issues

**24/10/2012** : Fixed DOM#serialize issue

**18/10/2012** : 

* Removed `Function#toHandler` and created `Event.stop(eventObject)` instead. 
* Fixed `Craft.AJAX` issues. 
* `Craft.AJAX#send` has been rename to `Craft.AJAX#update`.
* API created

**17/10/2012** : Initial commit. 


## MIT License
Copyright (c) 2012, Matthias Le Brun

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.