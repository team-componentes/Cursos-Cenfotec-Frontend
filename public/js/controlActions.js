var hostApi = "https://us-central1-cursos-cenfotec.cloudfunctions.net/app/api/";

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
                'Access-Control-Allow-Origin': '*'
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

    fillTable = function (service, defaultContent, tableId, refresh, dataSrc = '') {

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
			if (defaultContent) {
				var actionColumn = {};
				actionColumn.data = null;
				actionColumn.className = "text-center";
				actionColumn.defaultContent = defaultContent;
				arrayColumnsData.push(actionColumn);
			}


			//Se hace la consulta al API y se carga la informacion a la tabla
			$('#' + tableId).DataTable({
				"processing": true,
				"ajax": {
					"url": hostApi + service,
					dataSrc: dataSrc
				},
				"columns": arrayColumnsData
			});
		} else {
			//RECARGA LA TABLA
			$('#' + tableId).DataTable().ajax.reload();
		}

    }
}