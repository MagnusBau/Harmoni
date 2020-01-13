// @flow

const mysql = require("mysql");
import {EventDAO} from "../../src/dao/eventDao.js";
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
       expect(data.length).toBe(2);
       expect(data[0].title).toBe("EM Håndball");
       expect(data[1].title).toBe("Konsert");
       done();
   }
   eventDao.getAllEvents(callback);
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
