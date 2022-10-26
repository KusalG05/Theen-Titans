//const socket=io();

// socket.on('code',(data)=>{
//     console.log(data.code);
//     document.getElementsByClassName("test").innerHTML=data.code;

var open2=document.getElementById("lobby");
function open1(){
    open2.classList.add("lobby_present");  
}

function close1(){
    open2.classList.remove("lobby_present");  
}