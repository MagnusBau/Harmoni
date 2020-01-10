//flow

const mysql = require("mysql");
import {EquipmentDAO} from "../../src/dao/userDao";
const UserDao = require("../src/dao/articledao.js");
const runsqlfile = require("../database/runSqlFile.js");
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

const userDao = new UserDao(pool);

beforeAll(done => {
    runSqlFile("database/setup.sql",
        pool, () => {
            runSqlFile("database/procedures/user_procedures.sql", pool, () => {
                runSqlFile("database/testData.sql", pool, done);
            })
        });
});


