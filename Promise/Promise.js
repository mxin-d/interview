const isFunction = variable => typeof variable === 'function';

// 定义Promise的三种状态常量
const PENDING = 'pending';
const RESOLVE = 'resolved';
const REJECTED = 'rejected';

class __Promise {
    constructor(fn) {
        this.__status = PENDING;
        // 储存 value，用于 __then 返回
        this.__value = null;
        // 失败队列，在 __then 时注入，resolve 时触发
        this.__rejectedQueues = [];
        // 成功队列，在 __then 时注入，resolve 时触发
        this.__resolvedQueues = [];

        try {
            fn(this.__resolve, this.__reject);
        } catch (err) {
            this.__reject(err);
        }
    }

    __resolve = val => {
        const run = () => {
            if (this.__status !== PENDING) return;
            this.__status = RESOLVE;

            // 依次执行成功队列中的函数，并清空队列
            const runResolved = value => {
                let cb;
                while ((cb = this.__resolvedQueues.shift())) {
                    cb(value);
                }
            };

            // 依次执行失败队列中的函数，并清空队列
            const runRejected = error => {
                let cb;
                while ((cb = this.__rejectedQueues.shift())) {
                    cb(error);
                }
            };

            /*
             * 如果 resolve 的参数为 Promise 对象，
             * 则必须等待该 Promise 对象状态改变后当前 Promsie 的状态才会改变
             * 且状态取决于参数 Promsie 对象的状态
             */
            if (val instanceof __Promise) {
                val.__then(
                    value => {
                        this.__value = value;
                        runResolved(value);
                    },
                    err => {
                        this.__value = err;
                        runRejected(err);
                    }
                );
            } else {
                this.__value = val;
                runResolved(val);
            }
        };

        // 异步调用
        setTimeout(run);
    };

    __reject = err => {
        if (this.__status !== PENDING) return;

        const run = () => {
            this.__status = REJECTED;
            this.__value = err;
            let cb;
            while ((cb = this.__rejectedQueues.shift())) {
                cb(err);
            }
        };

        setTimeout(run);
    };

    __then(onResolved, onRejected) {
        const { __value, __status } = this;

        return new __Promise((onResolvedNext, onRejectedNext) => {
            const resolved = value => {
                try {
                    if (!isFunction(onResolved)) {
                        onResolvedNext(value);
                    } else {
                        const res = onResolved(value);

                        if (res instanceof __Promise) {
                            // 如果当前回调函数返回__Promise对象，必须等待其状态改变后在执行下一个回调
                            res.__then(onResolvedNext, onRejectedNext);
                        } else {
                            // 否则会将返回结果直接作为参数，传入下一个 __then 的回调函数，并立即执行下一个 __then 的回调函数
                            onResolvedNext(res);
                        }
                    }
                } catch (err) {
                    onRejectedNext(err);
                }
            };

            const rejected = error => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(error);
                    } else {
                        const res = onRejected(error);

                        if (res instanceof __Promise) {
                            res.__then(onResolvedNext, onRejectedNext);
                        } else {
                            onResolvedNext(res);
                        }
                    }
                } catch (err) {
                    onRejectedNext(err);
                }
            };

            if (__status === PENDING) {
                this.__resolvedQueues.push(resolved);
                this.__rejectedQueues.push(rejected);
            }

            if (__status === RESOLVE) resolved(__value);

            if (__status === REJECTED) rejected(__value);
        });
    }

    __catch(onRejected) {
        return this.__then(null, onRejected);
    }

    __finally(cb) {
        return this.__then(
            value => __Promise.resolve(cb()).__then(() => value),
            reason =>
                __Promise.resolve(cb()).__then(() => {
                    throw new Error(reason);
                })
        );
    }

    static resolve(value) {
        // 如果参数是 __Promise 实例，直接返回这个实例
        if (value instanceof __Promise) return value;
        return new __Promise(resolve => resolve(value));
    }

    static reject(value) {
        return new __Promise((resolve, reject) => reject(value));
    }

    static all(list) {
        return new __Promise((resolve, reject) => {
            const values = [];
            let count = 0;

            for (const [i, p] of list.entries()) {
                // 数组参数如果不是 __Promise 实例，先调用 __Promise.resolve
                this.resolve(p).__then(
                    res => {
                        values[i] = res;
                        count++;
                        // 所有状态都变成 resolved 时返回的 __Promise 状态就变成 resolved
                        if (count === list.length) resolve(values);
                    },
                    err => {
                        // 有一个被 rejected 时返回的 __Promise 状态就变成 rejected
                        reject(err);
                    }
                );
            }
        });
    }

    static race(list) {
        return new __Promise((resolve, reject) => {
            list.forEach(p => {
                this.resolve(p).__then(
                    res => {
                        resolve(res);
                    },
                    err => {
                        reject(err);
                    }
                );
            });
        });
    }
}

// ------------------------------ 测试 ------------------------------

console.log('class __Promise {}');

const p1 = new __Promise((resolve, reject) =>
    setTimeout(() => {
        resolve('mxin');
    }, 500)
);
const p2 = new __Promise((resolve, reject) =>
    setTimeout(() => {
        resolve('__mxin');
    }, 200)
);
const p3 = new __Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('mxin3'));
    }, 100);
});

// 测试 __resolve __then __finally
new __Promise((resolve, reject) => {
    resolve('mxin');
})
    .__then(res => {
        console.log('__resolve:', res);
    })
    .__finally(() => {
        console.log('__resolve finally');
    });

// 测试 __reject __catch __finally
new __Promise((resolve, reject) => {
    reject(new Error());
})
    .__catch(e => {
        console.log('__reject:', e);
    })
    .__finally(() => {
        console.log('__reject finally');
    });

// 测试 static resolve
__Promise
    .resolve('mxin')
    .__then(res => console.log('static resolve:', res))
    .__finally(() => console.log('static resolve finally'));

// 测试 static reject
__Promise
    .reject(new Error())
    .__catch(res => console.log('static reject:', res))
    .__finally(() => console.log('static reject finally'));

// 测试 all，可添加 p3 测试 rejected 状态
__Promise
    .all([p1, p2])
    .__then(res => console.log('all resolve:', res))
    .__catch(e => console.log('all reject', e))
    .__finally(() => console.log('all finally'));

// 测试 race，速度快的优先返回并结束, 添加 p3 优先 reject
__Promise
    .race([p1, p2])
    .__then(res => console.log('race resolve:', res))
    .__catch(e => console.log('race reject', e))
    .__finally(() => console.log('race finally'));
