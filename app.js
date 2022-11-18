//requiring all the node modules
const express=require('express');
const app=express();
const server=require('http').Server(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser=require('body-parser');
app.set('view engine', 'ejs');
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
    res.render(__dirname + '/index.ejs');
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

app.get('/game/:room_code',(req, res)=>{
    res.render(__dirname+'/game/game.ejs',{ room_code:req.params.room_code });
});

app.post('/join',(req, res)=>{
    rooms=[1234,2345,3456,4567,5678];
    if(rooms.includes(parseInt(req.body.room_code))){
        res.redirect('game/'+req.body.room_code)
    }
});
//--------------------------------setting up socket connection----------------------------------
player_id=0
room_members={1234:[],2345:[],4567:[],3456:[],5678:[]}
words=['fish','sun','cat','dog','cloud','boob','dick','ass','pussy','stepbro','horny','sexy','milf','squirt','cum'];
io.on('connection', (socket) => {
    console.log('connection');
    const id=player_id;
    player_id=player_id+1;
    // Adding player in room
    var room;
    socket.on('room_code', (room_no) => {
        room=parseInt(room_no);console.log(room);socket.join(room); room_members[room].push(id);
        socket.emit('room',{room_code:room,id:id});
        io.to(room).emit('players',room_members[room]);
        socket.on('guess',(a)=>{    
            if(a.guess==word){
                io.to(room).emit('guess',{guess:a.guess,id:id,correct:true});
            }
            else{
                io.to(room).emit('guess',{guess:a.guess,id:id,correct:false});
            }
        });
        socket.on('mouse_up',(a)=>{
        socket.to(room).emit('mouse_up',a);
        });
        socket.on('mouse_move',(a)=>{
            socket.to(room).emit('mouse_move',a);
        });
        socket.on('mouse_down',(a)=>{
            socket.to(room).emit('mouse_down',a);
        });
        socket.on('clears',()=>{
            socket.to(room).emit('clears');
        })
        socket.on('writes',()=>{
            socket.to(room).emit('writes');;
        });
        socket.on('change_color',(col)=>{
            socket.to(room).emit('change_color',col);
        });
        socket.on('change_width',(siz)=>{
            socket.to(room).emit('change_width',siz);
        });
        socket.on('erases',()=>{
            socket.to(room).emit('erases');
        });
        socket.on('disconnect', function () {
            room_members[room] = room_members[room].filter(function (letter) {
                return letter !== id;
            });
            io.to(room).emit('players',room_members[room]);
        });    
        drawer_id=room_members[room][1]
        let word
        if(id==drawer_id){
            var word1 = words[Math.floor(Math.random()*words.length)];
            var word2 = words[Math.floor(Math.random()*words.length)];
            while(word2==word1){
                word2 = words[Math.floor(Math.random()*words.length)];
            }
            var word3 = words[Math.floor(Math.random()*words.length)];
            while(word1==word3 || word2==word3){
                word3 = words[Math.floor(Math.random()*words.length)];
            }
            console.log(word1+word2+word3);
            socket.emit('choose',{word1:word1, word2:word2, word3:word3});
            socket.broadcast.emit('drawer',drawer_id);
        }
        socket.on('chosen',(choice)=>{
            word=choice;
            console.log(choice)
            socket.broadcast.emit('player_chose');
        })
}); 
});

