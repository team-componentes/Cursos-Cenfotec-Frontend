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
}