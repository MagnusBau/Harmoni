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

app.get('/*',function(req,res,next){
    res.header('Access-Control-Allow-Origin' , 'http://localhost:4000' );
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
    } else if (req.query.event) {
        equipmentDao.getEquipmentByEvent(req.query.event, (err, rows) => {
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

app.post("/api/event/equipment", (req, res) => {
    console.log(`Got request from client: POST /api/event/equipment`);

    equipmentDao.addEquipmentToEvent(req.body.event, req.body.item, req.body.amount,(err, rows) => {
        res.send(rows);
    });
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
