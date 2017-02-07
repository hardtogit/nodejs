/**
 * Created by XR on 2017/1/9.
 * Time: 10:20
 */
var express = require('express');
var sqlTool=require('../models/sqlTool');
var SqlString = require('sqlstring');
var router = express.Router();
router.post('/save',function(req,res,next){
    var data=req.body;
    var material= {title: data.title, img_url:data.img_url,link_url:data.link_url,type:data.type,flag:data.flag,description:data.description};
    if (data.materialId){//判断是更新操作还是新增操作
        var sql = SqlString.format('UPDATE t_material SET title = ?, img_url = ?, link_url = ?, type = ? , flag = ? ,description = ?  WHERE id = ?', [data.title, data.img_url, data.link_url, data.type,data.flag,data.description,data.materialId]);
    }
    //else {
    var sql = SqlString.format('INSERT INTO t_material SET ?', material);
    //}
    console.log(sql)
    sqlTool.execution(sql,function(data){
        if(data.err){
            console.log(data.err);
            res.send(data.err)
        }
        else {
            res.send({status:true})
        }
    });
});
router.post('/list',function(req,res,next){
    var data=req.body;
    var condition=false;
    var pageSize=req.query.size;
    var pageNo=req.query.page;
    var param1= (pageNo - 1) * pageSize;
    var param2=pageSize;
    var sqlCount="select count(*) AS count from t_material";
    var sql="select * from t_material ";
    //var param={}
    if(data.title){
        sqlCount+=" where title like "+"'%"+data.title+"%'"+"";
        sql+=" where title like "+"'%"+data.title+"%'"+"";
        condition=true;
    }
    if(data.flag){
        if(condition){
            sqlCount+="and flag="+data.flag;
            sql+="and flag="+data.flag;
        }
        else {
            sqlCount+=" where flag="+data.flag;
            sql+=" where flag="+data.flag;
            condition=true;
        }
    }
    if(data.type){
        if(condition){
            sqlCount+=" and type="+data.type;
            sql+=" and type="+data.type;
        }
        else {
            sqlCount+=" where type="+data.type;
            sql+=" where type="+data.type;
            condition=true;
        }
    }
    if(pageSize&&pageNo){
        sql+=" order by  id  limit "+param1+","+param2;
    }

    console.log(sqlCount);
    console.log(sql);
    sqlTool.execution(sqlCount,function(result){
        if(result.err){
            console.log(result.err)
        }
        else {
            var totalPage=Math.ceil(result.data[0].count/pageSize);
            sqlTool.execution(sql,function(inResult){
                if(inResult.err){
                    console.log(inResult.err);
                    res.send(inResult.err)
                }
                else {
                    var pageData={};
                    pageData.totalPage=totalPage;
                    pageData.pageNo=pageNo;
                    pageData.pageSize=pageSize;
                    pageData.data=inResult.data;
                    res.send(pageData)
                }
            });
        }
    });
});
//material detail
router.post('/detail',function(req,res,next) {
    var data = req.body;
    var sql = SqlString.format('SELECT * FROM t_material WHERE id =? ',[data.id]);
    sqlTool.execution(sql,function(result){
        if(result.err){
            res.send(result.err);
        }
        else {
            res.send(result.data)
        }
    })
});

module.exports = router;