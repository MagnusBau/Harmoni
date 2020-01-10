// @flow

/*try {
    config = require("../../config.json");
    // do stuff
} catch (ex) {
    config = null;
}

const config = require("../../config");
const defaultConfig = require("../../config.default.json");

 */

try {
    config = require("../../config.json");
    // do stuff
} catch (ex) {
    config = null;
}
let config = require("../../config");
var defaultConfig = require("../../config.default.json");

export function getProductionDatabase(): {host: string, database: string, user: string, password: string} {
    let database;
    if (config) {
        database = config.database.production;
    } else {
        database = defaultConfig.database.production;
    }
    return database;
};

export function getTestingDatabase(): {host: string, database: string, user: string, password: string} {
    let database;
    if (config) {
        database = config.database.testing;
    } else {
        database = defaultConfig.database.testing;
    }

    return database;
};