const btn = document.querySelector("button");
const box = document.querySelector("#box");


btn.addEventListener("click",()=>{
    //animate함수 호출시 첫번째 인수로 선택자
    //두번쨰 인수로 가가 속성명,속성값,지속시간을 객체로 감싸서 인수로 전달
    animate(box,{
        prop: 'margin-left',
        value: "10%",
        duration: 1000
    })
})

function animate(selector, option){
    //옵션에 duration 값이 없더라도 default값으로 500 지정
    //만약에 디폴트로 설정할 값이 많으면 전개연산자로 처리
    if(!option.duration) option.duration = 500
    const startTime = performance.now();
    //selector의 기존 속성값을 구함 pasreInt -> 정수값변경
    let currentValue = parseInt(getComputedStyle(selector)[option.prop]);

    /*
    현재 css파일에서 선택요소의 위치값이 %일때 문제점
    --해당 값을 getComputedStyle로 가져오기 때문에 실제 10%일경우
    10이라는 값을 가지고 오는게 아니라 10%위치에 해당하는 px값이 변환돼서 반환됨
    -->해결방법 : px로 반환된 값을 다시 백분율로 변경해서 다시 반환
    */




    //속성값이 문자열인지에 따라 option.value값을 실수로 보정
    let isString = typeof option.value;
    //만약 이동할 타겟값이 문자값(%)이면
    if(isString==='string'){
        //기존의 px단위의 currentValue값을 다시 백분율 단위로 변경
        //백분율 구할때 window의 넓이값이 아닌 부모요소의 넓이값을 베이스로 연산
        const parentWid = parseInt(getComputedStyle(selector.parentElement).width);
        currentValue= (currentValue/parentWid) * 100;
        option.value = parseFloat(option.value);
    } 
    
    //만약 현재값과 앞으로 변경될 값이 같으면 코드를 실행하지 않고 바로 종료
    if(option.value === currentValue) return;
    //기존값에 따라 알아서 값이 감소, 증가 되므로
    //조건식 없이 두개의 값이 같지만 않으면 무조건 run함수 호출
    requestAnimationFrame(run);

    /*
    if(option.value > currentValue) requestAnimationFrame(run);
    if(option.value < currentValue) requestAnimationFrame(run);
    */




    function run(time){
        let timeLast = time-startTime;
        let progress = timeLast/option.duration;
    
        if(progress < 0) progress = 0;
        if(progress > 1) progress = 1;

        if(progress < 1){
            requestAnimationFrame(run);
        //기존모션이 끝났을 때
        }else{
            //옵션 객체에서 callback 프로퍼티 값이 있을때에만 해당함수 호출
            if(option.callback) option.callback();
        } 
    
        //현재 value값 + ((타겟value - 현재 value)*progress)
        let result = currentValue + ((option.value - currentValue)*progress);

        //만약 isString값이 문자면 뒤에 % 적용 
        //그렇지 않으면 px적용

        if(isString === 'string'){
            selector.style[option.prop] = `${result}%`;
        }else{
            selector.style[option.prop] = `${result}px`;
        }
        
    }

}

