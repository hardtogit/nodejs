/**
 * Created by Shinelon on 2016/12/6.
 */
/*
 create by xiangguo
 date  2016 8 11
 for  about user api
 */
var express = require('express');
var sqlTool=require('../models/sqlTool');
var SqlString = require('sqlstring');
var router = express.Router();
router.get('/list',function(req,res,next){
    var String='select * from t_recruit';
    sqlTool.execution(String,function(data){
        console.log(data)
        res.send(data)
    })
});
router.post('/detail',function(req,res,next){
    var id=req.body.id;
    var result={};
    var sql = SqlString.format('SELECT * FROM t_recruit AS t1 LEFT JOIN t_require AS t2 ON t1.id=t2.work_id WHERE t1.id=?',[id] );
    sqlTool.execution(sql,function(data){
        var require=[];
        if(data.err){
            console.log(data.err)
        }
        result.data=data.data[0];
        for(var i in data.data){
            require.push({text:data.data[i].text})
        }
        result.data.require=require;
        res.send(result)
    });
});

module.exports = router;