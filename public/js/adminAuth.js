(function () {
    var actualUser = localStorage.getItem("actualUser");
    if (!actualUser) {
        window.location.href = window.location.origin;
    } else {
        actualUser = JSON.parse(actualUser);
        if (actualUser.user_type !== "Admin") {
            window.location.href = window.location.origin + "/careers.html";
        }
    }


})();