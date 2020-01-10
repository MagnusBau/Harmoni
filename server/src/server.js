// @flow

import {ticketDAO} from "./dao/ticketDao";
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



app.get('/*',function(req,res,next){
    res.header('Access-Control-Allow-Origin' , 'http://localhost:4000' );
    next(); // http://expressjs.com/guide.html#passing-route control
});



let ticketDao = new ticketDAO(pool);


app.post("/ticket", (req , res) => {
    console.log("Fikk POST-request fra klienten");
    ticketDao.createOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);

    });
});


app.get("/ticket", (req, res) => {
    console.log(`Got request from client: /ticket`);
    ticketDao.getAll((err, rows) => {
        res.json(rows);
    })
});
app.get("/ticket/:id", (req, res) => {
    console.log(`Got request from client: /ticket`);
    ticketDao.getOne(req.params.id,(err, rows) => {
        res.json(rows);
    });
});



app.put("/ticket/:id", (req, res) => {
    console.log("Fikk POST-request fra /ticket/:id");
    ticketDao.updateOneTicket(req.body, (err, rows) => {
        res.json(rows);
    });
});

app.delete("/ticket/:id", (req, res) => {
    console.log("/person: fikk /ticket/:id request fra klient");
    ticketDao.removeOneTicket(Number.parseInt(req.params.id),(status, data) => {
        res.status(status);
        res.json(data);
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



