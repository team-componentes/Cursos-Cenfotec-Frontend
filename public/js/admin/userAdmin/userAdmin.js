class StudentAdmin {
    idTabla = "tblUsuarios";
    service = "users";
    helper = new AjaxHelper();
  
    fill = function (reload) {
      var defaultContent = '<a href="createUser.html"><i class="far fa-edit fa-lg"></i></a> <a href="#" data-toggle="modal" data-target="#deleteModal"><i class="far fa-trash-alt fa-lg"></i></a> <a href="studentCareerAdmin.html"><i class="far fa-eye fa-lg"></i></a>';
      this.helper.fillTable(this.service, defaultContent, this.idTabla, reload)
    }
  
    delete = async function () {
      var user = JSON.parse(sessionStorage.getItem("user-selected"));
      var data = {
        id: user.id
      }
      var results = await this.helper.deleteMethod(this.service, data);
      this.fill(true);
    }
  }
  
  
  $(document).ready(async () => {
    const studentAdmin = new StudentAdmin();
    studentAdmin.fill(false);
    var table = $('#tblUsuarios').DataTable();
    $('#tblUsuarios tbody').on('click', 'tr', function () {
      var data = table.row(this).data();
      sessionStorage.setItem('user-selected', JSON.stringify(data));
    });
    document.querySelector("#success").addEventListener("click", studentAdmin.delete.bind(studentAdmin));
  
    document.querySelector("#crear").addEventListener("click", function () {
      sessionStorage.clear();
      window.location.href = "createUser.html"
    });
  });