// @flow
module.exports = class Dao {
    pool: Object;
    constructor(pool: Object) {
        this.pool = pool;
    }

    query(sql: string, params: Array<any>, callback: any) {
        this.pool.getConnection((err, connection) => {
            console.log('dao: connected to database');
            if(err) {
                console.log('dao: error connecting');
                callback(500, {error: 'connection error'});
            } else {
                console.log('dao: running sql: ' + sql);
                connection.query(sql, params, (err, rows) => {
                    connection.release();
                    if(err) {
                        console.log(err);
                        callback(500, {error: err});
                    } else {
                        console.log('dao: returning rows');
                        callback(200, rows);
                    }
                });
            }
        });
    }
};