/**
 * 节流
 * 高频事件触发，间隔 delay 时间执行一次回调
 * @param {*} fn
 * @param {*} delay
 */
function throttle(fn, delay) {
    const prevTime = Date.now();
    return function () {
        const curTime = Date.now();
        if (curTime - prevTime > delay) {
            fn.apply(this, arguments);
            prevTime = curTime;
        }
    };
}

// ------------------------------ 测试 ------------------------------

// throttle()
console.log('throttle()');

window.onresize = throttle(function () {
    console.log('间隔 1000ms 执行一次');
}, 1000);
