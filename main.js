function opened2(){
    var open2=document.getElementById("join");
    let id;
    open2.classList.add("lobby_present");  
}
function joinroom(){
    var roomid = document.getElementById("code").value;
    socket.emit("room_code", roomid);
}
// socket.on('íspresent', (a)=>{
//     if(a){
//         fetch( '/game' )
//         .then( response => response.text() )
//         .then( response => {
//             // Do something with response.
//             document.body.innerHTML=response;
//         } );
//     }
//     else{
//         document.getElementById('join').innerHTML=document.getElementById('join').innerHTML+"<h1>the following room does not exist</h1>"
//     }
// })

































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
