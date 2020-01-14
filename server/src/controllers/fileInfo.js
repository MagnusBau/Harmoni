//@flow

const fileInfoController = require("./fileInfo");
const fs = require('fs');

import {FileInfoDAO} from '../dao/fileInfoDao.js';
const pool = require('../server.js');

const fileInfoDao = new FileInfoDAO(pool);

// Håndterer login og sender JWT-token tilbake som JSON
exports.getFileInfoById = (req, res, next) => {
    console.log(`Got request from client: GET /file/info`);
    fileInfoDao.getFileInfoById((err, rows) => {
        res.json(rows);
    })
};

exports.getFileInfoByEvent = (req, res, next) => {
    console.log(`Got request from client: GET /file/info/:eventId`);
    fileInfoDao.getFileInfoByEvent(req.query.event, (err, rows) => {
        res.json(rows);
    })
};

exports.insertFileInfo = (req, res, next) => {
    console.log(`Got request from client: POST /file/info`);
    fileInfoDao.insertFileInfo({"event": req.query.event, "name": req.body.name}, (err, rows) => {
        res.json(rows);
    })
};

exports.updateFileInfo = (req, res, next) => {
};

exports.deleteFileInfo = (req, res, next) => {
};