var bodyParser = require('body-parser');
var mongoose=require('mongoose');
//connect to database
mongoose.connect("mongodb://test:test@ds223738.mlab.com:23738/todo");
//create a scheme-blueprint
var todoSchema=new mongoose.Schema({
  item:String
});
//model
var Todo=mongoose.model('Todo',todoSchema)


//var data=[{item: 'eat'}, {item: 'sleep'}, { item: 'code'}];

var urlencodedParser=bodyParser.urlencoded({extended: false});

module.exports=function(app){


  app.get('/todo',function(req,res){
    //get data from momgodb and pass it to view
    Todo.find({},function(err,data){
      if(err) throw err;

    res.render('todo',{todos: data});
  });
});


  app.post('/todo',urlencodedParser,function(req,res){
    //get data from view and add it to mongodb
    var newTodo=Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
    });


  });


  app.delete('/todo/:item',function(req,res){
    //delete reauested item
    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err , data){
      if(err)  throw err;
      res.json(data);


  });
});
}
