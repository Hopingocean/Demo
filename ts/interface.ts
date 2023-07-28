// ts接口，对类的一部分行为进行抽象，对对象的形状shape进行描述
// 1. 对象的形状
interface Person {
    readonly name: string;
    age?: number;
}
let lee: Person = {
    name: 'lee',
    age: 22
};

// 2. 可选|只读属性，只读属性只能在对象创建时修改值，此外还有ReadonlyArray<T>类型
let arr_1: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = arr_1;
// ro[0] = 12; // error
// ro.push(5); // error
// ro.length = 5; // error
// a = ro; // error
