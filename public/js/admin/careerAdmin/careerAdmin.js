class careerAdmin{
  idTabla = "tblCarreras";
  service = "careers";
  helper = new AjaxHelper();
}


$(document).ready(async () => {
  const careerAdm = new careerAdmin();
  $(`#${careerAdm.idTabla}`).DataTable();
  const result = await careerAdm.helper.getMethod(careerAdm.service);
  console.log(result.json());
});