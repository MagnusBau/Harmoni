//@flow

import { EquipmentDAO } from "../dao/equipmentDao.js";
const pool = require("../server.js");

const equipmentDao = new EquipmentDAO(pool);

// Insert equipment
exports.insertEquipment = (req, res, next) => {
    console.log(`Got request from client: POST /api/equipment`);

    equipmentDao.insertEquipment(req.body.name,(err, rows) => {
        res.send(rows);
    });
};

exports.deleteEquipment = (req, res, next) => {
    console.log(`Got request from client: DELETE /api/equipment/${req.params.equipmentId}`);

    equipmentDao.deleteEquipment(req.params.equipmentId,(err, rows) => {
        res.send(rows);
    });
};

// Get all equipment or all equipment by name
exports.getEquipmentByQuery = (req, res, next) => {
    console.log(`Got request from client: GET /equipment`);
    if (req.query.name) {
        equipmentDao.getEquipmentByName(req.query.name, (err, rows) => {
            res.json(rows);
        })
    } else if (req.query.event) {
        equipmentDao.getEquipmentByEvent(req.query.event, (err, rows) => {
            res.json(rows);
        })
    } else {
        equipmentDao.getAllEquipment((err, rows) => {
            res.json(rows);
        })
    }
};

// Get equipment by id
exports.getEquipmentById = (req, res, next) => {
    console.log(`Got request from client: /equipment/${req.params.equipmentId}`);
    equipmentDao.getEquipmentById(req.params.equipmentId, (err, rows) => {
        res.json(rows);
    })
};

exports.addEquipmentToEvent = (req, res, next) => {
    console.log(`Got request from client: POST /api/event/equipment`);

    equipmentDao.addEquipmentToEvent(req.params.eventId, req.body.item, req.body.amount,(err, rows) => {
        res.send(rows);
    });
};

exports.removeEquipmentFromEvent = (req, res, next) => {
    console.log(`Got request from client: DELETE /api/event/equipment`);

    equipmentDao.removeEquipmentFromEvent(req.params.eventId, req.params.equipmentId,(err, rows) => {
        res.send(rows);
    });
};

exports.updateEquipmentOnEvent = (req, res, next) => {
    console.log(`Got request from client: PUT /api/event/equipment`);

    equipmentDao.updateEquipmentOnEvent(req.params.eventId, req.params.equipmentId, req.body.amount,(err, rows) => {
        res.send(rows);
    });
};