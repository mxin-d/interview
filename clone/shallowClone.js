/**
 * 浅拷贝
 * 无脑循环，单层克隆
 * @param {object} targetObj
 * @returns {object}
 */
function shallowClone(targetObj) {
    const obj = {};
    for (let key in targetObj) {
        obj[key] = targetObj[key];
    }
    return obj;
}

// ------------------------------ 测试 ------------------------------

console.log('shallowClone()');

const shallowObj = {
    name: 'mxin',
    age: 18,
};

/**
 * 自定义方法
 */
const a = shallowClone(shallowObj);
a.name = '__mxin';
a.age = 20;

console.log('a', a);
// {name: "__mxin", age: 20}
//   age: 20
//   name: "__mxin"

/**
 * 拓展运算符
 */
const b = { ...a };
b.name = '____mxin';
b.age = 22;

console.log('b', b);
// {name: "____mxin", age: 22}
//   age: 22
//   name: "____mxin"

/**
 * Object.assign()
 */
const c = Object.assign({}, shallowObj);
c.name = '______mxin';
c.age = 24;

console.log('c', c);
// {name: "______mxin", age: 24}
//   age: 24
//   name: "______mxin"

// 不影响原有对象
console.log('shallowObj', shallowObj);
// {name: "mxin", age: 18}
//   age: 18
//   name: "mxin"
