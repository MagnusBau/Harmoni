@flow

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

const config = require("./config/config.js");

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

app.get("/role", (req, res) => {
    console.log("got get request from client, /role");
    pool.getConnection((err, connection) => {
        console.log("connected");
        if (err) {
            console.log("error connecting");
            res.json({error: "error connecting"});
        } else {
            console.log("connected2");
            connection.query(
                "call get_all_roles()",
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({error: "error querying"});
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    })
});

app.get("/role/:eventId", (req, res) => {
    console.log("got get request from client, /role/:eventId");
    pool.getConnection((err, connection) => {
        console.log("connected");
        if (err) {
            console.log("error connecting");
            res.json({error: "error connecting"});
        } else {
            console.log("connected2");
            connection.query(
                "call get_staff_in_event(event_id)",
                req.params.event,
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({error:"error querying"});
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    })
});

app.post("/role", (req, res) => {
    console.log("got post request from client, /role");
    pool.getConnection((err, connection) => {
        console.log("connected");
        if (err) {
            console.log("error connecting");
            res.json({error: "error connecting"});
        } else {
            console.log("connected2");
            let val = [req.body.role_id, req.body.type, req.body.event_id];
            connection.query(
                "call set_role(role_id, type, event_id",
                val,
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({error: "error querying"});
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    })
});

app.put("/role/:roleId", (req, res) => {
    console.log("got update request from client, /role/:roleId");
    pool.getConnection((err, connection) => {
        console.log("connected");
        if (err) {
            console.log("error connecting");
            res.json({error: "error connecting"});
        } else {
            console.log("connected2");
            let val = [req.body.role_id, req.body.event_id];
            connection.query(
                "call assign_to_event(role_id, event_id)",
                val,
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({error: "error querying"});
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
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
