


function updateMenu() {
    const menuList = document.getElementById('menu-list');

    
    PoziviAjax.getKorisnik(function (error, user) {
        if (user) {
            
            menuList.innerHTML = `
                <li><a href="/profil.html" target="_top">Profil</a></li>
                <li><a href="/nekretnine.html" target="_top">Nekretnine</a></li>
                <li><a href="#" onclick="logout()">Odjava</a></li>
            `;
        } else {
            
            menuList.innerHTML = `
                <li><a href="/nekretnine.html" target="_top">Nekretnine</a></li>
                <li><a href="/prijava.html" target="_top">Prijava</a></li>
            `;
        }
    });
}


window.addEventListener('load', updateMenu);
