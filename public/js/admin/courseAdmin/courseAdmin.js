class courseAdmin {
    idTabla = "tblCursos";
    service = "courses";
    helper = new AjaxHelper();

    fill = function (reload) {
        this.helper.fillTable(this.service, "createCourse", "#", this.idTabla, reload, true)
    }

    delete = async function () {
        var carrer = JSON.parse(sessionStorage.getItem("course-selected"));
        var data = {
            id: carrer.id
        }
        var results = await this.helper.deleteMethod(this.service, data);
        this.fill(true);
    }
}


$(document).ready(async () => {
    const courseAdmn = new courseAdmin();
    courseAdmn.fill(false);
    var table = $('#tblCursos').DataTable();
    $('#tblCursos tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        sessionStorage.setItem('course-selected', JSON.stringify(data));
    });
    document.querySelector("#success").addEventListener("click", courseAdmn.delete.bind(courseAdmn));

    document.querySelector("#crear").addEventListener("click", function(){
        sessionStorage.clear();
        window.location.href = "createCourse.html"
    });
});