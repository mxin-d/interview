/**
 * 使用 extends 继承
 */

// 继承类
class Vehicle {}
class Bus extends Vehicle {}

let b = new Bus();
console.log(b instanceof Bus); // true
console.log(b instanceof Vehicle); // true


// 继承普通构造函数
function Person() {}
class Engineer extends Person {}

let e = new Engineer();
console.log(e instanceof Engineer); // true
console.log(e instanceof Person); // true


/**
 * 寄生式组合继承
 */
function Person(name) {
    this.name = name;
}
function Man(name, age) {
    Person.call(this, name, age);
    this.age = age;
}
Man.prototype = Object.create(Person.prototype);
Man.prototype.constructor = Man;

const man = new Man('mxin', 18);
console.log(man instanceof Man); // true
console.log(man instanceof Person); // true
