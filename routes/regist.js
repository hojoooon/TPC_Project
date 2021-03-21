const express = require('express');

const router = express.Router();

const options = {
    title: 'Regist',
    menus: [
        { title: 'Cookie', link: '#'},
        { title: 'URL', link: '#'},
        { title: 'JSON', link: '#'}
    ]
}

router.get('/', (req, res) => {
    res.render('regist', options);
});
router.get('/Json',(req,res)=>{
    res.render('registJson',options);
});

module.exports = router;