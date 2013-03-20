# Selector

Selectors are used in `$` (or its alias, `Craft`), in `Elements.matches`, and in event delegation. 

## Selectors 

```css
/* direct queries */
#foo
.bar
div
[name="foo"]

/* multiple arguments (all combinations are possible) */
div[attr="foo"]
.bar.baz[attr="foo"]
#foo[attr="foo"]
#foo.bar[attr="foo"]

/* inheritance */
#foo .bar.baz div[attr="bar"]

/* direct filiation */
#foo > .bar.baz

/* adjacency */
#foo > .bar.baz + div
#foo > .bar.baz - div /* non css-like, but working as "preceding element" */
```

## Query the DOM 

```javascript
$("#foo .bar") 
$(".bar", "#foo") // optional context argument
$("#foo").getElements(".bar")
$$(".foo") // first match only
```

**NOTE** : You should cache the queries you use more than once.  

## Match a selector

```javascript
Elements.matches(myElement, "#foo .bar.baz") // boolean
```

## Delegate an event

```javascript
myElement.listen("mouseenter", "#foo .bar.baz", function(e){
  // something
})
```