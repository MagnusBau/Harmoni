// @flow

import {EquipmentDAO} from "./dao/equipmentDao";
import {UserDAO} from "./dao/userDao";

const express = require('express');
const path = require('path');
const mysql = require("mysql");
const reload = require('reload');
const fs = require('fs');
const PORT = process.env.port || 4000;

let app = express();

const bodyParser = require("body-parser");
const public_path = path.join(__dirname, '/../../client/public');

const config = require("./controllers/configuration.js");

app.use(express.static(public_path));
app.use(bodyParser.json()); // for å tolke JSON
app.use('/public', express.static('public'));

// Create MySql connection pool
let database = config.getProductionDatabase();
const pool = mysql.createPool({
    connectionLimit: 2,
    host: database.host,
    user: database.user,
    password: database.password,
    database: database.database,
    debug: false,
    multipleStatements: true
});

const userDao = new UserDAO(pool);

const equipmentDao = new EquipmentDAO(pool);

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
app.use(bodyParser.json()); // for å tolke JSON i body

class User {
    user_id: number;
    username: string;
    password: string;
    image: any;
    contact_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;

    constructor(user_id: number, username: string, password: string, image: any, contact_id: number, first_name: string, last_name: string, email: string, phone: string) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.image = image;
        this.contact_id = contact_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
    }
}

let publicKey = fs.readFileSync('./src/public.txt', 'utf8');
let privateKey = fs.readFileSync('./src/private.txt', 'utf8');

var verifyOptions = {
    expiresIn:  "15M",
    algorithm:  ["RS256"]
};
var signOptions = {
    expiresIn:  "15M",
    algorithm:  "RS256"
};

function register() {

}

function login(bool: boolean, username: string, res: Response) {
    if (bool) {
        console.log("Brukernavn & passord ok");
        let token = jwt.sign({ username: username}, privateKey, signOptions);

        userDao.getUser(username, (err, user) => {
            res.json({
                user: {
                    "user_id": user[0][0].user_id,
                    "username": user[0][0].username,
                    "image": user[0][0].image,
                    "first_name": user[0][0].first_name,
                    "last_name": user[0][0].last_name,
                    "email": user[0][0].email,
                    "phone": user[0][0].phone
                },
                token: token });
        });


    } else {
        console.log("Passord IKKE ok");
        res.json({ error: "Not authorized" });
    }
}

function validateUsername(username: string) {
    if(username.match("^[A-Za-z0-9]+$") && 2 < username.length <= 50) {
        return true;
    } else {
        return false;
    }
}

function validatePassword(password: string) {
    if(password.match("^[A-Za-z0-9]+$") && 2 < password.length <= 256) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email: string) {
    if(email.length < 50) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    } else {
        return false;
    }
}

function validateFirstName(firstName: string) {
    if(firstName.match("^[A-Za-z]+$") && 2 < firstName.length < 50) {
        return true;
    } else {
        return false;
    }
}

function validateLastName(lastName: string) {
    if(lastName.match("^[A-Za-z]+$") && 2 < lastName.length < 50) {
        return true;
    } else {
        return false;
    }
}

function validatePhone(phone: string) {
    if(phone.match("^[0-9]+$")) {
        if(phone.length === 8) {
            return true;
        } else if(phone.length === 12 && phone.substring(0, 3) === "0047") {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// Server klientapplikasjonen (i public-mappa) på rot-url'en http://localhost:8080
app.use(express.static("public"));

// Håndterer login og sender JWT-token tilbake som JSON
app.post("/login", (req, res) => {
    userDao.getPassword(req.body.username, (err, rows) => {
        let savedHash = null;
        if(rows[0]) {
            if(rows[0][0]) {
                savedHash = rows[0][0].password;
            }
        }
        if(savedHash != null) {
            bcrypt.compare(req.body.password, savedHash, function(err, response) {
                login(response, req.body.username, res);
            })
        } else {
            console.log("Brukernavn IKKE ok");
            res.json({ error: "Not authorized" });
        }
    });
});

app.post("/register", (req, res) => {
    if(validateUsername(req.body.username)) {
        if(validatePassword(req.body.password)) {
            if(validateEmail(req.body.email)) {
                if(validateFirstName(req.body.first_name)) {
                    if(validateLastName(req.body.last_name)) {
                        if(validatePhone(req.body.phone)) {
                            bcrypt.genSalt(10, function(err, salt) {
                                bcrypt.hash(req.body.password, salt, function(err, hash) {
                                    let data = {
                                        "username": req.body.username,
                                        "password": hash,
                                        "email": req.body.email,
                                        "first_name": req.body.first_name,
                                        "last_name": req.body.last_name,
                                        "phone": req.body.phone
                                    }
                                    userDao.postContact(data, (err, contactData) => {
                                        if(contactData.insertId != null || contactData.insertId === false || contactData.insertId === 0) {
                                            userDao.postUser(data, contactData.insertId, (err, userData) => {
                                                if(userData.insertId != null || userData.insertId === false || userData.insertId === 0) {
                                                    login(true, req.body.username, res);
                                                } else {
                                                    res.json({ error: "Invalid something" });
                                                }
                                            })
                                        } else {
                                            res.json({ error: "Invalid something" });
                                        }
                                    })
                                })
                            });
                        } else {
                            res.json({ error: "Invalid phone" });
                        }
                    } else {
                        res.json({ error: "Invalid last_name" });
                    }
                } else {
                    res.json({ error: "Invalid first_name" });
                }
            } else {
                res.json({ error: "Invalid email" });
            }
        } else {
            res.json({ error: "Invalid password" });
        }
    } else {
        res.json({ error: "Invalid username" });
    }
});

// Plasserer denne MÌDDLEWARE-funksjonen
// foran alle endepunktene under samme path
app.use("/api/:id", (req, res, next) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, publicKey, verifyOptions, (err, decoded) => {
        if (err) {
            console.log("Token IKKE ok 1");
            res.json({ error: "Not authorized" });
        } else {
            userDao.getUsername(Number.parseInt(req.params.id), (err, rows) => {
                if(rows[0][0].username.toString().toUpperCase() === decoded.username.toString().toUpperCase()) {
                    if(req.body.username) {
                        if(req.body.username === decoded.username) {
                            console.log("Token ok: " + decoded.username);
                            next();
                        } else {
                            console.log("Token IKKE ok 2");
                            res.json({ error: "Not authorized" });
                        }
                    } else {
                        console.log("Token ok: " + decoded.username);
                        next();
                    }
                } else {
                    console.log("Token IKKE ok 2");
                    res.json({ error: "Not authorized" });
                }
            });
        }
    });
});

app.post("/api/:id/token", (req, res) => {
    console.log("Skal returnere en ny token");
    let token = jwt.sign({ username: req.body.username }, privateKey, signOptions);
    res.json({ token: token });
});

app.get('/*',function(req,res,next){
    res.header('Access-Control-Allow-Origin' , 'http://localhost:3000' );
    next(); // http://expressjs.com/guide.html#passing-route control
});



// Insert equipment
app.post("/api/equipment", (req, res) => {
    console.log(`Got request from client: POST /api/equipment`);

    equipmentDao.insertEquipment(req.body.name,(err, rows) => {
        res.send(rows);
    });
});

app.delete("/api/equipment/:equipmentId", (req, res) => {
    console.log(`Got request from client: DELETE /api/equipment/${req.params.equipmentId}`);

    equipmentDao.deleteEquipment(req.params.equipmentId,(err, rows) => {
        res.send(rows);
    });
});

// Get all equipment or all equipment by name
app.get("/api/equipment", (req, res) => {
    console.log(`Got request from client: /equipment`);
    if (req.query.name) {
        equipmentDao.getEquipmentByName(req.query.name, (err, rows) => {
            res.json(rows);
        })
    } else {
        equipmentDao.getAllEquipment((err, rows) => {
            res.json(rows);
        })
    }
});

// Get equipment by id
app.get("/api/equipment/:equipmentId", (req, res) => {
    console.log(`Got request from client: /equipment/${req.params.equipmentId}`);
    equipmentDao.getEquipmentById(req.params.equipmentId, (err, rows) => {
        res.json(rows);
    })
});

// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise<void>((resolve, reject) => {
    // Setup hot reload (refresh web page on client changes)
    reload(app).then(reloader => {
        app.listen(PORT, (error: ?Error) => {
            if (error) reject(error.message);
            console.log('Express server started');
            // Start hot reload (refresh web page on client changes)
            reloader.reload(); // Reload application on server restart
            fs.watch(public_path, () => reloader.reload());
            resolve();
        });
    });
});

var server = app.listen(8080);
