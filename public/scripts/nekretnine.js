// nekretnine.js

function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
    // Use PoziviAjax to get real estate data
    PoziviAjax.getNekretnine((error, nekretnineLista) => {
        if (error) {
            console.error('Error fetching nekretnine data:', error);
            // Handle error (e.g., display an error message on the page)
            return;
        }

        // Filter nekretnine based on the provided tip_nekretnine
        const filteredNekretnine = nekretnineLista.filter(nekretnina => nekretnina.tip_nekretnine === tip_nekretnine);

        // Clear the content of the provided divReferenca
        divReferenca.innerHTML = '';

        // Loop through filteredNekretnine and display them on the page
        filteredNekretnine.forEach(function (nekretnina) {
            let nekretninaDiv = document.createElement('div');
            let vrijednost;
            if(nekretnina.tip_nekretnine === "apartment") {
                vrijednost = "stan";
            }

            if(nekretnina.tip_nekretnine === "house") {
                vrijednost="kuca";
            }

            if(nekretnina.tip_nekretnine === "business") {
                vrijednost="poslovni"
            }
            nekretninaDiv.classList.add("element", vrijednost); 

            nekretninaDiv.innerHTML = `
                <div class="slika-div">
                    <img class="slika" src="../slike/kuca-2.jpg" alt="${nekretnina.altText}">
                </div>
                <div class="info-div">
                    <div class="naziv-kvadratura-div">
                        <div class="naziv-div">
                            <p>${nekretnina.naziv}</p>
                        </div>
                        <div class="kvadratura-div">
                            <p>${nekretnina.kvadratura}</p>
                        </div>
                    </div>
                    <div class="cijena-div">
                        <p>${nekretnina.cijena}</p>
                    </div>
                </div>
                <div class="button-div">
                    <button class="details-button" data-nekretnina-id="${nekretnina.id}">Detalji</button>
                </div>
            `;

            divReferenca.appendChild(nekretninaDiv);
        });

        // Attach event listeners to the "Detalji" buttons
        const detaljiButtons = divReferenca.querySelectorAll('.details-button');
        detaljiButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                const nekretninaId = this.getAttribute('data-nekretnina-id');
                prikaziDetaljeModal(nekretninaId);
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const divStan = document.getElementById("stan");
    const divKuca = document.getElementById("kuca");
    const divPp = document.getElementById("pp");

    // Use PoziviAjax to fetch real estate data and initialize SpisakNekretnina
    PoziviAjax.getNekretnine((error, nekretnineLista) => {
        if (error) {
            console.error('Error fetching nekretnine data:', error);
            // Handle error (e.g., display an error message on the page)
            return;
        }

        // Initialize SpisakNekretnina with fetched data
        let nekretnine = SpisakNekretnina();
        nekretnine.init(nekretnineLista, []);

        // Display nekretnine for different types
        spojiNekretnine(divStan, nekretnine, "apartment");
        spojiNekretnine(divKuca, nekretnine, "house");
        spojiNekretnine(divPp, nekretnine, "business");
    });
});

function prikaziDetaljeModal(nekretninaId) {
    PoziviAjax.getNekretninaById(nekretninaId, (error, nekretninaDetalji) => {
        if (error) {
            console.error('Error fetching nekretnina details:', error);
            // Handle error (e.g., display an error message on the modal)
            return;
        }

        const detaljiContent = document.getElementById('detaljiContent');
        detaljiContent.innerHTML = `
            <p>Lokacija: ${nekretninaDetalji.lokacija}</p>
            <p>Godina izgradnje: ${nekretninaDetalji.godina_izgradnje}</p>
        `;

        const modal = document.getElementById('detaljiModal');
        const closeButton = document.querySelector('.close');
        modal.style.display = 'block';
        const zatvoriModalButton = document.getElementById('zatvoriModalButton'); // Add this line
        zatvoriModalButton.onclick = function () {
            modal.style.display = 'none';
        };

        // Handle "Otvori detalje" button click
        const otvoriDetaljeButton = document.getElementById('otvoriDetaljeButton');
        otvoriDetaljeButton.addEventListener('click', function () {
            // Move the logic to open additional details to a new function in spojiDetalje.js
            handleOtvoriDetaljeClick(nekretninaDetalji);
        });

    });
}
