
document.addEventListener('DOMContentLoaded', function () {
    const updateProfileForm = document.getElementById('updateProfileForm');
    //zasto ovo nece??
    updateProfileForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(updateProfileForm);

        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        PoziviAjax.putKorisnik(data, function (error, response) {
            if (error) {
                console.error('Greska:', error);
            } else {
                console.log('Uspjesno azuriran profil:', response);
            }
        });
    });
});
