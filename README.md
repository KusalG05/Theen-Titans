Welcome to project of theen-titans

This are set of guildlines that how to use the website and what softwares we used

Instructions to use our web site :
 
 First, clone our repository and open the project directory in terminal/powershell
 Install dependencies of our website using the commands 
 npm install or npm i
 Finally run 
 node app.js or nodemon  app.js  (if nodemon is already installed) but prefer node app.js
 go to browser and type 
 localhost:3000 
 now you can use our website
 
 Details about our Technical  Stuff:
 
We used socket programming , Node.js and fire base for our website

Socket Programming: 
As we know that this a game similiar to drawize we need to add players in a room and they should gueess the answers among themselves. So we felt the socket programming is the only because Socket programming is a way of connecting two nodes on a network to communicate with each other . First we created a rooms ranging from 10000 to 10000 and we random generator such that when a player wants to create a room then this random generator gives number of room between 1000 to 10000.

Firebase:

There are many databases like mongodb,mySQL but we choosen firebase because it is very handy to use . We can manange both structure and unstructured data using fire base which is main disadvantage of mySQL and firebase is proficient in handling large data sets because it is a cloud-based NoSQL database and it is most suited data base for real time application and installation is also quite simple whwn compared to other databases.So we used firebasee as our database and for our backend
