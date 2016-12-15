var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/reg', function(req, res, next) {
   res.render('reg', { title: 'Express' });
});

router.get('/test',function(req,res){
	res.send('caa')
})

module.exports = router;
