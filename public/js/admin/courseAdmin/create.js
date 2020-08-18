(function(){
    let ajaxHelper = new AjaxHelper();
    var code = document.querySelector("#txtCodigo");
    var name = document.querySelector("#txtNombre");
    var creditos = document.querySelector("#selCreditos");
    var costos = document.querySelector("#txtCosto");

    var update = false;
    let create = async () => {
        var data = {
            id: code.value,
            name: name.value,
            credits: creditos.value,
            cost: costos.value
        };
        if(!update){
            var response = await ajaxHelper.postMethod("courses", data);
        }
        else{
            var response = await ajaxHelper.putMethod("courses", data);
        }
        
        window.location.href = "courseAdmin.html";
    }

    document.querySelector("#create").addEventListener("click", create);

    var course = sessionStorage.getItem("course-selected");
    if(course){
        update = true;
        code.disabled = true;
        course = JSON.parse(course);
        code.value = course.id;
        name.value = course.name;
        creditos.value = course.credits;
        costos.value = course.cost;
    }
})();