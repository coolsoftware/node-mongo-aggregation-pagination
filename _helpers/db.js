const config = require('../config.json');
const MongoClient = require('mongodb').MongoClient;

module.exports = (function() {

    var mongoClient = null;

    const maxPoolSize = config.maxPoolSize || 100;

    async function exec(callback) {
        if (!mongoClient) {
            mongoClient = await MongoClient.connect(config.connectionString, { maxPoolSize });
        }
        const db = mongoClient.db(config.dbName);
        return await callback(db);
    }

    function close() {
        if (mongoClient) {
            let client = mongoClient;
            mongoClient = null;
            client.close();
        }
    }

    return {
        exec,
        close,
    }
})();