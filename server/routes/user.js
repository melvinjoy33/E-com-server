const router = require('express').Router();



router.get('/usertest', (req,res)=>{
  res.send("This is a test for the user route");
})

router.post('/add-user', (req,res)=>{
  const userData = req.body;
  res.send('Got the user data' + userData.name);
})

module.exports = router;