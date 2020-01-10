//@flow
import {ticketDAO} from "../src/dao/ticketDao"

let mysql = require("mysql");
const runsqlfile = require("../database/runsqlfile.js");


let pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "supertestdb",
    debug: false,
    multipleStatements: true
});

let ticketDao = new ticketDAO(pool);

beforeAll(done => {
    runsqlfile("database/setup.sql",
    pool,() =>{
        runsqlfile("database/procedures/ticket_procedures.sql", pool, () => {
          runsqlfile("database/create_testdata.sql", pool, done);
         });
    });
});

afterAll(() => {
    pool.end();
});


test("get all article from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBeGreaterThanOrEqual(2);
        done();
    }
    ticketDao.getAll(callback);
});



test("get one Article from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expect(data[0].title).toBe('enTittel');
        done();
    }
    ticketDao.getOne(1, callback);
});



test("add ticket to db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
        done();
    }

    ticketDao.createOne(
        {title: 'tredjendreTittel', info: 'TredjeInfo_in', price: 3, count: 3},
        callback
    );
});



test("update one ticket from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data.length=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    ticketDao.updateOneTicket({title: 'endreTittel', info: 'endreInfo_in', price: 99, count: 99}, callback);
});



test("remove one article from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    ticketDao.removeOneTicket(2, callback);
});







