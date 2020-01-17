//@flow

const fileInfoController = require("./fileInfo");
const fs = require('fs');

import {FileInfoDAO} from '../dao/fileInfoDao.js';
const pool = require('../server.js');


const fileInfoDao = new FileInfoDAO(pool);



// Håndterer login og sender JWT-token tilbake som JSON
exports.download = async (req, res, next) => {

};

exports.upload = (req, res, next) => {
    console.log(`Got request from client: /file/upload/${req.params.eventId}`);
    let data = {
        "name": req.body.name,
        "eventId": req.params.eventId
    };
    fileInfoDao.postFileInfo(data, (err, res) => {
        console.log(res.insertId);
    })
};

exports.update = (req, res, next) => {

};

exports.delete = (req, res, next) => {

};