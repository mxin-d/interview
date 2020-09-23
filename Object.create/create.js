/**
 * 模拟 Object.create
 * 创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
 * @param {object} prototype 新创建对象的原型对象，为 null 时 只能使用 Object.create()
 * @param {object} properties 访问器描述符，同 Object.defineProperties 第二个参数
 * @returns {object}
 */
function __create(prototype, properties) {
    if (typeof prototype !== 'object') throw new TypeError('Error');

    function Constructor() {}
    Constructor.prototype = prototype;

    const obj = new Constructor();

    if (prototype) obj.constructor = Constructor;

    // 设置访问器描述符
    if (properties) {
        if (typeof properties !== 'object') throw TypeError('Error');
        Object.defineProperties(obj, properties);
    }

    return obj;
}

// ------------------------------ 测试 ------------------------------

const person = {
    isHuman: false,
    printIntroduction: function () {
        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    },
};

// __create()
console.log('__create()');

const __me = __create(person);
__me.name = '__mxin';
__me.isHuman = true;
__me.printIntroduction();

// Object.create()
console.log('Object.create()');

const me = Object.create(person);
me.name = 'mxin';
me.isHuman = true;
me.printIntroduction();

// 目前创建纯净空对象只有 Object.create(null) 可行，无法模拟
const emptyObj = Object.create(null);
console.log(emptyObj);
// {}
//    No properties
