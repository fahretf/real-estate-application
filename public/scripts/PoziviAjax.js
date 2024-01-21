const PoziviAjax = (() => {
    
    const BASE_URL = 'http://localhost:3000'; 

    
    const makeRequest = (method, endpoint, data, fnCallback) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, BASE_URL + endpoint, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    
                    fnCallback(null, JSON.parse(xhr.responseText));
                } else {
                    
                    fnCallback({ error: xhr.statusText, status: xhr.status });
                }
            }
        };

        xhr.send(JSON.stringify(data));
    };

    
    function impl_getKorisnik(fnCallback) {
        makeRequest('GET', '/korisnik', null, fnCallback);
    }

    
    function impl_putKorisnik(noviPodaci, fnCallback) {
        makeRequest('PUT', '/korisnik', noviPodaci, fnCallback);
        
    }

    
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

    function impl_getNekretninaById(nekretnina_id, fnCallback) {
        makeRequest('GET', `/nekretnina/${nekretnina_id}`, null, fnCallback);
    }

    function impl_getUpitiForNekretnina(nekretnina_id, fnCallback) {
        makeRequest('GET', `/upiti/${nekretnina_id}`, null, fnCallback);
    }

    function impl_getKorisnikNameFromId(korisnik_id, fnCallback) {
        makeRequest('GET', `/korisnik/${korisnik_id}`, null, fnCallback);
    }

    return {
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getKorisnik: impl_getKorisnik,
        putKorisnik: impl_putKorisnik,
        postUpit: impl_postUpit,
        getNekretnine: impl_getNekretnine,
        getNekretninaById: impl_getNekretninaById,
        getUpitiForNekretnina: impl_getUpitiForNekretnina,
        getKorisnikNameFromId: impl_getKorisnikNameFromId,
    };
})();
