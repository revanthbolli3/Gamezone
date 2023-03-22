const express=require('express');
const router=express.Router();
const User=require('../api/models/registerSchema');
//get request for getting all the data stored in db
router.get('/abc',async(req,res)=>
{
  try {
    const routes=User.find();
    res.json(routes);
  }
  catch(err){
    res.send('Error',+err);
  }
})

module.exports=router;