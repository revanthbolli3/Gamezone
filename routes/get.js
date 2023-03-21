const express= require('express')
const router= express.Router()
const User= require('../models/UserDetails')

//get request for getting all the data stored in db
router.get('/abc',async(req,res)=>
{
    try{
        const routes= await User.find()
        res.json(routes)
    }
    catch(err)
    {
        res.send('Error', +err)
    }
})

//setup route to login page
router.get('/login', (req, res) => {
    res.render('login'); //call login page
  });

router.get('/dashboard', (req, res) => {
    if (req.session.user) {
      res.render('dashboard', { email: req.session.user.email });
    } else {
      res.redirect('/');
    }
  });


  //forgot password form
router.get('/forgot-password', (req,res)=>
{
  res.render('forgot-password')
})

module.exports= router