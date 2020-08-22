(function(){
    let ajaxHelper = new AjaxHelper();
    var code = document.querySelector("#code");
    var name = document.querySelector("#name");
    var update = false;
    let create = async () =>{
        var data = {
            code: code.value,
            name: name.value
        };
        if(!update){
            var response = await ajaxHelper.postMethod("careers", data);
        }
        else{
            var response = await ajaxHelper.putMethod("careers", data);
        }
        
        window.location.href = "careerAdmin.html";
    }

    document.querySelector("#create").addEventListener("click", create);

    var carrer = sessionStorage.getItem("carrer-selected");
    if(carrer){
        update = true;
        code.disabled = true;
        carrer = JSON.parse(carrer);
        code.value = carrer.id;
        name.value = carrer.name;
    }
})();