

// variable

// No. 1
/******************************************************/

alert(freud);			// ?

var freud = 10;
alert(freud);			// ?

freud = 20;

function freud() {}

alert(freud);			// ?

// No. 2
/******************************************************/

if (true) {
  var freud = 1;
} else {
  var jung = 2;
}

alert(freud);	// ?
alert(jung);	// ?
alert(lacan);	// ?

// No. 3
/******************************************************/

alert(freud);	// ?
alert(jung);	// ?

jung = 10;
var freud = 20;

// No. 4
/******************************************************/

freud = 10;
var jung = 20;

delete freud;
alert(window.freud);	// ?

delete jung;
alert(window.jung);		// ?

// No. 5
/******************************************************/

var dream = {manifest:2, latent:67};

function freud() {
    a = 10;
    console.log(window.a);		// ?
    console.log(this);			// ?
    console.log(this.a);		// ?
}

freud.call(dream);

console.log(window.a);			// ?
console.log(dream);				// ?

// function





// this


// No. t-1: from DSLab chp3
/******************************************************/

function freud() {
  console.log(this);
}

freud(); // ?

console.log(freud === freud.prototype.constructor); // ?

freud.prototype.constructor(); // ?

// No. t-2: from DSLab chp3
/******************************************************/

var freud = {
  jung: function () {
    console.log(this);
    console.log(this === freud);
  }
};

freud.jung(); // ?

var exampleFunc = freud.jung;

console.log(exampleFunc === freud.jung); // ?

exampleFunc(); // ?

// No. t-3: from DSLab chp3
/******************************************************/

(function () {
  console.log(this); // ?
})();

// No. t-4: from DSLab chp3
/******************************************************/

var freud = {
  jung: function () {
    console.log(this);
  }
};

(freud.jung)(); // ?
(freud.jung = freud.jung)(); // ?
(false || freud.jung)(); // ?
(freud.jung, freud.jung)(); // ?

// No. t-5: from DSLab chp3
/******************************************************/

function freud() {
  function jung() {
    console.log(this); // ?
  }
  jung();
}

// No. t-6: from DSLab chp3
/******************************************************/

var dream = 10;
with ({
  freud: function () {
    console.log(this.dream);
  },
  dream: 20
}) {
  freud(); // ?
}

// No. t-7: from DSLab chp3
/******************************************************/

var dream = 20;
function freud(){
    function jung1(){
        console.log(this.dream);
    }
    with({
        jung2: function(){
            console.log(this.dream);
        },
        dream: 50
    }){
        function jung3(){
            console.log(this.dream);
        }
        function jung4(){
            console.log(dream);
        }
        jung1();	// ?
        jung2();	// ?
        jung3();	// ?
        jung4();	// ?
    }
}
freud();

// No. t-8: from DSLab chp3
/******************************************************/

var freud;
with ({dream: 50}) {
  freud = function() {
    console.log(dream);
  };
  function jung() {
	console.log(dream);
  }
  freud(); // ?
  jung(); // ?
  lacan(); // ?
}
var dream = 20;
function lacan() {
	console.log(dream);
}
freud(); // ?
jung(); // ????????????????????? isn't jung creation hoisted? why it is still keeping 50
lacan(); // ?

// No. t-9: from DSLab chp3
/******************************************************/

Object.prototype.id = 10;

var id = 20;
var ego = 40;

with ({superego:100}) {
  var superego = 200;
  Object.prototype.id = 30;
  var id = 50;
  var ego = 70;
}

console.log(id); // ?
console.log(ego); // ?
console.log(Object.prototype.id); // ?

// No. t-10: from DSLab chp3
/******************************************************/

var id = 20;
var freud = {ego: 100};

with (freud) {
  id = 50;
}

console.log(
  id, // ?
  freud // ?
);

// No. t-11: from DSLab chp3
/******************************************************/

Object.prototype.id = 10;
var id = 20;
var freud = {ego: 100};

with (freud) {
  id = 50;
  var ego = 200;
}

console.log(
  id, // ?
  freud, // ?
  Object.prototype.id // ?
);





// scope & closure


// No. s-1
/******************************************************/

var freud = 10;
try {
  throw 20;
} catch (freud) {
  alert(freud);		// ?
}

alert(freud);		// ?

// No. s-2: from DSLab chp4
/******************************************************/

var dream = 10;

function freud() {
  alert(dream);
}

(function () {
  var dream = 20;
  freud(); // ?
})();

// No. s-3: from DSLab chp4
/******************************************************/

function freud() {

  var ego = 10;
  var id = 20;

  return function () {
    alert([x, y]);
  };

}

var ego = 30;

var jung = freud();

jung(); // ?

// No. s-4: from DSLab chp6
/******************************************************/

var dream = 10;

function freud() {
  console.log(x);
}

(function (funArg) {

  var dream = 20;

  funArg(); // ?

})(freud);

// No. s-5: from DSLab chp4
/******************************************************/

var id = 10, ego = 10;

with ({id: 20}) {

  var id = 30, ego = 30;

  alert(id); // ?
  alert(ego); // ?
}

alert(id); // ?
alert(ego); // ?











//





// prototype

// No. x-1
/******************************************************/

function Freud() {}
var f = new Freud();

console.log(f instanceof Freud); // ?

function Jung() {}

var __proto = {
  constructor: Jung
};

Jung.prototype = __proto;
f.__proto__ = __proto;

console.log(f instanceof Jung); // ?
console.log(f instanceof Freud); // ?
