var mysql = require('mysql');
var $dbConfig = require('./db');

var pool = mysql.createPool($dbConfig);

function responseDoReturn(res, result, resultJSON) {
  if (typeof result === 'undefined') {
    res.json({
      code: '201',
      msg: 'failed to do'
    });
  } else {
    res.json(result);
  }
}

function query(sql, callback) {
  pool.getConnection(function(err, connection) {
    connection.query(sql, function(err, rows) {
      callback(err, rows);
      connection.release();
    });
  });
}

function queryArgs(sql, args, callback) {
  pool.getConnection(function(err, connection) {
    connection.query(sql, args, function(err, rows) {
      callback(err, rows);
      connection.release();
    });
  });
}

module.exports = {
  query: query,
  queryArgs: queryArgs,
  doReturn: responseDoReturn
}