
function submitLoginForm(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginFeedback = document.getElementById('login-feedback');

    PoziviAjax.postLogin(username, password, function (error, response) {
        if (error) {
            console.error('Login error:', error);
            loginFeedback.textContent = 'Neispravan password ili username.';
        } else {
            console.log('Uspjesna prijava na sistem', response);
            window.location.href = '/nekretnine.html';
        }
    });
}
