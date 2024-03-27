const mariadb = require('mariadb');
var config = require('./db-config');
const pool = mariadb.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  allowPublicKeyRetrieval: true,
  connectionLimit: 50,
  autoreconnect: true,//?
});

pool.getConnection(function(err, connection){
  if( err ){
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); //?
      if( err.code === 'PROTOCOL_CONNECTION_LOST' ) console.log('DATABASE CONNECTION WAS CLOSED');
      if( err.code === 'ER_CON_COUNT_ERROR' ) console.log('DATABASE HAS TO MANY CONNECTIONS');
      if( err.code === 'ECONNREFUSED' ) console.log('DATABASE CONNECTION WAS REFUSED');
  } else {
    console.log('DataBase is connected to '+ config.database);
  }
  if( connection ) connection.release();
  return;
});

module.exports = pool;