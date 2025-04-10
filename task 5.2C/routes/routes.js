var express = require('express');
const router = express.Router();
const controller=require("../controllers/controller")

router.get('/api/projects', (req, res)=>{
    controller.addContent(req,res)
});

module.exports = router;