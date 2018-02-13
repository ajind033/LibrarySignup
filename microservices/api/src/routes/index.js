var express = require('express');
var router = express.Router();
var taskCTRL = require('..//controllers/task.controllers.js');


/* home page */
router.get('/', (req, res)=> {
  res.render('index');
});


/* Add a user */
router.post('/signup',(req,res)=>{
  return taskCTRL.createUser(req,res);
});


module.exports = router;
