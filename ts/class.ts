// TypeScript 类
class Greeter {
    // 静态属性
    static cname: string = 'Greeter';
    // 成员属性
    greeting: string;

    // 构造函数，执行初始化操作
    constructor(message: string) {
        this.greeting = message;
    }

    // 静态方法
    static getClassName() {
        return 'Class Name' + this.cname;
    }

    // 成员方法
    greet() {
        return 'hello,' + this.greeting;
    }
}

let greeter = new Greeter('world');

// 1. 访问器，通过getter和setter方法来实现数据的封装和有效性校验，防止出现异常数据
let passcode = "Hello TypeScript";
class Employee {
    private _fullName: string;

    constructor(name: string) {
        this._fullName = name;
    }
    
    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode === 'Hello TypeScript') {
            this._fullName = newName;
        } else {
            console.log('Error');
        }
    }
}

let employee = new Employee('test');
employee.fullName = 'leeo';
if (employee.fullName) {
    console.log(employee.fullName);
}

// 2. 类或接口的继承
class Animal {
    name: string;
    
    constructor(n: string) {
        this.name = n;
    }

    move(distance: number = 0) {
        console.log(this.name + 'moved' + distance);
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name);
    } 

    move(distance = 5) {
        super.move(distance);
    }
}

let snake = new Snake('ts');
snake.move();

// 3. ECMAScript私有字段
// 私有字段以#字符开头；
// 每个私有字段名称唯一且限定于其包含的类中；
// 不能在私有字段上使用TypeScript可访问性修饰符（public或private）；
// 私有字段不能在包含的类之外访问，甚至不能被检测到；

class Person1 {
    #pName: string;
    constructor(name: string) {
        this.#pName = name;
    }
    greet() {
        console.log('my name is' + this.#pName);
    }
}

let personName = new Person1('ppp');
personName.greet();
// personName.#pName;
