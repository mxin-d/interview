/**
 * 1. bind() 方法创建一个新的函数
 * 2. 在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数
 * 3. new 情况下忽略第一个参数
 * 4. 其余参数将作为新函数的参数，供调用时使用
 * @param {object} ctx
 * @param  {...any} args
 * @returns {function} 返回一个原函数的拷贝，并拥有指定 this 值和初始参数
 */
Function.prototype.__bind = function (ctx, ...args) {
    // 判断 this 是否为 function 类型
    if (typeof this !== 'function') throw new TypeError('Error');

    // 保存当前 this
    const __this = this;

    return function F() {
        return this instanceof F
            ? new __this(...args, ...arguments) // new
            : __this.apply(ctx, [...args, ...arguments]); // 直接调用时绑定 this
    };
};

// ------------------------------ 测试 ------------------------------

function print() {
    console.log(this.name, ...arguments);
}

const obj = {
    name: 'mxin',
};

// Function.prototype.__bind()
console.log('Function.prototype.__bind()');

// 直接调用，返回原函数拷贝，this 指向 obj
const F = print.__bind(obj, 26);
F(178); // mxin, 26, 178

// new 情况
const _obj = new F(145); // undefined, 26, 145
console.log(_obj); // print {}

// Function.prototype.bind()
console.log('Function.prototype.bind()');

const Fn = print.bind(obj, 26);
Fn(178); // mxin, 26, 178

const __obj = new Fn(145); // undefined, 26, 145
console.log(__obj); // print {}
