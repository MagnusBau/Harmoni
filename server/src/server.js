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

let app = express();
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

module.exports = pool;

// Setup routes
const artistRoutes = require("./routes/artist");
const equipmentRoutes = require("./routes/equipment");
const eventRoutes = require("./routes/event");
const ticketRoutes = require("./routes/ticket");
const userRoutes = require("./routes/user");
const fileRoutes = require("./routes/file");
import {FileInfoDAO} from './dao/fileInfoDao.js';


const fileInfoDao = new FileInfoDAO(pool);

app.use("/api/artist", artistRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/auth", userRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/file", fileRoutes);

// Add an application header for allowing HTTPS-requests from same host
app.get('/*',function(req,res,next){
    res.header('Access-Control-Allow-Origin' , 'http://localhost:4000' );
    next();
});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

const upload = multer({
    storage,
    limits: 1024 * 1024 * 5
});

app.post('/single/:eventId', upload.single('file'), (req, res) => {
    let data = {
        "name": req.body.name,
        "eventId": req.params.eventId
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

const server = app.listen(8080);
