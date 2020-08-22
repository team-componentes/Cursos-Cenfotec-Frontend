class StudentCareerAdmin {
    idTabla = "tblCareers";
    service = "student_career";
    helper = new AjaxHelper();
    response = null;

    fill = function (reload) {
        var user = JSON.parse(sessionStorage.getItem("user-selected"));
        var defaultContent = '<a href="#" data-toggle="modal" data-target="#deleteModal"><i class="far fa-trash-alt fa-lg"></i></a>';
        var url = this.service + "/" + user.id;
        this.helper.fillTable(url, defaultContent, this.idTabla, reload, "careers")
    }

    getCareers = async () => {
        this.response = await this.helper.getMethod("careers");
        this.createOptions(this.response);
    }

    createOptions = (response) => {
        var containerSelectCareers = document.querySelector("[data-container-career]");
        containerSelectCareers.innerHTML = `<select class="mdb-select validate md-form" searchable="Buscar" id="career" name="career"><option value="" disabled selected>Seleccione una opción</option></select>`
        var select = document.querySelector("#career");
        for(var  i = 0; i < response.length; i++){
            var option = document.createElement("option");
            option.value = response[i].id;
            option.innerHTML = response[i].name + " (" + response[i].id + ")";
            select.appendChild(option);
        }
        $('.mdb-select').materialSelect({});
    }

    delete = async function () {
        var studentCareer = JSON.parse(sessionStorage.getItem("student-career-selected"));
        var data = {
            studentId: JSON.parse(sessionStorage.getItem("user-selected")).id,
            careerId: studentCareer.id
        }
        var results = await this.helper.deleteMethod(this.service, data);
        this.fill(true);
    }

    save = async () => {
        var data = {
            studentId: JSON.parse(sessionStorage.getItem("user-selected")).id,
            careerId: document.querySelector("#career").value
        }
        var response = await this.helper.postMethod(this.service, data);
        this.fill(true);
        this.createOptions(this.response);
    }
}


$(document).ready(async () => {
    const studentCareerAdmin = new StudentCareerAdmin();
    studentCareerAdmin.fill(false);
    studentCareerAdmin.getCareers();
    var table = $('#tblCareers').DataTable();
    $('#tblCareers tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        sessionStorage.setItem('student-career-selected', JSON.stringify(data));
    });
    document.querySelector("#deleteModal #success").addEventListener("click", studentCareerAdmin.delete.bind(studentCareerAdmin));
    document.querySelector("#createModal #success").addEventListener("click", studentCareerAdmin.save.bind(studentCareerAdmin));
});