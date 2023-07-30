// 类装饰器
function myGreeter(greeting: string) {
    return function (target: Function) {
        target.prototype.greet = function (): void {
            console.log(greeting);
        }
    }
}

@myGreeter('hello lee')
class Greeting {
    greeting: string;
    constructor(str: string) {
        this.greeting = str;
    }
    greet() {
        return 'hello,' + this.greeting;
    }
}

let myGreeting = new Greeting('xxx');
myGreeting.greet();

// 属性装饰器，接收两个参数（target:object,被装饰的类，propertyKey:string|symbol,被装饰类的属性名）
function logProperty(target: any, key: string) {
    delete target[key];
    const backingField = '_' + key;
    Object.defineProperty(target, backingField, {
        writable: true,
        enumerable: true,
        configurable: true
    });

    // property getter
    const getter = function (this: any) {
        const currVal = this[backingField];
        console.log(`Get: ${key} => ${currVal}`);
        return currVal;
    }
    // property setter
    const setter = function (this: any, newVal: any) {
        console.log(`Set: ${key} => ${newVal}`);
        this[backingField] = newVal;
    }

    // create new property width getter and setter
    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    })
}

class Person3 {
    @logProperty
    public name: string;
    constructor(name: string) {
        this.name = name;
    }
}

const p1 = new Person3("semlinker");
p1.name = "kakuqo";

// 方法装饰器，target：Object，被装饰的类；propertyKey:string|symbol,方法名；descriptor: TypePropertyDescript,属性描述符
function LogOutput(target: Function, key: string, descriptor: any) {
    let originalMethod = descriptor.value;
    let newMethod = function(this: any, ...args: any[]): any {
        const that = this;
        let result: any = originalMethod.apply(that, args);
        if (!that.loggedOutput) {
            that.loggedOutput = new Array<any>();
        }
        that.loggedOutput.push({
            method: key,
            parameters: args,
            output: result,
            timestamp: new Date()
        })
        return result;
    };
    descriptor.value = newMethod;
}

class Calculator1 {
    // @LogOutput
    double (num: number): number {
        return num * 2;
    }
}

let calc = new Calculator1();
calc.double(11);
// console ouput: [{method: "double", output: 22, ...}]
// console.log(calc.loggedOutput);

// 参数装饰器，target：Object，被装饰的类；propertyKey:string|symbol,方法名；parameterIndex: number，方法中参数的索引值
function Log(target: Function, key: string, parameterIndex: number) {
    let functionLogged = key || target.prototype.constructor.name;
    console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has
	been decorated`);
}

// class GreeterLog {
//     greeting: string;
//     constructor(@Log phrase: string) {
//         this.greeting = phrase;
//     }
// }
// console output: The parameter in position 0 
// at Greeter has been decorated