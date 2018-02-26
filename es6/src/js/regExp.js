/*正则的扩展*/
// 1.RegExp构造函数
// 在ES5中，RegExp构造函数的参数有两种情况
// 第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;
// 第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;
// ES5中RegExp构造函数第一个参数是一个正则对象，那么第二个参数不可以使用修饰符，否则会报错
var regex = new RegExp(/xyz/, 'i');
// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another

// ES6中，如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符
new RegExp(/abc/ig, 'i').flags; // 'i'

// 2.字符串的正则方法
// 字符串对象共有4个方法match(),replace(),search(),split()
// ES6中，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全部定义在RegExp对象上
let str = 'abc';
console.log(str.match('a')); // String.prototype.match 调用 RegExp.prototype[Symbol.match]
console.log(str.replace('a', 'd')); // String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
console.log(str.search('a')); // String.prototype.search 调用RegExp.prototype[Symbol.search]
console.log(str.split('b')); // String.prototype.split 调用RegExp.prototype[Symbol.split]

// 3.u修饰符
// ES6对正则表达式添加了u修饰符，含义为Unicode模式，用来处理大于\uFFFF的Unicode字符
/^\uD830/u.test('\uD83D\uDC2A'); // false
/^\uD83D/.test('\uD83D\uDC2A'); // true
// (1).点字符
// 点(.)字符在正则表达式中，含义是除了换行符以外的任意单个字符，对于码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u修饰符
var s = '𠮷';
console.log(/^.$/.test(s)); // false
console.log(/^.$/u.test(s)); // true
// (2).Unicode字符表示法
// ES6新增了使用大括号表示Unicode字符，这种表示法在正则表达式中必须加上u修饰符，才能识别
/\u{61}/.test('a'); // false
/\u{61}/u.test('a'); // true
/\u{20BB7}/u.test('𠮷'); // true
// 如果不加u修饰符，正则表达式无法识别\u{61}这种表示法，只会认为这匹配61个连续的u
// (3).量词
// 使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的Unicode字符
/a{2}/.test('aa'); // true
/a{2}/u.test('aa'); // true
/𠮷{2}/.test('𠮷𠮷'); // false
/𠮷{2}/u.test('𠮷𠮷'); // true
// 只有在使用u修饰符的情况下，Unicode表达式当中的大括号才会被正确解读，否则会被解读为量词
/^\u{3}$/.test('uuu'); // true
// (4).预定义模式
// u修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF的Unicode字符
/^\S$/.test('𠮷'); // false
/^\S$/u.test('𠮷'); // true
// 正确返回字符串长度的函数
function codePointLength(str) {
  var result = str.match(/[\s\S]/gu);
  console.log(result ? result.length : 0);
}
var s = '𠮷𠮷';

console.log(s.length); // 4
codePointLength(s); // 2
// (5).i修饰符
/[a-z]/i.test('\u212A'); // false
/[a-z]/iu.test('\u212A'); // true
// 上面代码中，不加u修饰符，就无法识别非规范的K字符
