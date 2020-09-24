/**
 * 数组扁平化
 * 判断数组中元素类型，如果是数组类型就递归，否则直接 push 到 res 中
 * @param {array} target
 * @param {array} res
 * @returns {array}
 */
function flattenArray(target, res = []) {
    for (const val of target) {
        if (Array.isArray(val)) {
            flattenArray(val, res);
        } else {
            res.push(val);
        }
    }
    return res;
}

/**
 * 使用 Array.prototype.reduce()
 * @param {array} target
 */
function flattenArrayByReduce(target) {
    const initPre = [];
    return target.reduce(
        (pre, current) =>
            pre.concat(
                Array.isArray(current) ? flattenArrayByReduce(current) : current
            ),
        initPre
    );
}

// ------------------------------ 测试 ------------------------------

console.log('flattenArray()');

const array = [[0], 1, [2, [3, [4, [5, [6]]]]], [7, [8]]];

/**
 * 递归
 */
console.log(flattenArray(array));
// [0, 1, 2, 3, 4, 5, 6, 7, 8]

/**
 * Array.prototype.flat()
 */
console.log(array.flat(Number.MAX_SAFE_INTEGER));
// [0, 1, 2, 3, 4, 5, 6, 7, 8]

/**
 * Array.prototype.reduce()
 */
console.log(flattenArrayByReduce(array));
// [0, 1, 2, 3, 4, 5, 6, 7, 8]
