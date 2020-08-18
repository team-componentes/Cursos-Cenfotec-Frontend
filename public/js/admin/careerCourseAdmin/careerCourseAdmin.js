class courseAdmin {
    idTabla = "tblCursos";
    service = "career_course";
    helper = new AjaxHelper();
    response = null;

    fill = function (reload) {
        var carrer = JSON.parse(sessionStorage.getItem("carrer-selected"));
        var defaultContent = '<a href="#" data-toggle="modal" data-target="#deleteModal"><i class="far fa-trash-alt fa-lg"></i></a>';
        var url = this.service + "/" + carrer.id;
        this.helper.fillTable(url, defaultContent, this.idTabla, reload, "courses")
    }

    getCourses = async () => {
        this.response = await this.helper.getMethod("courses");
        this.createOptions(this.response);
    }

    createOptions = (response) => {
        var containerSelectCourses = document.querySelector("[data-container-course]");
        containerSelectCourses.innerHTML = `<select class="mdb-select validate md-form" searchable="Buscar" id="course" name="course"><option value="" disabled selected>Seleccione una opción</option></select>`
        var select = document.querySelector("#course");
        for(var  i = 0; i < response.length; i++){
            var option = document.createElement("option");
            option.value = response[i].id;
            option.innerHTML = response[i].name + " (" + response[i].id + ")";
            select.appendChild(option);
        }
        $('.mdb-select').materialSelect({});
    }

    delete = async function () {
        var carrerCourse = JSON.parse(sessionStorage.getItem("carrer-course-selected"));
        var data = {
            careerId: JSON.parse(sessionStorage.getItem("carrer-selected")).id,
            courseId: carrerCourse.id
        }
        var results = await this.helper.deleteMethod(this.service, data);
        this.fill(true);
    }

    save = async () => {
        var data = {
            careerId: JSON.parse(sessionStorage.getItem("carrer-selected")).id,
            courseId: document.querySelector("#course").value
        }
        var response = await this.helper.postMethod(this.service, data);
        this.fill(true);
        this.createOptions(this.response);
    }
}


$(document).ready(async () => {
    const courseAdmn = new courseAdmin();
    courseAdmn.fill(false);
    courseAdmn.getCourses();
    var table = $('#tblCursos').DataTable();
    $('#tblCursos tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        sessionStorage.setItem('carrer-course-selected', JSON.stringify(data));
    });
    document.querySelector("#deleteModal #success").addEventListener("click", courseAdmn.delete.bind(courseAdmn));
    document.querySelector("#createModal #success").addEventListener("click", courseAdmn.save.bind(courseAdmn));
});