class careerAdmin {
  idTabla = "tblCarreras";
  service = "careers";
  helper = new AjaxHelper();

  fill = function (reload) {
    var defaultContent = '<a href="createCareer.html"><i class="far fa-edit fa-lg"></i></a> <a href="#" data-toggle="modal" data-target="#deleteModal"><i class="far fa-trash-alt fa-lg"></i></a> <a href="careerCourseAdmin.html"><i class="far fa-eye fa-lg"></i></a>';
    this.helper.fillTable(this.service, defaultContent, this.idTabla, reload)
  }

  delete = async function () {
    var carrer = JSON.parse(sessionStorage.getItem("carrer-selected"));
    var data = {
      id: carrer.id
    }
    var results = await this.helper.deleteMethod(this.service, data);
    this.fill(true);
  }
}


$(document).ready(async () => {
  const careerAdm = new careerAdmin();
  careerAdm.fill(false);
  var table = $('#tblCarreras').DataTable();
  $('#tblCarreras tbody').on('click', 'tr', function () {
    var data = table.row(this).data();
    sessionStorage.setItem('carrer-selected', JSON.stringify(data));
  });
  document.querySelector("#success").addEventListener("click", careerAdm.delete.bind(careerAdm));

  document.querySelector("#crear").addEventListener("click", function () {
    sessionStorage.clear();
    window.location.href = "createCareer.html"
  });
});