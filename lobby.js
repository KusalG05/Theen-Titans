const socket=io();

let id;
socket.on('id',(a)=>{
    id=a
});
socket.on('players',(a)=>{    
document.getElementById('players').innerHTML=""
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