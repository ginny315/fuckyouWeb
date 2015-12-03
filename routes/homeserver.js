"use strict";
var express = require('express');
var router = express.Router();
var Work = require('../db/work');

router.get('/', function(req, res) {
  console.log('home------');  
  var userid = req.session.userid || '';
  if(userid != ''){
    var works = Work.getWorksByUserId(userid,function(err,works){      
      if(err) console.error(err);
      else{
        res.status(200);
        res.json(works);
      }//else
    }); 
  } else{
    res.status(200);
    res.send({
      'code':0
    })
  }    
});

router.post('/deletework',function(req,res){
  var workid = req.body.workid;
  Work.deleteWorkById(workid,function(err){
    if(err) console.error(err);
    else{
      res.status(200);
      res.send({
        'code':1
      })
    }
  });
});

router.post('/updatework',function(req,res){
  var workid = req.body.id;
  var theme = req.body.theme;
  var describe = req.body.describe;
  Work.updateWork(workid,theme,describe,function(err){
    if(err) console.error(err);
    else{
      res.status(200);
      res.send({
        'code':1
      })
    }
  });
});

module.exports = router;