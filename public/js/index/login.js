const firebaseConfig = {
    apiKey: "AIzaSyD7awl8SlbKtRyUl-tiqFJGYG67lBI8emk",
    authDomain: "cursos-cenfotec.firebaseapp.com",
    databaseURL: "https://cursos-cenfotec.firebaseio.com",
    projectId: "cursos-cenfotec",
    storageBucket: "cursos-cenfotec.appspot.com",
    messagingSenderId: "270604643050",
    appId: "1:270604643050:web:ce35a7bcf63a95c0a78593",
    measurementId: "G-TCYK4LGQ2X"
};

firebase.initializeApp(firebaseConfig);

var signIn = document.getElementById("signIn");

signIn.addEventListener("click", function googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    var auth = firebase.auth();
    var ajaxHelper = new AjaxHelper();

    firebase.auth().signInWithPopup(provider).then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        var data = await ajaxHelper.getMethod("users/email/" + user.email);

        if(data.length > 0){
            alert("login");
        }
        else{
            alert("Not login");
        }
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
});