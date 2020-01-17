// @flow

const mysql = require("mysql");
import {EventDAO} from "../../src/dao/eventDao.js";
const runSqlFile = require("../../src/dao/runSqlFile");
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

const eventDao = new EventDAO(pool);

beforeAll(done => {
    runSqlFile("database/setup.sql",
        pool, () => {
            runSqlFile("database/procedures/event_procedures.sql", pool, () => {
                runSqlFile("database/testData.sql", pool, done);
            })
        });
});

afterAll(() => {
    pool.end();
});

test("Get all events", done => {
   function callback(status, data) {
       console.log(
           `Test callback: status=${status}, data=${data}`
       );
       data = data[0];
       expect(data.length).toBe(3);
       expect(data[0].title).toBe("EM Håndball");
       expect(data[1].title).toBe("Konsert");
       done();
   }
   eventDao.getAllEvents(callback);
});

test("get not-cancelled events from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status = " + status + ", data = " + JSON.stringify(data)
        );

        data = data[0];

        expect(data.length).toBe(2);

        done();
    }
    eventDao.getEventsByCancelled(false, callback);
});

test("get cancelled events from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status = " + status + ", data = " + JSON.stringify(data)
        );

        data = data[0];

        expect(data.length).toBe(1);
        expect(data[0].title).toBe('Konsert m/ ballonger');
        expect(data[0].description).toBe('Konsertbeskrivelse');
        expect(data[0].location).toBe('Trondheim');
        expect(data[0].organizer).toBe(3);

        done();
    }
    eventDao.getEventsByCancelled(true, callback);
});

test("create event", done => {
    function callback(status, data) {
        console.log(`Test callback: status=${status}, data=${data}`);
        expect(data.affectedRows).toEqual(1);
        done();
    }
    eventDao.createEvent({
            "title": "test",
            "description": "test",
            "location": "test",
            "start_time": "2020-01-01",
            "end_time": "2020-01-01",
            "category": "test",
            "capacity": "100",
            "organizer": "1"
        },
        callback);
});

test("cancel event from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status = " + status + ", data = " + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }
    eventDao.cancelEvent(2, callback);
});

test("get cancelled event information", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status = " + status + ", data = " + JSON.stringify(data)
        );
        data = data[0];

        expect(data.length).toBe(1);
        expect(data[0].first_name).toBe('Mia');
        expect(data[0].last_name).toBe('Fornes');
        expect(data[0].email).toBe('mia@test.com');

        done();
    }
    eventDao.getCancelledEventInfo(3, callback);
});
