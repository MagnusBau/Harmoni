// @flow

import { CancelEventDAO } from "../../src/dao/canceleventDao";

const mysql = require("mysql");
const runsqlfile = require("../../database/runsqlfile");
const config = require("../../src/controllers/configuration");

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
    runsqlfile("database/procedures/cancelevent_procedures", pool, () => {
        runsqlfile("database/create_testdata.sql", pool, done);
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

        expect(data[0].length).toBe(2);

        done();
    }

    cancelEventDao.getCancelledEvents(callback);

});

test("cancel event from db", done => {

    function callback(status, data) {

        console.log(
            "Test callback: status = " + status + ", data = " + JSON.stringify(data)
        );

        expect(data.affectedRows).toBe(1);
        done();

    }

    cancelEventDao.cancelEvent(
        {
            event_id: 2
        }
        , callback
    );
});