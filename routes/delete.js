const express=require('express');
const router=express.Router();
const User=require('../api/models/registerSchema');

//delete the data which is not used or no need

router.delete('/:id',async(req,res)=>{
  try{
    const routes=await User.findById(req.params.id);
    const r1=await routes.remove();
    res.json(r1);

  }
  catch(err){
  res.send('Error'+err);
  }
})

module.exports=router;