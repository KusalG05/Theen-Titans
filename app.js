//requiring all the node modules
const express=require('express');
const app=express();
const server=require('http').Server(app);
const { Server } = require("socket.io");
const io = new Server(server);
const room_socket = new Server(server);
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
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

room_socket.on('connection', (socket) => {
    room_codes=[1234,2345,3456,4567,5678,6789,7890];
    socket.on('room_code', (room_code) => {
        console.log(room_codes.includes(parseInt(room_code)));
        room_socket.emit('íspresent', room_codes.includes(parseInt(room_code)));
    })
    
})

//--------------------------------setting up socket connection----------------------------------
player_id=0
zeros=[]
ones=[]
rooms=[]
io.on('connection', (socket) => {    
    const id=player_id
    player_id=player_id+1;
    if(((player_id))%2==0){
        socket.join("zero");
        zeros.push(id);
        socket.emit('room',{room_code:0,id:player_id/2});  
        io.emit('players',ones);
        socket.on('guess',(a)=>{    
            if(a.guess==word){
                io.to("zero").emit('guess',{guess:a.guess,id:id,correct:true});
            }
            else{
                io.to("zero").emit('guess',{guess:a.guess,id:id,correct:false});
            }
        });
        socket.on('mouse_up',(a)=>{
        socket.to("zero").emit('mouse_up',a);
        });
        socket.on('mouse_move',(a)=>{
            socket.to("zero").emit('mouse_move',a);
        });
        socket.on('mouse_down',(a)=>{
            socket.to("zero").emit('mouse_down',a);
        });
        socket.on('clears',()=>{
            socket.to("zero").emit('clears');
        })
        socket.on('writes',()=>{
            socket.to("zero").emit('writes');;
        });
        socket.on('change_color',(col)=>{
            socket.to("zero").emit('change_color',col);
        });
        socket.on('change_width',(siz)=>{
            socket.to("zero").emit('change_width',siz);
        });
        socket.on('erases',()=>{
            socket.to("zero").emit('erases');
        });
        socket.on('disconnect', function () {
            zeros = zeros.filter(function (letter) {
                return letter !== id;
            });
            io.to("zero").emit('players',zeros);
        });
    }
    else{
        socket.join("one");
        ones.push(id);
        socket.emit('room',{room_code:1,id:(player_id-1)/2});
        io.emit('players',ones);
        socket.on('guess',(a)=>{
            if(a.guess==word){
                io.to("one").emit('guess',{guess:a.guess,id:id,correct:true});
            }
            else{
                io.to("one").emit('guess',{guess:a.guess,id:id,correct:false});
            }
        });
        socket.on('mouse_up',(a)=>{
        socket.to("one").emit('mouse_up',a);
        });
        socket.on('mouse_move',(a)=>{
            socket.to("one").emit('mouse_move',a);
        });
        socket.on('mouse_down',(a)=>{
            socket.to("one").emit('mouse_down',a);
        });
        socket.on('clears',()=>{
            socket.to("one").emit('clears');
        })
        socket.on('writes',()=>{
            socket.to("one").emit('writes');;
        });
        socket.on('change_color',(col)=>{
            socket.to("one").emit('change_color',col);
        });
        socket.on('change_width',(siz)=>{
            socket.to("one").emit('change_width',siz);
        });
        socket.on('erases',()=>{
            socket.to("one").emit('erases');
        });
        socket.on('disconnect', function () {
            ones = ones.filter(function (letter) {
                return letter !== id;
            });
            io.to("one").emit('players',ones);
        });
    }        
});

