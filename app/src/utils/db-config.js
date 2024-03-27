require("dotenv").config();
module.exports = (function() {
    return {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PSWORD,
        database: process.env.DB_DATABASE,
        connectionLimit: 50,
        // autoreconnect: true,
    }})();