// @flow

/**
 * Class for running SQL scripts
 */

const mysql = require("mysql");
const fs = require("fs");

module.exports = function run(filename, pool, done) {
    console.log("runsqlfile: reading file " + filename);
    let sql = fs.readFileSync(filename, "utf8");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("runsqlfile: error connecting");
            done();
        } else {
            connection.query(sql, (err, rows) => {
                connection.release();
                if (err) {
                    console.log(err);
                    done();
                } else {
                    done();
                }
            });
        }
    });
};
