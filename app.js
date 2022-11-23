//requiring all the node modules
const express=require('express');
const app=express();
const server=require('http').Server(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser=require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
var url=require('url')
//----------------------------starting server-----------------------------------------------------------

//This is for mentioning apply css to the html for all css files inside the path given in the argument
app.use(express.static(__dirname));
app.use(express.static(__dirname+"/Profile"));

app.use(express.static(__dirname+"/login"))

//---------------------------------homepage----------------------------------------
//we are listening to the port 3000 for requests
server.listen(3000, () => {
    //once we start listeing we log the message
    console.log('listening on port 3000')
});

//what to do when it recieves a request for the path "/" which is basically the homepath
//req refers to the request variable and res is the response which we can modify
app.get('/', (req, res) => {
    //in response we are rendering index.ejs file
    res.render(__dirname + '/index.ejs');
});  

//user account page route
app.get('/account', (req, res) => {
    //in response we are rendering user.ejs file
    res.render(__dirname + '/Profile/user.ejs');
});

//login page route
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/login/login.html')
})

//signup page route
app.get('/signUp',(req,res)=>{
    res.sendFile(__dirname+'/login/signUp.html')
})

//--------------------------------game room------------------------------------------
//list of active rooms
rooms=[];

//dictionary with room code as key and list of players as values
room_members={}

//creating game room
app.post('/create_room',(req,res)=>{
    //generating random room code and adding to the list of rooms
    let room_code=Math.floor(Math.random()*9000+999);
    while(rooms.includes(room_code)){
        room_code=Math.floor(Math.random()*9000+999);
    }
    rooms.push(room_code);
    room_members[room_code]=[]

    //redirecting to the game room with room code params and room creater parameter as true
    res.redirect(url.format({pathname:'game/'+room_code, query:{'creator':true}}))
})

//Joining game room
app.post('/join',(req, res)=>{
    if(rooms.includes(parseInt(req.body.room_code))){     //checking if list of rooms includes room_code
        res.redirect(url.format({pathname:'game/'+req.body.room_code, query:{'creator':false}})) //redirecting to the game room with room code params and room creater parameter as false
    }
});

//game room along with room code
app.get('/game/:room_code',(req, res)=>{
    res.render(__dirname+'/game/game.ejs',{ room_code:req.params.room_code,starter:req.query.creator }); 
});

//--------------------------------Game logic----------------------------------

//player id for prototype
player_id=0

//list of words
words=['bird','cloud','car','spider','man','rishi','mobile','table'];

//socket connection
io.on('connection', (socket) => {
    const id=player_id;
    player_id=player_id+1;

    // Adding player in room
    var room;
    var word

    //if we connect to room (defaultly called)
    socket.on('room_code', (room_no) => {
        //------------------------setting room, players....--------------------------------------
        room=room_no;  //setting the room to room_no and joining to the room and adding to the room_members dictionary
        socket.join(room); 
        room_members[room_no].push({'id':id,'score':0});

        socket.emit('room',id);    //lettting it know its room (prototype)

        io.to(room).emit('players',room_members[room]);    //showing the room_members

        //disconnecting player
        socket.on('disconnect', function () {
            room_members[room] = room_members[room].filter(function (letter) {
                return letter.id !== id;
            });
            io.to(room).emit('players',room_members[room]);
        });

        //-------------------------Game logic--------------------------------------------------------------
        let decider_id
        let drawer_id
        let drawer_index
        let initial_index
        //once play game is pressed
        socket.on('start_game',()=>{
            socket.broadcast.emit('start_game'); //let other players know game is started
            decider_id=id //since start_game is called by the first player, he becomes the decider_id
            //select random player and send to all players
            drawer_index=Math.floor(Math.random()*room_members[room].length)
            console.log('New index '+drawer_index)
            drawer_id = room_members[room][drawer_index].id;
            initial_index=drawer_index;
            io.to(room).emit('drawer',drawer_id);
        })
        //other players know the drawer and the drawer server sends three random words to the drawer client
        socket.on('who_is_drawer',(a)=>{
            drawer_id=a;
            //-------------------------drawer --------------------
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
                socket.emit('choose',{word1:word1, word2:word2, word3:word3});
            }
        })
        
        //after choosing they send their choice to the drawer server
        socket.on('chosen',(choice)=>{
            word=choice;
            socket.to(room).emit('player_chose',choice); //the choice is sent to other clients
            //game starts and the timer starts
            var counter = 15;
            var timer = setInterval(()=>{
                io.to(room).emit('counter', counter);
                counter--
                if (counter === 0) {
                    io.to(room).emit('restart',0)
                    clearInterval(timer);
                }
            }, 1000);

            //getting the mouse strokes from client and sending it to the remaining clients
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

            //disconnecting of the drawer('prototype)
            socket.on('disconnect', function () {
                room_members[room] = room_members[room].filter(function (letter) {
                    return letter.id !== id;
                });
                io.to(room).emit('players',room_members[room]);
            });
        })  
        
        //---------------------------------------guesser--------------------------------------------
        //guesser sends the guess
        socket.on('word',(w)=>{
            word=w;
            socket.on('guess',(a)=>{
                if(a.guess==word){
                    console.log(a.guesses)
                    if(a.guesses==room_members[room].length-1){
                        io.to(room).emit('restart',0) 
                    }
                    io.to(room).emit('guess',{guess:a.guess,id:id,correct:true});
                    for(var i in  room_members[room]){
                        if(room_members[room][i].id==id){
                            room_members[room][i].score=room_members[room][i].score+a.time;
                        }
                    }
                }
                else{
                    io.to(room).emit('guess',{guess:a.guess,id:id,correct:false});
                }
        })})

        //--------------------------------restart-------------------------------
        socket.on('start',()=>{
            if(id==decider_id){
                drawer_index=drawer_index+1
                if(drawer_index == room_members[room].length){
                    drawer_index = 0
                }
                if(drawer_index==initial_index){
                    io.to(room).emit('over',room_members[room]);
                }
                drawer_id = room_members[room][drawer_index].id;
                io.to(room).emit('drawer',drawer_id);
                io.to(room).emit('players',room_members[room_no]);
            }
        });
    }); 
});