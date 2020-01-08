// @flow

import {EquipmentDAO} from "./dao/equipmentDao";

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

function login(bool: boolean, username: string, res: Response) {
    if (bool) {
        console.log("Brukernavn & passord ok");
        let token = jwt.sign({ username: username}, privateKey, signOptions, {
            expiresIn: 60
        });

        let user = new User(1, "Me", "secret", "", 1, "Me", "Me", "me@me.me", "12345678")/*getUser(username)*/;
        let clientUser = {
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

// Server klientapplikasjonen (i public-mappa) på rot-url'en http://localhost:8080
app.use(express.static("public"));

// Håndterer login og sender JWT-token tilbake som JSON
app.get("/login", (req, res) => {
    let savedHash = "secret"/*Yo! Get this from tha base, tha datebase. get only password field, yo.*/;
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

// Plasserer denne MÌDDLEWARE-funksjonen
// foran alle endepunktene under samme path
app.use("/api", (req, res, next) => {
    var token = req.headers["x-access-token"];
    jwt.verify(token, publicKey, verifyOptions, (err, decoded) => {
        if (err) {
            console.log("Token IKKE ok");
            res.status(401);
            res.json({ error: "Not authorized" });
        } else {
            console.log("Token ok: " + decoded.username);
            next();
        }
    });
});

app.get("/api/person", (req, res) => {
    console.log("Skal returnere en liste med personer");
    res.json([{ name: "Hei Sveisen" }]);
});

app.post("/api/token", (req, res) => {
    console.log("Skal returnere en ny token");
    let token = jwt.sign({ username: req.body.username }, privateKey, signOptions, {
        expiresIn: 60
    });
    res.json({ jwt: token });
});

app.get("/api/person/:personId", (req, res) => {
    console.log("Skal returnere personen med id " + req.params.personId);
    res.json({ name: "Hei Sveisen" });
});

app.post("/api/person", (req, res) => {
    console.log("Skal legge til en ny person i DB");
    res.send("");
});

var server = app.listen(8080);



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
