function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
    let nekretnineLista = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });



    divReferenca.innerHTML = '';
    let tip;
    if(tip_nekretnine == "Stan") tip = "stan";
    else if(tip_nekretnine == "Kuća") tip = "kuca";
    else tip = "poslovni";

    nekretnineLista.forEach(function (nekretnina) {
        let nekretninaDiv = document.createElement('div');
            nekretninaDiv.classList.add("element", tip); 

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
}


const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");
const listaNekretnina = [{
    id: 1,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {

        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},
{
    id: 2,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},


{
    id: 3,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {

        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},


{
    id: 4,
    tip_nekretnine: "Stan",
    naziv: "Kuca kucicca",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {

        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},


{
    id: 5,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Kuca kucicca",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {

        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},

{
    id: 6,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Kuca kucicca",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {

        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},


{
    id: 7,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Kuca kucicca",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {

        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},

{
    id: 8,
    tip_nekretnine: "Kuća",
    naziv: "Kuca kucicca",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {

        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},

{
    id: 9,
    tip_nekretnine: "Kuća",
    naziv: "Kuca kucicca",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {

        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},

]
const listaKorisnika = [{
    id: 1,
    ime: "Neko",
    prezime: "Nekic",
    username: "username1",
},
{
    id: 2,
    ime: "Neko2",
    prezime: "Nekic2",
    username: "username2",
}]
//instanciranje modula
let nekretnine = SpisakNekretnina();
nekretnine.init(listaNekretnina, listaKorisnika);
//pozivanje funkcije
spojiNekretnine(divStan, nekretnine, "Stan");
spojiNekretnine(divKuca, nekretnine, "Kuća");
spojiNekretnine(divPp, nekretnine, "Poslovni prostor");