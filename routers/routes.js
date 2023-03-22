const express=require('express');
const router=express.Router();
const GameDetails=require('../api/models/gameSchema');
const db=require('../index');

//get req
router.get('/',async(req,res)=>{
  try{
  const data=await GameDetails.find();
  res.json(data);
  }
  catch(err){
    res.send("Error"+err);
  }
})

module.exports=router;



// router.get('/:id',async(req,res)=>{
//   try{
//     const data=await GameDetails.findById(req.params.id);
//     res.json(data);
//   }
//   catch(err){
//     res.send("Error"+err);
//   }
// })

router.get('/user/:name',async(req,res)=>{
  try{
    const value=req.params.name;
    let collectionObject=req.app.get("collectionObject")

    const data=await collectionObject.find({PlayerName:value}).toArray();
    console.log("data",data);
    res.json(data);
  }
  catch(err){
    res.send("Error"+err);
  }
})

router.post('/',async(req,res)=>{
  const routes=new GameDetails({
    GameName:req.body.GameName,
    PlayerName:req.body.PlayerName,
    CurrentScore:req.body.CurrentScore,
    HighScore:req.body.HighScore,
    date:req.body.date
  })
  try{
     const r1=await routes.save();
     res.json(r1)
  }
  catch(err){
res.send('error');
  }
})

//delete

router.delete('/:id',async(req,res)=>{
  try{
    const route=await GameDetails.findById(req.params.id);
    const r1=await route.remove();
    res.json(r1);

  }
  catch(err){
    console.log(err);
  }
})

module.exports=router;