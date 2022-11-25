const submitForm=document.getElementById('signup')

var already_once=false
submitForm.addEventListener('submit', e => {
    if(submitForm.password_txt.value === submitForm.password_txt1.value){
        e.preventDefault();
        db.collection('users').get().then(snapshot=>{
        var present=true
        snapshot.docs.forEach(doc => {
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
            //alert("Go to Homepage");
            //window.location.replace('/?user='+submitForm.user_txt.value);
            submitForm.insertAdjacentHTML('beforeend','<div class="alert alert-success alert-dismissible fade show" role="alert"> Successfully registered—now go to login! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>')
            return true
        }
        else{
            if(!already_once){
                submitForm.insertAdjacentHTML('beforeend','<div class="alert alert-danger alert-dismissible fade show" role="alert">Registered Username, try with another <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>')
                already_once=true
            }
            return false
        }
    })
    }
    else{
    console.log('Please');
    alert("Passwords do not match")    
}
})

function signIn2() {
    console.log('signIn2');
    window.location.replace('/login')
  }


