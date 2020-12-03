const express = require('express');
const router = express.Router();

router.get('/tetris',(req,res) => {
    res.render('index')
});

module.exports = router;