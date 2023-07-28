// 字典Map
// 集合、字典可以存储不重复的值；
// 集合以[value, value]形式存储，字典以[key, value]形式存储
// 任何具有Iterator(迭代接口），且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数
const set = new Set([['foo', 1], ['bar', 2]]);
const m1 = new Map(set);
m1.get('foo'); // 1
const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz'); // 3
m3.get('xxx'); // 读取一个未知的键，返回undefined

// 注意，只有对同一个对象的引用，Map结构才将其视为同一个键。
const map = new Map();
map.set(['a'], 5);
map.get(['a']); // undefined

// Map的键和内存地址绑定，只要内存地址不一样，就视为两个键，如果Map的键是一个简单类型的值（数值、字符串，布尔值），则只要两个值严格相等就视为同一个键；
map.set(-0, 123);
map.get(+0) // 123

map.set(true, 1);
map.set('true', 2);
map.get(true) // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3

map.set(NaN, 123);
map.get(NaN) // 123

// Map操作方法，set(),get(),has(),delete(),clear()
// Map遍历方法，keys(),values(),entries(),forEach()

// Map转Array
const arr1 = [...m1];
// Map转Object
function mapToObj(map) {
    let obj = Object.create(null);
    for(let [key, value] of map) {
        obj[key] = value;
    }
    return obj;
}
mapToObj(m1)  // {foo: "1", bar: "2"}
// 
