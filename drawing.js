const socket=io();
var open2=document.getElementById("lobby");
function open1(){
    open2.classList.add("lobby_present");  
}

function close1(){
    open2.classList.remove("lobby_present");  
}


//--------------------------guess-------------------------
var input = document.getElementById("myInput");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    event.preventDefault();
    passToServer(input.value);
    input.value="";
  }
});
let id;
socket.on('id',(a)=>{
    id=a
    document.getElementById("id").innerHTML="Your id is "+id
});
socket.on('guess',(a)=>{
    let message=""
    if(a.id==id){
        message=message+"you guessed "
    }
    else{
        message=message+"player "+a.id+" guessed "
    }
    if(a.correct){
        message=message+"correct word"
    }
    else{
        message=message+a.guess
    }
    document.getElementById("guess").innerHTML=document.getElementById("guess").innerHTML+message+"<br>"
});
function passToServer(a){
    socket.emit('guess',{
        guess:a,
    });
};




//----------------------------------draw--------------------------------------------------------------------
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var eraser=false;

var draw = false;

function clears(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function writes(){
    eraser=false;
    context.lineWidth=1;
    context.strokeStyle='#000000'
}

function change_color(col){
    context.strokeStyle=col
}

function change_width(siz){
    context.lineWidth=siz;
}

function erases(){
    eraser=true;
}

function drawstart(event) {
    socket.emit('mouse_down',{
        id:id,
        event:event,
    });
}

function drawmove(event) {
    socket.emit('mouse_move',{
        id:id,
        event:event,
    });
}

function drawend(event) {
    socket.emit('mouse_up',{
        id:id,
        event:event,
    });
}

function touchstart(event) {
    drawstart(event.touches[0]);
}

function touchmove(event) {
    event.preventDefault();
    drawmove(event.touches[0]);
}

function touchend(event) { 
    drawend(event.changedTouches[0]) 
}

canvas.addEventListener('touchstart', touchstart, false);
canvas.addEventListener('touchmove', touchmove, false);
canvas.addEventListener('touchend', touchend, false);        

canvas.addEventListener('mousedown', drawstart, false);
canvas.addEventListener('mousemove', drawmove, false);
canvas.addEventListener('mouseup', drawend, false);

socket.on('mouse_down',(event)=>{
    context.beginPath();
    context.moveTo(event.event.pageX - canvas.offsetLeft, event.event.pageY - canvas.offsetTop);
    draw = true;
});
socket.on('mouse_move',(event)=>{
    if (!draw) return;
    if(eraser){
        context.lineWidth = 40;
        context.strokeStyle= "#FFFFFF";
    }
    console.log("no");
    context.lineTo(event.event.pageX - canvas.offsetLeft, event.event.pageY - canvas.offsetTop);
    context.stroke();
});
socket.on('mouse_up',(event)=>{
    if (!draw) return;
    drawmove(event.event);
    draw = false;
});