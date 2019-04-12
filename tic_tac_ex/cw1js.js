var mark="O";
function fun(b_id){
    var d = document.getElementById(b_id);
    if(mark=="X"){
        d.innerText="O";
        mark="O";
    }
    else{
        d.innerText="X";
        mark="X";
    }
    d.disabled=true;
    checkwin();
}   
function checkwin(){
    var b1=document.getElementById("a");
    var b2=document.getElementById("b");
    var b3=document.getElementById("c");
    if(b1.innerText==b2.innerText && b2.innerText==b3.innerText){
        document.getElementById("result").innerText=b1.innerText + " Wins";
    }

}
