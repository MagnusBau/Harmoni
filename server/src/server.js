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
    expiresIn:  "12h",
    algorithm:  ["RS256"]
};
var signOptions = {
    expiresIn:  "12h",
    algorithm:  "RS256"
};

function register() {

}

function login(bool: boolean, username: string, res: Response) {
    if (bool) {
        console.log("Brukernavn & passord ok");
        let token = jwt.sign({ username: username}, privateKey, signOptions, {
            expiresIn: 60
        });

        let user = new User(1, "Me", "secret", "", 1, "Me", "Me", "me@me.me", "12345678")/*getUser(username)*/;
        let clientUser = {
            "user_id": user.user_id,
            "username": user.username,
            "image": user.image,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone
        };
        res.json({ jwt: token, user: clientUser });

    } else {
        console.log("Passord IKKE ok");
        res.status(401);
        res.json({ error: "Not authorized" });
    }
}

function validateUsername(username: string) {
    if(username.match("^[A-Za-z0-9]+$") && 2 < username.length < 50) {
        return true;
    } else {
        return false;
    }
}

function validatePassword(password: string) {
    if(password.match("^[A-Za-z0-9]+$") && 2 < password.length < 50) {
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
app.get("/login", (req, res) => {
    let savedHash = userDao.getPassword(req.body.username);
    if(savedHash != null) {
        let response = res;
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(savedHash, salt, function(err, hash) {
                let savedHash = hash;
                console.log("hashed");
                bcrypt.compare(req.body.password, savedHash, function(err, res) {
                    console.log("sjekker");
                    login(res, req.body.username, response);
                })
            })
        });
    } else {
        console.log("Brukernavn IKKE ok");
        res.status(401);
        res.json({ error: "Not authorized" });
    }
});

app.post("/register", (req, res) => {
    if(validateUsername(req.body.username)) {
        if(validatePassword(req.body.password)) {
            if(validateEmail(req.body.email)) {
                if(validateFirstName(req.body.first_name)) {
                    if(validateLastName(req.body.last_name)) {
                        if(validatePhone(req.body.phone)) {
                            bcrypt.genSalt(10, function(err, salt) {
                                bcrypt.hash(savedHash, salt, function(err, hash) {
                                    console.log("hashed");
                                    let data = {
                                        "username": req.body.username,
                                        "password": hash,
                                        "email": req.body.email,
                                        "first_name": req.body.first_name,
                                        "last_name": req.body.last_name,
                                        "phone": req.body.phone
                                    }
                                    if(userDao.register(data)) {
                                        login(true, req.body.username, res);
                                    } else {
                                        res.status(401);
                                        res.json({ error: "It failed somehow. Blame the db" });
                                    }

                                })
                            });
                        } else {
                            res.status(401);
                            res.json({ error: "Invalid phone" });
                        }
                    } else {
                        res.status(401);
                        res.json({ error: "Invalid last_name" });
                    }
                } else {
                    res.status(401);
                    res.json({ error: "Invalid first_name" });
                }
            } else {
                res.status(401);
                res.json({ error: "Invalid email" });
            }
        } else {
            res.status(401);
            res.json({ error: "Invalid password" });
        }
    } else {
        res.status(401);
        res.json({ error: "Invalid username" });
    }
});

// Plasserer denne MÌDDLEWARE-funksjonen
// foran alle endepunktene under samme path
app.use("/api/:id", (req, res, next) => {
    var token = req.headers["x-access-token"];
    jwt.verify(token, publicKey, verifyOptions, (err, decoded) => {
        if (err) {
            console.log("Token IKKE ok");
            res.status(401);
            res.json({ error: "Not authorized" });
        } else {
            userDao.getUsername(req.params.id).then((res) => {
                if(res === decoded.username) {
                    if(req.body.username) {
                        if(req.body.username === decoded.username) {
                            console.log("Token ok: " + decoded.username);
                            next();
                        }
                    }
                }
                console.log("Token IKKE ok");
                res.status(401);
                res.json({ error: "Not authorized" });
            });

        }
    });
});

app.post("/api/:id/token", (req, res) => {
    console.log("Skal returnere en ny token");
    let token = jwt.sign({ username: req.body.username }, privateKey, signOptions, {
        expiresIn: 60
    });
    res.json({ jwt: token });
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
