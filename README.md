# Welcome to Project Theen-titans

### These are set of guidelines to use this website and what softwares we have used in making this

Instructions to use our Website :

1.  First, clone our repository and open the project directory in terminal/powershell
2.  Install dependencies of our website using the commands
    ```console
    foo@bar:~$ npm install or npm i
    foo
    ```
3.  Finally run node app.js or nodemon app.js (if nodemon is already installed) but prefer node app.js in terminal/powershell
4.  Go to browser and type [localhost:3000](http://localhost:3000/)

Now you can use our website :grinning:

## Details about our Technical Stuff:

### We have used:

- **HTML, CSS, ejs** for frontend development
- **Node.js, express.js, body-parser and Socket.io** for backend development
- **FireBase** for databasing information

### Socket Programming:

Since we require a server and a client for every user, we shall use socket.io for communication. We have used following functions of socket

- `socket.emit()`
- `socket.on()`
- `socket.join()`
- `socket.broadcast.emit()`
- `socket.to(room).emit()`

There are some specific functions which will help in sending message/command only for room members. So we chose **socket.io**

### Firebase:

There are several databases available, like _MongoDB_ and _MySQL_, but we chose _FireBase_ because of how convenient it is to use. _FireBase_ is proficient at handling large data sets because it is a **cloud-based NoSQL** database. Firebase is the best database for real-time applications, and installation is also quite simple when compared to other databases. We can manage both structured and unstructured data using Firebase, which is the main drawback of _MySQL_. Therefore, we utilised _Firebase_ for both our database and backend.

## How to play Artwist:

1. After opening [localhost:3000](http://localhost:3000/), it will connect to login page of our website.
2. Here, if you are a previous logged-in user, then you have to login here. If you are a new user, then we can register by going to signUp page by clicking signUp button.
3. After this is done, you will be redirected to the home page and you can see your profile by clicking on the profile button at top-left corner and you can login as another user by clicking button at top-right corner of the page.
4. If you don't have any roomcode to join, you can click Create Room, and it will send you to a lobby and you can share your lobby number with your friends and play.
5. If you have a roomcode, then use join button and enter roomcode and join.
6. Creator of room will have permission to start the game, by clicking start button.
7. Then a random artist is chosen by server and he is given 3 words to choose from choose box. Others will be waiting while he chooses.
8. After he chooses, he will have access to canvas to draw, but not the chat and others should see the drawing and guess the word by using chat.
9. After timer ends, one round will be done and other person will be given option to draw.
10. After everyone is done with their chance, the game ends and everyone returns to lobby and they can see their scores and winner of game.
11. Live leaderboard is also present in game which will be updating scores after each round.
12. Your points will be saved in database and you can see global leaderboard on homepage.

## Hope you enjoy the game :smiling_face_with_three_hearts:
