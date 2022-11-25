const submitForm=document.getElementById('signup')

var already_once=false
submitForm.addEventListener('submit', e => {
    e.preventDefault();
    db.collection('users').get().then(snapshot=>{
    var present=true
    snapshot.docs.forEach(doc => {
        console.log(doc.data().username)
        if(doc.data().username == submitForm.user_txt.value){
            present= false
        }
    })
    return present}).then( res=>{
        if(res){
            db.collection('users').add({
            username: submitForm.user_txt.value,
            password: submitForm.password_txt.value,
            games:0,
            highestScore:0
            });
            window.location.replace('/?user='+submitForm.user_txt.value);
        }
        else{
            if(!already_once){
                submitForm.insertAdjacentHTML('beforeend','<h1>The username already exists</h1>')
                already_once=true
            }
        }
})
});