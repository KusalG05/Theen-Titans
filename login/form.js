var firebaseConfig = {
  apiKey: "AIzaSyB-oF26-okcT55OmfJD0sWkup7nB4QtQy4",
  authDomain: "theen-tita.firebaseapp.com",
  projectId: "theen-tita",
  storageBucket: "theen-tita.appspot.com",
  messagingSenderId: "755720836170",
  appId: "1:755720836170:web:62164d175e4459347602b3"
  };
  firebase.initializeApp(firebaseConfig);
    
  const auth = firebase.auth();
  // function signUp() {
  //   var email = document.getElementById("email");
  //   var password = document.getElementById("password");
    
  //   const promise = auth.createUserWithEmailAndPassword(
  //     email.value,
  //     password.value
  //   );
  //  promise.catch(error => alert(error.message))
  //  window.location.replace('/signUp')
  // }
  var f = document.querySelector('#signUp');
  f.addEventListener('submit', e => {
    e.preventDefault();
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
    const promise = auth.createUserWithEmailAndPassword(
      email.value,
      password.value
    );
      // Try sign-in with AJAX
  // fetch('/login', {
  //   method: 'POST',
  //   body: new FormData(e.target),
  //   credentials: 'include',
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
   window.location.replace('/signUp')
  })
  function signIn() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(
              email.value, password.value);
    promise.catch(error => alert(error.message));
    window.location.replace('/')
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