/**
 * Created by XR on 2016/12/27.
 */
var express = require('express');
var sqlTool=require('../models/sqlTool');
var SqlString = require('sqlstring');
var router = express.Router();
//save
 router.post('/save',function(req,res,next){
  var post={};
  var data=req.body;
  post.img_url=data.img_url;
  post.title=data.postTitle;
  post.flag=data.flag;
  post.type=data.type;
  post.content=data.editorValue;
  post.post_time=new Date();
  post.post_man=req.session.name;
  post.count=0;
  console.log(post);
  if (data.postId){//判断是更新操作还是新增操作
   var sql = SqlString.format('UPDATE t_post SET img_url = ?, title = ?, flag = ?, type = ? , content = ? ,update_time = ?  WHERE id = ?', [post.img_url, post.title, post.flag, post.type,post.content,new Date(),data.postId]);
  }
  else {
   var sql = SqlString.format('INSERT INTO t_post SET ?', post);
  }
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
//post list
  router.post('/list',function(req,res,next){
   var data=req.body;
   var condition=false;
   var pageSize=req.query.size;
   var pageNo=req.query.page;
   var param1= (pageNo - 1) * pageSize;
   var param2=pageSize;
   var sqlCount="select count(*) AS count from t_post";
   var sql="select * from t_post ";
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
    sql+=" order by  post_time desc limit "+param1+","+param2;
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
//post delete
router.post('/delete',function(req,res,next) {
 var data = req.body;
 var sql = SqlString.format('DELETE  FROM t_post WHERE id =? ',[data.id]);
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
module.exports = router;