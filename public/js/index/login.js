(function(){
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
    
    var signIn = document.querySelectorAll(".btn-login");
    
    function googleSignIn() {
        var provider = new firebase.auth.GoogleAuthProvider();
        var auth = firebase.auth();
        var ajaxHelper = new AjaxHelper();
    
        firebase.auth().signInWithPopup(provider).then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            var data = await ajaxHelper.getMethod("users/email/" + user.email);
    
            if (data.length > 0) {
                localStorage.setItem("actualUser", JSON.stringify(data[0]));
                if(data[0].user_type === "Student"){
                    window.location.href = "carrers.html";
                }
                else{
                    window.location.href = "/admin/careerAdmin.html";
                }
            }
            else {
                $('.alert').alert();
                document.querySelector('.alert').style.top = "-89%";
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    signIn.forEach(x=> x.addEventListener("click", googleSignIn));
})();