// TypeScript基础数据类型

// boolean类型
let isDown: boolean = false;

// number
let count: number = 1;

// string
let nameStr: string = 'leeo';

// array
let list: number[] = [1, 2, 3]; // Array<number>泛型语法

// Enum类型，ts支持数字或字符串枚举

// 数字枚举
enum Direction {
    NORTH, // 0
    SOUTH, // 1
    EAST,
    WEST = 4 // 设置默认值4
}
let dir: Direction = Direction.EAST; // 默认情况下，NORTH的初始值为0，其余的成员会从1开始自增

// 字符串枚举，每个成员都必须用字符串字面量或另外一个字符串枚举成员初始化
enum DirectionStr {
    NORTH = 'NORTH',
    SOUTH = 'SOUTH',
    EAST = 'EAST',
    WEST = 'WEST'
}
console.log(DirectionStr);

// 异构枚举，成员值是数字和字符串的混合(数字枚举相对字符串枚举多了反向映射)
enum Enum {
    A,
    B,
    C = 'C',
    D = 'D',
    E = 8,
    F,
}
let a: Enum = Enum.A;
let b: string = Enum[1];

// Any类型，顶级类型，ts允许对any类型的值执行任何操作而无需执行检查
let value: any;
value.foo.bar; // ok
value.trim(); // ok
value(); // ok
new value(); // ok
value[0][1]; // ok
// 以上结果都OK,为了解决any带来的问题，ts3.0引入了unknown类型
// unknown类型，另一种顶级类型
let value1: unknown;
value1 = true;
value1 = 42;
value1 = 'hello';
value1 = {};
value1 = [];
value1 = Math.random;
value1 = null;
value1 = undefined;
value1 = new TypeError();
// value1 = Symbol('type');
// 对unknown类型的变量赋值都被认为是类型正确的，但是将unknown类型的变量赋值给其他类型的变量是错误的（any除外）；
let v: unknown;
let v1: unknown = v; // ok
let v2: any = v; // ok
// let v3: number = v; // Error
// let v3: string = v; // Error
// let v3: boolean = v; // Error
// let v3: object = v; // Error
// let v3: any[] = v; // Error
// let v3: Function = v; // Error

// unknown类型变量不允许一下操作 
// v.for.bar; // Error
// v(); // Error
// v.trim(); // Error
// v[0][1]; // Error
// new v(); // Error

// Tuple，元组用于定义有限数量的未命名属性的类型，每个属性都有一个关联的类型，使用元组时，必须提供每个属性的值
let tupleType: [string, boolean];
tupleType = ['xxx', false]; // 类型和值不匹配时，ts编译器会提示错误
tupleType[0] = 'yyy';
// tupleType.push(true);

// void类型，当一个函数没有返回值时，通常其返回值类型是void
function warnUser(): void {
    console.log('this is my warning message');
}
// 声明一个void类型的变量没有任何意义，因为它的值只能为undefined或null;
let unusable: void = undefined;

// null和undefiend,默认情况下，null和undefined是所有类型的子类型，所以可以赋值给其他类型的变量，但是如果指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自的类型
let u: undefined = undefined;
let n: null = null;

// never类型，表示永不存在的值的类型，利用never类型的特性实现全面性检查
type Foo = string | number;
// 使用never避免出现新增的联合类型没有对应的实现，目的就是写出类型绝对安全的代码
function controlFlowAnalysisWithNever(foo: Foo) {
    if (typeof foo === 'string') {
        // foo被收窄为string类型
    } else if (typeof foo === 'number') {
        // number类型
    } else {
        const check: never = foo;
    }
}

// 交叉类型，将多个类型合并为一个类型
interface IPerson {
    id: string;
    age: number;
}
interface IWork {
    companyId: string;
}
type IStaff = IPerson & IWork;
const staff: IStaff = {
    id: 'E001',
    age: 20,
    companyId: 'efg'
};
console.dir(staff)

