// @flow

const mysql = require("mysql");
import {ArtistDAO} from "../../src/dao/artistDao";
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

const artistDao = new ArtistDAO(pool);

beforeAll(done => {
    runSqlFile("database/setup.sql",
        pool, () => {
            runSqlFile("database/procedures/artist_procedures.sql", pool, () => {
                runSqlFile("database/testData.sql", pool, done);
            })
        });
});

afterAll(() => {
    pool.end();
});

test("Get all artists from database", done => {
   function callback(status, data) {
       console.log(
           `Test callback: status=${status}, data=${data}`
       );

       data = data[0];
       expect(data.length).toBe(2);
       expect(data[0].artist_name).toBe("Geir Lippestad");
       expect(data[0].first_name).toBe("Geir");
       expect(data[1].artist_name).toBe("Svein Blipp");
       expect(data[1].first_name).toBe("Mia");
       done();
   }
   artistDao.getAllArtists(callback);
});

test("Get one artist from database by id", done => {
    function callback(status, data) {
        console.log(
            `Test callback: status=${status}, data=${data}`
        );

        data = data[0];
        expect(data.length).toBe(1);
        expect(data[0].artist_name).toBe("Geir Lippestad");
        expect(data[0].first_name).toBe("Geir");
        done();
    }
    artistDao.getArtistById(1, callback);
});

test("Get artists from database by search #1", done => {
    function callback(status, data) {
        console.log(
            `Test callback: status=${status}, data=${data}`
        );

        data = data[0];
        expect(data.length).toBe(2);
        done();
    }
    artistDao.getArtistBySearch("lipp", callback);
});

test("Get artists from database by search #2", done => {
    function callback(status, data) {
        console.log(
            `Test callback: status=${status}, data=${data}`
        );

        data = data[0];
        expect(data.length).toBe(1);
        done();
    }
    artistDao.getArtistBySearch("Ge", callback);
});

test("Insert new artist", done => {
    function callback(status, data) {
        console.log(
            `Test callback: status=${status}, data=${data}`
        );

        expect(data.affectedRows).toBe(1);
        done();
    }
    artistDao.insertArtist("Bob Dylling", "Bob", "Dylling", "bob@d.no", "56723456", callback);
});

test("Insert new artist with existing contact", done => {
    function callback(status, data) {
        console.log(
            `Test callback: status=${status}, data=${data}`
        );

        expect(data.affectedRows).toBe(1);
        done();
    }
    artistDao.insertArtist("Svigers Eraller Verst", "Geir", "Lippestad", "geir@lips.no", "12345678", callback);
});