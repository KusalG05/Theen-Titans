function open1(){
    var open2=document.getElementById("lobby");
    let id;
    socket=io();
    socket.emit('create_room')
    socket.on('room',(a)=>{
        document.getElementById("room_code").innerHTML=document.getElementById("room_code").innerHTML+a.room_code;
        id=a.id;
    })
    open2.classList.add("lobby_present");  
}

function opened2(){
    var open2=document.getElementById("join");
    let id;
    open2.classList.add("lobby_present");  
}
function opened(){
    socket.emit("join_room");
}
function joinroom(){
    var roomid = document.getElementById("join");
    socket.emit("connect_to_room", roomid);
}

var opens2=document.getElementById("lobby");
function open1(){
    open2.classList.add("lobby_present");  
}

function close1(){
    opens2.classList.remove("lobby_present");  
    document.getElementById("room_code").innerHTML="Your room Code is: ";
}
function close2(){

};

