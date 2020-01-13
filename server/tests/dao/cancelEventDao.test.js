// @flow

const mysql = require("mysql");

import { CancelEventDAO } from "../../src/dao/canceleventDao";

const runsqlfile = require("../../database/runsqlfile.js");
const config = require("../../src/controllers/configuration.js");

let database = config.getTestingDatabase();
const pool = mysql.createPool({
    connectionLimit: 1,
    host: database.host,
    user: database.user,
    password: database.password,
    database: database.database,
    debug: false,
    multipleStatements: true
});

let cancelEventDao = new CancelEventDAO(pool);

beforeAll(done => {
    runsqlfile("database/setup.sql",
        pool, () => {
            runsqlfile("database/procedures/cancelevent_procedures.sql", pool, () => {
                runsqlfile("database/create_testdata", pool, done);
        });
    });

});

afterAll(() => {
    pool.end();
});

test("get cancelled events from db", done => {

    function callback(status, data) {

        console.log(
            "Test callback: status = " + status + ", data = " + JSON.stringify(data)
        );

        data = data[0];

        expect(data.length).toBe(1);
        expect(data[0].title).toBe('Konsert2');
        expect(data[0].description).toBe('Konsertbeskrivelse2');
        expect(data[0].location).toBe('Trondheim');
        expect(data[0].organizer).toBe(1);

        done();
    }

    cancelEventDao.getCancelledEvents(callback);

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

    cancelEventDao.getCancelledEventInfo(3, callback);

});

test("cancel event from db", done => {

    function callback(status, data) {

        console.log(
            "Test callback: status = " + status + ", data = " + JSON.stringify(data)
        );

        expect(data.affectedRows).toBe(1);

        done();

    }

    cancelEventDao.cancelEvent(2
    , callback
    );

});

test("get frontpage events from db", done => {

    function callback(status, data) {

        console.log(
            "Test callback: status = " + status + ", data = " + JSON.stringify(data)
        );

        data = data[0];

        expect(data.length).toBe(1);
        expect(data[0].title).toBe('EM Håndball');
        expect(data[0].description).toBe('EM i håndball 2020');
        expect(data[0].organizer).toBe(2);

        done();

    }

    cancelEventDao.getFrontpageEvents(callback);

});

