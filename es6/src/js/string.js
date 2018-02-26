/*四、字符串的扩展*/

// 1.字符的Unicode表示法
// JavaScript共有6种方法表示一个字符
'\z' === 'z' // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' //true
// JavaScript允许采用\uxxxx形式表示一个字符，只限于码点在\u0000~\uFFFF之间的字符，超出这个范围的字符，必须用两个双字节的形式表示
// ES6优化了这一点，只要将码点放入大括号，就能正确解读该字符

// 2.codePointAt()方法
var s = '𠮷a';
s.length; // 2
console.log(s.charAt(0)) // ''
console.log(s.charAt(1)) // ''
console.log(s.charCodeAt(0)) // 55362
console.log(s.charCodeAt(1)) // 57271
// 对于这种4个字节的字符，JavaScript不能正确处理，字符串会误判为2，而且charAt方法无法读取整个字符，charCodeAt方法只能返回前两个字节和后两个字节的值
// ES6提供了codePointAt方法，能够正确处理4个字节存储的字符，返回一个字符的码点
console.log(s.codePointAt(0)) // 134071
console.log(s.codePointAt(1)) // 57271
console.log(s.codePointAt(2)) // 97
// '𠮷a'被视为三个字符，codePointAt方法在第一个字符上，正确地识别了“𠮷”，返回了它的十进制码点134071（即十六进制的20BB7）。在第二个字符（即“𠮷”的后两个字节）和第三个字符“a”
// codePointAt方法返回的码点是十进制值，如果想要十六进制的值，使用toString转换
s.codePointAt(0).toString(16); // 20bb7
// 字符a在字符串s的正确位置序号应该是1，但是必须向codePointAt方法传入2
// 解决这个问题的一个办法是使用for...of循环，因为它会正确识别32位的UTF-16字符
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
  // 20bb7
  // 61
}
// Tips:codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法
function is32Bit(c) {
  let s = c.codePointAt(0) > 0xFFFF ? true : false;
  console.log(s);
  return c.codePointAt(0) > 0xFFFF;
}
is32Bit('𠮷'); // true
is32Bit('a'); // false

// 3.String.fromCodePoint()
String.fromCodePoint(0x20BB7); // '𠮷'
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'; // true
// 如果String.fromCodePoint方法有多个参数，则会被合并成一个字符串返回

// 4.字符串的遍历器接口
// ES6为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历
for (let codePoint of 'foo') {
  console.log(codePoint); // f/o/o
}
// 除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点
var text = String.fromCodePoint(0x20BB7);
for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
  // ''
  // ''
  // for循环会认为它包含两个字符（都不可打印）
}
// for...of循环会正确识别出这一字符
for (let i of text) {
  console.log(i);
  // '𠮷'
}

// 5.at()
// ES5对字符串对象提供charAt()方法，返回字符串给定位置的字符，该方法不能识别码点大于0xFFFF的字符
'abc'.charAt(0); // 'a'
console.log('𠮷'.charAt(0)); // '\uD842',charAt方法返回的是UTF-16编码的第一个字节，实际上是无法显示的
// 提案：at()方法，可以识别Unicode编号大于0xFFFF的字符，返回正确的字符
'abc'.at(0); // 'a'
console.log('𠮷'.at(0)); // '𠮷'

// 6.normalize() 用来将字符的不同表示方法统一为同样的形式，这称为Unicode正规化
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// true