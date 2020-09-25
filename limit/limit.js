/**
 * 异步分片处理并发
 * 1.通过 limitNum 限制并发的 promise 数量
 * 2.临时结果保存到 resArr 中
 * 3.start 返回 promise，全部执行完毕 finally 中 resolve 最终结果
 */
class Limit {
    constructor(limitNum, promiseList) {
        this.resArr = [];
        this.handling = 0;
        this.resolvedNum = 0;
        this.limitNum = limitNum;
        this.promiseList = promiseList;
        this.runTime = this.promiseList.length;
    }

    handle(promise) {
        console.log(promise, this.handling);
        return new Promise((resolve, reject) => {
            promise.then(res => resolve(res)).catch(e => reject(e));
        });
    }

    start() {
        const __this = this;
        return new Promise(resolve => {
            const run = () => {
                if (!__this.promiseList.length) return;
                __this.handling += 1;
                __this
                    .handle(__this.promiseList.shift())
                    .then(res => {
                        __this.resArr.push(res);
                    })
                    .catch(e => {
                        const error = new Error(e);
                        __this.resArr.push(error);
                    })
                    .finally(() => {
                        __this.handling -= 1;
                        __this.resolvedNum += 1;
                        if (__this.resolvedNum === __this.runTime) {
                            resolve(__this.resArr);
                        }
                        run();
                    });
            };

            for (let i = 1; i <= __this.limitNum; i++) {
                run();
            }
        });
    }
}

// ------------------------------ 测试 ------------------------------
console.log('Limit');

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 1000);
});
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(3);
    }, 2000);
});
const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(4);
    }, 2000);
});
const p5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(5);
    }, 3000);
});
const p6 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(6);
    }, 3000);
});
const promiseList = [p1, p2, p3, p4, p5, p6];

const limit = new Limit(2, promiseList);

limit.start().then(res => {
    console.log(res);
});
