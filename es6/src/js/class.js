/*十九、Class*/

/*1.Class基本语法*/
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  // 方法之间不需要逗号分隔，加了会报错
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
// 等同于
Point.prototype = {
  toString() { },
  toValue() { }
};
typeof Point // function
Point === Point.prototype.constructor // true
// 类的数据类型就是函数，类本身就是指向构造函数
// 类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法
Object.assign(Point.prototype, {
  toString() { },
  toValue() { }
});

// constructor方法
// constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
// constructor方法默认返回实例对象（即this）。

// 类的实例对象
// 与ES5一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）
var point = new Point(2, 3);
point.toString(); // (2, 3)
point.hasOwnProperty('x'); // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString'); // false
point.__proto__.hasOwnProperty('toString'); // true
// 类的所有实例共享一个原型对象
var p1 = new Point(2, 3);
var p2 = new Point(3, 2);
p1.__proto__ === p2.__proto__; // true
// 这意味着可以通过实例的__proto__属性为class添加方法
p1.__proto__.printName = function () { return 'Oops' };
p1.printName() // 'Oops'
p2.printName() // 'Oops'
var p3 = new Point(4, 2);
p3.pringName() // 'Oops'
// 使用实例的__proto__属性改写原型，必须相当谨慎，不推荐使用，因为这会改变Class的原始定义，影响到所有实例

// 不存在变量提升
{
  let Foo = class { };
  class Bar extends Foo {}
}
// 必须保证子类在父类之后定义，否则就会报错

// Class表达式
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
}
// 这个类的名字是MyClass而不是Me,Me只在Class内部代码可用，指代当前类
let inst = new MyClass();
inst.getClassName() // Me
// Me.name // ReferenceError: Me is not defined
// 如果类的内部没用到的话，可以省略Me
// const MyClass = class {/* ... */ };
// 采用Class表达式，可以写出立即执行的Class
let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}('Lee');
person.sayName();

// 私有方法
// ES6不提供私有方法，只能通过变通方法模拟实现
class Widget {
  // 1.在命名上加以区别
  // 公有方法
  foo(baz) {
    this._bar(baz);
  }
  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }
  // Tips：在类的外部，仍然可以调用这个方法。
}

// 2.将私有方法移出模块
function bar(baz) {
  return this.snaf = baz;
}

// 3.利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值
const bar1 = Symbol('bar1');
const snaf = Symbol('snaf');

export default class myClass {
  // 公有方法
  foo(baz) {
    this[bar](baz);
  }
  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }
}
// bar1和snaf都是Symbol值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果

// this的指向
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
// 上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境，因为找不到print方法而导致报错。

// 一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
class Logger1 {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}

// 另一种解决方法是使用箭头函数。
class Logger2 {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}

// 还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger3 = selfish(new Logger());

// 严格模式
// 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式

// name属性
class Point1 { };
Point.name; // Point
// 本质上，ES6的类只是ES5的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。
// name属性总是返回紧跟在class关键字后面的类名。