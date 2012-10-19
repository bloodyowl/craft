# Craft

## Definition

Craft is a function that executes the first argument with `Craft, window, document` as own arguments.  

## Methods

### Craft.typeOf 

```js
Craft.typeOf(object) // -> object's type
```

Returns the object's type. Acts like native `typeof` but adds `"array"` and `"null"` to the detected types. 

### Craft.extend

```js
Craft.extend(object, [function || object]) // -> object
```
Adds to the object the properties of the second arguments (which can be an object or a function returnong an object).


## Properties

### Craft.version

```js
Craft.version // -> string
```
### Craft.Browser

```js
Craft.Browser // -> hash
```

Contains the following properties : 

```
UA // lowerCase userAgent
isChrome // boolean
isSafari // boolean
isFirefox // boolean
isIE // boolean
isIE6 // boolean
isIE7 // boolean
isIE8 // boolean
isOpera // boolean
isKonqueror // boolean
isiPhone // boolean
isiPad // boolean
isiPod // boolean
isAndroid // boolean
toClassName // active browser joined with spaces in a string
```
