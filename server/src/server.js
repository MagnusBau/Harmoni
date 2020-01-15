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
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');

let app = express();
app.use(express.static(public_path));
app.use(bodyParser.json()); // for å tolke JSON
app.use('/public', express.static('public'));
app.use(fileUpload({
    createParentPath: true
}));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

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
