/**
 * 防抖
 * 事件高频触发，间隔 wait 时长执行回调
 * @param {*} fn
 * @param {*} wait
 */
function debounce(fn, wait) {
    let timeout;
    return function () {
        let __this = this,
            args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(__this, args);
        }, wait);
    };
}

// ------------------------------ 测试 ------------------------------

// debounce()
console.log('debounce()');

window.onresize = debounce(function () {
    console.log('改变窗口大小完毕 1000ms 后执行');
}, 1000);
