const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const bodyParser=require('body-parser');
const postRouter=require('./routes/post');
const getRouter=require('./routes/get');

const url='mongodb://localhost/Gamezone';

const app=express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

mongoose.connect(url);

const db=mongoose.connection;
db.on('error',()=>{
  console.log("Error in connecting to database");
})
db.once('open',()=>console.log("Connected to database"));

app.use(express.json());
const gameRouter=require('./routers/routes')
app.use('/routes',gameRouter);

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/',(req,res)=>{
  res.render('login');
})

app.get('/register',(req,res)=>{
  res.render('register');
})

app.use('/users',getRouter);
app.use('/register',postRouter);

app.listen(8080,()=>{
  console.log("connected to server at port 8080");
})

module.exports=db;
