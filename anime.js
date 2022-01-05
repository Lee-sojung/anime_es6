const btn = document.querySelector("button");
const box = document.querySelector("#box");


btn.addEventListener("click",e=>{
    //animate함수 호출시 첫번째 인수로 선택자
    //두번쨰 인수로 가가 속성명,속성값,지속시간을 객체로 감싸서 인수로 전달
    animate(box,{
        prop: 'margin-left',
        value: 200,
        duration: 800,
        callback: ()=>{
            animate(box,{
                prop: 'margin-top',
                value: 100,
                duration:500
            })
        }
    })
})

function animate(selector, option){
    //옵션에 duration 값이 없더라도 default값으로 500 지정
    //만약에 디폴트로 설정할 값이 많으면 전개연산자로 처리
    if(!option.duration) option.duration = 500
    const startTime = performance.now();
    requestAnimationFrame(move);

    function move(time){
        let timeLast = time-startTime;
        let progress = timeLast/option.duration;
    
        if(progress < 0) progress = 0;
        if(progress > 1) progress = 1;

        if(progress < 1){
            requestAnimationFrame(move);
        //기존모션이 끝났을 때
        }else{
            //옵션 객체에서 callback 프로퍼티 값이 있을때에만 해당함수 호출
            if(option.callback) option.callback();
        } 
        console.log(timeLast);
    
        //첫번째 인수로 받은 선택자의 스타일 값은 연관배열형태로 지정하고
        //변할 value값에 progress를 곱해서 단계별로 모션이 일어나도록 설정
        selector.style[option.prop] = `${option.value*progress}px`
        //option값은 prop,value,duration을 포함한 값
    }
}

