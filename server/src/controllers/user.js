//@flow

const pool = require("../server");
const fs = require('fs');
import {UserDAO} from "../dao/userDao";

const userDao = new UserDAO(pool);

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

class User {
    user_id: number;
    username: string;
    password: string;
    image: any;
    contact_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;

    constructor(user_id: number, username: string, password: string, image: any, contact_id: number, first_name: string, last_name: string, email: string, phone: string) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.image = image;
        this.contact_id = contact_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
    }
}

let publicKey = fs.readFileSync('./src/public.txt', 'utf8');
let privateKey = fs.readFileSync('./src/private.txt', 'utf8');

const verifyOptions = {
    expiresIn:  "1H",
    algorithm:  ["RS256"]
};
const signOptions = {
    expiresIn:  "1H",
    algorithm:  "RS256"
};

function login(bool: boolean, username: string, res: Response) {
    if (bool) {
        console.log("Brukernavn & passord ok");
        let token = jwt.sign({ username: username}, privateKey, signOptions);

        userDao.getUser(username, (err, user) => {
            console.log(username + user[0][0].user_id + user[0][0].username);
            res.json({
                user: {
                    "user_id": user[0][0].user_id,
                    "username": user[0][0].username,
                    "image": user[0][0].image,
                    "first_name": user[0][0].first_name,
                    "last_name": user[0][0].last_name,
                    "email": user[0][0].email,
                    "phone": user[0][0].phone
                },
                token: token });
        });


    } else {
        console.log("Passord IKKE ok");
        res.json({ error: "Not authorized" });
    }
}

function validateUsername(data: Object, username: string, password: string, email: string, first_name: string, last_name: string, phone: string, res: Response) {
    if(username.match("^[A-Za-z0-9]+$") && 2 < username.length <= 50) {
        userDao.checkUsername(username, (err, rows) => {
            console.log(rows[0][0].count);
            if(rows[0][0].count === 0) {
                return validatePassword(data, password, email, first_name, last_name, phone, res);
            } else {
                console.log("Invalid username");
                res.json({ error: "Invalid username" });
                return false;
            }
        });
    } else {
        console.log("Invalid username");
        res.json({ error: "Invalid username" });
        return false;
    }
}

function validatePassword(data: Object, password: string, email: string, first_name: string, last_name: string, phone: string, res: Response) {
    if(password.match("^[A-Za-z0-9]+$") && 2 < password.length <= 256) {
        return validateEmail(data, email, first_name, last_name, phone, res);
    } else {
        console.log("Invalid");
        res.json({ error: "Invalid password" });
        return false;
    }
}

function validateEmail(data: Object, email: string, first_name: string, last_name: string, phone: string, res: Response) {
    if(email.length < 50) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(email).toLowerCase())) {
            return validateFirstName(data, first_name, last_name, phone, res);
        }
    } else {
        console.log("Invalid");
        res.json({ error: "Invalid email" });
        return false;
    }
}

function validateFirstName(data: Object, first_name: string, last_name: string, phone: string, res: Response) {
    if(first_name.match("^[A-Za-z]+$") && 2 < first_name.length < 50) {
        return validateLastName(data, last_name, phone, res);
    } else {
        console.log("Invalid first name");
        res.json({ error: "Invalid first name" });
        return false;
    }
}

function validateLastName(data: Object, last_name: string, phone: string, res: Response) {
    if(last_name.match("^[A-Za-z]+$") && 2 < last_name.length < 50) {
        return validatePhone(data, phone, res);
    } else {
        console.log("Invalid last name");
        res.json({ error: "Invalid last name" });
        return false;
    }
}

function validatePhone(data: Object, phone: string, res: Response) {
    if(!phone.match(/\D/)) {
        if(phone.length == 8) {
            return register(data, res);
        } else if(phone.length === 12 && phone.substring(0, 3) === "0047") {
            return register(data, res);
        } else {
            console.log("Invalid count phone");
            res.json({ error: "Invalid phone" });
            return false;
        }
    } else {
        console.log("Invalid input phone");
        res.json({ error: "Invalid phone" });
        return false;
    }
}

function register(data: Object, res: Response) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(data.password, salt, function(err, hash) {
            data.password = hash;
            userDao.postContact(data, (err, contactData) => {
                if(contactData.insertId != null || contactData.insertId === false || contactData.insertId === 0) {
                    userDao.postUser(data, contactData.insertId, (err, userData) => {
                        if(userData.insertId != null || userData.insertId === false || userData.insertId === 0) {
                            login(true, data.username, res);
                        } else {
                            res.json({ error: "Invalid something" });
                        }
                    })
                } else {
                    console.log("Invalid7");
                    res.json({ error: "Invalid something" });
                }
            })
        })
    });
}

// Håndterer login og sender JWT-token tilbake som JSON
exports.loginUser = (req, res, next) => {
    console.log("yo");
    userDao.getPassword(req.body.username, (err, rows) => {
        let savedHash = null;
        if(rows[0]) {
            if(rows[0][0]) {
                savedHash = rows[0][0].password;
            }
        }
        if(savedHash != null) {
            bcrypt.compare(req.body.password, savedHash, function(err, response) {
                login(response, req.body.username, res);
            })
        } else {
            console.log("Brukernavn IKKE ok");
            res.json({ error: "Not authorized" });
        }
    });
};

exports.registerUser = (req, res, next) => {
    let data = {
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "phone": req.body.phone
    };
    if(validateUsername(data, req.body.username, req.body.password, req.body.email, req.body.first_name, req.body.last_name, req.body.phone, res)) {
        console.log("yo");
    }
};

exports.getToken = (req, res, next) => {
    console.log("Skal returnere en ny token");
    userDao.getUsername(Number.parseInt(req.params.id), (err, rows) => {
        let token = jwt.sign({username: req.body.username}, privateKey, signOptions);
        res.json({token: token});
    });
};
