var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ueditor = require("ueditor");
var routes = require('./routes/index');
var users = require('./routes/users');
var userApi=require('./routes/userApi');
var workApi=require('./routes/workApi');
var postApi=require('./routes/postApi');
var officeApi=require('./routes/officeApi');
var materialApi=require('./routes/materialApi')
var app = express();
// view engine setupb
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(express.bodyParser({ uploadDir: "/upload" }));
app.use(bodyParser.urlencoded({ extended: true }));
//apply cookie and session
app.use(cookieParser());
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: true, // don't create session until something stored
  secret: 'love',
  cookie:{maxAge:1000*60*5},//set end time
  rolling:true  //update time if use session
}));
app.use(express.static(path.join(__dirname, 'public')));
//admin  control
//app.use('/admin',function(req,res,next){
//  if(req.session.sign){
//    next();
//  }
//  else {
//    res.redirect('/login');
//  }
//});
//ueditor deal
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
// ueditor 客户发起上传图片请求
  if(req.query.action === 'uploadimage'){
    var foo = req.ueditor;
    var date = new Date();
    var imgname = req.ueditor.filename;

    var img_url = '/img/ueditor/';
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
  }
//  客户端发起图片列表请求
  else if (req.query.action === 'listimage'){
    var dir_url = '/img/ueditor/';
    res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
  }
// 客户端发起其它请求
  else {
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/js/lib/ueditor/php/config.json')
  }}));
app.use('/', routes);
app.use('/users', users);
app.use('/api/user',userApi);
app.use('/api/work',workApi);
app.use('/api/post',postApi);
app.use('/api/office',officeApi);
app.use('/api/material',materialApi);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
//register module
require('./models/sqlTool')

module.exports = app;

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});