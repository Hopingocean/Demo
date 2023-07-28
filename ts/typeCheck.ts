// 类型守卫，类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内

// in关键字
interface Admin {
    name: string,
    privileges: string[]
}
interface Employee {
    name: String,
    startDate: Date;
}

type UnknownEmployee = Employee | Admin;
function printEmployeeInfo(emp: UnknownEmployee) {
    if ('privileges' in emp) {
        console.log('provileges', emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('start Date', emp.startDate);
    }
}

// typeof关键字，typeof只支持两种形式：typeof v === 'typename'和typeof v !== 'typename',typename必须是number, string, boolean, symbol
function padLeft(value: string, padding: string | number) {
    if (typeof padding === 'number') {
        return Array(padding + 1).join(' ') + value;
    }
    if (typeof padding === 'string') {
        return padding + value;
    }
    throw new Error(`Expected string or number, got'${padding}'.`);
}

// instanceof关键字
interface Padder {
    getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpace: number) {}
    getPaddingString(): string {
        return Array(this.numSpace + 1).join(' ');
    }
}

class StringPadder implements Padder {
    constructor(private value: string) {}
    getPaddingString(): string {
        return this.value;
    }
}
let padder: Padder = new SpaceRepeatingPadder(6);
if (padder instanceof SpaceRepeatingPadder) {
    // padder的类型收窄为'SpaceRepeatingPadder'
}

// 自定义类型保护的类型谓词
function isNumber(x: any): x is number {
    return typeof x === 'number';
}

function isString(x: any): x is string {
    return typeof x === 'string';
}
const isStr: boolean = isString(1);
console.log(isStr);

// 联合类型和类型别名

// 联合类型，通常与null或undefined一起使用
const sayHello = (name: string | undefined) => {
    return name;
}

// 可辨识联合（可辨识，联合类型，类型守卫），如果一个类型是多个类型的联合类型，且多个类型含有一个公共属性，可以利用这个公共属性来创建不同的类型保护区
// 可辨识要求联合类型中的每个元素都包含一个单例类型属性
enum CarTransimission {
    Automatic = 200,
    Manual = 300
}
// console.log(CarTransimission);
interface Motorcycle {
    vType: 'motorcycle';
    make: number
}

interface Car {
    vType: 'car';
    transimission: CarTransimission
}

interface Truck {
    vType: 'truck';
    capacity: number
}

// 联合类型
type Vehicle = Motorcycle | Car | Truck;

// 类型守卫
const EVALUATION_FACTOR = Math.PI;
function evaluatePrice(vehicle: Vehicle) {
    switch(vehicle.vType) {
        case 'motorcycle':
            return vehicle.make * EVALUATION_FACTOR;
        case 'car':
           return vehicle.transimission * EVALUATION_FACTOR;
        case 'truck':
            return vehicle.capacity * EVALUATION_FACTOR;
    }
}
const car: Car = {vType: 'car', transimission: CarTransimission.Automatic};
evaluatePrice(car);

// 类型别名,给一个类型起一个新名字
type Message = string | string[];
let greet = (message: Message) => {}

