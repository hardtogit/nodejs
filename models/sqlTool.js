/*
 create by xiangguo
 date  2016 11 27
 for  about user api
 */
module.exports.execution = function (sqlString,callBack) {
    var express = require('express');
    var router = express.Router();
    var mysql=require('mysql');
    //var conn = mysql.createConnection({
    //    host:'101.201.115.172',
    //    user: 'appdev',
    //    password: 'appdev123321',
    //    database:'scihi',
    //    port:'13301'
    //});
    var conn = mysql.createConnection({
        host:'127.0.0.1',
        user: 'root',
        password: '123456',
        database:'nodejs',
        port:'3306'
    });
    conn.query(sqlString,function(err,data){
        var result={'err':err,'data':data};
        conn.end();
        return callBack(result);
    });
};
