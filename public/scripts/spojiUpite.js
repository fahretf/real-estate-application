document.addEventListener('DOMContentLoaded', updateUpitiSection);

async function updateUpitiSection(nekretninaId) {
    const upitiList = document.getElementById('upiti');
    if (upitiList) {
        const upiti = await fetchUpitiForNekretnina(nekretninaId);

        upitiList.innerHTML = '<h3>Upiti</h3><ul class="lista-query">';
        for (const upit of upiti) {
            const korisnikUsername = await fetchKorisnikUsername(upit.KorisnikId);
            upitiList.innerHTML += `
                <li style="background-color: white;">
                    <p class="query"><b>${korisnikUsername}</b></p>
                    <p class="query">${upit.tekst_upita}</p>
                </li>
            `;
        }
        upitiList.innerHTML += '</ul>';
    }
}

async function fetchUpitiForNekretnina(nekretninaId) {
    return new Promise((resolve, reject) => {
        PoziviAjax.getUpitiForNekretnina(nekretninaId, (error, upiti) => {
            if (error) {
                console.error('Error fetching upiti for nekretnina:', error);
                reject([]);
            } else {
                resolve(upiti);
            }
        });
    });
}

async function fetchKorisnikUsername(korisnikId) {
    return new Promise((resolve, reject) => {
        PoziviAjax.getKorisnikNameFromId(korisnikId, (error, korisnik) => {
            if (error) {
                console.error('Error fetching korisnik details:', error);
                reject('N/A');
            } else {
                resolve(korisnik.username);
            }
        });
    });
}
