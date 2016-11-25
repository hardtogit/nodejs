/*
create by xiangguo 
date  2016 8 11
for  about user api
 */
var express = require('express');
var router = express.Router();
var mysql=require('mysql');
   var conn = mysql.createConnection({       
        user: 'root',
        password: '123456',
        database:'nodejs',     
    })
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
})
router.post('/register/user',function(req,res){
    var  username=req.body.username;
    var  password=req.body.password;
    var sqlString="INSERT into t_user (name,PASSWORD)VALUES('"+username+"','"+password+"')";
    conn.query(sqlString,function(err,data){
        if(err){
            console.log(err.message);
        }
        else{
            res.send('注册成功')
        }
    });
    


})

module.exports = router;