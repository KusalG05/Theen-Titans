// //--------------------------play-------------------------
var input = document.getElementById("myInput");

// Execute a function when the user presses a key on the keyboard
var id;
var drawer=false;

socket.on('room',(a)=>{
    id=a.id;
    if(id%2==0){
        input.addEventListener("keypress", function(event) {
            // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
              event.preventDefault();
              passToServer(input.value);
              input.value="";
            }
        });
        document.getElementById("drawing_tools").innerHTML=""; 
    }
    else{
            canvas.addEventListener('touchstart', touchstart, false);
            canvas.addEventListener('touchmove', touchmove, false);
            canvas.addEventListener('touchend', touchend, false);        
            
            canvas.addEventListener('mousedown', drawstart, false);
            canvas.addEventListener('mousemove', drawmove, false);
            canvas.addEventListener('mouseup', drawend, false);
            document.getElementById("guess_input").innerHTML="";   
    }
    document.getElementById("id").innerHTML="Your id is "+id
});

socket.on('players',(a)=>{
    document.getElementById('players').innerHTML=""
    console.log('hi')
    console.log(a);
    for(var i in a){
        console.log(a[i]);
        console.log(document.getElementById('players').innerHTML);
        if(a[i]==id){
            document.getElementById('players').innerHTML=document.getElementById('players').innerHTML+"<li class='list-group-item' style='width:750px; background-color:#81db76'>"+a[i]+"</li>"
        }
        else{
            document.getElementById('players').innerHTML=document.getElementById('players').innerHTML+"<li class='list-group-item' style='width:750px'>"+a[i]+"</li>"
        }
    }
})

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


var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var eraser=false;

var draw = false;

function clears(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit('clears',);
}

function writes(){
    eraser=false;
    context.lineWidth=1;
    context.strokeStyle='#000000';
    socket.emit('writes',);
}

function change_color(col){
    eraser=false;
    context.strokeStyle=col;
    socket.emit('change_color',col);
}

function change_width(siz){
    context.lineWidth=siz;
    socket.emit('change_width',siz);
}

function erases(){
    eraser=true;
    socket.emit('erases',);
}

function drawstart(event) {
    context.beginPath();
    context.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    draw = true;
    socket.emit('mouse_down',{
        x:event.pageX,
        y:event.pageY
    });
}

function drawmove(event) {
    if (!draw) return;
    if(eraser){
        context.lineWidth = 40;
        context.strokeStyle= "#FFFFFF";
    }  
    context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    context.stroke();
    socket.emit('mouse_move',{
        x:event.pageX,
        y:event.pageY
    });
}

function drawend(event) {
    if (!draw) return;
    drawmove(event);
    draw = false;
    socket.emit('mouse_up',{
        x:event.pageX,
        y:event.pageY
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

socket.on('mouse_down',(event)=>{
    context.beginPath();
    context.moveTo(event.x - canvas.offsetLeft, event.y - canvas.offsetTop);
    draw = true;
});
socket.on('mouse_move',(event)=>{
    if (!draw) return;
    if(eraser){
        context.lineWidth = 40;
        context.strokeStyle= "#FFFFFF";
    }  
    context.lineTo(event.x - canvas.offsetLeft, event.y - canvas.offsetTop);
    context.stroke();
});
socket.on('mouse_up',(event)=>{
    if (!draw) return;
    if(eraser){
        context.lineWidth = 40;
        context.strokeStyle= "#FFFFFF";
    }  
    context.lineTo(event.x - canvas.offsetLeft, event.y - canvas.offsetTop);
    context.stroke();
    draw = false;
});

socket.on('clears',()=>{
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height); 
});
socket.on('writes',()=>{
    eraser=false;
    context.lineWidth=1;
    context.strokeStyle='#000000';
});
socket.on('change_color',(col)=>{
    eraser=false;
    context.strokeStyle=col;
});

socket.on('change_width',(siz)=>{
    eraser=false;
    context.lineWidth=siz;
});
socket.on('erases',()=>{
    eraser=true;
});