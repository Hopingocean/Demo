// TypeScript类型断言（通常会发生在你清楚的知道一个实体具有比它现有类型更确切的类型）

// 尖括号语法
let someValue = 'xxx test 123';
let strLength: number = (<string>someValue).length;

// as语法
let str1Length: number = (someValue as string).length;
