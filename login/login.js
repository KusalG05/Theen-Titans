const loginForm=document.getElementById('login')

var already_once=false
loginForm.addEventListener('submit', e => {
        e.preventDefault();
        db.collection('users').get().then(snapshot=>{
        var password="---"
        snapshot.docs.forEach(doc => {
            if(doc.data().username == loginForm.username_txt.value){
                password = doc.data().password
            }
        })
        return password}).then( res=>{
        if(res==="---"){
            loginForm.insertAdjacentHTML('beforeend','<div class="alert alert-danger alert-dismissible fade show" role="alert"> Usernam doesnot exist<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>')
        }
        else{
            if(res===loginForm.password_txt.value){
                window.location.replace("/?user="+loginForm.username_txt.value)
            }
            else{
                loginForm.insertAdjacentHTML('beforeend','<div class="alert alert-danger alert-dismissible fade show" role="alert">Password incorrect<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>')
            }
        }
    })
})

function signUp2() {
    window.location.replace('/signUp')
}