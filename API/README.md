# Introduction

Craft is a lightweight but powerful JavaScript framework that helps you to build web applications. 

## Concept

Craft is a tiny framework (only 3.69KB gzipped), that makes it really fast to load and to initialize. Nevertheless, it is still powerful and helps you to build web apps with only what you need. 

The main part of Craft is about extending native JavaScript objects : `Array`, `Function` & `String`. Because of the problems raised by the extension of `Element` & `Object`, two new contructors have been deployed : `Hash` (dedicated to Objects as associative arrays) and `DOM`, to manipulate the DOM easily without breaking it or be forced to simulate `Element` on Internet Explorer. 

Also, a global `Craft` object has been created to contain an improved `typeOf` function, a `Browser` object, an `AJAX` constructor, and a `toArray` function. 

**Craft.js** has been rewritten in **CoffeeScript** to make custom builds easier, and to improve the readability of the source. 


## Get Craft

```
git clone -b alpha https://github.com/mlbli/Craft.git
```

## Build your version
```
cd path/to/craft/src

coffee -j ../craft.js -c core array hash function string dom browser
```