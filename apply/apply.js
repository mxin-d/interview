/**
 * 模拟 apply
 * 调用一个具有给定 this 值的函数，以及以一个数组（或类数组对象）的形式提供的参数
 * @param {object} ctx
 * @param {object} args
 * @returns {any} 调用 this 的返回值，若无有返回值，则返回 undefined
 */
Function.prototype.__apply = function (ctx, args) {
    if (typeof this !== 'function') throw new TypeError('Error');

    // 考虑 null 情况，参数默认赋值会无效
    if (!ctx) ctx = window;

    // 将 this 函数保存在 ctx 上
    ctx.fn = this;

    // 传参执行并保存返回值
    const result = ctx.fn(...args);

    // 删除 ctx 上的 fn
    delete ctx.fn;
    
    return result;
};

// ------------------------------ 测试 ------------------------------

const numbers = [5, 6, 2, 3, 7];

// Function.prototype.__apply()
console.log('Function.prototype.__apply()');

const max = Math.max.__apply(null, numbers);
console.log(max); // 7

// Function.prototype.apply()
console.log('Function.prototype.apply()');

const min = Math.min.apply(null, numbers);
console.log(min); // 2
