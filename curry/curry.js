/**
 * 柯里化
 * 把接受多个参数的函数变换成接受一个单一参数的函数
 * 并返回接受余下的参数且返回结果的新函数
 */
function curry() {
    const args = [...arguments];

    const fn = function () {
        args.push(...arguments);
        return fn;
    };

    fn.toString = () => {
        return args.reduce((pre, current) => pre + current);
    };
    return fn;
}

// ------------------------------ 测试 ------------------------------

// curry
console.log('curry()');

console.log(curry(1)(2)(3)); // 6
console.log(curry(1, 2, 3)(4)); // 10
console.log(curry(1)(2)(3)(4)(5)); // 15
console.log(curry(2, 6)(1)); // 9
