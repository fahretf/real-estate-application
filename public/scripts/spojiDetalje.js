function handleOtvoriDetaljeClick(nekretninaDetalji) {
    // Handle the opening of additional details, if needed
    // For example, redirect to detalji.html with nekretninaId
    window.location.href = `../html/detalji.html?id=${nekretninaDetalji.id}`;
}

// spojiDetalje.js

// Function to get the ID from the URL parameters
// Function to get the ID from the URL parameters
function getNekretninaIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Function to fetch and populate nekretnina details
// Function to fetch and populate nekretnina details
function populateNekretninaDetails() {
    const nekretninaId = getNekretninaIdFromUrl();

    // Use PoziviAjax to get nekretnina details
    PoziviAjax.getNekretninaById(nekretninaId, (error, nekretninaDetalji) => {
        if (error) {
            console.error('Error fetching nekretnina details:', error);
            // Handle error (e.g., display an error message)
            return;
        }

        // Use PoziviAjax to get upiti for nekretnina
        PoziviAjax.getUpitiForNekretnina(nekretninaId, (upitiError, upiti) => {
            if (upitiError) {
                console.error('Error fetching upiti for nekretnina:', upitiError);
                // Handle error (e.g., display an error message)
                return;
            }

            // Populate the content in detalji.html
            // Replace the following with the actual IDs and classes in your detalji.html

            // Populate osnovno section
            document.getElementById('osnovno').innerHTML = `
                <div class="preview">
                    <div class="naslov">
                        <h3>Osnovno</h3>
                    </div>
                    <div><img src="../slike/kuca-1.jpg" alt="Fotografija kuce br. 1."></div>
                </div>
                <div>
                    <p><b>Naziv:</b> ${nekretninaDetalji.naziv}</p>
                    <p><b>Kvadratura:</b> ${nekretninaDetalji.kvadratura}m&#178;</p>
                    <p><b>Cijena:</b> ${nekretninaDetalji.cijena}KM</p>
                </div>
            `;

            // Populate detalji section
            document.getElementById('detalji').innerHTML = `
                <h3>Detalji</h3>
                <div class="details-grid">
                    <div>
                        <p><b>Tip grijanja: </b>${nekretninaDetalji.tip_grijanja}</p>
                        <p><b>Lokacija: </b>${nekretninaDetalji.lokacija}</p>
                    </div>
                    <div>
                        <p><b>Godina izgradnje:</b> ${nekretninaDetalji.godina_izgradnje}</p>
                        <p><b>Datum objave:</b> ${nekretninaDetalji.datum_objave}</p>
                    </div>
                </div>
                <div>
                    <p class="opis"><b>Opis: </b>${nekretninaDetalji.opis}</p>
                </div>
            `;

            // Populate upiti section
            const upitiList = document.getElementById('upiti');
            upitiList.innerHTML = '<h3>Upiti</h3><ul class="lista-query">';
            upiti.forEach(async (upit) => {
                // Fetch the username using Korisnik ID
                const korisnikUsername = await fetchKorisnikUsername(upit.KorisnikId);

                upitiList.innerHTML += `
                    <li style="background-color: white;">
                        <p class="query"><b>${korisnikUsername}</b></p>
                        <p class="query">${upit.tekst_upita}</p>
                    </li>
                `;
            });
            upitiList.innerHTML += '</ul>';
        });
    });
}

// Fetch the username using Korisnik ID
async function fetchKorisnikUsername(korisnikId) {
    return new Promise((resolve, reject) => {
        PoziviAjax.getKorisnikNameFromId(korisnikId, (error, korisnik) => {
            if (error) {
                console.error('Error fetching korisnik details:', error);
                reject('N/A'); // Return 'N/A' if there's an error
            } else {
                resolve(korisnik.username);
            }
        });
    });
}

// Call the function to populate details when the page loads
document.addEventListener('DOMContentLoaded', populateNekretninaDetails);

