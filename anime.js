const btn = document.querySelector("button");
const box = document.querySelector("#box");
const speed = 500;
let num = 0;
let startTime = null;

btn.addEventListener("click",e=>{
    requestAnimationFrame(move);

    startTime = performance.now();
    console.log(startTime);
})

function move(time){
    //move함수가 반복이 될때마다 누적시간 time에서
    //버튼을 클릭한 시점의 시간인 startTime을 빼주면
    //timeLast는 버튼을 클릭한 시점부터 move함수가  반복되는 누적 시간값을 나타냄

    let timeLast = time-startTime;
    console.log(timeLast);


    if(num <= 200) {
        num ++;
        requestAnimationFrame(move)
    }else {
        num = 200;
    }
    box.style.marginLeft = num+'px';
}