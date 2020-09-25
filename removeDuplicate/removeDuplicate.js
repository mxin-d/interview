/**
 * 数组去重
 * 基于对象实现，也可以使用 Map
 * @param {array} target
 * @returns {array}
 */
function removeDuplicate(target) {
    const temp = {};
    for (let i = 0; i < target.length; i++) {
        const item = target[i];
        if (
            Object.prototype.toString.call(item) !== '[object Object]' &&
            Object.prototype.toString.call(item) !== '[object Function]' &&
            Object.prototype.toString.call(item) !== '[object Symbol]' &&
            Object.prototype.toString.call(item) !== '[object Array]'
        ) {
            if (temp.hasOwnProperty(item)) {
                target[i] = target[target.length - 1];
                target.length--;
                i--;
            }
        }
        temp[item] = item;
    }
    return target;
}

// ------------------------------ 测试 ------------------------------

console.log('removeDuplicate()');

const array = [
    1,
    1,
    '2',
    '2',
    true,
    true,
    false,
    false,
    undefined,
    undefined,
    null,
    null,
    Symbol('3'),
    Symbol('3'),
    {},
    {},
    [],
    [],
];

console.log(removeDuplicate(array));

