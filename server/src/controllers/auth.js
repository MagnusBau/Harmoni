//@flow

const pool = require("../server");
const fs = require('fs');
import {UserDAO} from "../dao/userDao";
import {ArtistDAO} from "../dao/artistDao";
import {Email} from "../email";

const email = new Email();

const userDao = new UserDAO(pool);
const artistDao = new ArtistDAO(pool);

function auth(data: Object, res: Response) {

}