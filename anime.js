const btn = document.querySelector("button");
const box = document.querySelector("#box");
let num = 0;

btn.addEventListener("click",e=>{
    requestAnimationFrame(move);
})

function move(){
    if(num <= 200) {
        num ++;
        requestAnimationFrame(move)
    }else {
        num = 200;
    }
    box.style.marginLeft = num+'px';
}