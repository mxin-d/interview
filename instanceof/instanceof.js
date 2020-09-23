/**
 * 模拟 instanceof
 * 判断 obj.__proto__ 和 __constructor.prototype 是否相等
 * @param {object} obj 实例对象
 * @param {function} __constructor 构造函数
 */
function __instanceof(obj, __constructor) {
    const prototype = __constructor.prototype;
    obj = Object.getPrototypeOf(obj);

    while (true) {
        if (obj === null) return false;
        if (obj === prototype) return true;
        obj = Object.getPrototypeOf(obj);
    }
}

// ------------------------------ 测试 ------------------------------

function C() {}
function D() {}

const o = new C();

// __instanceof()
console.log('__instanceof()');

console.log(__instanceof(o, C));
console.log(__instanceof(o, D));
console.log(__instanceof(o, Object));

// instanceof
console.log('instanceof');

console.log(o instanceof C);
console.log(o instanceof D);
console.log(o instanceof Object);
