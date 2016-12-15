/*
 create by xiangguo
 date  2016 11 27
 for  about user api
 */
module.exports.execution = function (sqlString,callBack) {
    var express = require('express');
    var router = express.Router();
    var mysql=require('mysql');
    var conn = mysql.createConnection({
        user: 'root',
        password: '123456',
        database:'nodejs'
    });
    conn.query(sqlString,function(err,data){
        var result={'err':err,'data':data};
        return callBack(result);
    });
};
