/**
 * 模拟 new
 * 1. 创建原型为 constructor.prototype 的新对象 obj
 * 2. 执行构造函数，this 指向 obj
 * 3. 判断构造函数返回值是否为对象，是就返回此对象
 * 4. 构造函数无返回值返回 obj
 * @param {function} constructor
 * @param  {...any} args
 * @returns {object}
 */
function __new(constructor, ...args) {
    if (typeof constructor !== 'function') throw new TypeError('Error');

    // 创建一个空对象，指定原型为constructor.prototype
    const obj = Object.create(constructor.prototype);

    // 执行构造函数，绑定this
    const result = constructor.apply(obj, args);

    // 如果构造函数返回值是一个对象，那么返回该对象， 如果没有就返回 obj
    return result && result instanceof Object ? result : obj;
}

// ------------------------------ 测试 ------------------------------

function Person(name, age) {
    this.name = name;
    this.age = age;
}

// __new
console.log('__new');
const __mxin = __new(Person, '__mxin', 18);
console.log(__mxin);
// Person {name: "__mxin", age: "18"}
//	 age: "18"
//	 name: "__mxin"
//	 __proto__:
//		 constructor: ƒ Person(name, age)
//		 __proto__: Object

// new
console.log('new');
const mxin = new Person('mxin', 18);
console.log(mxin);
// Person {name: "mxin", age: "18"}
//	 age: "18"
//	 name: "mxin"
//	 __proto__:
//		 constructor: ƒ Person(name, age)
//		 __proto__: Object
