// logout.js

// Function to log out
function logout() {
    PoziviAjax.postLogout(function (error, response) {
        if (!error) {
            // Redirect to the login page after successful logout
            window.location.href = '/prijava.html';
        } else {
            console.error('Logout error:', error);
        }
    });
}
