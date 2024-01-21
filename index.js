const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const app = express();
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const { Sequelize, DataTypes } = require('sequelize');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const USERS_FILE_PATH = path.join(__dirname, 'data', 'korisnici.json');
const NEKRETNINE_FILE_PATH = path.join(__dirname, 'data', 'nekretnine.json');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

const sequelize = new Sequelize('wt24', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false 
  });
  
  
  const Korisnik = sequelize.define('Korisnik', {
      ime: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      prezime: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  });
  
  const Nekretnina = sequelize.define('Nekretnina', {
      tip_nekretnine: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      naziv: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      kvadratura: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      cijena: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },

      tip_grijanja: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lokacija: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      godina_izgradnje: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

        datum_objave: {
        type: DataTypes.STRING,
        allowNull: false,
        },

        opis: {
        type: DataTypes.STRING,
        allowNull: false,
        },



      
  });
  
  const Upit = sequelize.define('Upit', {
      tekst_upita: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      
  });
  
  
  Korisnik.hasMany(Upit);
  Upit.belongsTo(Korisnik);
  Upit.belongsTo(Nekretnina, { foreignKey: 'NekretninaId' });
    Nekretnina.hasMany(Upit, { foreignKey: 'NekretninaId' });

  
  sequelize.sync({ force: true })
    .then(async () => {
        console.log('Test123.');

        
        const korisniciData = [
            {
                ime: 'Neko',
                prezime: 'Nekic',
                username: 'username1',
                password: 'hashPassworda1',
            },
            {
                ime: 'Neko2',
                prezime: 'Nekic2',
                username: 'username2',
                password: 'hashPassworda2',
            },
            {
                ime: 'Gene',
                prezime: 'Goodman',
                username: 'testuser',
                password: '$2b$10$KcVbMApYqVq3TEAdaYiK/.uSdjPlwD2aoLpi/NUKmkK.2LZ6BzAvm',
            },
        ];

        await Korisnik.bulkCreate(korisniciData);
        console.log('');

        const nekretninaData = [
            {
                "tip_nekretnine": "apartment",
                "naziv": "Troiposoban stan",
                "kvadratura": 58,
                "cijena": 666666,
                "tip_grijanja": "plin",
                "lokacija": "Novo Sarajevo",
                "godina_izgradnje": 2019,
                "datum_objave": "01.10.2023.",
                "opis": "Sociis natoque penatibus.",
            },

            {
                "tip_nekretnine": "business",
                "naziv": "Srednji poslovni prostor",
                "kvadratura": 20,
                "cijena": 70000,
                "tip_grijanja": "struja",
                "lokacija": "Centar",
                "godina_izgradnje": 2005,
                "datum_objave": "20.08.2023.",
                "opis": "Magnis dis parturient montes",
            },

            {
                "tip_nekretnine": "house",
                "naziv": "Kuca na periferiji grada",
                "kvadratura": 150,
                "cijena": 350000,
                "tip_grijanja": "centralno",
                "lokacija": "Ilidza",
                "godina_izgradnje": 2015,
                "datum_objave": "15.06.2023.",
                "opis": "Lorem ipsum dolor sit amet.",
    
            },

            {
              "tip_nekretnine": "apartment",
              "naziv": "Cetvorosoban stan",
              "kvadratura": 75,
              "cijena": 300000,
              "tip_grijanja": "toplana",
              "lokacija": "Novi Grad",
              "godina_izgradnje": 2020,
              "datum_objave": "10.05.2023.",
              "opis": "Quisque velit nisi, pretium ut lacinia in.",
            },
            {
              "tip_nekretnine": "business",
              "naziv": "Prostor za kafić",
              "kvadratura": 80,
              "cijena": 120000,
              "tip_grijanja": "klima",
              "lokacija": "Sarajevo",
              "godina_izgradnje": 2010,
              "datum_objave": "05.03.2023.",
              "opis": "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
            },
            {
              "tip_nekretnine": "house",
              "naziv": "Porodična kuća s vrtom",
              "kvadratura": 200,
              "cijena": 500000,
              "tip_grijanja": "plin",
              "lokacija": "Vogošća",
              "godina_izgradnje": 2012,
              "datum_objave": "18.11.2023.", 
              "opis": "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
            },
            {
              "tip_nekretnine": "apartment",
              "naziv": "Novi dvosoban stan",
              "kvadratura": 65,
              "cijena": 250000,
              "tip_grijanja": "plin",
              "lokacija": "Bistrik",
              "godina_izgradnje": 2018,
              "datum_objave": "12.02.2023.",
              "opis": "Aenean commodo ligula eget dolor.",
            },
            {
              "tip_nekretnine": "business",
              "naziv": "Moderni uredski prostor",
              "kvadratura": 40,
              "cijena": 90000,
              "tip_grijanja": "struja",
              "lokacija": "Marijin Dvor",
              "godina_izgradnje": 2015,
              "datum_objave": "25.06.2023.",
              "opis": "Aenean massa.",
            },
            {
              "tip_nekretnine": "house",
              "naziv": "Luksuzna vila sa bazenom",
              "kvadratura": 300,
              "cijena": 800000,
              "tip_grijanja": "centralno",
              "lokacija": "Ilidža",
              "godina_izgradnje": 2016,
              "datum_objave": "30.04.2023.",
              "opis": "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
            },


          ];
          

        await Nekretnina.bulkCreate(nekretninaData);
        console.log('');

        const upitData = [
            {
              tekst_upita: 'Upit_user1_nekr1',
              KorisnikId: 1, 
              NekretninaId: 1, 
            },

            {
                tekst_upita: 'Upit_user2_nekr1',
                KorisnikId: 2, 
                NekretninaId: 1, 
              },

              {
                tekst_upita: 'Upit_user3_nekr1',
                KorisnikId: 3, 
                NekretninaId: 1, 
              },

              {
                tekst_upita: 'Upit_user2_nekr2',
                KorisnikId: 2, 
                NekretninaId: 2, 
              },

              {
                tekst_upita: 'Upit_user3_nekr3',
                KorisnikId: 3, 
                NekretninaId: 3, 
              },

              {
                tekst_upita: 'Upit_user1_nekr4',
                KorisnikId: 1, 
                NekretninaId: 4, 
              },

              {
                tekst_upita: 'Upit_user2_nekr5',
                KorisnikId: 2, 
                NekretninaId: 5, 
              },

              {
                tekst_upita: 'Upit_user3_nekr6',
                KorisnikId: 3, 
                NekretninaId: 6, 
              },


              {
                tekst_upita: 'Upit_user1_nekr7',
                KorisnikId: 1, 
                NekretninaId: 7, 
              },

              {
                tekst_upita: 'Upit_user3_nekr8',
                KorisnikId: 3, 
                NekretninaId: 8, 
              },

              {
                tekst_upita: 'Upit_user2_nekr9',
                KorisnikId: 2, 
                NekretninaId: 9, 
              },
            
          ];
      
          await Upit.bulkCreate(upitData);
          console.log('');

    })
    .catch((error) => {
        console.error('Baza nije sinhronizovana.', error);
    });
  

app.get('/nekretnine.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/nekretnine.html');
});


app.get('/detalji.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/detalji.html');
});


app.get('/profil.html', function(req, res) {
    if (!req.session.username) {
        res.status(401).send('Unauthorized access');
    } else {
        res.sendFile(__dirname + '/public/html/profil.html');
    }
});

app.get('/prijava.html', function(req, res) {
    res.sendFile(__dirname + '/public/html/prijava.html');
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Korisnik.findOne({ where: { username: username } });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                req.session.username = username;
                res.json({ message: 'Uspjesna prijava.' });
            } else {
                res.status(401).json({ error: 'Neuspjesna prijava.' });
            }
        } else {
            res.status(401).json({ error: 'Neuspjesna prijava.' });
        }
    } catch (error) {
        console.error('Neuspjesna prijava: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.post('/logout', (req, res) => {
    if (!req.session.username) {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    } else {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error during logout:', err);
                res.status(500).json({ greska: 'Internal server error' });
            } else {
                res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
            }
        });
    }
});


app.get('/korisnik', async (req, res) => {
    if (!req.session.username) {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    } else {
        try {
            const user = await Korisnik.findOne({ where: { username: req.session.username } });

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(500).json({ greska: 'Internal server error' });
            }
        } catch (error) {
            console.error('Greska prilikom dobavljanja podataka korisnika', error);
            res.status(500).json({ greska: 'Internal server error' });
        }
    }
});




app.post('/upit', async (req, res) => {
    if (!req.session.username) {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
        return;
    }

    const { nekretnina_id, tekst_upita } = req.body;

    try {
        const loggedInUser = await Korisnik.findOne({ where: { username: req.session.username } });

        if (!loggedInUser) {
            res.status(500).json({ greska: 'Internal server error' });
            return;
        }

        const nekretnina = await Nekretnina.findByPk(nekretnina_id);

        if (!nekretnina) {
            res.status(400).json({ greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji` });
            return;
        }

        const newUpit = await Upit.create({
            tekst_upita: tekst_upita,
            KorisnikId: loggedInUser.id,
            NekretninaId: nekretnina.id,
        });

        res.status(200).json({ poruka: 'Upit je uspješno dodan' });
    } catch (error) {
        console.error('Greska ', error);
        res.status(500).json({ greska: 'Internal server error' });
    }
});


app.put('/korisnik', async (req, res) => {
    if (!req.session.username) {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
        return;
    }

    const { ime, prezime, username, password } = req.body;

    try {
        const loggedInUser = await Korisnik.findOne({ where: { username: req.session.username } });

        if (!loggedInUser) {
            res.status(500).json({ greska: 'Internal server error' });
            return;
        }

        if (ime) loggedInUser.ime = ime;
        if (prezime) loggedInUser.prezime = prezime;
        if (username) loggedInUser.username = username;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            loggedInUser.password = hashedPassword;
        }

        await loggedInUser.save();

        res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
    } catch (error) {
        console.error('Greska prilikom azuriranja podataka', error);
        res.status(500).json({ greska: 'Internal server error' });
    }
});



app.get('/nekretnine', async (req, res) => {
    try {
        const nekretnine = await Nekretnina.findAll();
        res.status(200).json(nekretnine);
    } catch (error) {
        console.error('Greska prilikom dobavljanja nekretnine', error);
        res.status(500).json({ greska: 'Internal server error', error: error.message });
    }
});


app.get('/upiti', async (req, res) => {
    try {
        const upiti = await Upit.findAll();
        res.status(200).json(upiti);
    } catch (error) {
        console.error('Greska prilikom dobavljanja upita', error);
        res.status(500).json({ greska: 'Internal server error', error: error.message });
    }
});


app.get('/nekretnina/:id', async (req, res) => {
    const nekretninaId = req.params.id;

    try {
        const nekretnina = await Nekretnina.findByPk(nekretninaId);

        if (!nekretnina) {
            res.status(400).json({ greska: `Nekretnina sa id-em ${nekretninaId} ne postoji` });
        } else {
            res.status(200).json(nekretnina);
        }
    } catch (error) {
        console.error(`Greska:  ${nekretninaId}:`, error);
        res.status(500).json({ greska: 'Internal server error', error: error.message });
    }
});



app.get('/nekretnine/:nekretninaId/upiti', async (req, res) => {
    const nekretninaId = req.params.nekretninaId;
    console.log('Received nekretninaId:', nekretninaId);

    try {
        const nekretnina = await Nekretnina.findByPk(nekretninaId, {
            include: Upit 
        });

        console.log('Retrieved Nekretnina:', nekretnina);

        
        const upiti = nekretnina.Upits;

        console.log('Retrieved Upiti:', upiti);

        res.status(200).json(upiti);
    } catch (error) {
        console.error(`Greska pri dobavljanju podataka o nekretnini sa id-em ${nekretninaId}:`, error);
        res.status(500).json({ greska: 'Internal server error', error: error.message });
    }
});


app.get('/upiti/:nekretnina_id', async (req, res) => {
    const nekretninaId = req.params.nekretnina_id;

    try {
        const nekretnina = await Nekretnina.findByPk(nekretninaId, {
            include: Upit 
        });

        if (!nekretnina) {
            res.status(400).json({ greska: `Nekretnina sa id-em ${nekretninaId} ne postoji` });
        } else {
            
            const upiti = nekretnina.Upits;

            res.status(200).json(upiti);
        }
    } catch (error) {
        console.error(`Greska pri dobavljanju upita o nekretnini sa id-em ${nekretninaId}:`, error);
        res.status(500).json({ greska: 'Internal server error', error: error.message });
    }
});

app.get('/korisnik/:id', async (req, res) => {
    const korisnikId = req.params.id;

    try {
        const korisnik = await Korisnik.findByPk(korisnikId);

        if (!korisnik) {
            res.status(400).json({ greska: `Korisnik sa id-em ${korisnikId} ne postoji` });
        } else {
            
            const username = korisnik.username;

            res.status(200).json({ username });
        }
    } catch (error) {
        console.error(`Greska prilikom dobavljanja korisnika id-em: ${korisnikId}:`, error);
        res.status(500).json({ greska: 'Internal server error', error: error.message });
    }
});



const server = app.listen(3000, () => {
    console.log('Aplikacija pokrenuta.');
});

process.on('SIGINT', async () => {
    await sequelize.close();
    server.close();
    process.exit();
});