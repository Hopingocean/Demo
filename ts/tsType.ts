// 1.ts数组
// 数组解构
let x: number, y: number, z: number;
let arr = [0, 1, 2, 3, 4, 5];
[x, y, z] = arr;

// 数组展开运算符
let arr2 = [2, 4];
let arr3 = [...arr2, 6, 8, 10];

// 数组遍历
let colors: string[] = ['red', 'yellow', 'blue'];
for (let i in colors) {
    console.log(i);
}

// 2.ts对象
// 2.1 对象结构
let person = {
    username: "Semlinker",
    gender: "Male",
    address: 'xxx'
};
  
let { username, gender } = person;

// 2.2 对象展开运算符
let personAdd = {...person, age: 20}; // 组装对象
let {address, ...rest} = person; // 获取除了某些项外的其他项
