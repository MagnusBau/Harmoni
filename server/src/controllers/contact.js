// @flow

import {Email} from "../email";

const pool = require("../server.js");
const emailService = new Email();


exports.contactUs = (req, res, next) => {

    console.log('Got POST-request from client: /contact')
    emailService.contactUs(req.body.email, req.body.name, req.body.subject, req.body.content);

};