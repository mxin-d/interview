/**
 * 模拟 call
 * 使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数
 * @param {object} ctx
 * @param  {...any} args
 * @returns {any} 调用 this 的返回值，若无有返回值，则返回 undefined
 */
Function.prototype.__call = function (ctx = window, ...args) {
    if (typeof this !== 'function') throw new TypeError('Error');

    // 将 this 函数保存在 ctx 上
    ctx.fn = this;

    // 传参执行并保存返回值
    const res = ctx.fn(...args);

    // 删除 ctx 上的 fn
    delete ctx.fn;
    return res;
};

// ------------------------------ 测试 ------------------------------

function Product(name, price) {
    this.name = name;
    this.price = price;
}

// Function.prototype.__call()
console.log('Function.prototype.__call()');

function Food(name, price) {
    Product.__call(this, name, price);
    this.category = 'food';
}
const food = new Food('cheese', 5);
console.log(food);
// Food {name: "cheese", price: 5, category: "food"}
//   category: "food"
//   name: "cheese"
//   price: 5
//   __proto__:
//     constructor: ƒ Food(name, price)
//     __proto__: Object


// Function.prototype.call()
console.log('Function.prototype.call()');

function Toy(name, price) {
    Product.call(this, name, price);
    this.category = 'toy';
}
const toy = new Toy('car', 10);
console.log(toy);
// Toy {name: "car", price: 10, category: "toy"}
//   category: "toy"
//   name: "car"
//   price: 10
//   __proto__:
//     constructor: ƒ Toy(name, price)
//     __proto__: Object
