const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'pug');
app.set('views','./views');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
var todoList = ["Đi chợ","Nấu cơm","Rửa bát","Học code tại CodersX"]

app.get('/', (request, response) => {
  response.send('I love CodersX');
});
app.get('/todos',(req,res) =>{
  var str ="";
  for(var i of todoList){
    str += ("<li>"+i + "</li>");
  }
  str = "<ul>" + str + "</ul>";
  res.send(str);
})
app.get('/todos',(req,res) =>{
  res.render('render',{
    todos:todoList
  })
})
app.get("/todos/search",(req,res)=>{
  var q = req.query.q;
  console.log(req.query);
  console.log(todoList);
  var match = todoList.filter(function(todo){
    return todo.indexOf(q) !== -1;
  })
  console.log(match);
  res.render('render',{
    todos:match
  })
})
app.get('/todos/create',(req,res)=>{
    res.render('create');
})
app.post('/todos/create',(req,res)=>{
    todoList.push(req.body.todo);
    res.redirect('back');
})
// listen for requests :)
app.listen(8000, () => {
  console.log("Server listening on port " + process.env.PORT);
});