const btn = document.querySelector("button");
const box = document.querySelector("#box");
const speed = 500;
let startTime = null;
let timer = null;

btn.addEventListener("click",e=>{
    timer = requestAnimationFrame(move);

    startTime = performance.now();
    console.log(startTime);
})

function move(time){
    //move함수가 반복이 될때마다 누적시간 time에서
    //버튼을 클릭한 시점의 시간인 startTime을 빼주면
    //timeLast는 버튼을 클릭한 시점부터 move함수가  반복되는 누적 시간값을 나타냄

    let timeLast = time-startTime;

    //진행률 (반복된 누적시간 / 전체시간)
    let progress = timeLast/speed;

    //약간의 오차가 발생하더라도 진행률을 0-1까지로 보정
    if(progress < 0) progress = 0;
    if(progress > 1) progress = 1;

    if(progress < 1){
        timer = requestAnimationFrame(move);
    }else{
        cancelAnimationFrame(timer);
    }

    console.log(`현재반복까지 걸린시간: ${timeLast} / 현재 반복까지의 진행률: ${progress}`);
}