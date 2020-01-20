// @flow

// Server properties

const express = require('express');
const path = require('path');
const mysql = require("mysql");
const reload = require('reload');
const fs = require('fs');
const PORT = process.env.port || 4000;
const bodyParser = require("body-parser");
const public_path = path.join(__dirname, '/../../client/public');
const config = require("./controllers/configuration.js");
const multer = require('multer');

let jwt = require("jsonwebtoken");

let app = express();
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

import {UserDAO} from "./dao/userDao";
const userDao = new UserDAO(pool);

module.exports = pool;

//CORS-error handling (server/client security blocking-thing)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Accept, Origin"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    next();
});

let publicKey = fs.readFileSync('./src/public.txt', 'utf8');

const verifyOptions = {
    expiresIn:  "30M",
    algorithm:  ["RS256"]
};

app.use("/auth/id/:id", (req, res, next) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, publicKey, verifyOptions, (err, decoded) => {
        if (err) {
            console.log("Token IKKE ok 1");
            res.json({ error: "Token" });
        } else {
            userDao.getUsername(Number.parseInt(req.params.id), (err, rows) => {
                if(rows[0][0].username.toString().toUpperCase() === decoded.username.toString().toUpperCase()) {
                    if(req.body.username) {
                        if(req.body.username === decoded.username) {
                            console.log("Token ok: " + decoded.username);
                            if(req.body.user_id) {
                                if(req.body.user_id === req.params.id) {
                                    console.log("Token ok: " + decoded.username);
                                    next();
                                } else {
                                    console.log("Token IKKE ok 4");
                                    res.json({ error: "Token" });
                                }
                            } else {
                                console.log("Token ok: " + decoded.username);
                                next();
                            }
                        } else {
                            console.log("Token IKKE ok 2");
                            res.json({ error: "Token" });
                        }
                    } else {
                        console.log("Token ok: " + decoded.username);
                        if(req.body.user_id) {
                            if(req.body.user_id === req.params.id) {
                                console.log("Token ok: " + decoded.username);
                                next();
                            } else {
                                console.log("Token IKKE ok 5");
                                res.json({ error: "Token" });
                            }
                        } else {
                            console.log("Token ok: " + decoded.username);
                            next();
                        }
                    }
                } else {
                    console.log("Token IKKE ok 3");
                    res.json({ error: "Token" });
                }
            });
        }
    });
});


app.use("/auth/id/:id", (req, res, next) => {
    //check body
    next();

});

import {TicketDAO} from './dao/ticketDao.js';

const ticketDao = new TicketDAO(pool);

/*
app.use("/auth/id/:id/ticket/ticket/:ticket", (req, res, next) => {
    console.log("auth ticket 1");
    userDao.getContact(req.params.id, (err, rows) => {
        if(rows[0][0].contact_id) {
            let id = rows[0][0].contact_id;
            if(req.params.ticket) {
                ticketDao.getOne(req.params.ticket,(err, rows) => {
                    if(rows[0][0]) {
                        if(rows[0][0].event) {
                            eventDao.getEventById(rows[0][0].event, (err, rows2) => {
                                if(rows2[0][0].organizer) {
                                    if(rows2[0][0].organizer === id) {
                                        next();
                                    } else {
                                        console.log("not authorized ticket id1");
                                        res.json({ error: "Not authorized" });
                                    }
                                } else {
                                    console.log("not authorized ticket id2");
                                    res.json({ error: "Not authorized" });
                                }
                            });
                        } else {
                            console.log("not authorized ticket id3");
                            res.json({ error: "Not authorized" });
                        }
                    } else {
                        console.log("not authorized ticket id4");
                        res.json({ error: "Not authorized" });
                    }
                });
            } else {
                next();
            }
        } else {
            res.json({ error: "Not authorized" });
        }
    });
});

//TODO: Is this a test?
app.use("/auth/id/:id/ticket", (req, res, next) => {
    console.log("auth event data");
    userDao.getContact(req.params.id, (err, rows) => {
        if (rows[0][0].contact_id) {
            let id = rows[0][0].contact_id;
            if(req.body.event) {
                eventDao.getEventById(req.body.event, (err, rows) => {
                    if(rows[0][0].organizer) {
                        if(rows[0][0].organizer === id) {
                            next();
                        } else {
                            console.log("not authorized event id3");
                            res.json({ error: "Not authorized" });
                        }
                    } else {
                        console.log("not authorized event id4");
                        res.json({ error: "Not authorized" });
                    }
                });
            } else {
                next();
            }
        } else {
            res.json({error: "Not authorized"});
        }
    });
});


//TODO: Is this a test?
import {EventDAO} from './dao/eventDao.js';
import {ArtistDAO} from "./dao/artistDao";

const artistDao = new ArtistDAO(pool);
const eventDao = new EventDAO(pool);

app.use("/auth/id/:id/ticket/event/:event", (req, res, next) => {
    console.log("auth event param");
    userDao.getContact(req.params.id, (err, rows) => {
        if (rows[0][0].contact_id) {
            let id = rows[0][0].contact_id;
            if (req.params.event) {
                eventDao.getEventById(req.params.event, (err, rows) => {
                    if (rows[0][0].organizer) {
                        if (rows[0][0].organizer === id) {
                            next();
                        } else {
                            artistDao.getArtistByEvent(req.params.event, (err, rows) => {
                                if (rows[0]) {
                                    if (rows[0].map(artist => artist.user_id).includes(id)) {
                                        next();
                                    } else {
                                        console.log("not authorized event id6");
                                        res.json({error: "Not authorized"});
                                    }
                                } else {
                                    console.log("not authorized event id1");
                                    res.json({error: "Not authorized"});
                                }
                            });
                        }
                    } else {
                        console.log("not authorized event id2");
                        res.json({error: "Not authorized"});
                    }
                });
            } else {
                next();
            }
        } else {
            res.json({error: "Not authorized"});
        }
    });
});*/

// Setup routes
const artistRoutes = require("./routes/artist");
const equipmentRoutes = require("./routes/equipment");
const eventRoutes = require("./routes/event");
const ticketRoutes = require("./routes/ticket");
const userRoutes = require("./routes/user");
const fileRoutes = require("./routes/file");
const roleRoutes = require("./routes/role");
const riderRoutes = require("./routes/riders");
const loginRoutes = require("./routes/login");
import {FileInfoDAO} from './dao/fileInfoDao.js';


const fileInfoDao = new FileInfoDAO(pool);

app.use("/api/artist", artistRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/auth/id/:id/user", userRoutes);
app.use("/auth/id/:id/ticket", ticketRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/rider", riderRoutes);
app.use("/api/file", fileRoutes);
app.use("/auth", loginRoutes);

// Add an application header for allowing HTTPS-requests from same host
/*app.get('/*',function(req,res,next){
    res.header('Access-Control-Allow-Origin' , 'http://localhost:4000' );
    next();
});*/

app.use((req, res, next) => {
    res.status(404).redirect('http://localhost:' + PORT + '/#/404');
});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './files');
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

const upload = multer({
    storage,
    limits: 1024 * 1024 * 5
});

app.post('/api/single/:eventId', upload.single('file'), (req, res) => {
    let data = {
        "name": req.body.name,
        "eventId": req.params.eventId,
        "path": req.body.path
    };
    let result = res;
    console.log(req.body.name);
    fileInfoDao.postFileInfo(data, (err, res) => {
        try {
            result.send(req.file);
        }catch(err) {
            result.send(400);
        }
    });
});

app.post('/api/single/update', upload.single('file'), (req, res) => {
        try {
            result.send(req.file);
        }catch(err) {
            result.send(400);
        }
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
