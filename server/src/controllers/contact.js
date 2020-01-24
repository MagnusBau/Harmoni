// @flow

import {Email} from "../email";

/**
 * Controller for receiving HTTP requests through the email endpoint
 * @type {{listen?: *}}
 */

const pool = require("../server.js");
const emailService = new Email();


exports.contactUs = (req, res, next) => {

    console.log('Got POST-request from client: /contactUs')
    emailService.contactUs(req.body.email, req.body.name, req.body.subject, req.body.content);

};