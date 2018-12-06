exports.dbConfig = {
    user: 'duocdd',
    password: 'duyduoc',
    server: 'localhost',
    database: 'duocdd',
    options: {
        encrypt: false // Use this if you're on Windows Azure
    },
    connectionTimeout: 120000,
    requestTimeout: 120000,
    pool: {
        idleTimeoutMillis: 30000,
        max: 100
    }
}