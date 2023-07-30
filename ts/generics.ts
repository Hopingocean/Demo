// 泛型（Generic），创建可重用的组件，一个组件支持多种数据类型。
// 允许同一个函数接受不同类型参数的一种模板。

// 泛型接口
interface GenericIdentityFn<T> {
    (arg: T): T;
}

// 泛型类
class GenericNumber<T> {
    // 类的成员需要初始化
    zeroValue?: T; // 1.定义时初始化，默认undefined
    add?: (x: T, y: T) => T;

    constructor(str: T) {
        // 2.构造函数中初始化赋值
        this.zeroValue = str;
    }
}

let myGenericNumber = new GenericNumber<number>(1);
myGenericNumber.zeroValue = 10;
myGenericNumber.add = function (x, y) {
    return x + y;
}

// 泛型变量，没有本质却别，只是一个约定好的规范
// T(Type)，表示一个TypeScript类型
// K(Key)，表示对象中的键乐星
// V(Value)，表示对象中的值类型
// E(Element)，表示元素类型

// 泛型工具类型，Partial,Required,Readonly,Record,ReturnType等
// typeof操作符，获取一个声明变量或对象的类型
interface Person2 {
    name1: string;
    age1: number;
}
const sem: Person2 = {name1: 'lee', age1: 20};
type Sem = typeof sem; // Person
function toArray(x: number): Array<number> {
    return [x];
}
type Func = typeof toArray; // (x: number) => number[]

// keyof操作符，获取一个对象中所有的key值
type K1 = keyof Person2; // 'name1' | 'age1'
type K2 = keyof Person2[]; // length | toString | pop | push | concat | join
type K3 = keyof { [x: string]: Person2 }; // string | number

// in，遍历枚举类型
type Keys = 'a' | 'b' | 'c';
type Obj = {
    [p in Keys]: any
}; // {a: any, b: any, c:any}

// infer,在条件类型语句中，可以使用infer声明一个类型变量并对它进行使用
type ReturnType1<T> = T extends (...args: any[]) => infer R ? R : any;

// extends，通过extends关键字添加泛型约束
interface ILengthwise {
    length: number;
}
function loggingIdentity<T extends ILengthwise>(arg: T): T{
    console.log(arg.length);
    return arg;
}

// Partical<T>的作用就是将某个类型里的属性全部变为可选项?
type Partical<T> = {
    [P in keyof T]?: T[P];
}

interface Todo {
    title: string;
    desc: string;
}
// 利用Partical<T>工具类型，定义fields数据类型为Todo
function updateTodo(todo: Todo, fields: Partical<Todo>) {
    return {...todo, ...fields};
}

const todo1 = {
    title: "organize desk",
    desc: "clear clutter",
};
  
const todo2 = updateTodo(todo1, {
    desc: "throw out trash",
});
