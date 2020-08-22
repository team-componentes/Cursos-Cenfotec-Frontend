(function(){
    let ajaxHelper = new AjaxHelper();
    var code = document.querySelector("#code");
    var name = document.querySelector("#name");
    var update = false;
    let create = async () =>{
        var data = {
            name: name.value
        };
        if(!update){
            data.code = code.value;
            var response = await ajaxHelper.postMethod("careers", data);
        }
        else{
            data.id = code.value;
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