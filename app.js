var express = require('express');
var todocontroller=require('./controller/todocontroller');
var app = express();
//set template engine
app.set('view engine','ejs');
//static file
app.use(express.static('./public'));
//fire controller
todocontroller(app);

//listen to port
app.listen(8080);
console.log('you 8080');
