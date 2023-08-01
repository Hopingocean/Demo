// 第七题：ES5/ES6的继承除了写法以外还有什么区别? 继承方式的不同
// ES5，Sub.__proto__ === Function.prototype;
function Sub() {}
function Super() {}
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

var sub = new Sub();
Sub.__proto__ === Function.prototype;

// ES6,子类可以直接通过__proto__寻找到父类
class Super {};
class Sub extends Super {};

const sub = new Sub();
Sub.__proto__ === Super;

// 1. class声明会提升，但不会初始化赋值，Foo进入暂时性死区，类似let,const声明变量；
// 2. class声明内部会启用严格模式；
// 3. class的所有方法（包括静态方法和实例方法）都不可枚举；
// 4. class的所有方法（包括静态方法和实例方法）都没有原型对象prototype,所以也没有[[constructor]],不能使用new来调用；
// 5. 必须使用new调用class;
// 6. class内部无法重写类名
const bar = new Bar();
function Bar () {
    Bar = 'Bar'; // it's ok
    this.bar = 2;
    baz = 3; // 引用一个未声明的变量
}
Bar.answer = function () {
    return 4;
}

Bar.prototype.print = function() {
    console.log(this.bar);
}

const barKeys = Object.keys(Bar); // ['answer]
const barProtoKeys = Object.keys(Bar.prototype); // ['print']

const barPrint = new bar.print(); // it's ok

const barFun = Bar();

const foo = new Foo(); // ReferenceError: foo is not defined
class Foo {
    constructor() {
        this.foo = 2;
        fol = 3; // ReferenceError: fol is not defined
        Foo = 'Foo'; // TypeError: Assignment to constant variable
    }
    static answer () {
        return 4
    }
    print() {
        console.log(this.foo);
    }
}
const fooKeys = Object.keys(Foo); // []
const fooProtoKeys = Object.keys(Foo.prototype); // []

const fooPrint = new foo.print(); // TypeError: foo.print is not a constructor

const fooFun = Foo(); // TypeError: class constructor Foo cannot be invoked widthout 'new'

const fooName = new Foo();
Foo = 'Foo'; // it's ok

// 第21题：请分别比较这三种判断数组的方法的区别和优劣。
// 1.Object.prototype.toString().call(),每一个继承Object的对象都有toString方法，如果toString方法没有被重写，会返回[Object type]，其中type为对象的类型。但当除了Object类型的对象外，其他类型直接使用toString方法时，会直接返回内容的字符串，所以需要使用call或者apply方法来改变toString的执行上下文，该方法可以判断所有基本数据类型，常用于判断浏览器内置对象
const arr = ['a', 'b'];
arr.toString(); // 'ab'
Object.prototype.toString.call(arr); // [object Array]
Object.prototype.toString.call('a') // "[object String]"
Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(function(){}) // "[object Function]"
Object.prototype.toString.call({name: 'An'}) // "[object Object]"

// 2. instanceof的机制是通过判断对象的原型链中是否存在类型的prototype，但是instanceof只能用来判断对象类型，原始类型不可以，并且所有对象类型的instanceof Object都为true.
arr instanceof Array; // true
arr instanceof Object; // true

// 3. Array.isArray()
Array.isArray(arr); // true

// instanceof 与 isArray，当检测Array实例时，Array.isArray()优于instanceof，因为Array.isArray可以检测iframes
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr1 = new xArray(1,2,3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr1);  // true
Object.prototype.toString.call(arr1); // true
// Considered harmful, because doesn't work though iframes
arr1 instanceof Array; // false

// Array.isArray() 与 Object.prototype.toString.call()，isArray是ES5新增的方法，当不存在时可以使用call实现
if(!Array.isArray) {
    Array.isArray = (arg) => {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
}

// 第27题：let和const声明的变量不在window上，在哪里？(let/const声明的变量在对应的块级作用域中)
// 1. ES5中，顶层对象的属性和全局变量是等价的，var和function声明的全局变量，都在window上；
var a1 = 10;
function a2() {};
window.a1; // 10
window.a2; // a2(){}

// 2. ES6规定，let/const/class命令声明的全局变量不属于顶层对象的属性；
let b1 = 10;
const b2 = 'xx';
window.b1; // undefined

// 第33题：下面这段代码打印什么？（10）有问题
var c1 = 10;
((c1) => {
    c1 = 20; // 
    console.log(c1); // 20
})(c1)

var c2 = 10;
(function c(c2) {
    window.c2 = 20; // 
    console.log(c2); // 10
})(c2)

// 第41题：下面代码输出什么？（undefined/10/20）
// 在立即执行函数中，var a = 20定义了一个局部变量a，由于js的变量提升机制，第一条打印undefined,最后一条打印20。由于变量声明提升，a = 5执行时，局部变量a已声明，它只对局部变量a赋值，window.a依旧是最初的值10
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()

// 第43题：sort()排序默认返回什么?(默认按照UTF-16进行排序，即ASCII排序)
[3, 15, 8, 29, 102, 22].sort(); // [102, 15, 22, 29, 3, 8]
[3, 15, 8, 29, 102, 22].sort((a, b) => (a - b)); // [3, 8, 15, 22, 29, 102]，a-b>0,a,b交换位置，a-b<=0,位置不变

// 第48题：call()和apply()的区别是什么？
// 1. call()和apply()第一个参数都是指定函数体内的this指向；
// 2. call有多个参数，apply第二个参数是带下标的集合，数组或者类数组

// 第58题：箭头函数与普通函数（function）的区别？构造函数（function）可以使用new生成实例，箭头函数可以吗？
// 1. 箭头函数体内的this指向，就是定义时所在的对象，而不是使用时所在的对象；
// 2. 箭头函数不可以使用arguments对象；
// 3. 不可以使用yeild命令，因此箭头函数不能用作Generator函数；
// 4. 不可以使用new命令，没有自己的this，无法使用call，apply；没有prototype属性，而new命令需要将构造函数的prototype属性赋值给新的对象的__proto__;
