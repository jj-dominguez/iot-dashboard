const baseUrl= 'http://api.com/api/device/';

const request = (path, method, body, params) => {
    const reqHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    return new Promise((resolve, reject) => {
        let queryParams = "";

        if (params) {
            const escape = encodeURIComponent;
            queryParams = "?" + Object.keys(params)
                .map(key => escape(key) + '=' + escape(params[key]))
                .join('&');
        }

        fetch(baseUrl + path + queryParams, {
            method: method || 'GET',
            headers: reqHeaders,
            body: body && JSON.stringify(body),
        })
            .then(response => {
                if (response.status >= 200 && response.status < 400) {
                    return response;
                }

                const error = new Error(response.statusText);
                error.response = response;

                throw(error);
            })
            .then(response => {
                return response.status !== 204 && response.json();
            })
            .then(parsedResponse => {
                resolve(parsedResponse);
            })
            .catch(err => {
                if (err.response) {
                    err.response.json()
                        .then(parsedError => {
                            reject(parsedError);
                        });
                    return;
                }
            });
    });
}

export default request;
