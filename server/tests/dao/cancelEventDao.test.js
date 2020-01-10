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

        expect(data.length).toBe(2);
        expect(data[0].title).toBe('Konsert');
        expect(data[1].title).toBe('Konsert2');

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