var firebaseConfig = {
  apiKey: "AIzaSyBI9SvRxj-W4qXYtmkalePCts60ofppZLk",
  authDomain: "artwist-2f263.firebaseapp.com",
  projectId: "artwist-2f263",
  storageBucket: "artwist-2f263.appspot.com",
  messagingSenderId: "394345589962",
  appId: "1:394345589962:web:d9bf8857f6e871a153d833"
  };
  firebase.initializeApp(firebaseConfig);
    
  const auth = firebase.auth();
  function signUp() {
    // var email = document.getElementById("email");
    // var password = document.getElementById("password");
    
  //   const promise = auth.createUserWithEmailAndPassword(
  //     email.value,
  //     password.value
  //   );
  //  promise.catch(error => alert(error.message))
  //  window.location.replace('/signUp')
  // }
  // var f = document.querySelector('#signUp');
  // f.addEventListener('submit', e => {
  //   e.preventDefault();
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
    console.log(email.value, password.value);
    const promise = auth.createUserWithEmailAndPassword(
      email.value,
      password.value
    );
    console.log(email, password);
      // Try sign-in with AJAX
  // fetch('/login', {
  //   method: 'POST',
  //   body: new FormData(e.target),
  //   credentials: 'include',s
  // })
  //   .then((res) => {
  //     if (res.status == 200) {
  //       return Promise.resolve();
  //     } else {
  //       return Promise.reject('Sign-in failed');
  //     }
  //   })
  //   .then((profile) => {
  //     // Instantiate PasswordCredential with the form
  //     if (window.PasswordCredential) {
  //       var c = new PasswordCredential(e.target);
  //       return navigator.credentials.store(c);
  //     } else {
  //       return Promise.resolve(profile);
  //     }
  //   })
  //   .then((profile) => {
  //     // Successful sign-in
  //     if (profile) {
  //       updateUI(profile);
  //     }
  //   })
  //   .catch((error) => {
  //     // Sign-in failed
  //     showError('Sign-in Failed');
  //   });
   promise.catch(error => alert(error.message))
   //window.location.replace('/signUp')
  }
  function signIn() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(
              email.value, password.value);
    promise.catch(error => alert(error.message));
    window.location.replace('/')
  }
  function signIn2() {
    window.location.replace('/login')
  }
  function signOut() {
    auth.signOut();
    alert("SignOut Successfully from System");
  }
    
  // Active user to homepage
  const unsubsribe= firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var email = user.email;
      window.location.replace('/')
    }
    return unsubsribe;
  });