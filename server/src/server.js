// @flow

import {roleDAO} from './dao/roleDao';

const express = require('express');
const path = require('path');
const mysql = require("mysql");
const reload = require('reload');
const fs = require('fs');
const PORT = process.env.port || 4000;

let app = express();

const bodyParser = require("body-parser");
const public_path = path.join(__dirname, '../../client/public');

const config = require("./controllers/configuration.js");

app.use(express.static(public_path));
app.use(bodyParser.json());
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

const roleDao = new roleDAO(pool);

// Add an application header for allowing HTTPS-requests from same host
app.get('/*',function(req,res,next){
    res.header('Access-Control-Allow-Origin' , 'http://localhost:4000' );
    next();
});

//Returns all roles
app.get("/api/role", (req, res) => {
    console.log("Got get request from client: /role");
    roleDao.getRoles((err, rows) => {
        res.json(rows);
    })
});

//Returns roles assigned to event
app.get("/api/role/event/:eventId", (req, res) => {
    console.log("Got get request from client: /role/:eventId");
    roleDao.getRolesInEvent(req.body.eventId, (err, rows) => {
        res.json(rows);
    })
});

//Creates new role
app.post("/api/role", (req, res) => {
    console.log("Got post request from client: /role");
    roleDao.createRole(req.body.type, req.body.event, (err, rows) => {
        res.send(rows);
    })
});

//Assigns role to an event
app.post("/api/event/:eventId", (req, res) => {
    console.log("Got post request from client: /role/:eventId");
    roleDao.assignToEvent(req.body.role, req.body.event, req.body.count, (err, rows) => {
        res.send(rows);
    })
});
//Updates count of role
app.put("/api/role/:eventId", (req, res) => {
    console.log("Got put request from client: /role/:eventId");
    roleDao.updateRoleCount(req.body.role, req.body.event, req.body.count, (err, rows) => {
        res.send(rows);
    })
});
//Removes role from event
app.delete("/api/role/:eventId", (req, res) => {
    console.log("Got delete request from clint: /role/:roleId");
    roleDao.removeFromEvent(req.body.role, req.body.event, (err, rows) => {
        res.send(rows);
    })
});

//Removes role completely
app.delete("/api/roler", (req, res) => {
    console.log("Got delete request from client: /role");
    roleDao.removeRole(req.body.role_id, (err, rows) => {
        res.send(rows);
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
