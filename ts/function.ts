// TypeScript函数
// 1.箭头函数
// 2.参数类型和返回类型
function createUserId(name: string = 'lee', id: number, age?: number): string {
    return name + id;
}
// 3.函数类型
let IdGenerator: (chars: string, nums: number) => string;
IdGenerator = createUserId;

// 4.可选参数及默认参数，通过?来定义可选参数，要放在普通参数后，不然会导致编译错误
// 5.剩余参数
// 6.函数重载或方法重载，使用相同名称和不同参数数量或类型创建多个函数或方法
class Calculator {
    // 编译器处理函数重载时，查找重载列表尝试使用第一个重载定义
    add(a: number, b: number): number;
    add(a: string, b: number): string;
    add(a: number, b: string): string;
    add(a: string, b: string): string;
    add(a: any, b: any) {
        if (typeof a === 'string' && typeof b === 'string') {
            return a.toString() + b.toString();
        }
        return a + b;
    }
}
const calculator = new Calculator();
const result = calculator.add('xxx', 'yyy');
