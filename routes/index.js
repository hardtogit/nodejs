//这个文件主要用来做路径跳转的定义
var express = require('express');
var router = express.Router();
/* Validate state of login */

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
/*get user-form-page*/
router.get('/admin/user/form', function(req, res, next) {
  res.sendfile('views/admin/user-form.html');
});
/*get user-manage-page*/
router.get('/admin/user/manage', function(req, res, next) {
  res.sendfile('views/admin/user-manage.html');
});
/*get post-form-page*/
router.get('/admin/post/form', function(req, res, next) {
  res.sendfile('views/admin/post-form.html');
});
/*get post-manage-page*/
router.get('/admin/post/manage', function(req, res, next) {
  res.sendfile('views/admin/post-manage.html');
});
module.exports = router;

