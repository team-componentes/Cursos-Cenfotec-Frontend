(function () {
    var signOutButton = document.querySelector("#signOut");
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

    function logout() {
        var provider = new firebase.auth.GoogleAuthProvider();
        var auth = firebase.auth();
        firebase.auth().signOut().then(function (res, callback) {
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = "/"
        }).catch(function (error) {
            // An error happened.
        });
    }

    if (signOutButton) {
        signOutButton.addEventListener("click",logout);
    }
})();