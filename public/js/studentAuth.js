(function () {
    var actualUser = localStorage.getItem("actualUser");
    if (!actualUser) {
        window.location.href = window.location.origin;
    } else {
        actualUser = JSON.parse(actualUser);
        if (actualUser.user_type !== "Student") {
            window.location.href = window.location.origin + "/admin/careerAdmin.html";
        }
    }
})();