# Craft

Craft.js is a lightweight & extensible JavaScript framework that handles much of the boilerplate you want to get rid of. Craft makes JavaScript development much quicker and lets you keep your code clean and performant.

## Compatibility

Craft is compatible with all of the major browsers. (IE : 6+, Firefox : 3.6+, Safari : 4+, Chrome, Opera : 8+)

## API
Available on [craftjs.org](http://craftjs.org).

## Tests
Available on [craftjs.org/test](http://craftjs.org/test).

## Get it

```
git clone https://github.com/mlbli/Craft.git
```


## Build

```
grunt concat
```

## Minify

```
grunt min
```


## MIT License
Copyright (c) 2012, Matthias Le Brun

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Acknowledgement

**Prototype.js** for its inspiring API (you can see Craft.js as a *Prototype-lite* even if it doesn't target the same usages).

## Changelog

**25/12/2012** : 
  `Defer`, `JSONP` & Event delegation. 

**16/11/2012** :
  Renamed `Element.create` -> `Element.make`. The previous one causes a bug on some versions of IE8.

**15/11/2012** :
  Added `Event.listen` & `Event.stopListening` to let `window` be listened.

**14/11/2012** :

* `Function.prototype` is not overwritten anymore :
	* `(function(){}).bind` -> `(function(){}).attach`

* For a better understanding :
	* `(function(){}).curry` ->  `(function(){}).partial`

* Unit tests added.

**13/11/2012** :

* `Array.prototype` is not overwritten anymore :

	* `[].forEach` -> `[].each`
	* `[].map` -> `[].collect`
	* `[].filter` -> `[].select`
	* `[].indexOf` -> `[].find`
	* `[].reduce` -> `[].fold`

* `[].fold` now accepts `undefined` as initial value.
* `Craft.noConflict` added to stock `$` in `Craft.$` and in any variable if needed.

**12/11/2012** : Element ready now acts like an event callback (errors thrown inside don't stop the others callbacks).

**09/11/2012** : New Element API (check the [docs](http://craftjs.org/docs))

**03/11/2012** : Fixed IE issue when using `Hash#get` and `DOM#get` with DOM elements in IE.

**02/11/2012** :

* Added nesting support for `DOM#get` and `Hash#get` (such as `myEl.get("foo.bar")`)
* Made DOM, AJAX, and Hash constructor invokable without `new` keyword.

**01/11/2012** : Changed `Craft.Browser.isChrome` and `Craft.Browser.isSafari` to `Craft.Browser.isWebkit`

**31/10/2012** : Added possibility to pass a DOM object as first argument of `DOM#insert`

**31/10/2012** : Made `Array.prototype` polyfills compatible with ES5

**29/10/2012** : Added `DOM#getElement`  method

**26/10/2012** : Fixed IE issues

**24/10/2012** : Fixed `DOM#serialize` issue

**18/10/2012** :

* Removed `Function#toHandler` and created `Event.stop(eventObject)` instead.
* Fixed `Craft.AJAX` issues.
* `Craft.AJAX#send` has been rename to `Craft.AJAX#update`.
* API created

**17/10/2012** : Initial commit.
