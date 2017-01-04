/*
create by xiangguo 
date  2016 8 11
for  about user api
 */
var express = require('express');
var sqlTool=require('../models/sqlTool');
var SqlString = require('sqlstring');
const crypto = require('crypto');//加密模块
var router = express.Router();


router.get('/userCheck',function(req,res,next){
    var loginName=req.query.loginName;
    var selectSQL="select*from t_user where login_name='"+loginName+"'";//变量要这样插入
    sqlTool.execution(selectSQL,function(result){
    	if(result.err){console.log(err);
            res.send({valid:false})
        }
        else {
            var flag = result.data.length;
            if (flag != 0) {
                res.send({valid:false})
            }
            else {
                res.send({valid:true})
            }
        }
})
});

router.post('/save',function(req,res){
    var data=req.body;
    var  username=data.loginName;
    var  password=data.password;
    var secret = password;
    var  hash = crypto.createHmac('sha256', secret).update(username).digest('hex');//以用户名和密码生成密文
    var post  = {login_name: username, password:hash,role:data.role,name:data.name,phone:data.phone,flag:data.flag,email:data.email};
    if (data.postId){//判断是更新操作还是新增操作
        var sql = SqlString.format('UPDATE t_user SET login_name = ?, name = ?, phone = ?, email = ? , role = ? ,flag = ?  WHERE id = ?', [data.loginName, data.name, data.phone, data.email,data.role,data.flag,data.postId]);
    }
    var sql = SqlString.format('INSERT INTO t_user SET ?', post);
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
//user list
router.post('/list',function(req,res,next){
    var data=req.body;
    var condition=false;
    var sql="select * from t_user";
    //var param={}
    if(data.loginName){
        sql+=" where login_name like "+"'%"+data.loginName+"%'";
        condition=true;
    }
    if(data.phone){
        if(condition){
            sql+=" and phone like "+"'%"+data.phone+"%'";
        }
        else {
            sql+=" where phone like "+"'%"+data.phone+"%'";
            condition=true;
        }
    }
    if(data.email){
        if(condition){
            sql+=" and email like "+"'%"+data.email+"%'";
        }
        else {
            sql+=" where email like "+"'%"+data.email+"%'";
            condition=true;
        }
    }
    if(data.role){
        if(condition){
            sql+=" and  role = "+data.role;
        }
        else {
            sql+=" where role = "+data.role;
            condition=true;
        }
    }
    sqlTool.execution(sql,function(result){
        if(result.err){
            console.log(result.err);
            res.send(result.err)
        }
        else {
            res.send(result.data)
        }
    });
    console.log(sql)
});
//user detail
router.post('/detail',function(req,res,next) {
    var data = req.body;
    var sql = SqlString.format('SELECT * FROM t_user WHERE id =? ',[data.id]);
    sqlTool.execution(sql,function(result){
        if(result.err){
            res.send(result.err);
        }
        else {
            res.send(result.data)
        }
    })
});
//user delete
router.post('/delete',function(req,res,next) {
    var data = req.body;
    var sql = SqlString.format('DELETE  FROM t_user WHERE id =? ',[data.id]);
    sqlTool.execution(sql,function(result){
        if(result.err){
            console.log(result.err);
            res.send({status:false,data: result.err});
        }
        else {
            res.send({status:true})
        }
    })
});
router.post('/login',function(req,res){
    var  username=req.body.username;
    var  password=req.body.password;
    var secret = password;
    var  hash = crypto.createHmac('sha256', secret).update(username).digest('hex');//以用户名和密码生成密文
    var sql = SqlString.format('SELECT * FROM t_user WHERE login_name =? and password=?',[username,hash]);
    console.log(sql);
    sqlTool.execution(sql,function(data){
        if(data.err){
            console.log(data.err);
            res.send({status:false,msg:data.err});
        }
        else{
            if(data.data.length!=0){
                console.log(req.session);
                req.session.sign = true;
                req.session.name = username;
                res.send({
                    status:true
                });
            }
            else {
                res.send({status:false,msg:'账号和密码不匹配'})
            }
        }
    });
});
router.get('/logout',function(req,res){
    req.session.sign=false;
    req.session.name = '';
    res.redirect('/login');
});
module.exports = router;