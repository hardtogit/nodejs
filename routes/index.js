//这个文件主要用来做路径跳转的定义
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('views/index.html');
});

router.get('/reg', function(req, res, next) {
  res.render('reg', { title: 'reg' });
});
// router.get('/users/test',function(req,res){
//   res.send('dsadas')
// })
// /* GET reg page */
// router.get('/reg', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
module.exports = router;

