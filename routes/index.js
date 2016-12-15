//这个文件主要用来做路径跳转的定义
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get("/index", function(req, res, next) {
  res.sendfile('views/public/index.html');
});

/* GET work page. */
router.get('/features', function(req, res, next) {
  res.sendfile('views/public/features.html');
});
/* GET case page. */
router.get('/case', function(req, res, next) {
  res.sendfile('views/public/case.html');
});
/* GET join page. */
router.get('/join', function(req, res, next) {
  res.sendfile('views/public/join-list.html');
});
/* GET job-detail page. */
router.get('/join/detail', function(req, res, next) {
  res.sendfile('views/public/join-detail.html');
});

/*admin Modules*/

/*get login-page*/
router.get('/login', function(req, res, next) {
  res.sendfile('views/admin/login.html');
});

module.exports = router;

