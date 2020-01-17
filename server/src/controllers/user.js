//@flow

const pool = require("../server");
const fs = require('fs');
import {UserDAO} from "../dao/userDao";
import {ArtistDAO} from "../dao/artistDao";
import {Email} from "../email";

const email = new Email();

const userDao = new UserDAO(pool);
const artistDao = new ArtistDAO(pool);

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

let privateKey = fs.readFileSync('./src/private.txt', 'utf8');

const signOptions = {
    expiresIn:  "24H",
    algorithm:  "RS256"
};

function login(bool: boolean, username: string, res: Response) {
    if (bool) {
        console.log("Brukernavn & passord ok");
        let token = jwt.sign({ username: username}, privateKey, signOptions);

        userDao.getUser(username, (err, user) => {
            console.log(username + user[0][0].user_id + user[0][0].username);
            artistDao.getArtistByContact(user[0][0].contact_id, (err, artist) => {
                if(artist[0][0] != null) {
                    if(artist[0][0].artist_id != null) {
                        console.log(artist[0][0].artist_name);
                        res.json({
                            user: {
                                "user_id": user[0][0].user_id,
                                "username": user[0][0].username,
                                "contact_id": user[0][0].contact_id,
                                "image": user[0][0].image,
                                "first_name": user[0][0].first_name,
                                "last_name": user[0][0].last_name,
                                "email": user[0][0].email,
                                "phone": user[0][0].phone
                            },
                            artist: {
                                "artist_id": artist[0][0].artist_id,
                                "artist_name": artist[0][0].artist_name
                            },
                            token: token });
                    } else {
                        res.json({
                            user: {
                                "user_id": user[0][0].user_id,
                                "username": user[0][0].username,
                                "contact_id": user[0][0].contact_id,
                                "image": user[0][0].image,
                                "first_name": user[0][0].first_name,
                                "last_name": user[0][0].last_name,
                                "email": user[0][0].email,
                                "phone": user[0][0].phone
                            },
                            artist: {
                                "artist_id": null,
                                "artist_name": null
                            },
                            token: token });
                    }
                } else {
                    res.json({
                        user: {
                            "user_id": user[0][0].user_id,
                            "username": user[0][0].username,
                            "contact_id": user[0][0].contact_id,
                            "image": user[0][0].image,
                            "first_name": user[0][0].first_name,
                            "last_name": user[0][0].last_name,
                            "email": user[0][0].email,
                            "phone": user[0][0].phone
                        },
                        artist: {
                            "artist_id": null,
                            "artist_name": null
                        },
                        token: token });
                }
            });
        });


    } else {
        console.log("Passord IKKE ok");
        res.json({ error: "Not authorized" });
    }
}

/*function validateUsername(data: Object, username: string, password: string, email: string, first_name: string, last_name: string, phone: string, res: Response) {
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
}*/

function validateUsername(data: Object, res: Response) {
    if(data.username.match("^[A-Za-z0-9]+$") && 2 < data.username.length <= 50) {
        userDao.checkUsername(data.username, (err, rows) => {
            console.log(rows[0][0].count);
            if(rows[0][0].count === 0) {
                return true;
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

function validatePassword(data: Object, res: Response) {
    if(data.password.match("^[A-Za-z0-9]+$") && 2 < data.password.length <= 256) {
        return true;
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
            return true;
        }
    } else {
        console.log("Invalid");
        res.json({ error: "Invalid email" });
        return false;
    }
}

function validateFirstName(data: Object, res: Response) {
    if(data.first_name.match("^[A-Za-z]+$") && 2 < data.first_name.length < 50) {
        return true;
    } else {
        console.log("Invalid first name");
        res.json({ error: "Invalid first name" });
        return false;
    }
}

function validateLastName(data: Object, res: Response) {
    if(data.last_name.match("^[A-Za-z]+$") && 2 < data.last_name.length < 50) {
        return true;
    } else {
        console.log("Invalid last name");
        res.json({ error: "Invalid last name" });
        return false;
    }
}

function validatePhone(data: Object, res: Response) {
    if(!data.phone.match(/\D/)) {
        if(data.phone.length === 8 || (data.phone.length === 12 && data.phone.substring(0, 3) === "0047")) {
            return true;
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

function registerArtistUser(data: Object, res: Response) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(data.password, salt, function(err, hash) {
            data.password = hash;
            userDao.postUser(data, data.contactId, (err, userData) => {
                if (err) {
                    res.json(err);
                }
            });
        });
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

/*exports.registerUser = (req, res, next) => {
    let data = {
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "phone": req.body.phone
    };
    if(validateUsername(data, req.body.username, req.body.password, req.body.email, req.body.first_name, req.body.last_name, req.body.phone, res)) {
        console.log("yo (bad)");
    }
};*/

exports.registerUser = (req, res, next) => {
    let data = {
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "phone": req.body.phone
    };
    if(!validateUsername(data, res)) {
        return false;
    }
    if(!validatePassword(data, res)) {
        return false;
    }
    if(!validateFirstName(data, res)) {
        return false;
    }
    if(!validateLastName(data, res)) {
        return false;
    }
    if(!validateEmail(data, res)) {
        return false;
    }
    if(!validatePhone(data, res)) {
        return false;
    }
    register(data, res);
};

exports.registerArtistUser = (req, res, next) => {
    console.log("Hey!");
    let data: Object = {
        "username": req.body.username,
        "password": req.body.password,
        "contact_id": req.body.contactId,
        "email": req.body.email,
        "artist_name": req.body.artistName,
        "organizer": req.body.organizer,
    };
    let baseUsername: string = data.username;
    while (!validateUsername(data, res)) {
        data.username = baseUsername + 1;
        console.log(data.username);
    }
    if(!validatePassword(data, res)) {
        return false;
    }
    if (registerArtistUser(data, res)) {
        email.artistUserNotification(data.email, data.artist_name, data.username, data.password, data.organizer);
    }
};

exports.getToken = (req, res, next) => {
    console.log("Skal returnere en ny token");
    userDao.getUsername(Number.parseInt(req.params.id), (err, rows) => {
        let token = jwt.sign({username: req.body.username}, privateKey, signOptions);
        res.json({token: token});
    });
};

exports.updateUser = (req, res, next) => {
    console.log("Skal oppdatere bruker");
    console.log(req.body);
    let id: number = Number.parseInt(req.params.id);
    let data: Object = req.body;
    userDao.getContact(id, (err, rows) => {
        if(rows[0][0].contact_id) {
           let contactId = rows[0][0].contact_id;
            userDao.updateContact(contactId, data, (err, rows) => {
                console.log("Bruker oppdatert");
                res.json(rows);
            });
        }
    });

};

exports.getUser = (req, res, next) => {
    console.log("id:" + req.params.id);
    userDao.getUserById(req.params.id, (err, user) => {
        console.log(user);
        console.log(req.params.id + user[0][0].user_id + user[0][0].username);
        artistDao.getArtistByContact(user[0][0].contact_id, (err, artist) => {
            console.log(artist);
            if(artist[0][0]) {
                if(artist[0][0].artist_id) {
                    res.json({
                        user: {
                            "user_id": user[0][0].user_id,
                            "username": user[0][0].username,
                            "contact_id": user[0][0].contact_id,
                            "image": user[0][0].image,
                            "first_name": user[0][0].first_name,
                            "last_name": user[0][0].last_name,
                            "email": user[0][0].email,
                            "phone": user[0][0].phone
                        },
                        artist: {
                            "artist_id": artist[0][0].artist_id,
                            "artist_name": artist[0][0].artist_name
                        }
                    });
                } else {
                    res.json({
                        user: {
                            "user_id": user[0][0].user_id,
                            "username": user[0][0].username,
                            "contact_id": user[0][0].contact_id,
                            "image": user[0][0].image,
                            "first_name": user[0][0].first_name,
                            "last_name": user[0][0].last_name,
                            "email": user[0][0].email,
                            "phone": user[0][0].phone
                        },
                        artist: {
                            "artist_id": null,
                            "artist_name": null
                        }
                    });
                }
            } else {
                res.json({
                    user: {
                        "user_id": user[0][0].user_id,
                        "username": user[0][0].username,
                        "contact_id": user[0][0].contact_id,
                        "image": user[0][0].image,
                        "first_name": user[0][0].first_name,
                        "last_name": user[0][0].last_name,
                        "email": user[0][0].email,
                        "phone": user[0][0].phone
                    },
                    artist: {
                        "artist_id": null,
                        "artist_name": null
                    }
                });
            }
        });
    });
}

exports.updateUserPassword = (req, res, next) => {
    console.log(req.body);
    let password = req.body.password;
    let newPassword = req.body.newPassword;
    let id = req.params.id;
    userDao.getPassword(req.body.username, (err, rows) => {
        if(rows[0][0]) {
            if(rows[0][0].password) {
                let savedHash = rows[0][0].password;
                bcrypt.compare(password, savedHash, function(err, response) {
                    if(response) {
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(newPassword, salt, function(err, hash) {
                                console.log("Passord OK");
                                userDao.updatePassword(id, hash, (err, rows) => {
                                    console.log("Passord oppdatert");
                                    res.json(rows);
                                })
                            })
                        });
                    } else {
                        console.log("Passord IKKE ok1");
                        res.json({ error: "Not authorized" });
                    }
                });
            } else {
                console.log("Passord IKKE ok2");
                res.json({ error: "Not authorized" });
            }
        } else {
            console.log("Passord IKKE ok3");
            res.json({ error: "Not authorized" });
        }
    });
};
//lag tester for dao, mangler noen metoder (minst 1)