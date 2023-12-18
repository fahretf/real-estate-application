let SpisakNekretnina = function () {
    //privatni atributi modula
    let listaNekretnina = [];
    let listaKorisnika = [];



    //implementacija metoda
    let init = function (listaNekretnina1, listaKorisnika1) {
        // dodajte kod
        listaNekretnina = listaNekretnina1;
        listaKorisnika = listaKorisnika1;
    }
    let filtrirajNekretnine = function (kriterij) {
        return listaNekretnina.filter(nekretnina => {
            for (let key in kriterij) {
              if (kriterij.hasOwnProperty(key)) {
                switch (key) {
                  case "tip_nekretnine":
                    if (nekretnina.tip_nekretnine !== kriterij.tip_nekretnine) {
                      return false;
                    }
                    break;
                  case "min_kvadratura":
                    if (nekretnina.kvadratura <= kriterij.min_kvadratura) {
                      return false;
                    }
                    break;
                  case "max_kvadratura":
                    if (nekretnina.kvadratura >= kriterij.max_kvadratura) {
                      return false;
                    }
                    break;
                  case "min_cijena":
                    if (nekretnina.cijena < kriterij.min_cijena) {
                      return false;
                    }
                    break;
                  case "max_cijena":
                    if (nekretnina.cijena >= kriterij.max_cijena) {
                      return false;
                    }
                    break;
                  
                }
              }
            }
            return true; 
          });
       
    }
    

    let ucitajDetaljeNekretnine = function(id) {
      let result = listaNekretnina.find(nekretnina => nekretnina.id === id);
      return result !== undefined ? result : null;
    
    }


    return {
        init: init,
        filtrirajNekretnine: filtrirajNekretnine,
        ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    }

};




let spisakNekretninaInstance = SpisakNekretnina();
spisakNekretninaInstance.init([
  {id: 1, tip_nekretnine: "house", naziv: "kuca1", kvadratura: 50, cijena: 100, tip_grijanja: "plin", lokacija: "novo sarajevo", godina_izgradnje: "2019", datum_objave: "01.10.2023.", opis: "sociis natoque penatibus.", 


  upiti: [{
    korisnik_id: 1,
    tekst_upita: "Nullam eu pede mollis."
    },
    {
    korisnik_id: 2,
    tekst_upita: "Phasellus viverra nulla."
    }]},


{id: 2, tip_nekretnine: "apartment", naziv: "stan1", kvadratura: 100, cijena: 200, tip_grijanja: "etaznoi", lokacija: "novo sarajevo", godina_izgradnje: "2019", datum_objave: "01.10.2023.", opis: "sociis natoque penatibus.", 


  upiti: [{
    korisnik_id: 1,
    tekst_upita: "Nullam eu pede mollis."
    },
    {
    korisnik_id: 2,
    tekst_upita: "Phasellus viverra nulla."
    }]}, 
    
    

    {id: 3, tip_nekretnine: "business", naziv: "poslovni1", kvadratura: 150, cijena: 300, tip_grijanja: "cenralno", lokacija: "novo sarajevo", godina_izgradnje: "2019", datum_objave: "01.10.2023.", opis: "sociis natoque penatibus.", 


    upiti: [{
      korisnik_id: 1,
      tekst_upita: "Nullam eu pede mollis."
      },
      {
      korisnik_id: 2,
      tekst_upita: "Phasellus viverra nulla."
      }]}, 
      

]);
