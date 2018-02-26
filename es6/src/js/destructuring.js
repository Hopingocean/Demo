/*三.变量的解构赋值*/

/*1.数组的结构赋值*/
// 基本用法：ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo; // 1
bar; // 2
baz; // 3

let [, , third] = ['foo', 'bar', 'baz'];
third; // baz

let [x, , y] = [1, 2, 3];
x; // 1
y; // 3

let [head, ...tail] = [1, 2, 3, 4];
head; // 1
tail; // [2, 3, 4]

let [a, b, ...c] = ['a'];
a; // a
b; // undefined
console.log(c); // []
// 只要等号两边的模式相同，左边的变量就会被赋予对应的值
let [z] = [];
let [d, e] = [1];
// 如果解构不成功，变量的值就等于undefined
let [f, [g], h] = [1, [2, 3], 4];
f; // 1
g; // 2
h; // 4
// 如果等号左边的模式只匹配一部分等号右边的数组，即不完全解构，解构依然可以成功
let [a1] = 1;
let [b1] = false;
let [c1] = NaN;
let [d1] = undefined;
let [f1] = null;
let [g1] = {};
// 如果等号右边不是数组，将会报错（或者严格的说，不是可遍历的结构）
let [x1, y1, z1] = new Set(['x1', 'y1', 'z1']);
console.log(x1); // x1
// 事实上，只要某种数据结构具有Iterator接口，都可以采用数组形式的解析赋值

// 默认值：解构赋值允许指定默认值
let [foo2 = true] = [];
foo2; // true

let [x2, y2 = 'b'] = ['a']; // x='a', y='b'
let [a2, b2 = 'b'] = ['a', undefined]; // a2='a', b2='b'
// Tips: ES6内部使用严格相等运算符（===），判断一个位置是否有值，所以如果一个数组成员不严格等于undefined，默认值是不会生效的
let [c2 = 1] = [undefined]; // c2=1
let [d2 = 1] = [null]; // d2=null

// 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值
let [e2 = 1, f2 = e2] = []; // e2=1; f2=1
let [g2 = 1, h2 = g2] = [2]; // g2=2; h2=2
let [i2 = 1, j2 = i2] = [1, 2]; // i2=1; j2=2
let [k2 = l2, l2 = 1] = []; // ReferenceError
// 上面最后一个表达式会报错，因为k2用到默认值l2时，l2还没有声明

/*2.对象的解构赋值*/
// 变量必须与属性同名，才能取到正确的值
class ObjDestructuring {
  objDestruct() {
    let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
    foo // 'aaa'
    bar // 'bbb'
    let { baz } = { foo: 'aaa', bar: 'bbb' };
    baz // undefined
  }
  obj1() {
    // 如果变量名与属性名不一致，必须写成下面这样
    var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
    baz // 'aaa'
    let obj = { first: 'hello', last: 'world' };
    let { first: f, last: l } = obj;
    f // 'hello'
    l // 'world'
    console.log(first) // error: first is not defined
    // 即对象的解构赋值的内部机制，是先找到同名属性，然后再赋值给对应的变量
    // 即first是匹配的模式，f才是变量，真正被赋值的是变量f,而不是模式foo。
  }
  // 和数组一样，解构也可以用于嵌套解构的对象
  obj2() {
    let obj = {
      p: [
        'Hello',
        { y: 'World' }
      ]
    };

    let { p: [x, { y }] } = obj;
    x // 'Hello'
    y // 'World'
    // Tips:此时p是模式，不是变量，因此不会被赋值
  }
  // 对象的解构可以指定默认值
  obj3() {
    var { x = 3 } = {};
    x // 3
    var { x, y = 5 } = { x: 1 };
    x // 1
    y // 5
    var { x: y = 3 } = {};
    y // 3
    var { x: y = 3 } = { x: 5 };
    y // 5
    var { message: msg = 'Something went wrong' } = {};
    msg // 'Something went wrong'
    // 默认值生效的条件是：对象的属性值严格等于undefined
  }
  // 如果要将一个已经声明的变量用于解构赋值，必须非常小心
  obj4() {
    let x;
    // { x } = { x: 1 }; // 错误的写法，因为js引擎会将{x}理解成一个代码块，从而发生语法错误，只有不将大括号写在行首，避免js将其解释为代码块，才能解决这个问题
    ({ x } = { x: 1 }); // 正确的写法
    // SyntaxError: syntax error

  }
}
var obj1 = new ObjDestructuring();
obj1.obj1();

/*3.字符串的解构赋值*/
// 字符串被转换成一个类似数组的对象
class StringDestruct {
  string1() {
    const [a, b, c, d, e] = 'hello';
    a // 'h'
    b // 'e' ...
    // 类似数组的对象都有一个length属性
    let { length: len } = 'hello';
    len // 5
  }
}

/*4.数值和布尔值的解构赋值*/
// 解构赋值的规则是：只要等号右边的值不是对象或数组，就先将其转为对象
// 犹豫undefined和null无法转为对象，所以对他们进行解构赋值，都会报错
class NumDestruct {
  num1() {
    let { toString: n } = 123;
    let { toString: b } = true;
    let { prop: x } = undefined; // TypeError
    let { prop: y } = null; // TypeError
  }
}

/*5.函数参数的解构赋值*/
class FuncDestruct {
  move1({ x = 0, y = 0 } = {}) {
    console.log([x, y]);
    return [x, y];
  }
  move2({ x, y } = { x: 0, y: 0 }) {
    console.log([x, y]);
  }
}
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
[1, undefined, 3].map((x = 'yes') => x); // [1, 'yes', 3]

/*6.圆括号问题*/
// 建议只要有可能，就不要在模式中放置圆括号
// 不能使用圆括号的情况
class Ques {
  one() {
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
  }
  // 可以使用圆括号的情况
  two() {
    // 只有一种情况：赋值语句的非模式部分，可以使用圆括号
    [(b)] = [3];
    ({ p: (d) } = {});
    [(parseInt.prop)] = [3];
  }
}

/*7.解构赋值的用途*/
// a.交换变量的值
class Trans {
  t1() {
    let x = 1;
    let y = 2;
    [x, y] = [y, x];
  }
  t2() {
    return [1, 2, 3];
  }
  t3() {
    return {
      foo: 1,
      bar: 2
    }
  }
}

// b.从函数返回多个值
// 返回一个数组
var ta = new Trans();
let [t1, t2, t3] = ta.t2();
// 返回一个对象
let { foo1, bar1 } = ta.t3();
console.log([t1, t2, t3]);

// c.函数参数的定义
function f3({ x, y, z }) { }
f3({ z: 3, y: 2, x: 1 });

// d.提取json数据
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]

// e.函数参数的默认值

// f.遍历Map结构
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
// 如果只想获取键名或键值
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}

// g.输入模块的指定方法
const { SourceMapConsumer, SourceNode } = require("source-map");