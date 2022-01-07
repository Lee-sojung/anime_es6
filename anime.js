/*
    window.scrollY : 현재 브라우저의 y축 스크롤 거리값 반환
    window.scroll(가로축위치값, 세로축위치값);
*/


const btn = document.querySelector("button");
const box = document.querySelector("#box");

btn.addEventListener("click", e => {
    animate(window, {
        prop: 'scroll',
        value: 500,
        duration: 1000
    })
});

function animate(selector, option) {
    if (!option.duration) option.duration = 500;
    const startTime = performance.now();

    let currentValue = null
    if (option.prop === "scroll") {
        currentValue = selector.scrollY || selector.pageYOffset;
    } else {
        currentValue = parseFloat(getComputedStyle(selector)[option.prop]);
    }

    let isString = typeof option.value;
    if (isString === 'string') {
        const parentWid = parseInt(getComputedStyle(selector.parentElement).width);
        const parentHt = parseInt(getComputedStyle(selector.parentElement).height);
        const x = ['margin-left', 'margin-right', 'left', 'right', 'width'];
        const y = ['margin-top', 'margin-bottom', 'top', 'bottom', 'height'];

        for (let prop of x) {
            if (option.prop === prop) currentValue = (currentValue / parentWid) * 100;
        }
        for (let prop of y) {
            if (option.prop === prop) currentValue = (currentValue / parentHt) * 100;
        }
        option.value = parseFloat(option.value);
    }

    if (option.value === currentValue) return;
    requestAnimationFrame(run);

    function run(time) {
        let timeLast = time - startTime;
        let progress = timeLast / option.duration;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        if (progress < 1) {
            requestAnimationFrame(run);
        } else {
            if (option.callback) option.callback();
        }
        let result = currentValue + ((option.value - currentValue) * progress);

        if (isString === "string") {
            selector.style[option.prop] = `${result}%`;
        }
        else if (option.prop === "opacity") {
            selector.style[option.prop] = result;
        }
        else if (option.prop === "scroll") {
            window.scroll(0, result);
        }
        else {
            selector.style[option.prop] = `${result}px`;
        }
    }
}
