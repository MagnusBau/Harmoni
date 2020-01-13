//flow

const mysql = require("mysql");
import {UserDAO} from "../../src/dao/userDao.js";
const runSqlFile = require("../../database/runSqlFile.js");
const config = require("../../src/controllers/configuration.js");

// Create pool for test database
let database: {} = config.getTestingDatabase();
let pool = mysql.createPool({
    connectionLimit: 1,
    host: database.host,
    user: database.user,
    password: database.password,
    database: database.database,
    debug: false,
    multipleStatements: true
});

const userDao = new UserDAO(pool);

beforeAll(done => {
    runSqlFile("database/setup.sql",
        pool, () => {
            runSqlFile("database/procedures/user_procedures.sql", pool, () => {
                runSqlFile("database/testData.sql", pool, done);
            })
        });
});

afterAll(() => {
    pool.end();
});

test("Get one username from database by id", done => {
    function callback(status, data) {
        console.log(
            'Test callback: status=${status}, data=${data}'
        );
        data = data[0];
        expect(data.length).toBe(1);
        expect(data[0].username).toBe("Mario");
        done();

    }
    userDao.getUsername(1, callback);
});

test("Get count of username by username", done => {
    function callback(status, data) {
        console.log(
            'Test callback: status=${status}, data=${data}'
        );
        data = data[0];
        expect(data.length).toBe(1);
        expect(data[0].count).toBe(1);
        done();

    }
    userDao.checkUsername("Mario", callback)
});

test("Get one password from database by username", done => {
    function callback(status, data) {
        console.log(
            'Test callback: status=${status}, data=${data}'
        );
        data = data[0];
        expect(data.length).toBe(1);
        expect(data[0].password).toBe("$2a$10$58.k1W9JZcldkAaL8RHYx.xBcg7CCFFLUej4BXTxlVYgMHAOQz.2C");
        done();

    }
    userDao.getPassword("Mario", callback);
});

test("Get one user from database by username", done => {
    function callback(status, data) {
        console.log(
            'Test callback: status=${status}, data=${data}'
        );
        data = data[0];
        expect(data.length).toBe(1);
        expect(data[0].username).toBe("Mario");
        expect(data[0].contact_id).toBe(1);
        done();

    }
    userDao.getUser("Mario", callback);
});

test("Add new contact", done => {
    function callback(status, data) {
        console.log(
            `Test callback: status=${status}, data=${data}`
        );
        expect(data.affectedRows).toBe(1);
        done();
    }
    userDao.postContact(
        {"first_name": "Bob",
            "last_name": "Ross",
            "email": "everybodyneeds@frie.nd",
            "phone": 98765432},
        callback);
});

test("Add new user", done => {
    function callback(status, data) {
        console.log(
            `Test callback: status=${status}, data=${data}`
        );
        expect(data.affectedRows).toBe(1);
        done();
    }
    userDao.postUser(
        {"username": "BobRoss",
            "password": "Happylittleaccident"},
        3, callback);
});

