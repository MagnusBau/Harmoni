// @flow

//TODO skrive test for get event by id
const mysql = require("mysql");
import {EventDAO} from "../../src/dao/eventDao.js";
const runSqlFile = require("../../src/dao/runSqlFile.js");
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
                runSqlFile("database/testData.sql", pool,() => {
                    runSqlFile("database/procedures/event_edit_procedures.sql", pool, done)
                });
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
       expect(data.length).toBe(4);
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

        expect(data.length).toBe(3);

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

test("get events on a user from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status = " + status + ", data = " + JSON.stringify(data)
        );

        data = data[0];

        expect(data.length).toBe(3);

        done();
    }

    eventDao.getEventByUser(1, callback);
});

test("get ended events by a user from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status = " + status + ", data = " + JSON.stringify(data)
        );

        data = data[0];

        expect(data.length).toBe(0);

        done();
    }

    eventDao.getEndedEventsByUser(1, callback);
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

test("update event", done => {
    function callback(status, data) {
        console.log(`Test callback: status=${status}, data=${data}`);
        expect(data.affectedRows).toBe(1);
        done();
    }
    eventDao.updateEvent(4, {
        "title": "Test00",
        "description": "Test00description",
        "location": "test",
        "start_time": "2020-01-01",
        "end_time": "2020-01-01",
        "category": "test",
        "capacity": "100",
        "organizer": "1",
        "event_id": "4"
    }, callback);
});

test("get new event details by id", done => {
    function callback(status, data) {
        console.log(`Test callback: status=${status}, data=${data}`);
        data = data[0];
        expect(data.length).toBe(5);
        expect(data[3].title).toBe("Test00");
        expect(data[3].description).toBe("Test00description");
        done();
    }
    eventDao.getAllEvents(callback);
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
        expect(data[0].title).toBe('Konsert m/ ballonger');
        expect(data[0].name).toBe('Mia Fornes');
        expect(data[0].email).toBe('mia@test.com');

        done();
    }
    eventDao.getCancelledEventInfo(3, callback);
});

test("delete_ ended event from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status = " + status + ", data = " + JSON.stringify(data)
        );

        //TODO change end_time in setup.sql
        expect(data.affectedRows).toBe(0);
        done();
    }

    eventDao.deleteEventsByEndTime(1, callback);

});
