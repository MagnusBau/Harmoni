import {EventDao} from "../src/dao/eventDao";
const config = require("../src/controllers/configuration.js");

var mysql = require("mysql");

const runsqlfile = require("../src/dao/runSqlFile.js");
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

test("event fail", done => {
    function callback(status, data) {
        console.log(`Test callback: status=${status}, data=${data}`);
        expect(data.affectedRows).toEqual(0);
        done();
    }
    eventDao.createEvent({
            "title": "",
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