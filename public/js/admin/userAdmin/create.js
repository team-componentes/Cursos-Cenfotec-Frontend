(function () {
    let ajaxHelper = new AjaxHelper();
    var id = document.querySelector("#txtCedula");
    var name = document.querySelector("#txtNombre");
    var lastName = document.querySelector("#txtApellido");
    var lastSecondName = document.querySelector("#txtSegundoApellido");
    var userType = document.querySelector("#userType");
    var email = document.querySelector("#txtEmail");

    var update = false;
    let create = async () => {
        var data = {
            id: id.value,
            name: name.value,
            first_last_name: lastName.value,
            second_last_name: lastSecondName.value,
            user_type: userType.value,
            email: email.value
        };
        if (!update) {
            var date = new Date();
            data.start_date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            var response = await ajaxHelper.postMethod("users", data);
        }
        else {
            var response = await ajaxHelper.putMethod("users", data);
        }

        window.location.href = "usersAdmin.html";
    }

    document.querySelector("#create").addEventListener("click", create);

    var user = sessionStorage.getItem("user-selected");
    if (user) {
        update = true;
        id.disabled = true;
        user = JSON.parse(user);
        id.value = user.id;
        name.value = user.name;
        lastName.value = user.first_last_name;
        lastSecondName.value = user.second_last_name;
        userType.value = user.user_type;
        email.value = user.email;
    }
})();