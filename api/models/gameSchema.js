const mongoose=require('mongoose');
const perSchema=new mongoose.Schema({
  GameName:
  {
    type:String,
    required:true
  },
  PlayerName:
  {
    type:String,
    required:true
  },
  CurrentScore:{
    type:Number,
    required:true
  },
  HighScore:{
    type:Number,
    required:true
  },
  date:{
    type:Date,
    default:Date.now,
    required:true
  }

})

module.exports=mongoose.model('GameDetails',perSchema);