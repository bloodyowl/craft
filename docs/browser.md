# Browser 

The `Browser` object contains the results of a UA sniffing. 

It contains the following properties (as booleans) : 

* `IE`
* `IE7`
* `IE8`
* `IE9`
* `Gecko`
* `WebKit`
* `Opera`

Also, a `toString` method returns a string representing the matched browser. (i.e. `"ie ie7"` or `"webkit"`) that can easily be used to generate a `className` to give to `document.documentElement`. 