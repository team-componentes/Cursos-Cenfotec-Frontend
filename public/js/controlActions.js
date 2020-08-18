var hostApi = "http://localhost:5000/cursos-cenfotec/us-central1/app/api/";

class AjaxHelper {

    async getMethod(url) {
        let response = await fetch(hostApi + url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        });
        let result = await response.json();
        return result;
    }

    async postMethod(url, data) {
        var response = await fetch(hostApi + url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(data)
        });
        var result = await response.json();
        return result;
    }

    async putMethod(url, data) {
        let response = await fetch(hostApi + url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(data)
        });
        let result = await response.json();
        return result;
    }

    async  deleteMethod(url, data) {
        let response = await fetch(hostApi + url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(data)
        });
        let result = await response.json();
        return result;
    }

    fillTable = function (service, editarView, goToView, tableId, refresh, addButtuons) {

		if (!refresh) {
			//Obtiene las columnas de la tabla
			var columns = $('#' + tableId).attr("ColumnsDataName").split(',');
			var arrayColumnsData = [];

			//Ciclo foreach que añade los títulos de las columnas a la tabla
			$.each(columns, function (index, value) {
				var obj = {};
				obj.data = value;
				arrayColumnsData.push(obj);
			});

			//Condicional que determina los botones de accion por agregar si el usuario es Administrador.  Agregar Editar, eliminar y activar/desactivar
			if (addButtuons) {

				var actionColumn = {};
				actionColumn.data = null;
				actionColumn.className = "text-center";
				actionColumn.defaultContent = '<a href="'+ editarView +'.html"><i class="far fa-edit fa-lg"></i></a> <a href="#" data-toggle="modal" data-target="#deleteModal"><i class="far fa-trash-alt fa-lg"></i></a> <a href="'+ goToView +'.html"><i class="far fa-eye fa-lg"></i></a>';

				arrayColumnsData.push(actionColumn);
			}


			//Se hace la consulta al API y se carga la informacion a la tabla
			$('#' + tableId).DataTable({
				"processing": true,
				"ajax": {
					"url": hostApi + service,
					dataSrc: ''
				},
				"columns": arrayColumnsData
			});
		} else {
			//RECARGA LA TABLA
			$('#' + tableId).DataTable().ajax.reload();
		}

    }
}