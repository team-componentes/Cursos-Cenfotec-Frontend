class courseAdmin {
    idTabla = "tblCursos";
    service = "courses";
    helper = new AjaxHelper();
}


$(document).ready(async () => {
    const coursesAdm = new courseAdmin();
    $(`#${coursesAdm.idTabla}`).DataTable();
    const result = await coursesAdm.helper.getMethod(coursesAdm.service);
    console.log(result.json());
});