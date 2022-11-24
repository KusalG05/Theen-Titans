function opened2(){
    var open2=document.getElementById("join");
    var open=document.getElementById("trail");
    let id;
    open2.classList.add("lobby_present");
    open.classList.add("blurrer");  
}
function joinroom(){
    var roomid = document.getElementById("code").value;
    socket.emit("room_code", roomid);
}

function close1(){
    var open2=document.getElementById("join");
    open2.classList.remove("lobby_present");  
    var open=document.getElementById("trail");
    open.classList.remove("blurrer");
}
