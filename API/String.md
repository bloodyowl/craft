# String

## String#parseJSON

```js
myString.parseJSON() // -> evaluated string
```

Returns a JavaScript object from JSON. 

## String#trim

```js
myString.trim() // -> cleaned string
```

Returns a string cleaned from the whitespace before and after the content.  


## String#camelize

```js
myString.camelize() // -> new String
```

Return a camelCase version of the given string. 

**for instance** : `"border-radius".camelize() // -> "borderRadius"`

## String#toElement

```js
myString.toElement() // -> DOM nodes
```

Returns DOM nodes (Elements and TextNodes) from a given String, wrapped inside a DocumentFragment. 