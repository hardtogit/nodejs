/**
 * Created by Shinelon on 2016/12/27.
 */
var express = require('express');
var sqlTool=require('../models/sqlTool');
var SqlString = require('sqlstring');
var router = express.Router();
//save
 router.post('/save',function(req,res,next){
  var post={};
  var data=req.body;
  var starNum=req.body.editorValue.indexOf('src=')+5;
  var str1=req.body.editorValue.substring(starNum);
  var endNum=str1.indexOf('title=')-2;
  var str2=str1.substring(0,endNum);
  post.img_url=str2;
  post.title=data.postTitle;
  post.flag=data.flag;
  post.type=data.type;
  post.content=data.editorValue;
  post.post_time=new Date();
  post.post_man=req.session.name;
  console.log(post);
  var sql = SqlString.format('INSERT INTO t_post SET ?', post);
  sqlTool.execution(sql,function(data){
   if(data.err){
    console.log(data.err);
    res.send(data.err)
   }
   else {
    res.send(data.data)
   }
  });
 });
//post list
  router.post('/list',function(req,res,next){
   var data=req.body;
   var condition=false;
   var sql="select * from t_post";
   //var param={}
   if(data.title){
      sql+=" where title like "+"'%"+data.title+"%'";
      condition=true;
   }
   if(data.flag){
    if(condition){
     sql+=" and flag="+data.flag;
    }
    else {
     sql+=" where flag="+data.flag;
     condition=true;
    }
   }
   if(data.type){
    if(condition){
     sql+=" and type="+data.type;
    }
    else {
     sql+=" where type="+data.type;
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
//post detail
router.post('/detail',function(req,res,next) {
 var data = req.body;
 var sql = SqlString.format('SELECT * FROM t_post WHERE id =? ',[data.id]);
 sqlTool.execution(sql,function(result){
  if(result.err){
   res.send(result.err);
  }
  else {
   res.send(result.data)
  }
 })
});
//post detail
router.post('/delete',function(req,res,next) {
 var data = req.body;
 var sql = SqlString.format('DELETE  FROM t_post WHERE id =? ',[data.id]);
 sqlTool.execution(sql,function(result){
  if(result.err){
   console.log(result.err)
   res.send({status:false,data: result.err});
  }
  else {
   res.send({status:true})
  }
 })
});
module.exports = router;