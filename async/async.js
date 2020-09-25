const NEXT = 'next';
const THROW = 'throw';
/**
 * 模拟 async 函数
 * 1.generator 分割代码片段
 * 2.使用一个函数让其自迭代
 * 3.使用 promise 将 yield 包裹起来
 * 4.执行下一步的时机由 promise 来控制
 * @param {*} fn
 */
function __async(fn) {
    return function () {
        // 获取迭代器实例
        const gen = fn.apply(this, arguments);

        return new Promise((resolve, reject) => {
            // 执行下一步
            function _next(value) {
                __step(gen, resolve, reject, _next, _throw, NEXT, value);
            }
            // 抛异常
            function _throw(err) {
                __step(gen, resolve, reject, _next, _throw, THROW, err);
            }
            // 首次触发
            _next(void 0);
        });
    };
}

/**
 * 执行迭代步骤，处理下次迭代结果
 * 1.将所有值promise化
 * 2.当 promise 执行完之后再执行下一步
 * 3.递归调用 next 函数，直到 done == true
 */
function __step(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        return reject(error);
    }
    // 迭代完成
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

// ------------------------------ 测试 ------------------------------
console.log('async');

__async(function* () {
    const e = yield new Promise(resolve =>
        setTimeout(() => {
            resolve('e');
        }, 1000)
    );
    const a = yield Promise.resolve('a');
    const d = yield 'd';
    const b = yield Promise.resolve('b');
    const c = yield Promise.resolve('c');
    return [a, b, c, d, e];
})().then(
    res => console.log(res) // ['a', 'b', 'c', 'd', 'e']
);
