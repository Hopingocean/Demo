// 集合，成员唯一且无序
// 1. set实例属性，constructor:构造函数，size:元素数量
let set = new Set([1,2,3,4,2,1]);
console.log(set.length); // undefined
console.log(set.size); // 4

// 2. set实例方法，add(v),has(v),delete(v),clear()
let set2 = new Set();
set2.add(1).add(2).add(1); // 
set2.has(1); // true
set2.has(3); // false
set2.delete(1);
set2.has(1); // false

// Array.from()可以将set结构转化为数组
let set3 = new Set([1, 2, 3, 4, 2, 1]);
const arr3 = Array.from(set3); // [1, 2, 3, 4]
const arr4 = [...set3]; // [1, 2, 3, 4]

// 3. 遍历方法
// keys(),包含集合中所有键的迭代器
for(item of set3.keys()) {
    console.log(item); // 1, 2, 3, 4
}
// values(),包含集合中所有值的迭代器
for(item of set3.values()) {
    console.log(item); // 1, 2, 3, 4
}
// entries(),包含集合中set对象中所有元素的键值对迭代器
for(item of set3.entries()) {
    console.log(item); // [1, 1]
}
// forEach(callback, arguments),用于对集合成员执行callback，如果提供了arguments参数，回调中的this会是合格参数，没有返回值
set3.forEach((value, key) => {
    console.log(value + ':' + key); // 1:1
})

// set可以使用filter,map实现交集intersect、并集union、差集difference
const intersect = new Set([...set2]).filter(value => set3.has(value));
const union = new Set[[...set2, ...set3]];
const diff = new Set([...set2]).filter(value => !set3.has(value));


// WeakSet，将弱引用对象储存在一个集合中
// WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以
// WeakSet 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对该对象的应用，如果没有其他的变量或属性引用这个对象值，则这个对象将会被垃圾回收掉（不考虑该对象还存在于 WeakSet 中），所以，WeakSet 对象里有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能不一致，遍历结束之后，有的成员可能取不到了（被垃圾回收了），WeakSet 对象是无法被遍历的（ES6 规定 WeakSet 不可遍历），也没有办法拿到它包含的所有元素