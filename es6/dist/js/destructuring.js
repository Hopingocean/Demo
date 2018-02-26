'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*三.变量的解构赋值*/

/*1.数组的结构赋值*/
// 基本用法：ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
var foo = 1,
    bar = 2,
    baz = 3;

foo; // 1
bar; // 2
baz; // 3

var _ref = ['foo', 'bar', 'baz'],
    third = _ref[2];

third; // baz

var _ref2 = [1, 2, 3],
    x = _ref2[0],
    y = _ref2[2];

x; // 1
y; // 3

var head = 1,
    tail = [2, 3, 4];

head; // 1
tail; // [2, 3, 4]

var _ref3 = ['a'],
    a = _ref3[0],
    b = _ref3[1],
    c = _ref3.slice(2);

a; // a
b; // undefined
console.log(c); // []
// 只要等号两边的模式相同，左边的变量就会被赋予对应的值
var _ref4 = [],
    z = _ref4[0];
var _ref5 = [1],
    d = _ref5[0],
    e = _ref5[1];
// 如果解构不成功，变量的值就等于undefined

var f = 1,
    _ref6 = [2, 3],
    g = _ref6[0],
    h = 4;

f; // 1
g; // 2
h; // 4
// 如果等号左边的模式只匹配一部分等号右边的数组，即不完全解构，解构依然可以成功

var _ = 1,
    _ref7 = _slicedToArray(_, 1),
    a1 = _ref7[0];

var _false = false,
    _false2 = _slicedToArray(_false, 1),
    b1 = _false2[0];

var _NaN = _slicedToArray(NaN, 1),
    c1 = _NaN[0];

var _undefined = _slicedToArray(undefined, 1),
    d1 = _undefined[0];

var _ref8 = null,
    _ref9 = _slicedToArray(_ref8, 1),
    f1 = _ref9[0];

var _ref10 = {},
    _ref11 = _slicedToArray(_ref10, 1),
    g1 = _ref11[0];
// 如果等号右边不是数组，将会报错（或者严格的说，不是可遍历的结构）


var _ref12 = new Set(['x1', 'y1', 'z1']),
    _ref13 = _slicedToArray(_ref12, 3),
    x1 = _ref13[0],
    y1 = _ref13[1],
    z1 = _ref13[2];

console.log(x1); // x1
// 事实上，只要某种数据结构具有Iterator接口，都可以采用数组形式的解析赋值

// 默认值：解构赋值允许指定默认值
var _ref14 = [],
    _ref14$ = _ref14[0],
    foo2 = _ref14$ === undefined ? true : _ref14$;

foo2; // true

var _ref15 = ['a'],
    x2 = _ref15[0],
    _ref15$ = _ref15[1],
    y2 = _ref15$ === undefined ? 'b' : _ref15$; // x='a', y='b'

var a2 = 'a',
    _undefined2 = undefined,
    b2 = _undefined2 === undefined ? 'b' : _undefined2; // a2='a', b2='b'
// Tips: ES6内部使用严格相等运算符（===），判断一个位置是否有值，所以如果一个数组成员不严格等于undefined，默认值是不会生效的

var _undefined3 = undefined,
    c2 = _undefined3 === undefined ? 1 : _undefined3; // c2=1

var _ref16 = null,
    d2 = _ref16 === undefined ? 1 : _ref16; // d2=null

// 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值

var _ref17 = [],
    _ref17$ = _ref17[0],
    e2 = _ref17$ === undefined ? 1 : _ref17$,
    _ref17$2 = _ref17[1],
    f2 = _ref17$2 === undefined ? e2 : _ref17$2; // e2=1; f2=1

var _ref18 = [2],
    _ref18$ = _ref18[0],
    g2 = _ref18$ === undefined ? 1 : _ref18$,
    _ref18$2 = _ref18[1],
    h2 = _ref18$2 === undefined ? g2 : _ref18$2; // g2=2; h2=2

var _2 = 1,
    i2 = _2 === undefined ? 1 : _2,
    _3 = 2,
    j2 = _3 === undefined ? i2 : _3; // i2=1; j2=2

var _ref19 = [],
    _ref19$ = _ref19[0],
    k2 = _ref19$ === undefined ? l2 : _ref19$,
    _ref19$2 = _ref19[1],
    l2 = _ref19$2 === undefined ? 1 : _ref19$2; // ReferenceError
// 上面最后一个表达式会报错，因为k2用到默认值l2时，l2还没有声明

/*2.对象的解构赋值*/
// 变量必须与属性同名，才能取到正确的值

var ObjDestructuring = function () {
  function ObjDestructuring() {
    _classCallCheck(this, ObjDestructuring);
  }

  _createClass(ObjDestructuring, [{
    key: 'objDestruct',
    value: function objDestruct() {
      var _foo$bar = { foo: 'aaa', bar: 'bbb' },
          bar = _foo$bar.bar,
          foo = _foo$bar.foo;

      foo; // 'aaa'
      bar; // 'bbb'
      var _foo$bar2 = { foo: 'aaa', bar: 'bbb' },
          baz = _foo$bar2.baz;

      baz; // undefined
    }
  }, {
    key: 'obj1',
    value: function obj1() {
      // 如果变量名与属性名不一致，必须写成下面这样
      var _foo$bar3 = { foo: 'aaa', bar: 'bbb' },
          baz = _foo$bar3.foo;

      baz; // 'aaa'
      var obj = { first: 'hello', last: 'world' };
      var f = obj.first,
          l = obj.last;

      f; // 'hello'
      l; // 'world'
      console.log(first); // error: first is not defined
      // 即对象的解构赋值的内部机制，是先找到同名属性，然后再赋值给对应的变量
      // 即first是匹配的模式，f才是变量，真正被赋值的是变量f,而不是模式foo。
    }
    // 和数组一样，解构也可以用于嵌套解构的对象

  }, {
    key: 'obj2',
    value: function obj2() {
      var obj = {
        p: ['Hello', { y: 'World' }]
      };

      var _obj$p = _slicedToArray(obj.p, 2),
          x = _obj$p[0],
          y = _obj$p[1].y;

      x; // 'Hello'
      y; // 'World'
      // Tips:此时p是模式，不是变量，因此不会被赋值
    }
    // 对象的解构可以指定默认值

  }, {
    key: 'obj3',
    value: function obj3() {
      var _ref20 = {},
          _ref20$x = _ref20.x,
          x = _ref20$x === undefined ? 3 : _ref20$x;

      x; // 3
      var _x = { x: 1 },
          x = _x.x,
          _x$y = _x.y,
          y = _x$y === undefined ? 5 : _x$y;

      x; // 1
      y; // 5
      var _ref21 = {},
          _ref21$x = _ref21.x,
          y = _ref21$x === undefined ? 3 : _ref21$x;

      y; // 3
      var _x2 = { x: 5 },
          _x2$x = _x2.x,
          y = _x2$x === undefined ? 3 : _x2$x;

      y; // 5
      var _ref22 = {},
          _ref22$message = _ref22.message,
          msg = _ref22$message === undefined ? 'Something went wrong' : _ref22$message;

      msg; // 'Something went wrong'
      // 默认值生效的条件是：对象的属性值严格等于undefined
    }
    // 如果要将一个已经声明的变量用于解构赋值，必须非常小心

  }, {
    key: 'obj4',
    value: function obj4() {
      var x = void 0;
      // { x } = { x: 1 }; // 错误的写法，因为js引擎会将{x}理解成一个代码块，从而发生语法错误，只有不将大括号写在行首，避免js将其解释为代码块，才能解决这个问题
      // 正确的写法
      // SyntaxError: syntax error

      var _x3 = { x: 1 };
      x = _x3.x;
    }
  }]);

  return ObjDestructuring;
}();

var obj1 = new ObjDestructuring();
obj1.obj1();

/*3.字符串的解构赋值*/
// 字符串被转换成一个类似数组的对象

var StringDestruct = function () {
  function StringDestruct() {
    _classCallCheck(this, StringDestruct);
  }

  _createClass(StringDestruct, [{
    key: 'string1',
    value: function string1() {
      var _hello = 'hello',
          _hello2 = _slicedToArray(_hello, 5),
          a = _hello2[0],
          b = _hello2[1],
          c = _hello2[2],
          d = _hello2[3],
          e = _hello2[4];

      a; // 'h'
      b; // 'e' ...
      // 类似数组的对象都有一个length属性
      var _hello3 = 'hello',
          len = _hello3.length;

      len; // 5
    }
  }]);

  return StringDestruct;
}();

/*4.数值和布尔值的解构赋值*/
// 解构赋值的规则是：只要等号右边的值不是对象或数组，就先将其转为对象
// 犹豫undefined和null无法转为对象，所以对他们进行解构赋值，都会报错


var NumDestruct = function () {
  function NumDestruct() {
    _classCallCheck(this, NumDestruct);
  }

  _createClass(NumDestruct, [{
    key: 'num1',
    value: function num1() {
      var _4 = 123,
          n = _4.toString;
      var _true = true,
          b = _true.toString;
      var x = undefined.prop; // TypeError

      var _ref23 = null,
          y = _ref23.prop; // TypeError
    }
  }]);

  return NumDestruct;
}();

/*5.函数参数的解构赋值*/


var FuncDestruct = function () {
  function FuncDestruct() {
    _classCallCheck(this, FuncDestruct);
  }

  _createClass(FuncDestruct, [{
    key: 'move1',
    value: function move1() {
      var _ref24 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref24$x = _ref24.x,
          x = _ref24$x === undefined ? 0 : _ref24$x,
          _ref24$y = _ref24.y,
          y = _ref24$y === undefined ? 0 : _ref24$y;

      console.log([x, y]);
      return [x, y];
    }
  }, {
    key: 'move2',
    value: function move2() {
      var _ref25 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 },
          x = _ref25.x,
          y = _ref25.y;

      console.log([x, y]);
    }
  }]);

  return FuncDestruct;
}();

var m = new FuncDestruct();
m.move1({ x: 3, y: 8 }); // [3, 8]
m.move1({ x: 3 }); // [3, 0]
m.move1({}); // [0, 0]
m.move1(); // [0, 0]
// 函数move的参数是一个对象，通过对这个对象进行解构，得到变量x和y的值，如果解构失败，x和y等于默认值
// move2会得到不同的结果, 为move2的参数指定默认值，而不是为变量x和y指定默认值。
m.move2({ x: 3, y: 8 }); // [3, 8]
m.move2({ x: 3 }); // [3, undefined]
m.move2({}); // [undefined, undefined]
m.move2(); // [0, 0]
// undefined会触发函数参数的默认值
[1, undefined, 3].map(function () {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'yes';
  return x;
}); // [1, 'yes', 3]

/*6.圆括号问题*/
// 建议只要有可能，就不要在模式中放置圆括号
// 不能使用圆括号的情况

var Ques = function () {
  function Ques() {
    _classCallCheck(this, Ques);
  }

  _createClass(Ques, [{
    key: 'one',
    value: function one() {}
    // a.变量声明语句中，不能带有圆括号
    // 全部报错
    // let [(a)] = [1];
    // let {x: (c)} = {};
    // let ({x: c}) = {};
    // let {(x: c)} = {};
    // let {(x): c} = {};

    // let { o: ({ p: p }) } = { o: { p: 2 } };
    // b.函数参数中，模式不能带有圆括号
    // function f([(z)]) { return z; }
    // c.赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中
    // ({ p: a }) = { p: 42 };
    // ([a]) = [5];
    // [({ p: a }), { x: c }] = [{}, {}];

    // 可以使用圆括号的情况

  }, {
    key: 'two',
    value: function two() {
      b = 3;
      // 只有一种情况：赋值语句的非模式部分，可以使用圆括号

      var _ref26 = {};
      d = _ref26.p;
      var _ref27 = [3];
      parseInt.prop = _ref27[0];
    }
  }]);

  return Ques;
}();

/*7.解构赋值的用途*/
// a.交换变量的值


var Trans = function () {
  function Trans() {
    _classCallCheck(this, Trans);
  }

  _createClass(Trans, [{
    key: 't1',
    value: function t1() {
      var x = 1;
      var y = 2;
      var _ref28 = [y, x];
      x = _ref28[0];
      y = _ref28[1];
    }
  }, {
    key: 't2',
    value: function t2() {
      return [1, 2, 3];
    }
  }, {
    key: 't3',
    value: function t3() {
      return {
        foo: 1,
        bar: 2
      };
    }
  }]);

  return Trans;
}();

// b.从函数返回多个值
// 返回一个数组


var ta = new Trans();

var _ta$t = ta.t2(),
    _ta$t2 = _slicedToArray(_ta$t, 3),
    t1 = _ta$t2[0],
    t2 = _ta$t2[1],
    t3 = _ta$t2[2];
// 返回一个对象


var _ta$t3 = ta.t3(),
    foo1 = _ta$t3.foo1,
    bar1 = _ta$t3.bar1;

console.log([t1, t2, t3]);

// c.函数参数的定义
function f3(_ref29) {
  var x = _ref29.x,
      y = _ref29.y,
      z = _ref29.z;
}
f3({ z: 3, y: 2, x: 1 });

// d.提取json数据
var jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

var id = jsonData.id,
    status = jsonData.status,
    number = jsonData.data;


console.log(id, status, number);
// 42, "OK", [867, 5309]

// e.函数参数的默认值

// f.遍历Map结构
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _step$value = _slicedToArray(_step.value, 2),
        key = _step$value[0],
        value = _step$value[1];

    console.log(key + " is " + value);
  }
  // first is hello
  // second is world
  // 如果只想获取键名或键值
  // 获取键名
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = map[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var _step2$value = _slicedToArray(_step2.value, 1),
        key = _step2$value[0];
  }
  // ...


  // 获取键值
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = map[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var _step3$value = _slicedToArray(_step3.value, 2),
        value = _step3$value[1];
  }
  // ...


  // g.输入模块的指定方法
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3.return) {
      _iterator3.return();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}

var _require = require("source-map"),
    SourceMapConsumer = _require.SourceMapConsumer,
    SourceNode = _require.SourceNode;