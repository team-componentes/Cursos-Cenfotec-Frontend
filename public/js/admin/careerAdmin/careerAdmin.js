class careerAdmin {
  idTabla = "tblCarreras";
  service = "careers";
  helper = new AjaxHelper();

  fill = function (reload) {
    this.helper.fillTable("careers", "createCareer", "courseAdmin", this.idTabla, reload, true)
  }

  delete = async function () {
    var carrer = JSON.parse(sessionStorage.getItem("carrer-selected"));
    var data = {
      id: carrer.id
    }
    var results = await this.helper.deleteMethod("careers", data);
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