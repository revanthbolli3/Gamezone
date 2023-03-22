const express=require('express');
const mongoose=require('mongoose');
const db=mongoose.connection;
const router=express.Router();
const User=require('../api/models/registerSchema');
//get request for getting all the data stored in db

router.get('/',async(req,res)=>{
  try{
    console.log("here")
    const users=await db.collection('users').find().toArray();
    //console.log(users);
    res.send(users);
  }
  catch(err){
    res.send("Error"+err);
  }
})

module.exports=router;