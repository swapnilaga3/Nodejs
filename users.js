var express = require('express');
var router = express.Router();
const bodyParser=require('body-parser');
var passport=require('passport');
var User=require('../models/user');
var authenticate=require('../authenticate');

router.use(bodyParser.json());

/* GET users listing. */



router.post('/login',passport.authenticate('local'),(req,res)=>{
  var token=authenticate.getToken({_id:req.user._id});
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json({success:true,token: token,status: 'You are successfully login in!'});
});
  
router.get('/',authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res)=>{
  User.find({})
  .then((users)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(dishes);
  },(err)=>next(err))
})


module.exports = router;
