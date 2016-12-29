/**
 * Created by XR on 2016/12/29.
 * Time: 15:56
 */
var express = require('express');
var sqlTool=require('../models/sqlTool');
var SqlString = require('sqlstring');
var router = express.Router();
router.get('/list',function(req,res,next){
    var sql="select * from t_office";
    sqlTool.execution(sql,function(data){
        if(data.err){
            console.log(data.err);
            res.send({
                status:false,
                msg:data.err
            })
        }
        else {
            res.send({
                status:true,
                data:data.data
            })
        }
    })

});


module.exports = router;