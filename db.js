const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'password', // DON'T actually do this in a real production app! Use environment variables and a better password.
    host: 'localhost',
    port: 5432,
    database: 'disney'
});

module.exports = pool;