// initializing canvas
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var heightRatio = 0.5;
canvas.height = canvas.width * heightRatio;
var eraser=false;
var draw = false; 
var guesses=0;
//initializing id
var id;
socket.on('room',(a)=>{
    id=a;
});

// recieving players list and adding html elements in game lobby/player list depending if the game has started
socket.on('players',(a)=>{
    game_players=document.getElementById('game_players')
    game_players.innerHTML=""
    for(var i in a){    
        if(a[i].id==id){
            game_players.innerHTML=game_players.innerHTML+"<li class='list-group-item' style='width:100%; background-color:#81db76'>"+a[i].id+"   -    "+a[i].score+"</li>"
        }
        else{
            game_players.innerHTML=game_players.innerHTML+"<li class='list-group-item' style='width:100%'>"+a[i].id+"   -    "+a[i].score+"</li>"
        }
    }
    lobby=document.getElementById('players')
    lobby.innerHTML=""
    for(var i in a){
        if(a[i].id==id){
            lobby.innerHTML=lobby.innerHTML+"<div class=\"col d-flex align-items-start\"> <div>👤 <h3 class=\"fw-bold mb-0 fs-4\" style=\"background-color: grey\">Player"+a[i].id+"</h3> </div> </div>"
        }
        else{
            lobby.innerHTML=lobby.innerHTML+"<div class=\"col d-flex align-items-start\"> <div>👤 <h3 class=\"fw-bold mb-0 fs-4\">Player"+a[i].id+"</h3> </div> </div>"
        }
    } 
})

//on clicking play the function is called, game page is loaded and socket emits start_game
function start_game(){ //for starting player
    document.getElementById('lobby').style.display='none';
    document.getElementById('game').style.display='block';
    start=true;
    socket.emit('start_game')
}

socket.on('start_game', ()=>{// for other player
    document.getElementById('lobby').style.display='none';
    document.getElementById('game').style.display='block';
    start=true;
})

//information about the drawer is sent and let its socket know
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
    socket.emit('who_is_drawer',a)  
})


//---------------------------------------Drawer---------------------------------------------------
//the drawer server sends the list of words and they get displayed
socket.on("choose",(a)=>{
    document.getElementById('choose').innerHTML="<button onclick=\"send_choice(\'"+String(a.word1)+"\')\">"+String(a.word1)+"</button>"+'\n'+"<button onclick=\"send_choice(\'"+String(a.word2)+"\')\">"+String(a.word2)+"</button>"+'\n'+"<button onclick=\"send_choice(\'"+String(a.word3)+"\')\">"+String(a.word3)+"</button>"
});

//once the choice is chosen the round starts and the drawign tools are visible
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


//drawing functions
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

function clears(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit('clears',);
}

//-------------------------guessers------------------------------
//the server of the drawer sends to the client of the guessers
socket.on('player_chose',(a)=>{
    // guess bar gets activated
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
    socket.emit('word',a); // the guesser client sends the word to the guesser server
})

//sending the guessed word to the server
function passToServer(a){
    socket.emit('guess',{
        guess:a,
        time:timer,
        guesses:guesses
    });
};

//getting the guessed word from server
socket.on('guess',(a)=>{
    let message=""
    if(a.id==id){
        message=message+"you guessed "
        if(a.correct){
            guesses+1
            console.log(guesses)
            message=message+"correct word"
            document.getElementById("myInput").disabled = true;
        }
        else{
            message=message+a.guess
        }
    }
    else{
        message=message+"player "+a.id+" guessed "
        if(a.correct){
            guesses+1
            message=message+"correct word"
        }
        else{
            message=message+a.guess
        }
    }
    document.getElementById("guess").innerHTML=document.getElementById("guess").innerHTML+message+"<br>"
});

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


//-------------------------counter --------------------
socket.on('counter',(time)=>{
    timer=time
    document.getElementById('timer').innerHTML=time;
})

//-----------------------------------game restart/over--------------------------------
socket.on('restart',()=>{
    socket.emit('start')
})

socket.on('over',(a)=>{
    document.getElementById('lobby').style.display='block';
    document.getElementById('game').style.display='none';
    var sorted_scores=a.sort((a,b)=>{return -a.score+b.score})
    final_scores=document.getElementById('final_scores')
    final_scores.innerHTML="The winner is "+sorted_scores[0].id
    for(var i in sorted_scores){
        final_scores.innerHTML = final_scores.innerHTML+"<li class='list-group-item' style='width:100%; background-color:#81db76'>"+sorted_scores[i].id+"   -    "+sorted_scores[i].score+"</li>"
    }
    document.getElementById("startgame").innerHTML='Play Again'
})