require("dotenv").config();
module.exports = (function() {
    return {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        connectionLimit: 5,
        charset: process.env.DB_CHARSET
    }
    })();