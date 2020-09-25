/**
 * 事件订阅/发布
 * 1.on 收集 key 对应的回调函数依赖关系，存入 eventList
 * 2.emit 根据第一个参数判断 key 值，并执行其函数依赖
 * 3.remove 根据 key 值清空依赖
 */
class __Event {
    constructor() {
        this.eventList = [];
    }

    on(key, fn) {
        if (!this.eventList[key]) this.eventList[key] = [];
        this.eventList[key].push(fn);
    }

    emit() {
        const key = [].shift.call(arguments);
        const fns = this.eventList[key];

        if (!fns || fns.length === 0) return false;

        for (const fn of fns) {
            fn.apply(this, arguments);
        }
    }

    remove(key) {
        if (!this.eventList[key]) return false;
        this.eventList[key] = null;
        delete this.eventList[key];
    }
}

// ------------------------------ 测试 ------------------------------
// Event
console.log('Event');

const __event = new __Event();

__event.on('name', val => {
    console.log(`info: ${val}`);
    // info: mxin
});

__event.on('name', val => {
    console.log(`info2: ${val}`);
    // info2: mxin
});

// 触发事件，上面两个回调执行对应代码
__event.emit('name', 'mxin');

// 移除事件
__event.remove('name');

// 事件被移除，不再触发
__event.emit('name', 'mxin');

