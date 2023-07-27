// 类型守卫，类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内
function printEmployeeInfo(emp) {
    if ('privileges' in emp) {
        console.log('provileges', emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('start Date', emp.startDate);
    }
}
// typeof关键字，typeof只支持两种形式：typeof v === 'typename'和typeof v !== 'typename',typename必须是number, string, boolean, symbol
function padLeft(value, padding) {
    if (typeof padding === 'number') {
        return Array(padding + 1).join(' ') + value;
    }
    if (typeof padding === 'string') {
        return padding + value;
    }
    throw new Error("Expected string or number, got'".concat(padding, "'."));
}
var SpaceRepeatingPadder = /** @class */ (function () {
    function SpaceRepeatingPadder(numSpace) {
        this.numSpace = numSpace;
    }
    SpaceRepeatingPadder.prototype.getPaddingString = function () {
        return Array(this.numSpace + 1).join(' ');
    };
    return SpaceRepeatingPadder;
}());
var StringPadder = /** @class */ (function () {
    function StringPadder(value) {
        this.value = value;
    }
    StringPadder.prototype.getPaddingString = function () {
        return this.value;
    };
    return StringPadder;
}());
var padder = new SpaceRepeatingPadder(6);
if (padder instanceof SpaceRepeatingPadder) {
    // padder的类型收窄为'SpaceRepeatingPadder'
}
// 自定义类型保护的类型谓词
function isNumber(x) {
    return typeof x === 'number';
}
function isString(x) {
    return typeof x === 'string';
}
var isStr = isString(1);
