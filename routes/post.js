const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const User=require('../api/models/registerSchema');

const db=mongoose.connection;

router.post('/abc',async(req,res)=>
{
  const routes=new User({
    //data coming from req obj
    playerName:req.body.playerName,
    email:req.body.email,
    password:req.body.password,
    confirmPassword:req.body.confirmPassword
  });
  try{
    const r1=await routes.save();
    res.json(r1);
  }
  catch(err){
    res.send('Error'+err);
  }
})

router.post('/register',async (req,res)=>{
  console.log("pst metod called")
  try{
  var playerName=req.body.playername;
  var newemail=req.body.email;
  var password=req.body.password;
  var confirmPassword=req.body.cpassword;
  console.log(req.body)
var value=await db.collection('users').find().toArray();

for(let val of value){
  console.log(val.playername.toLowerCase(),playerName.toLowerCase())
  if(val.playername.toLowerCase()=== playerName.toLowerCase()){
    return res.send({message:"user already found"})
  }
}
for(let val of value){
  if(val.email=== newemail){
    return res.send({message:"duplicate email found"})
  }
}

if(password===confirmPassword){

  var data=new User({
    "playername":playerName,
    "email":newemail,
    "password":password,
    "confirmPassword":confirmPassword
  });
  console.log(data);
//middleware




  const registered=await data.save();
  console.log("Record inserted successfully");
  //res.status(201).render("index");

  // db.collection('users').insertOne(data,(err,collection)=>{
  //   if(err){
  //     throw err;
  //   }
  //   console.log("Record inserted successfully");
  // });

   return res.send({message:'signup_success'});
}
else{
  res.send("password are not matching");
}
}
catch(err){
  return console.log('Error'+err);
}

})


module.exports=router;