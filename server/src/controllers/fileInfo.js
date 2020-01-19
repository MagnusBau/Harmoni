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
    fileInfoDao.getFileInfoByEvent(req.params.eventId, (err, rows) => {
        res.json(rows);
    })
};

exports.insertFileInfo = (req, res, next) => {
    console.log(`Got request from client: POST /file/info`);
    fileInfoDao.insertFileInfo({"event": req.query.event, "name": req.body.name}, (err, rows) => {
        res.json(rows);
    })
};

exports.checkFileName = (req, res, next) => {
    console.log('Got request from client: POST /file/check/:eventId');
    console.log(req.params.eventId);
    console.log(req.body.name);
    fileInfoDao.checkFileName(req.params.eventId, req.body.name, (err, rows) => {
        res.json(rows);
    })
};

exports.downloadFile = (req, res, next) => {
    console.log('Got request from client: GET /file/download');
    res.download("./files/3------bernie.jpg");
};

exports.updateFileInfo = (req, res, next) => {
};

exports.deleteFileInfo = (req, res, next) => {
};