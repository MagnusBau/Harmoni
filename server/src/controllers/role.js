// @flow

import { RoleDAO } from "../dao/roleDao";

/**
 * Controller for receiving HTTP requests through the role endpoint
 * @type {{listen?: *}}
 */

const pool = require("../server");

const roleDao = new RoleDAO(pool);

//Returns all roles
exports.getAllRoles = (req, res, next) => {
    console.log("Got get request from client: /role");
    roleDao.getRoles((err, rows) => {
        res.json(rows);
    })
};

//Returns roles assigned to event
exports.getRoleByEvent = (req, res, next) => {
    console.log("Got get request from client: /role/:eventId");
    roleDao.getRolesInEvent(req.params.eventId, (err, rows) => {
        res.json(rows);
    })
};

//Creates new role
exports.insertRole = (req, res, next) => {
    console.log("Got post request from client: /role");
    roleDao.createRole(req.body.type, req.body.event, (err, rows) => {
        res.send(rows);
    })
};

//Assigns role to an event
exports.addRoleToEvent = (req, res, next) => {
    console.log("Got post request from client: /role/:eventId");
    roleDao.assignToEvent(req.body.role, req.body.event, req.body.count, (err, rows) => {
        res.send(rows);
    })
};

//Updates count of role
exports.updateRoleCount = (req, res, next) => {
    console.log("Got put request from client: /role/:eventId");
    roleDao.updateRoleCount(req.body.role_id, req.body.event, req.body.count, (err, rows) => {
        res.send(rows);
    })
}
;
//Removes role from event
exports.removeRoleFromEvent = (req, res, next) => {
    console.log("Got delete request from clint: /role/:roleId");
    roleDao.removeFromEvent(req.params.roleId, req.params.eventId, (err, rows) => {
        res.send(rows);
    })
};

//Removes role completely
exports.deleteRole = (req, res, next) => {
    console.log("Got delete request from client: /role");
    roleDao.removeRole(req.params.roleId, (err, rows) => {
        res.send(rows);
    })
};