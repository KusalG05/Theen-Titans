//requiring all the node modules
const express=require('express');
const app=express();
const server=require('http').Server(app);
const { Server } = require("socket.io");
const io = new Server(server);

//----------------------------starting server-----------------------------------------------------------

//This is for mentioning apply css to the html for all css files inside the path given in the argument which in this case is the same directory(__dirname)
app.use(express.static(__dirname));
app.use(express.static(__dirname+"/Profile"));


//---------------------------------play----------------------------------------

//what to do when it recieves a request for the path "/" which is basically the homepath
//req refers to the request variable and res is the response which we can modify
app.get('/', (req, res) => {
    //in response we are sending index.html file
    res.sendFile(__dirname + '/index.html');
});  
app.get('/account', (req, res) => {
    //in response we are sending index.html file
    res.sendFile(__dirname + '/Profile/user.html');
});
//we are listening to the port 3000 for requests
server.listen(3000, () => {
    //once we start listeing we log the message
    console.log('listening on port 3000')
});
app.get('/draw',(req,res)=>{
    res.sendFile(__dirname+"/game.html")
})
//--------------------------------setting up socket connection----------------------------------
player_id=0
word="fish";

players=[]

io.on('connection', (socket) => {
    const id=player_id
    players.push(id);
    socket.emit('id',player_id);
    player_id++;
    io.emit('players',players);
    socket.on('guess',(a)=>{
        if(a.guess==word){
            io.emit('guess',{guess:a.guess,id:id,correct:true});
        }
        else{
            io.emit('guess',{guess:a.guess,id:id,correct:false});
        }
    });
    socket.on('mouse_up',(a)=>{
       socket.broadcast.emit('mouse_up',a);
    });
    socket.on('mouse_move',(a)=>{
        socket.broadcast.emit('mouse_move',a);
    });
    socket.on('mouse_down',(a)=>{
        socket.broadcast.emit('mouse_down',a);
    });
    socket.on('clears',()=>{
        socket.broadcast.emit('clears');
    })
    socket.on('writes',()=>{
        socket.broadcast.emit('writes');;
    });
    socket.on('change_color',(col)=>{
        socket.broadcast.emit('change_color',col);
    });
    socket.on('change_width',(siz)=>{
        socket.broadcast.emit('change_width',siz);
    });
    socket.on('erases',()=>{
        socket.broadcast.emit('erases');
    });
    socket.on('disconnect', function () {
        players = players.filter(function (letter) {
            return letter !== id;
        });
        io.emit('players',players);
    });
});

app.get('/room',(req,res)=>{
        res.sendFile(__dirname+'/drawing.html');
})

app.get('/', (req, res) => {
    //in response we are sending index.html file
    res.sendFile(__dirname + '/drawing.html');
});
//--------------------------------setting up socket connection----------------------------------
player_id=0
zeros=[]
ones=[]
rooms=[]
io.on('connection', (socket) => {    
    const id=player_id
    player_id++;
    io.on('join_room',()=>{
        if(player_id%2==0){
            socket.join("zero");
            zeros.push(id);
            socket.emit('room',{room_code:0,id:player_id});    
        }
        else{
            socket.join("one");
            ones.push(id);
            socket.emit('room',{room_code:1,id:player_id});
        }        
    }
    )
    console.log("yes");
    socket.on('create_room',()=>{
        //var room_code = Math.floor(1000 + Math.random() * 9000);
        //rooms.push(room_code);
        //socket.join(room_code);

    });
    socket.on('connect_to_room',(code)=>{
        if(rooms.includes(code)){
            socket.join(code);
        }
        else{
            alert("No room to connect to");
        }
    })
});
