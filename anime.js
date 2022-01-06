const btn = document.querySelector("button");
const box = document.querySelector("#box");


btn.addEventListener("click",e=>{
    //animate함수 호출시 첫번째 인수로 선택자
    //두번쨰 인수로 가가 속성명,속성값,지속시간을 객체로 감싸서 인수로 전달
    animate(box,{
        prop: 'margin-left',
        value: 100,
        duration: 1000
    })
})

function animate(selector, option){
    //옵션에 duration 값이 없더라도 default값으로 500 지정
    //만약에 디폴트로 설정할 값이 많으면 전개연산자로 처리
    if(!option.duration) option.duration = 500
    const startTime = performance.now();

    //selector의 기존 속성값을 구함
    const currentValue = parseInt(getComputedStyle(selector)[option.prop]);
    
    //만약 현재값과 앞으로 변경될 값이 같으면 코드를 실행하지 않고 바로 종료
    if(option.value === currentValue) return;

    //만약 앞으로 변경될 값이 현재값보다 더 크면 plus함수를 호출
    if(option.value > currentValue) requestAnimationFrame(plus);

    //만약 앞으로 변경될 값이 현재값보다 더 작으면 minus함수를 호출
    if(option.value < currentValue) requestAnimationFrame(minus);



    function plus(time){
        let timeLast = time-startTime;
        let progress = timeLast/option.duration;
    
        if(progress < 0) progress = 0;
        if(progress > 1) progress = 1;

        if(progress < 1){
            requestAnimationFrame(plus);
        //기존모션이 끝났을 때
        }else{
            //옵션 객체에서 callback 프로퍼티 값이 있을때에만 해당함수 호출
            if(option.callback) option.callback();
        } 
    
        //현재 value값 + ((타겟value - 현재 value)*progress)
        let result = currentValue + ((option.value - currentValue)*progress);
        selector.style[option.prop] = `${result}px`;
    }

    function minus(time){
        let timeLast = time-startTime;
        let progress = timeLast/option.duration;
    
        if(progress < 0) progress = 0;
        if(progress > 1) progress = 1;

        if(progress < 1){
            requestAnimationFrame(minus);
        //기존모션이 끝났을 때
        }else{
            //옵션 객체에서 callback 프로퍼티 값이 있을때에만 해당함수 호출
            if(option.callback) option.callback();
        } 
    
        //현재 value값 + ((타겟value - 현재 value)*progress)
        let result = currentValue - ((currentValue - option.value)*progress);
        selector.style[option.prop] = `${result}px`;
    }
}

