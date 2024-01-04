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
                    <form>
                        <button class="details-button" formaction="../html/detalji.html">Detalji</button>
                    </form>
                </div>
            `;

            divReferenca.appendChild(nekretninaDiv);
        });
    });
}

// Constants for div references
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
