const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const app = express();
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
const USERS_FILE_PATH = path.join(__dirname, 'data', 'korisnici.json');
const NEKRETNINE_FILE_PATH = path.join(__dirname, 'data', 'nekretnine.json');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));



app.get('/nekretnine.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/nekretnine.html');
});


app.get('/detalji.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/detalji.html');
});


app.get('/profil.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/profil.html');
});

app.get('/prijava.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/prijava.html');
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Read user data from korisnici.json
        const usersData = await fs.readFile(USERS_FILE_PATH, 'utf-8');
        const users = JSON.parse(usersData);

        // Find the user by username
        const user = users.find((u) => u.username === username);

        if (user) {
            // Compare the provided password with the stored hash
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    // Passwords match, set username in the session
                    req.session.username = username;
                    res.json({ message: 'Successful login' });
                } else {
                    // Incorrect password
                    res.status(401).json({ error: 'Unsuccessful login' });
                }
            });
        } else {
            // User not found
            res.status(401).json({ error: 'Unsuccessful login' });
        }
    } catch (error) {
        console.error('Error reading users data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Logout route
app.post('/logout', (req, res) => {
    // Check if user is authenticated
    if (!req.session.username) {
        // Unauthorized access
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    } else {
        // Clear session information
        req.session.destroy((err) => {
            if (err) {
                console.error('Error during logout:', err);
                res.status(500).json({ greska: 'Internal server error' });
            } else {
                // Successful logout
                res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
            }
        });
    }
});


app.get('/korisnik', (req, res) => {
    // Check if user is authenticated
    if (!req.session.username) {
        // Unauthorized access
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    } else {
        // Read user data from korisnici.json
        fs.readFile(USERS_FILE_PATH, 'utf-8')
            .then((usersData) => {
                const users = JSON.parse(usersData);
                // Find the user by username
                const user = users.find((u) => u.username === req.session.username);

                if (user) {
                    // Return user data
                    res.status(200).json(user);
                } else {
                    // User not found
                    res.status(500).json({ greska: 'Internal server error' });
                }
            })
            .catch((error) => {
                console.error('Error reading users data:', error);
                res.status(500).json({ greska: 'Internal server error' });
            });
    }
});



app.post('/upit', async (req, res) => {
    // Check if user is authenticated
    if (!req.session.username) {
        // Unauthorized access
        res.status(401).json({ greska: 'Neautorizovan pristup' });
        return;
    }

    const { nekretnina_id, tekst_upita } = req.body;

    try {
        // Read user data from korisnici.json
        const usersData = await fs.readFile(USERS_FILE_PATH, 'utf-8');
        const users = JSON.parse(usersData);

        // Find the id of the logged in user
        const loggedInUserId = users.find((user) => user.username === req.session.username)?.id;

        if (!loggedInUserId) {
            // User not found (This should not happen, as the user is authenticated)
            res.status(500).json({ greska: 'Internal server error' });
            return;
        }

        // Read nekretnine data from nekretnine.json
        const nekretnineData = await fs.readFile(NEKRETNINE_FILE_PATH, 'utf-8');
        const nekretnine = JSON.parse(nekretnineData);

        // Find the nekretnina by id
        const nekretnina = nekretnine.find((n) => n.id === nekretnina_id);

        if (!nekretnina) {
            // Nekretnina not found
            res.status(400).json({ greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji` });
            return;
        }

        // Add new question to the "upiti" array of the nekretnina
        nekretnina.upiti.push({
            korisnik_id: loggedInUserId,
            tekst_upita: tekst_upita
        });

        // Update nekretnine.json with the modified data
        await fs.writeFile(NEKRETNINE_FILE_PATH, JSON.stringify(nekretnine, null, 2), 'utf-8');

        // Successful handling of the request
        res.status(200).json({ poruka: 'Upit je uspješno dodan' });
    } catch (error) {
        console.error('Error handling upit:', error);
        res.status(500).json({ greska: 'Internal server error' });
    }
});


app.put('/korisnik', async (req, res) => {
    // Check if user is authenticated
    if (!req.session.username) {
        // Unauthorized access
        res.status(401).json({ greska: 'Neautorizovan pristup' });
        return;
    }

    const { ime, prezime, username, password } = req.body;

    try {
        // Read user data from korisnici.json
        const usersData = await fs.readFile(USERS_FILE_PATH, 'utf-8');
        const users = JSON.parse(usersData);

        // Find the user by username
        const userIndex = users.findIndex((user) => user.username === req.session.username);

        if (userIndex === -1) {
            // User not found (This should not happen, as the user is authenticated)
            res.status(500).json({ greska: 'Internal server error' });
            return;
        }

        // Update user data with the provided values (if provided)
        if (ime) users[userIndex].ime = ime;
        if (prezime) users[userIndex].prezime = prezime;
        if (username) users[userIndex].username = username;
        if (password) {
            // If password provided, hash it and update
            const hashedPassword = await bcrypt.hash(password, 10);
            users[userIndex].password = hashedPassword;
        }

        // Update korisnici.json with the modified data
        await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');

        // Successful handling of the request
        res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
    } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({ greska: 'Internal server error' });
    }
});


app.get('/nekretnine', async (req, res) => {
    try {
        // Read nekretnine data from nekretnine.json
        const nekretnineData = await fs.readFile(NEKRETNINE_FILE_PATH, 'utf-8');
        const nekretnine = JSON.parse(nekretnineData);

        // Log the fetched nekretnine for debugging
        console.log('Fetched nekretnine:', nekretnine);

        // Return all nekretnine as JSON response
        res.status(200).json(nekretnine);
    } catch (error) {
        console.error('Error fetching nekretnine data:', error);

        // Return an error response with more details
        res.status(500).json({ greska: 'Internal server error', error: error.message });
    }
});

app.listen(3000);