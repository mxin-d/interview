/**
 * 模拟 Object.is
 * 判断两个值是否为同一个值
 * 1. 都是 undefined
 * 2. 都是 null
 * 3. 都是 true 或 false
 * 4. 都是相同长度的字符串且相同字符按相同顺序排列
 * 5. 都是相同对象（意味着每个对象有同一个引用）
 * 6. 都是数字且
 *    a. 都是 +0
 *    b. 都是 -0
 *    c. 都是 NaN
 *    d. 或都是非零而且非 NaN 且为同一个值
 * @param {*} x
 * @param {*} y
 */
function __is(x, y) {
    if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
    } else {
        return x !== x && y !== y;
    }
}

// ------------------------------ 测试 ------------------------------

// __is()
console.log('__is()');

console.log(`__is('foo', 'foo'): ${__is('foo', 'foo')}`); // true
console.log(`__is('foo', 'bar'): ${__is('foo', 'bar')}`); // false

const __foo = { a: 1 };
const __bar = { a: 1 };
console.log(`__is(__foo, __foo): ${__is(__foo, __foo)}`); // true
console.log(`__is(__foo, __bar): ${__is(__foo, __bar)}`); // false
console.log(`__is(window, window): ${__is(window, window)}`); // true
console.log(`__is([], []): ${__is([], [])}`); // false
console.log(`__is(null, null): ${__is(null, null)}`); // true

// 特例
console.log(`__is(0, -0): ${__is(0, -0)}`); // false
console.log(`__is(0, +0): ${__is(0, +0)}`); // true
console.log(`__is(-0, -0): ${__is(-0, -0)}`); // true
console.log(`__is(NaN, 0 / 0): ${__is(NaN, 0 / 0)}`); // true


// Object.is()
console.log('Object.is()');

console.log(`Object.is('foo', 'foo'): ${Object.is('foo', 'foo')}`); // true
console.log(`Object.is('foo', 'bar'): ${Object.is('foo', 'bar')}`); // false

const foo = { a: 1 };
const bar = { a: 1 };
console.log(`Object.is(foo, foo): ${Object.is(foo, foo)}`); // true
console.log(`Object.is(foo, bar): ${Object.is(foo, bar)}`); // false
console.log(`Object.is(window, window): ${Object.is(window, window)}`); // true
console.log(`Object.is([], []): ${Object.is([], [])}`); // false
console.log(`Object.is(null, null): ${Object.is(null, null)}`); // true

// 特例
console.log(`Object.is(0, -0): ${Object.is(0, -0)}`); // false
console.log(`Object.is(0, +0): ${Object.is(0, +0)}`); // true
console.log(`Object.is(-0, -0): ${Object.is(-0, -0)}`); // true
console.log(`Object.is(NaN, 0 / 0): ${Object.is(NaN, 0 / 0)}`); // true
