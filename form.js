var firebaseConfig = {
    apiKey: "AIzaSyAAhssNKzs4RJr55QDd_-IstlhTauRBitY",
    authDomain: "vaidya-428e4.firebaseapp.com",
    databaseURL: "https://vaidya-428e4-default-rtdb.firebaseio.com",
    projectId: "vaidya-428e4",
    storageBucket: "vaidya-428e4.appspot.com",
    messagingSenderId: "1020564424822",
    appId: "1:1020564424822:web:1d16a0b9fcea89de92f757"
  };
  firebase.initializeApp(firebaseConfig);
    
  const auth = firebase.auth();
  function signUp() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
    const promise = auth.createUserWithEmailAndPassword(
      email.value,
      password.value
    );
   promise.catch(error => alert(error.message))
  }
  function signIn() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(
              email.value, password.value);
    promise.catch(error => alert(error.message));
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