import {EventDao} from "../src/dao/eventDao";

var mysql = require("mysql");

const runsqlfile = require("../src/dao/runSqlFile.js");

const pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "root",
    database: "School",
    debug: false,
    multipleStatements: true
});
const pool2 = mysql.createPool({
    connectionLimit: 5,
    host: "mysql.stud.iie.ntnu.no",
    user: "torstehs",
    password: "Pzp58gsc",
    database: "torstehs",
    debug: false,
    multipleStatements: true
});

let eventDao = new EventDao(pool);

beforeAll(done => {
    runsqlfile("./src/dao/createTables.sql", pool, () => {
        runsqlfile("./database/procedures/event_procedures.sql", pool, () => {
            runsqlfile("./src/dao/testData.sql",pool,done);
        });
    });
});

afterAll(() => {
    pool.end();
});

test("create event", done => {
    function callback(status, data) {
        console.log("Test callback: status " + status + ", data: " + data + JSON.stringify(data));
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
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