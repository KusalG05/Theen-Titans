// //--------------------------play-------------------------
// Execute a function when the user presses a key on the keyboard
var id;
var drawer=false;
var timer
socket.on('room',(a)=>{
    id=a.id;
});

function start_game(){console .log('hi')
    document.getElementById('lobby').style.display='none';
    document.getElementById('game').style.display='block';
    //document.getElementById('body').innerHTML=
    //    "<div class=\"header\"> <img src=\"./resources/img_avatar.png\" alt=\"Avatar\" id=\"profile-img\" />  <h1 style=\"text-align: center;font-family: cursive;background-color: 2px solid black;\">Your room no is 1234 Enjoy!!</h1><button class=\"btn btn-danger logout-btn\">LogOut/Exit</button></div><div class=\"time_count\"><div style=\"text-align: center;background-color: rgb(235, 190, 108);border-top-left-radius: 10px;border-top-right-radius: 10px;border-bottom: 2px solid black;\">Time Remaining</div><div id=\"timer\" style=\"text-align: center\">30</div></div>        <div class=\"choose_box\">          <div style=\"text-align: center;             background-color: rgb(235, 190, 108);              border-top-left-radius: 10px;              border-top-right-radius: 10px;              border-bottom: 2px solid black;            \"    >  Artist now      </div>          <div id=\"choose\" style=\"text-align: center\">Saketh is drawing..</div>        </div>        <div id=\"drawarea\">          <div class=\"row\">           <div class=\"col-8 col-s-8\"><canvas id=\"myCanvas\"       height=\"500px\"                width=\"1000px\"                style=\"border: 8px solid #000000\"              ></canvas>              <div id=\"drawing_tools\">              </div>            </div>            <div id=\"chat_box\" class=\"col-4 col-s-4\">  </div> </div></div>"      
    socket.emit('start_game')

}

socket.on('start_game', ()=>{
    document.getElementById('lobby').style.display='none';
    document.getElementById('game').style.display='block';
})
socket.on('players',(a)=>{
    lobby=document.getElementById('lobby')
    lobby.innerHTML=""
    // for(var i in a){
    //     if(a[i].id==id){
    //         document.getElementById('players').innerHTML=document.getElementById('players').innerHTML+"<li class='list-group-item' style='width:100%; background-color:#81db76'>"+a[i].id+"</li>"
    //     }
    //     else{
    //         document.getElementById('players').innerHTML=document.getElementById('players').innerHTML+"<li class='list-group-item' style='width:100%'>"+a[i].id+"</li>"
    //     }
    // }
    for(var i in a){
        if(a[i].id==id){
           lobby.innerHTML=lobby.innerHTML+"<div class=\"col d-flex align-items-start\"> <div>👤 <h3 class=\"fw-bold mb-0 fs-4\" style=\"background-color: grey\">Player"+a[i].id+"</h3> </div> </div>"
        }
        else{
            lobby.innerHTML=lobby.innerHTML+"<div class=\"col d-flex align-items-start\"> <div>👤 <h3 class=\"fw-bold mb-0 fs-4\">Player"+a[i].id+"</h3> </div> </div>"
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
        document.getElementById("myInput").disabled = true;
    }
    else{
        message=message+a.guess
    }
    document.getElementById("guess").innerHTML=document.getElementById("guess").innerHTML+message+"<br>"
});

socket.on('drawer',(a)=>{
    if(a!=id){
        context.font = "30px Comic Sans MS";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("Player " + a + " is choosing a word...",(canvas.width / 2), (canvas.height / 2));
    }
    else{
        context.font = "30px Comic Sans MS";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("Its your turn choose a word",(canvas.width / 2), (canvas.height / 2));
    }
    socket.emit('whose_drawer',a)
    document.getElementById("id").innerHTML="Your id is "+id    
})

socket.on("choose",(a)=>{
    console.log('recieved');
    document.getElementById('choose').innerHTML="<button onclick=\"send_choice(\'"+String(a.word1)+"\')\">"+String(a.word1)+"</button>"+'\n'+"<button onclick=\"send_choice(\'"+String(a.word2)+"\')\">"+String(a.word2)+"</button>"+'\n'+"<button onclick=\"send_choice(\'"+String(a.word3)+"\')\">"+String(a.word3)+"</button>"
});

socket.on('player_chose',(a)=>{
    document.getElementById("guess_input").innerHTML="<input type=\"text\" id=\"myInput\" style=\"width:100%; height:50px; border:2px solid black; border-radius: 10px;\"/>"
    context.clearRect(0,0,canvas.width,canvas.height);
    var input = document.getElementById("myInput");
    input.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            event.preventDefault();
            passToServer(input.value);
            input.value="";
        }
    });
    socket.emit('word',a);
})

function send_choice(choice){
    socket.emit('chosen',choice)
    canvas.addEventListener('touchstart', touchstart, false);
    canvas.addEventListener('touchmove', touchmove, false);
    canvas.addEventListener('touchend', touchend, false);        
    
    canvas.addEventListener('mousedown', drawstart, false);
    canvas.addEventListener('mousemove', drawmove, false);
    canvas.addEventListener('mouseup', drawend, false);

    document.getElementById("drawing_tools").innerHTML=" <button id=\"trash\" onclick=\"clears()\">🗑️</button>"+'\n'+"<button id=\"pencil\" onclick=\"writes()\">✏️</button>"+'\n'+"<button><img width=\"10\" height=\"20\" src=\"./resources/eraser.png\" alt=\"eraser\" id=\"eraser\" onclick=\"erases()\"/></button> "+'\n'+"<button style=\"background-color: red; width: 30px; height: 30px\" onclick=\"change_color('red')\" ></button>"+'\n'+"<button style=\"background-color: blue; width: 30px; height: 30px\" onclick=\"change_color('blue')\"></button>"+'\n'+"<button style=\"background-color: green; width: 30px; height: 30px\" onclick=\"change_color('green')\"></button>"+'\n'+"<button style=\"background-color: white; width: 30px; height: 30px\" onclick=\"change_color('white')\"></button>"+'\n'+"<button   style=\"background-color: yellow; width: 30px; height: 30px\" onclick=\"change_color('yellow')\"></button>"+'\n'+"<button style=\"background-color: orange; width: 30px; height: 30px\" onclick=\"change_color('orange')\"></button>"+'\n'+"<button style=\"background-color: black; width: 30px; height: 30px\" onclick=\"change_color('black')\"></button>"+'\n'+"<button style=\"background-color: pink; width: 30px; height: 30px\" onclick=\"change_color('pink')\"></button>"+'\n'+"<button style=\"background-color: brown; width: 30px; height: 30px\" onclick=\"change_color('brown')\" ></button>";
    document.getElementById("choose").innerHTML=""
    context.clearRect(0,0,canvas.width,canvas.height);
}

socket.on('restart',()=>{
    socket.emit('start')
})

function passToServer(a){
    console.log("pass")
    console.log(timer)
    socket.emit('guess',{
        guess:a,
        time:timer
    });
};


var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var heightRatio = 0.5;
canvas.height = canvas.width * heightRatio;
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
socket.on('counter',(time)=>{
    timer=time
    document.getElementById('timer').innerHTML=time;
})