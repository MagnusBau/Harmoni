// @flow

import {EventDao} from "./dao/eventDao"
const express = require('express');
const path = require('path');
const mysql = require("mysql");
const reload = require('reload');
const fs = require('fs');
const logger = require('./middleware/logger');
const PORT = process.env.port || 4000;

let app = express();

const bodyParser = require("body-parser");
const public_path = path.join(__dirname, '/../client/public');

const config = require("./controllers/configuration.js");


app.use(express.static(public_path));
app.use(bodyParser.json()); // for å tolke JSON
app.use('/public', express.static('public'));

app.use(logger);

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

const eventDao = new EventDao(pool);

app.get('/*',function(req,res,next){
    res.header('Access-Control-Allow-Origin' , 'http://localhost:3000' );
    next(); // http://expressjs.com/guide.html#passing-route control
});

//Insert new event
app.post("/", (req:Request, res: Response) => {
    console.log("Post request from client");

    eventDao.createEvent(req.body,(err, rows) => {
        res.send(rows);
    });
});

//Get event by id
app.get("/event/:event_id", (req:Request, res:Response) => {
    console.log('Get-request from client /event/${req.params.event_id}' );

    eventDao.getEventById(req.params.event_id, (err, rows) => {
    res.json(rows)
    })
});

//get all events or event by name

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
