const PoziviAjax = (() => {
    
    const BASE_URL = 'http://localhost:3000';  

    
    const makeRequest = (method, endpoint, data, fnCallback) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, BASE_URL + endpoint, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // Successful response
                    fnCallback(null, JSON.parse(xhr.responseText));
                } else {
                    // Error response
                    fnCallback({ error: xhr.statusText, status: xhr.status });
                }
            }
        };

        xhr.send(JSON.stringify(data));
    };

    // Returns the currently logged in user
    function impl_getKorisnik(fnCallback) {
        makeRequest('GET', '/korisnik', null, fnCallback);
    }

    // Updates the data of the logged in user
    function impl_putKorisnik(noviPodaci, fnCallback) {
        makeRequest('PUT', '/korisnik', noviPodaci, fnCallback);
    }

    // Adds a new upit for the logged in user.
    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
        const data = { nekretnina_id, tekst_upita };
        makeRequest('POST', '/upit', data, fnCallback);
    }

    function impl_getNekretnine(fnCallback) {
        makeRequest('GET', '/nekretnine', null, fnCallback);
    }

    function impl_postLogin(username, password, fnCallback) {
        const data = { username, password };
        makeRequest('POST', '/login', data, fnCallback);
    }

    function impl_postLogout(fnCallback) {
        makeRequest('POST', '/logout', {}, fnCallback);
    }

    return {
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getKorisnik: impl_getKorisnik,
        putKorisnik: impl_putKorisnik,
        postUpit: impl_postUpit,
        getNekretnine: impl_getNekretnine,
    };
})();