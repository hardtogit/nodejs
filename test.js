const fs = require('fs');
fs.readFile('app.js',function(err, data) {
    if (err) throw err;
//console.log(data.toString('utf8', 0, data.length));
});
