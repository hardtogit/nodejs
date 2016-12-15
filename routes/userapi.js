/*
create by xiangguo 
date  2016 8 11
for  about user api
 */
var express = require('express');
var sqlTool=require('../models/User');
var SqlString = require('sqlstring');
const crypto = require('crypto');//加密模块
var router = express.Router();

router.post('/userCheck/api',function(req,res,next){
    var username=req.body.username;
    console.log(username);
    var selectSQL="select*from t_user where name='"+username+"'";//变量要这样插入
    conn.query(selectSQL,function(err,data){
    	if(err){console.log(err);}
    	        var flag=data.length;
           var resute={state:false,message:'用户名已被使用'}
          if(flag!=0){
         	 res.send({result:{state:false,message:'用户名已被使用'}})
         }
         else{
         	res.send({result:{state:true,message:'恭喜您，该账号可以使用'}})
         }
    })
});
router.post('/register/user',function(req,res){
    var  username=req.body.username;
    var  password=req.body.password;
    var sqlString="INSERT into t_user (name,PASSWORD)VALUES('"+username+"','"+password+"')";
    //conn.query(sqlString,function(err,data){
    //    if(err){
    //        console.log(err.message);
    //    }
    //    else{
    //        res.send('注册成功')
    //    }
    //});
    sqlTool.test(sqlString,function(data){
        res.send(data)
    });
});
router.post('/reg',function(req,res){
    var  username=req.body.username;
    var  password=req.body.password;
    var secret = password;
    var  hash = crypto.createHmac('sha256', secret).update(username).digest('hex');//以用户名和密码生成密文
    var post  = {login_name: username, password:hash};
    var sql = SqlString.format('INSERT INTO t_user SET ?', post)
    sqlTool.execution(sql,function(data){
        res.send(data)
    });
});

router.post('/login',function(req,res){
    var  username=req.body.username;
    var  password=req.body.password;
    var secret = password;
    var  hash = crypto.createHmac('sha256', secret).update(username).digest('hex');//以用户名和密码生成密文
    //var post  = {login_name: username, password:hash};
    var sql = SqlString.format('SELECT * FROM t_user WHERE login_name =? and password=?',[username,hash]);
    console.log(sql)
    sqlTool.execution(sql,function(data){
        res.send(data)
    });
});
module.exports = router;