var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Person_pName;
// TypeScript 类
var Greeter = /** @class */ (function () {
    // 构造函数，执行初始化操作
    function Greeter(message) {
        this.greeting = message;
    }
    // 静态方法
    Greeter.getClassName = function () {
        return 'Class Name' + this.cname;
    };
    // 成员方法
    Greeter.prototype.greet = function () {
        return 'hello,' + this.greeting;
    };
    // 静态属性
    Greeter.cname = 'Greeter';
    return Greeter;
}());
var greeter = new Greeter('world');
// 1. 访问器，通过getter和setter方法来实现数据的封装和有效性校验，防止出现异常数据
var passcode = "Hello TypeScript";
var Employee = /** @class */ (function () {
    function Employee(name) {
        this._fullName = name;
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (passcode && passcode === 'Hello TypeScript') {
                this._fullName = newName;
            }
            else {
                console.log('Error');
            }
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var employee = new Employee('test');
employee.fullName = 'leeo';
if (employee.fullName) {
    console.log(employee.fullName);
}
// 2. 类或接口的继承
var Animal = /** @class */ (function () {
    function Animal(n) {
        this.name = n;
    }
    Animal.prototype.move = function (distance) {
        if (distance === void 0) { distance = 0; }
        console.log(this.name + 'moved' + distance);
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distance) {
        if (distance === void 0) { distance = 5; }
        _super.prototype.move.call(this, distance);
    };
    return Snake;
}(Animal));
var snake = new Snake('ts');
snake.move();
// 3. ECMAScript私有字段
// 私有字段以#字符开头；
// 每个私有字段名称唯一且限定于其包含的类中；
// 不能在私有字段上使用TypeScript可访问性修饰符（public或private）；
// 私有字段不能在包含的类之外访问，甚至不能被检测到；
var Person = /** @class */ (function () {
    function Person(name) {
        _Person_pName.set(this, void 0);
        __classPrivateFieldSet(this, _Person_pName, name, "f");
    }
    Person.prototype.greet = function () {
        console.log('my name is' + __classPrivateFieldGet(this, _Person_pName, "f"));
    };
    return Person;
}());
_Person_pName = new WeakMap();
var personName = new Person('ppp');
personName.greet();
// personName.#pName;
