const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const bodyParser=require('body-parser');
const postRouter=require('./routes/post');

const url='mongodb://localhost/Gamezone';

const app=express();

app.use(bodyParser.json());
// app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

mongoose.connect(url);

const db=mongoose.connection;
db.on('error',()=>{
  console.log("Error in connecting to database");
})
db.once('open',()=>console.log("Connected to database"));

// const collectionObject=con.collection("gamedetails");
// app.set("collectionObject",collectionObject)

app.use(express.json());
const gameRouter=require('./routers/routes')
app.use('/routes',gameRouter);

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/',(req,res)=>{
  // res.writeHead(200,{"Content-Type":html});
  res.render('login');
  // res.end();
})

app.get('/register',(req,res)=>{
  // res.writeHead(200,{"Content-Type":html});
  res.render('register');
  // res.end();
})

app.get('/users',async(req,res)=>{
  try{
    var users= db.collection('users').find().toArray();
    users.map((user)=>{
       res.send(user);
    })
     
  console.log(data)

  res.json(data);
  }
  catch(err){
    res.send("Error"+err);
  }
})

app.use('/register',postRouter);

app.listen(8080,()=>{
  console.log("connected to server at port 8080");
})
