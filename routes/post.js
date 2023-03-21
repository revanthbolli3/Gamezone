const express= require('express')
const router= express.Router()
const bcrypt= require('bcryptjs')
const crypto= require('crypto')
const nodemailer= require('nodemailer')
const async= require('async')
var flash = require('express-flash');
const Users= require('../models/UserDetails')


//post request for creating data
router.post('/abc', async(req,res)=>
{
    console.log(req.body)
    const routes= new Users({

        //data coming from req obj
        playerName: req.body.playerName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    })
    try{
        const r1= await routes.save()
        res.json(r1)
    }
    catch(err)
    {
        res.send('Error' +err)
    }
})


// setup route to handle login submission
router.post('/login', async(req,res)=>
{
    const {email, password} =req.body
    console.log(req.body)
    Users.findOne({email:email}).then(user =>
        {
           
            if(!user)
            {
                return res.status(404).json({message: 'User not found'})
            }
           
               console.log(password, user.password) 
                    if(password===user._doc.password)
                    {
                       return res.status(200).json({message: 'Login successfully'})
                    }
                    else{
                        return res.status(401).json({message: 'Invalid credentials'})
                    }
                })
               
         .catch(err =>
            {
                console.log(err)
                return res.status(500).json({message: 'Internal server error'})
            })

        })


//handle forgot password form submission
router.post('/forgot-password', (req,res, next)=>
{
    async.waterfall(
    [
        function(done)
        {
            crypto.randomBytes(20, (err, buf)=>
            {
                var token= buf.toString('hex')
                done(err, token)
            })
        },
        function(token, done)
        {
            Users.findOne({email: req.body.email}, (err, user)=>
            {
                if(!user)
                {
                    req.flash('error', 'No account with that email address exists.')
                    return res.redirect('/forgot-password')
                    
                }
                console.log()
                user.resetPasswordToken= token
                user.resetPasswordExpires= Date.now() + 3600000 //1hr
                user.save((err)=>
                {
                    done(err, token, user)
                })
            })
        },
        function(token, user, done)
        {
            var smtpTransport= nodemailer.createTransport(
            {
                service: 'Gmail',
                auth:
                {
                    user: 'gmail.user@gmail.com',
                    pass: 'userpass'
                }
            })
            var mailOptions= 
            {
                to: user.email,
                from: 'Your email',
                subject: 'Your password has been changed',
                text: 'Hello, \n\n'+
                       'This is confirmation that the password for your account '+
                       user.email+ 'has just been changed.\n'
            }
            smtpTransport.sendMail(mailOptions, (err)=>
            {
                res.flash('success', 'Success! your password has been changed.')
                done(err)
            })
            
        }
    ],
    function(err)
    {
        res.redirect('/')
    }
    )
})

module.exports= router