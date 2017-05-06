/*--------------------------------------------*/
/*--->               module               <---*/
/*--------------------------------------------*/

/* basic module pattern concept */
/* YDKJS - Scope & closure */

function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log(something);
	}

	function doAnother() {
		console.log(another.join(" ! "));
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3



/* module pattern with singleton */
/* YDKJS - Scope & closure */

var foo = (function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log(something);
	}

	function doAnother() {
		console.log(another.join( " ! " ));
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
})();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3



/* parameterized module pattern */
/* YDKJS - Scope & closure */

function CoolModule(id) {
	function identify() {
		console.log(id);
	}

	return {
		identify: identify
	};
}

var foo1 = CoolModule("foo 1");
var foo2 = CoolModule("foo 2");

foo1.identify(); // "foo 1"
foo2.identify(); // "foo 2"



/* parameterized module pattern with singleton */
/* YDKJS - Scope & closure */

var foo = (function CoolModule(id) {
	function change() {
		// modifying the public API
		publicAPI.identify = identify2;
	}

	function identify1() {
		console.log(id);
	}

	function identify2() {
		console.log(id.toUpperCase());
	}

	var publicAPI = {
		change: change,
		identify: identify1
	};

	return publicAPI;
})("foo module");

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE



/* module dependency loaders/managers */
/* YDKJS - Scope & closure */

var MyModules = (function Manager() {
	var modules = {};

	function define(name, deps, impl) {
		for (var i=0; i<deps.length; i++) {
			deps[i] = modules[deps[i]];
		}
		modules[name] = impl.apply(impl, deps);
	}

	function get(name) {
		return modules[name];
	}

	return {
		define: define,
		get: get
	};
})();

MyModules.define("bar", [], function(){
	function hello(who) {
		return "Let me introduce: " + who;
	}

	return {
		hello: hello
	};
} );

MyModules.define("foo", ["bar"], function(bar){
	var hungry = "hippo";

	function awesome() {
		console.log(bar.hello(hungry).toUpperCase());
	}

	return {
		awesome: awesome
	};
} );

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

console.log(
	bar.hello("hippo")
); // Let me introduce: hippo

foo.awesome(); // LET ME INTRODUCE: HIPPO








/*--------------------------------------------*/
/*--->       constructor & inheritanc     <---*/
/*--------------------------------------------*/



function A(x) {  
  this.x = x || 100;  
}  
   
A.prototype = (function () {  
   
  // initializing context,  
  // use additional object  
   
  var _someSharedVar = 500;  
   
  function _someHelper() {  
    console.log('internal helper: ' + _someSharedVar);  
  }  
   
  function method1() {  
    console.log('method1: ' + this.x);  
  }  
   
  function method2() {  
    console.log('method2: ' + this.x);  
    _someHelper();  
  }  
   
  // the prototype itself  
  return {  
    constructor: A,  
    method1: method1,  
    method2: method2  
  };  
   
})();  
   
var a = new A(10);  
var b = new A(20);  
   
a.method1(); // method1: 10  
a.method2(); // method2: 10, internal helper: 500  
   
b.method1(); // method1: 20  
b.method2(); // method2: 20, internal helper: 500  
   
// both objects are use  
// the same methods from  
// the same prototype  
console.log(a.method1 === b.method1); // true  
console.log(a.method2 === b.method2); // true 



/* basic usage of inheritance */
/* DS - Chapter 7.2. OOP: ECMAScript implementation */

function A(param) {  
  if (!param) {  
    throw 'Param required';  
  }  
  this.x = param;  
}  
A.prototype.y = 20;  

var a = new A(100);  
console.log([a.x, a.y]);

function B() {  
  B.superproto.constructor.apply(this, arguments);  
}  

var F = function () {};  
F.prototype = A.prototype;   
B.prototype = new F();  
B.superproto = A.prototype;   

B.prototype.constructor = B;  

var b = new B(10);  
console.log([b.x, b.y]);  





/*--------------------------------------------*/
/*--->             this binding           <---*/
/*--------------------------------------------*/

/* basic hard-binding for 'this' */
/* YDKJS - this & Object prototype */

function foo() {
    console.log(this.a);
}

var obj = {
    a: 2
};

var bar = function() {
    foo.call(obj);
};

bar(); // 2
setTimeout(bar, 100); // 2
// hard-bound 'bar' can no longer have its 'this' overridden
bar.call(window); // 2



/* parameterized hard-binding for 'this' */
/* YDKJS - this & Object prototype */

function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = function() {
    return foo.apply(obj, arguments);
};

var b = bar(3); // 2 3
console.log(b); // 5



/* portable solution hard-binding for 'this' */
/* YDKJS - this & Object prototype */

function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}

// simple 'bind' helper
function bind(fn, obj) {
    return function() {
        return fn.apply(obj, arguments);
    };
}

var obj = {
    a: 2
};

var bar = bind(foo, obj);
var b = bar(3); // 2 3
console.log(b); // 5



/* hard-binding for 'this' in ES5 */
/* YDKJS - this & Object prototype */

function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = foo.bind(obj);
var b = bar(3); // 2 3
console.log(b); // 5



/*--------------------------------------------*/
/*--->       functional programming       <---*/
/*--------------------------------------------*/

/* basic usage of high-order function */
/* Effective JS - Item 19 */

function buildString(n, callback) {  
  var result = "";  
  for (var i = 0; i < n; i++) {  
    result += callback(i);  
  }  
  return result;  
}  

var alphabet = buildString(26, function (i) {  
  return String.fromCharCode(aIndex + i);  
});  
alphabet; // "abcdefghijklmnopqrstuvwxyz"  

var digits = buildString(10, function (i) {  
  return i;  
});  
digits; // "0123456789"  

var random = buildString(8, function () {  
  return String.fromCharCode(Math.floor(Math.random() * 26) + aIndex);  
});  
random; // "ltvisfjr" (different result each time)  



/* customize receiver with Function.prototype.call() */
/* Effective JS - Item 20 */

var table1 = {  
  entries: [],  
  addEntry: function (key, value) {  
    this.entries.push({  
      key: key,  
      value: value  
    });  
  },  
  forEach: function (f, thisArg) {  
    var entries = this.entries;  
    for (var i = 0, n = entries.length; i < n; i++) {  
      var entry = entries[i];  
      f.call(thisArg, entry.key, entry.value, i);  
    }  
  }  
}; 

table1.addEntry('CN', 'Chinese');
table1.addEntry('EN', 'English');

var table2 = {  
  entries: [],  
  addEntry: function (key, value) {  
    this.entries.push({  
      key: key,  
      value: value  
    });  
  },  
  forEach: function (f, thisArg) {  
    var entries = this.entries;  
    for (var i = 0, n = entries.length; i < n; i++) {  
      var entry = entries[i];  
      f.call(thisArg, entry.key, entry.value, i);  
    }  
  }  
};

table2.addEntry('FR', 'French');
table2.addEntry('DE', 'German');

table1.forEach(table2.addEntry, table2); 



/* design variadic functions with apply */
/* Effective JS - Item 21 */

var buffer = {  
  state: [],  
  append: function () {  
    for (var i = 0, n = arguments.length; i < n; i++) {  
      this.state.push(arguments[i]);  
    }  
  }  
};  

function getInputStrings() {
    return ['Kia', ' ', 'ora', '.'];
}

var firstName = 'Sigmund',
    lastName = 'Freud',
    newline = '\n';

buffer.append("Hello, ");  
buffer.append(firstName, " ", lastName, "!");  
buffer.append(newline);  
buffer.append.apply(buffer, getInputStrings());  

buffer.state.join('');

