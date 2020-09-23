/**
 * 深拷贝
 * 深层克隆对象结构
 * @param {object} target
 * @returns {object}
 */
function deepClone(target) {
    // 如果不是对象，直接返回本身
    if (!isObject(target) || target === null) return target;

    // 参数类型校验情况还有很多，没有覆盖全面，可以后期拓展
    if (target instanceof Date) return new Date(target);
    if (target instanceof RegExp) return new RegExp(target);

    const obj = {};
    const stack = [
        {
            parent: obj,
            key: null,
            data: target,
        },
    ];

    while (stack.length) {
        const node = stack.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        let res = key ? (parent[key] = {}) : parent;

        for (const k in data) {
            if (data.hasOwnProperty(k)) {
                if (isObject(data[k])) {
                    stack.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return obj;
}

/**
 * 判断 target 是否为对象
 * @param {*} target
 */
function isObject(target) {
    return Object.prototype.toString.call(target) === '[object Object]';
}
// ------------------------------ 测试 ------------------------------

console.log('deepClone()');

const deepObj = {
    e: {
        f: {
            g: {
                h: 1,
            },
        },
    },
    i: {
        j: {
            k: {
                l: 2,
            },
        },
    },
};

const d = deepClone(deepObj);
d.e.f.g.h = 2;
d.i.j.k.l = 4;

console.log('d', d);
// {e: {…}}
//   e:
//     f:
//       g:
//         h: 2

// 不影响原有对象
console.log('deepObj', deepObj);
// {e: {…}}
//   e:
//     f:
//       g:
//         h: 1
