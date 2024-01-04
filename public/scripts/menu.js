// menu.js

// Function to dynamically update the menu based on user status
function updateMenu() {
    const menuList = document.getElementById('menu-list');

    // Call the getKorisnik function to check if the user is logged in
    PoziviAjax.getKorisnik(function (error, user) {
        if (user) {
            // User is logged in
            menuList.innerHTML = `
                <li><a href="/profil.html" target="_top">Profil</a></li>
                <li><a href="/nekretnine.html" target="_top">Nekretnine</a></li>
                <li><a href="/detalji.html" target="_top">Detalji</a></li>
                <li><a href="#" onclick="logout()">Odjava</a></li>
            `;
        } else {
            // User is not logged in
            menuList.innerHTML = `
                <li><a href="/nekretnine.html" target="_top">Nekretnine</a></li>
                <li><a href="/detalji.html" target="_top">Detalji</a></li>
                <li><a href="/prijava.html" target="_top">Prijava</a></li>
            `;
        }
    });
}

// Call the updateMenu function when the page loads
window.addEventListener('load', updateMenu);
