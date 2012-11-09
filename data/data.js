Docs.parse({
  "Array" : {
    ".convert" : {
      "description" : "Creates an <code>Array</code> from another <code>Array</code>, a <code>NodeList</code>, or <code>Arguments</code>",
      "usage" : "Array.convert(args)", 
      "arguments" : [
        {"args" : "(<code>Iterable</code>) Object to convert to Array"},
        {"output" : "new <code>Array</code>."}
      ],
      "demo" : "(function(){ return Object.typeOf(Array.convert(arguments)) })('foo','bar', 'baz')"
    },
    "#forEach" : {
      "description" : "Iterates over an Array and executes <code>fn</code> for each item. ",
      "usage" : "myArray.forEach(fn, context)", 
      "arguments" : [
        {"fn" : "A function that is executed with <code>item</code>, <code>index</code> & <code>array</code> as arguments."},
        {"context" : "(optional) Context of the function (<code>this</code>)"},
        {"output" : "<code>myArray</code>."}
      ],
      "demo" : "[1,2,3,4].forEach(function(item, index, array){array[index] = item * 2})"
    },
    "#map" : {
      "description" : "Returns a new <code>Array</code> composed by items from the value returned by the function for each iteration over <code>myArray</code>.",
      "usage" : "myArray.map(fn, context)", 
      "arguments" : [
        {"fn" : "A function executed with <code>item</code>, <code>index</code> & <code>array</code> as arguments, returns the value of the new <code>item</code>."},
        {"context" : "(optional) Context of the function (<code>this</code>)"},
        {"output" : "(<code>Array</code>) Mapped array."}
      ],
      "demo" : "[1,2,3,4].map(function(item){return item * item})"
    },
    "#filter" : {
      "description" : "Returns a new <code>Array</code> only composed by the items of <code>myArray</code> for which <code>fn</code> returned true.",
      "usage" : "myArray.filter(fn, context)", 
      "arguments" : [
        {"fn" : "A function executed with <code>item</code>, <code>index</code> & <code>array</code> as arguments, returns a boolean to filter <code>item</code>."},
        {"context" : "(optional) Context of the function (<code>this</code>)"},
        {"output" : "(<code>Array</code>) Filtered array."}
      ],
      "demo" : "[1,2,3,4].filter(function(item){return item % 2 == 0})"
    },
    "#reduce" : {
      "description" : "Iterates over <code>myArray</code> and returns the last value returned by the function. ",
      "usage" : "myArray.reduce(fn, context)", 
      "arguments" : [
        {"fn" : "A function executed with <code>item</code>, <code>nextItem</code>, <code>index</code> & <code>array</code> as arguments"},
        {"output" : "Last result of <code>fn</code>."}
      ],
      "demo" : "[1,2,3,4].reduce(function(item, next){return item + next})"
    },
    "#indexOf" : {
      "description" : "Returns the first position of <code>value</code> in <code>myArray</code>.",
      "usage" : "myArray.indexOf(value, searchFrom)", 
      "arguments" : [
        {"value" : "Element to find in <code>myArray</code>. "},
        {"searchFrom" : "(<code>Number</code>) (optional) Start looking from a given index. "},
        {"output" : "(<code>Number</code>) Index of <code>value</code> in <code>myArray</code> (<code>-1</code> if not found). "}
      ],
      "demo" : "['foo', 'bar', 'baz', 'bar'].indexOf('bar', 2)"
    },
    "#pluck" : {
      "description" : "Returns <code>property</code> of every item in <code>myArray</code>.",
      "usage" : "myArray.pluck(property)", 
      "arguments" : [
        {"property" : "Property to get for each item in <code>myArray</code>. "},
        {"output" : "(<code>Array</code>) Array of <code>item[property]</code>."}
      ],
      "demo" : "['this', 'is', 'random', 'text'].pluck('length')"
    },
    "#isEmpty" : {
      "description" : "Checks if <code>myArray</code> is empty or not.",
      "usage" : "myArray.isEmpty()", 
      "arguments" : [
        {"output" : "(<code>Boolean</code>) <code>true</code> if empty and <code>false</code> if not."}
      ],
      "demo" : "[].isEmpty()"
    },
    "#clone" : {
      "description" : "Returns a clone of <code>myArray</code>.",
      "usage" : "myArray.clone()", 
      "arguments" : [
        {"output" : "(<code>Array</code>) Safe copy of <code>myArray</code>."}
      ],
      "demo" : "(function(a,b){a = [1,2,3]; b = a.clone(); b[2] = 'foo'; return a + ' / ' + b})()"
    },
    "#clean" : {
      "description" : "Returns a new Array removing <code>false</code>, <code>null</code>, <code>undefined</code>, <code>0</code> & <code>[]</code> from <code>myArray</code>.",
      "usage" : "myArray.clean()", 
      "arguments" : [
        {"output" : "(<code>Array</code>) Cleaned Array from <code>myArray</code>."}
      ],
      "demo" : "[false, [], undefined, 1, 2, null, 3, 0].clean()"
    },
    "#group" : {
      "description" : "Groups the arrays in <code>myArray</code> (useful if you want to get only one array of elements).",
      "usage" : "myArray.group()", 
      "arguments" : [
        {"output" : "(<code>Array</code>) Grouped Array from <code>myArray</code>."}
      ],
      "demo" : "[[1,2,3], [4,5,6], [7,8,9]].group()"
    },
    "#intersect" : {
      "description" : "Returns a new Array that returns items that are both present in <code>myArray</code> and in <code>otherArray</code>.",
      "usage" : "myArray.intersect(otherArray)", 
      "arguments" : [
        {"otherArray" : "(<code>Array</code>) Other Array to compare <code>myArray</code> with."},
        {"output" : "(<code>Array</code>) Intersection of <code>myArray</code> and <code>otherArray</code>."}
      ],
      "demo" : "[1,2,3,4,5,6,7,8,9,10].intersect([4,6,'foo',9,1])"
    },
    "#difference" : {
      "description" : "Returns a new Array that returns items that are present in <code>myArray</code> but not in <code>otherArray</code>.",
      "usage" : "myArray.difference(otherArray)", 
      "arguments" : [
        {"otherArray" : "(<code>Array</code>) Other Array to compare <code>myArray</code> with."},
        {"output" : "(<code>Array</code>) Difference of <code>myArray</code> and <code>otherArray</code>."}
      ],
      "demo" : "[1,2,3,4,5,6,7,8,9,10].difference([4,6,'foo',9,1])"
    },
    "#invoke" : {
      "description" : "Invokes <code>fn</code> for each <strong>element</strong> item in <code>myArray</code>.",
      "usage" : "myArray.invoke(fn, fixedArgs …)", 
      "arguments" : [
        {"fn" : "(<code>Function</code> or <code>String</code>) Function or Element method to execute with each <code>item</code> as <code>this</code> and <code>fixedArgs …</code> as first arguments."},
        {"output" : "(<code>Array</code>) <code>myArray</code>."}
      ],
      "demo" : "Element.getByTag('span').invoke('addClass', 'hello').pluck('className')"
    }
  },
  "Hash" : {
    "Hash" : {
      "description" : "A <code>Hash</code> is an <em>Object as associative Array</em>. The <code>Hash</code> function creates a new Hash from a given <code>object</code>. <br><strong>Note :</strong> The <code>new</code> keyword is optional.",
      "usage" : "new Hash(object)",
      "arguments" : [
        {"object" : "(<code>Object</code>) Properties to put in the created <code>Hash</code>"},
        {"output" : "new instanceof <code>Hash</code>"}
      ],
      "demo" : "Hash({foo:'bar', bar:'baz'}).get('foo')"
    },
    "#forEach" : {
      "description" : "Iterates over a Hash and executes <code>fn</code> for each item. ",
      "usage" : "myHash.forEach(fn)", 
      "arguments" : [
        {"fn" : "A function that is executed with <code>item</code>, <code>index</code> & <code>array</code> as arguments."},
        {"output" : "<code>myHash</code>."}
      ],
      "demo" : "Hash({foo:1, bar:2}).forEach(function(item, index, hash){hash.set(index, item * 2)}).get('foo')"
    },
    "#keys" : {
      "description" : "Returns the keys of <code>myHash</code>. ",
      "usage" : "myHash.keys()", 
      "arguments" : [
        {"output" : "(<code>Array</code>) Array of keys."}
      ],
      "demo" : "Hash({foo:1, bar:2, baz:3}).keys()"
    },
    "#values" : {
      "description" : "Returns the values of <code>myHash</code>. ",
      "usage" : "myHash.values()", 
      "arguments" : [
        {"output" : "(<code>Array</code>) Array of values."}
      ],
      "demo" : "Hash({foo:1, bar:2, baz:3}).values()"
    },
    "#get" : {
      "description" : "Gets the <code>prop</code> property of <code>myHash</code>. ",
      "usage" : "myHash.get(prop)", 
      "arguments" : [
        {"prop" : "(<code>String</code>) Property to get."},
        {"output" : "Value of <code>myHash[prop]</code>."}
      ],
      "demo" : "Hash({foo:1, bar:2, baz:3}).get('bar')"
    },
    "#set" : {
      "description" : "Sets the <code>prop</code> property to <code>value</code> of <code>myHash</code>. ",
      "usage" : "myHash.set(prop, vlaue)", 
      "arguments" : [
        {"prop" : "(<code>String</code>) Property to get."},
        {"value" : "Value to set."},
        {"output" : "<code>myHash</code>"}
      ],
      "demo" : "Hash({foo:1, bar:2, baz:3}).set('bar', 4).get('bar')"
    },
    "#toQueryString" : {
      "description" : "Returns a QueryString from <code>myHash</code>. ",
      "usage" : "myHash.toQueryString()", 
      "arguments" : [
        {"output" : "(<code>String</code>) Query string from <code>myHash</code>."},
      ],
      "demo" : "Hash({foo:'one', bar:['two','three','four'], baz:'five'}).toQueryString()"
    },
    "#isEmpty" : {
      "description" : "Checks if <code>myHash</code> is empty or not.",
      "usage" : "myHash.isEmpty()", 
      "arguments" : [
        {"output" : "(<code>Boolean</code>) <code>true</code> if empty and <code>false</code> if not."}
      ],
      "demo" : "Hash().isEmpty()"
    },
    "#clone" : {
      "description" : "Returns a clone of <code>myHash</code>.",
      "usage" : "myHash.clone()", 
      "arguments" : [
        {"output" : "(<code>Hash</code>) Safe copy of <code>myHash</code>."}
      ],
      "demo" : "(function(a,b){a = Hash([1,2,3]); b = a.clone(); b.set('2', 'foo'); return a.get(2) + ' / ' + b.get(2)})()"
    }
  },
  "Function" : {
    "#bind" : {
      "description" : "Returns <code>myFunction</code> with <code>context</code> as <code>this</code> and <code>args …</code> as first arguments. ",
      "usage" : "myFunction.bind(context, args …)",
      "arguments" : [
        {"context" : "(<code>Object</code>) Context where will be executed the returned function. "},
        {"args …" : "(optional) First arguments of the return function will be executed. "},
        {"output" : "(<code>Function</code>) Bound <code>myFunction</code>. "}
      ],
      "demo" : "(function(a, b){return [this.version, a, b]}).bind(Craft,'function')('bound')"
    },
    "#curry" : {
      "description" : "Returns <code>myFunction</code> with <code>args …</code> as first arguments. ",
      "usage" : "myFunction.curry(args …)",
      "arguments" : [
        {"args …" : "First arguments of the return function will be executed. "},
        {"output" : "(<code>Function</code>) Curried <code>myFunction</code>. "}
      ],
      "demo" : "(function(a, b, c){return [a, b, c]}).curry('function', 'is')('curried')"
    },
    "#delay" : {
      "description" : "Executes <code>myFunction</code> after <code>n</code> seconds. ",
      "usage" : "myFunction.delay(n)",
      "arguments" : [
        {"n" : "(<code>Number</code>) Delay in seconds."},
        {"output" : "(<code>Number</code>) <code>setTimeout</code> identifier. "}
      ],
      "demo" : "(function(){ if(console) console.log('delayed!')}).delay(1)"
    }, 
    "#every" : {
      "description" : "Executes <code>myFunction</code> every <code>n</code> seconds. ",
      "usage" : "myFunction.every(n)",
      "arguments" : [
        {"n" : "(<code>Number</code>) Iteration time in seconds."},
        {"output" : "(<code>Number</code>) <code>setInterval</code> identifier. "}
      ],
      "demo" : "(function(){ if(console) console.log('iteration')}).delay(15)"
    }
  }, 
  "String" : {
    "#trim" : {
      "description" : "Removes whitespace at start & end of <code>myString</code>. ",
      "usage" : "myString.trim()",
      "arguments" : [
        {"output" : "(<code>String</code>) Cleaned <code>myString</code>. "}
      ],
      "demo" : "('   foo bar   ').trim()"
    },
    "#parseJSON" : {
      "description" : "Parses a string into an <code>Object</code> or an <code>Array</code>. <br><strong>Note :</strong> <code>String#parseJSON</code> is using <code>new Function</code> if the browser doesn't support <code>JSON.parse</code>",
      "usage" : "myString.parseJSON()",
      "arguments" : [
        {"output" : "(<code>Object</code> or <code>Array</code>) Parsed <code>myString</code>. "}
      ],
      "demo" : "('{\"foo\":\"bar\", \"bar\":\"baz\"}').parseJSON().foo"
    },
    "#camelize" : {
      "description" : "Returns a camel-case string from <code>myString</code>. ",
      "usage" : "myString.camelize()",
      "arguments" : [
        {"output" : "(<code>String</code>) Camelized <code>myString</code>. "}
      ],
      "demo" : "('-webkit-border-radius').camelize()"
    },
    "#capitalize" : {
      "description" : "Returns a capitalized string from <code>myString</code>. ",
      "usage" : "myString.capitalize()",
      "arguments" : [
        {"output" : "(<code>String</code>) Capitalized <code>myString</code>. "}
      ],
      "demo" : "('this should be a title').capitalize()"
    }
  },
  "Ajax" : {
    "Ajax" : {
      "description" : "Creates an AJAX instance. <br><strong>Note :</strong> The <code>new</code> keyword is optional.",
      "usage" : "new Ajax(params)",
      "arguments" : [
        {"params": "(<code>Object</code>) Object containing the following properties. "},
        {"params.url" : "(<code>String</code>) URL to get."},
        {"params.method" : "(<code>String</code>) (optional) Sets the request method to <code>'POST'</code> or <code>'GET'</code> (default is set to <code>'GET'</code>). "},
        {"params.success" : "(<code>Function</code>) (optional) Function to execute once request is loaded. "},
        {"params.error" : "(<code>Function</code>) (optional) Function to execute if request returns an error. "},
        {"params.loading" : "(<code>Function</code>) (optional) Function to execute while request is loading. "},
        {"params.async" : "(<code>Boolean</code>) (optional) Makes the request synchronous  if set to <code>false</code>. (default is <code>true</code>)"},
        {"params.query" : "(<code>String</code>) (optional) Query to send (with <code>'POST'</code> method)"},
        {"params.xml" : "(<code>Boolean</code>) (optional) Activate XML response"},
        {"output" : "(<code>Object</code>) An instance of <code>Request</code> which inherits from <code>Hash</code> methods. "}
      ],
      "demo" : "Ajax({url:'data.js'}).get('url')"
    },
    "#update" : {
      "description" : "Updates the query. ",
      "usage" : "myRequest.update()",
      "arguments" : [
        {"output" : "(<code>String</code> or <code>Undefined</code>) Outputs the response of the request (only if synchronous)"}
      ],
      "demo" : "Ajax({url:'/ajax/index.txt', async: false}).update()"
    }, 
    "#periodicalUpdate" : {
      "description" : "Updates the query evert `n` seconds. ",
      "usage" : "myRequest.periodicalUpdate(n)",
      "arguments" : [
        {"n" : "(<code>Number</code>) Iteration time in seconds. "},
        {"output" : "(<code>Number</code>) Interval identifier. "}
      ],
      "demo" : "Ajax({url:'/ajax/index.txt', async: false}).periodicalUpdate(10)"
    }
  }, 
  "Misc" : {
    "Object.typeOf" : {
      "description" : "Returns the type of a given argument (enhances native <code>typeof</code>). ",
      "usage" : "Object.typeOf(object)",
      "arguments" : [
        {"object" : "Object to get type analyzed. "},
        {"output" : "(<code>String</code>) A result from the following strings : " + 
        "<ul><li><code>'number'</code></li><li><code>'object'</code></li><li><code>'array'</code></li><li><code>'string'</code></li><li><code>'null'</code></li><li><code>'undefined'</code></li><li><code>'function'</code></li><li><code>'boolean'</code></li></ul>"}
      ],
      "demo" : "Object.typeOf([])"
    },
    "Object.extend" : {
      "description" : "Appends a <code>source</code> to an <code>object</code>. ",
      "usage" : "Object.extend(object, source)",
      "arguments" : [
        {"object" : "(<code>Object</code>) Object that receives the properties of <code>source</code>"},
        {"source" : "(<code>Object</code>) Object that gives its properties to <code>object</code>"},
        {"output" : "<code>object</code>"}
      ],
      "demo" : "Object.extend(new Hash, {foo : 'bar', bar : 'baz'}).get('bar')"
    },
    "Craft.version" : {
      "description" : "A String that returns the present Craft.js version. ",
      "usage" : "Craft.version", 
      "arguments" : [
        {"output" : "<code>String</code> Craft version"}
      ],
      "demo" : "Craft.version"
    }
  },
  "Element" : {
    "Introduction" : "Craft extends the native <code>Element.prototype</code> but doesn't conflict with any existing property. ",
    "$" : {
      "description" : "A <code>$</code> instance is an extended Element(s). The <code>$</code> function creates adds the DOM methods to the element (required on IE, optional on current browsers).",
      "usage" : "$(elements)",
      "arguments" : [
        {"elements" : "(<code>Element</code> or <code>String</code>) Element to extend (if string, gets the elements with this id)."},
        {"output" : "<code>Element</code>"}
      ],
      "demo" : "$(document.body).get('nodeName')"
    },
    ".create" : {
      "description" : "Creates and wraps a new <code>tag</code> element, with the properties of <code>props</code>. ",
      "usage" : "Element.create(tag, props)", 
      "arguments" : [
        {"tag" : "(<code>String</code>) Element's tag. "},
        {"props" : "(optional) Properties to set. "},
        {"output" : "(<code>Element</code>) new Element."}
      ],
      "demo" : "Element.create('p', { id : 'foo' }).getAttribute('id')"
    },
    ".from" : {
      "description" : "Returns an <code>Element</code> or a <code>DocumentFragment</code> (if more than one Element or TextNode) containing <code>Elements</code> & <code>TextNodes</code> from <code>myString</code>. ",
      "usage" : "Element.from(string)",
      "arguments" : [
        {"string" : "(<code>String</code>) String to convert to nodes. "},
        {"output" : "(<code>Nodes</code>) Nodes extracted from <code>myString</code>. "}
      ],
      "demo" : "Element.from('&lt;p class=\"foo\"&gt;&lt;/p&gt;').nodeName"
    },
    ".createFragment" : {
      "description" : "Creates and wraps a new <code>DocumentFragment</code>. <br><br> A <code>DocumentFragment</code> is really useful if you need to treat a lot of elements before inserting them in the DOM. ",
      "usage" : "Element.createFragment()", 
      "arguments" : [
        {"output" : "(<code>Fragment</code>) new DocumentFragment."}
      ],
      "demo" : "Element.createFragment().get('nodeType')"
    },
    ".ready" : {
      "description" : "Executes <code>fn</code> when the Elements are ready to be manipulated. ",
      "usage" : "Element.ready(fn)", 
      "arguments" : [
        {"fn" : "(<code>Function</code>) Function called on DOMloaded. "}
      ],
      "demo" : "Element.ready(function(){if(console) console.log('loaded')})"
    },
    "#get" : {
      "description" : "Gets the <code>property</code> value. ",
      "usage" : "myElement.get(property)",
      "arguments" : [
        {"property" : "(<code>String</code>) Property to read. "},
        {"output" : "Value of <code>property</code>. "}
      ],
      "demo" : "$('test').get('nodeType')"
    },
    "#set" : {
      "description" : "Sets the <code>property</code> to <code>value</code>. ",
      "usage" : "myElement.set(property, value)",
      "arguments" : [
        {"property" : "(<code>String</code>) Property to write. "},
        {"value" : "Value to give to <code>property</code>. "},
        {"output" : "<code>myElement</code>."}
      ],
      "demo" : "$('test').set('name', 'foo').get('name')"
    }, 
    "#insert" : {
      "description" : "Inserts <code>object</code> to <code>myElement</code>. ",
      "usage" : "myElement.insert(object)",
      "arguments" : [
        {"object" : "(<code>String</code>, <code>Element</code>, <code>Fragment</code> or <code>Object</code>) Content to insert. " +
                  "<br>If <code>Object</code> : <ul>" +
                  "<li><code>object.top</code> : to prepend to <code>myElement</code></li>" + 
                  "<li><code>object.bottom</code> : to append to <code>myElement</code></li>" +
                  "<li><code>object.before</code> : to insert before <code>myElement</code></li>" + 
                  "<li><code>object.after</code> : to insert after <code>myElement</code></li>"
        },
        {"output" : "<code>myElement</code>."}
      ],
      "demo" : "$('test').insert({ top : Element.create('p') }).getChildren()[0].get('nodeName')"
    },
    "#appendTo" : {
      "description" : "Appends <code>myElement</code> to <code>container</code>. ",
      "usage" : "myElement.appendTo(container)",
      "arguments" : [
        {"container" : "(<code>Element</code> or <code>Fragment</code>) Where to insert myElement. "},
        {"output" : "<code>myElement</code>."}
      ],
      "demo" : "Element.create('i').appendTo($('test')).getParent().get('id')"
    },
    "#prependTo" : {
      "description" : "Prepends <code>myElement</code> to <code>container</code>. ",
      "usage" : "myElement.prependTo(container)",
      "arguments" : [
        {"container" : "(<code>Element</code> or <code>Fragment</code>) Where to insert myElement. "},
        {"output" : "<code>myElement</code>."}
      ],
      "demo" : "Element.create('i').prependTo($('test')).getParent().get('id')"
    },
    "#empty" : {
      "description" : "Empties <code>myElement</code>. <br><br> <strong>Note : </strong> adds an empty TextNode inside to let <code>insertBefore</code> work. ",
      "usage" : "myElement.empty()",
      "arguments" : [
        {"output" : "<code>myElement</code>."}
      ],
      "demo" : "Element.from('&lt;p&gt;foo bar&lt;i&gt;&lt;/i&gt;&lt;/p&gt;').empty().insert('bar').get('innerHTML')"
    },
    "#remove" : {
      "description" : "Removes <code>myElement</code> from its parent. ",
      "usage" : "myElement.remove(container)",
      "arguments" : [
        {"output" : "<code>myElement</code>."}
      ],
      "demo" : "Element.from('<em></em>').appendTo($('test')).remove().prependTo($('test')).getParent().getChildren()[0].get('nodeName')"
    },
    "#css" : {
      "description" : "Adds the <code>object</code> to <code>myElement</code>'s style. Returns <code>CSSText</code> if called without arguments. ",
      "usage" : "myElement.css(object)",
      "arguments" : [
        {"object" : "(<code>Object</code> or <code>Function</code>) Object (or Function returning an Object) with css properties (css properties i.e. <code>'border-color'</code>). <br>Appends <code>px</code> if the value is a Number other than <code>0</code>"},
        {"output" : "<code>myElement</code> or <code>CSSText</code>."}
      ],
      "demo" : "Element.create('i').css({'height':300}).css()"
    },
    "#classNames" : {
      "description" : "Returns an array of the <code>className</code> properties of <code>myElement</code>. ",
      "usage" : "myElement.classNames()",
      "arguments" : [
        {"output" : "<code>Array</code> classNames."}
      ],
      "demo" : "Element.from('&lt;i class=\"foo bar baz\"&gt;&lt;/i&gt;').classNames()"
    },
    "#hasClass" : {
      "description" : "Returns a boolean checking the presence of <code>klass</code> in <code>myElement</code>. ",
      "usage" : "myElement.hasClass(klass)",
      "arguments" : [
        {"klass" : "<code>String</code> className to check."},
        {"output" : "<code>Array</code> classNames."}
      ],
      "demo" : "Element.from('&lt;i class=\"foo bar baz\"&gt;&lt;/i&gt;').hasClass('foo')"
    },
    "#addClass" : {
      "description" : "Adds <code>klass</code> as className(s) of <code>myElement</code>. ",
      "usage" : "myElement.addClass(klass)",
      "arguments" : [
        {"klass" : "<code>String</code> classNames separated by a space."},
        {"output" : "<code>myElement</code>."}
      ],
      "demo" : "Element.from('&lt;i class=\"foo bar baz\"&gt;&lt;/i&gt;').addClass('three new classes').classNames()"
    },
    "#removeClass" : {
      "description" : "Removes <code>klass</code> className(s) of <code>myElement</code>. ",
      "usage" : "myElement.removeClass(klass)",
      "arguments" : [
        {"klass" : "<code>String</code> classNames separated by a space."},
        {"output" : "<code>myElement</code>."}
      ],
      "demo" : "Element.from('&lt;i class=\"foo bar baz\"&gt;&lt;/i&gt;').removeClass('foo bar').classNames()"
    },
    "#toggleClass" : {
      "description" : "Toggles <code>klass</code> className(s) of <code>myElement</code>. ",
      "usage" : "myElement.toggleClass(klass)",
      "arguments" : [
        {"klass" : "<code>String</code> classNames separated by a space."},
        {"output" : "<code>myElement</code>."}
      ],
      "demo" : "Element.from('&lt;i class=\"foo bar baz\"&gt;&lt;/i&gt;').toggleClass('foo bar new classes').classNames()"
    },
    "#getValue" : {
      "description" : "Returns the value of <code>myElement</code> (<code>SELECT || INPUT || BUTTON || TEXTAREA</code>). ",
      "usage" : "myElement.getValue()",
      "arguments" : [
        {"output" : "<code>myElement</code> value."}
      ],
      "demo" : "Element.getById('select-multiple').getValue()"
    },
    "#setValue" : {
      "description" : "Sets the value of <code>myElement</code> as <code>value</code> (<code>SELECT || INPUT || BUTTON || TEXTAREA</code>). ",
      "usage" : "myElement.setValue(value)",
      "arguments" : [
        {"value" : "(<code>String</code> or <code>Array</code>) Value(s) or Index(es) to set."},
        {"output" : "<code>myElement</code> value."}
      ],
      "demo" : "Element.getById('select-multiple').setValue([0, 'baz-m']).getValue()"
    },
    "#serialize" : {
      "description" : "Serializes the <code>myElement</code> form into a <code>Hash</code>. ",
      "usage" : "myElement.serialize()",
      "arguments" : [
        {"output" : "<code>Hash</code> Serialized <code>myElement</code>."}
      ],
      "demo" : "Element.getById('hidden-form').serialize().get('text')"
    },
    "Extend Element" : {
      "description" : "You may want to add your own methods to <code>Element</code>. Be careful to do it at the top of your first script following Craft. ",
      "usage" : "Element.extend(myMethods)",
      "arguments" : [
        {"myMethods" : "(<code>Object</code> or <code>Function</code> returning an object) Methods to add."}
      ],
      "demo" : "Element.extend({ alertContent: function(){ var self = this; alert(self.innerHTML); return self} })"
    }
  },
  "Event" : {
    "Introduction" : "It is recommanded to read <a href='docs.htm#!/Element'> the Element section</a> before reading this.",
    "Element#listen" : {
      "description" : "Listen a given <code>event</code> and executes a <code>handler</code> when the event is fired. ",
      "usage" : "myElement.listen(event, handler)", 
      "arguments" : [
        {"event" : "(<code>String</code>) Event to listen. "},
        {"handler" : "(<code>Function</code>) Function to execute when the event is fired. "},
        {"output" : "(<code>Element</code>) <code>myElement</code>."}
      ],
      "demo" : "(function(){var body = $(document.body), handler = function(){ alert('event fired!'); body.stopListening('click',handler) }; body.listen('click', handler)})()"
    },
    "Element#stopListening" : {
      "description" : "Stops listening a given <code>event</code>. ",
      "usage" : "myElement.stopListening(event, handler)", 
      "arguments" : [
        {"event" : "(<code>String</code>) Event to listen. "},
        {"handler" : "(<code>Function</code>) Reference to the handler you stop to listen. "},
        {"output" : "(<code>Element</code>) <code>myElement</code>."}
      ],
      "demo" : "(function(){var body = $(document.body), handler = function(){ alert('event fired!'); body.stopListening('click',handler) }; body.listen('click', handler)})()"
    },
    "Event.stop" : {
      "description" : "Stops default behavior and bubbling for a given <code>event</code> inside a handler. ",
      "usage" : "Event.stop(event)", 
      "arguments" : [
        {"event" : "(<code>EventObject</code>) Event Object. "}
      ],
      "demo" : "/* Used on the `Run it` buttons to prevent window from scrolling to 0,0. */"
    }
  },
  "Selectors" : {
    "Introduction" : "It is recommanded to read <a href='docs.htm#!/Element'> the Element section</a> before reading this.",
    "Element.getById" : {
      "description" : "<strong>Alias of</strong> <code>$</code><br><br>Get an element by its <code>id</code>. <br> <strong>Note : </strong>If no element is found, to prevent exceptions, a <code>Element.create('div')</code> is returned. ",
      "usage" : "Element.getById(id) \nmyElement.getById(id)", 
      "arguments" : [
        {"id" : "(<code>String</code>) Element's id. "},
        {"output" : "(<code>Element</code>) Element."}
      ],
      "demo" : "$('test').get('children').length"
    },
    "Element.getByTag" : {
      "description" : "Get elements by their <code>tagName</code>. <br> <strong>Note : </strong>If no element is found, an empty Array is returned. ",
      "usage" : "Element.getByTag(tagName) \nmyElement.getByTag(tagName) \nmyElements.invoke('getByTag', tagName)", 
      "arguments" : [
        {"tagName" : "(<code>String</code>) Elements tagName. "},
        {"output" : "(<code>Array</code>) Array of Elements."}
      ],
      "demo" : "$('test').getByTag('span').length"
    },
    "Element.getByClass" : {
      "description" : "Get elements by their <code>className</code>. <br> <strong>Note : </strong>If no element is found, an empty Array is returned. ",
      "usage" : "Element.getByClass(className) \nmyElement.getByClass(className) \nmyElements.invoke('getByClass', className)", 
      "arguments" : [
        {"tagName" : "(<code>String</code>) Elements className. "},
        {"output" : "(<code>Array</code>) Array of Elements."}
      ],
      "demo" : "$('test').getByClass('foo').length"
    },
    "#getParent" : {
      "description" : "Get <code>myElement</code>'s parent. ",
      "usage" : "myElement.getParent()\nmyElements.invoke('getParent')", 
      "arguments" : [
        {"output" : "(<code>Element</code>) Parent Element."}
      ],
      "demo" : "$('test').getParent().nodeName"
    },
    "#getChildren" : {
      "description" : "Get <code>myElement</code>'s children. ",
      "usage" : "myElement.getChildren()\nmyElements.invoke('getChildren')", 
      "arguments" : [
        {"output" : "(<code>Array</code>) Children Elements."}
      ],
      "demo" : "$('test').getChildren().pluck('nodeName')"
    }
  },
  "Browser" : {
    "Craft.Browser" : {
      "description" : "An object that collects informations on the browser. ",
      "usage" : "Craft.Browser.isIE",
      "arguments" : [
        {"properties" : "(<code>Booleans</code>, <code>String</code> & <code>Function</code>)"
          + "<ul><li><code>.UA</code> Lowercase User Agent</li><li><code>.isAndroid</code></li><li><code>.isFirefox</code></li><li><code>.isIE</code></li><li><code>.isIE6</code></li><li><code>.isIE7</code></li><li><code>.isIE8</code></li><li><code>.isKonqueror</code></li><li><code>.isOpera</code></li><li><code>.isWebkit</code></li><li><code>.isiPad</code></li><li><code>.isiPhone</code></li><li><code>.isiPod</code></li><li><code>.toClassName()</code> Returns current browser properties joined with a space. </li></ul>"},
        {"output" : "<code>Object</code> Browser Object"}
      ],
      "demo" : "Craft.Browser.toClassName()"
    }
  }
})