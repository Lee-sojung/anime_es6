const btn = document.querySelector("button");
const box = document.querySelector("#box");


btn.addEventListener("click",e=>{
    //animate함수 호출시 첫번째 인수로 선택자
    //두번쨰 인수로 가가 속성명,속성값,지속시간을 객체로 감싸서 인수로 전달
    animate(box,{
        prop: 'margin-left',
        value: 200,
        duration: 800
    })
})

function animate(selector, option){
    const startTime = performance.now();
    requestAnimationFrame(move);

    function move(time){
        let timeLast = time-startTime;
        let progress = timeLast/option.duration;
    
        if(progress < 0) progress = 0;
        if(progress > 1) progress = 1;
        if(progress < 1) requestAnimationFrame(move);
        console.log(timeLast);
    
        //첫번째 인수로 받은 선택자의 스타일 값은 연관배열형태로 지정하고
        //변할 value값에 progress를 곱해서 단계별로 모션이 일어나도록 설정
        selector.style[option.prop] = `${option.value*progress}px`
        //option값은 prop,value,duration을 포함한 값
    }
}

