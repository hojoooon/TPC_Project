const express = require('express');

const router = express.Router();

const options = {
    title:'Search',
    menus: [
        { title: 'cookies', link: '/cookies'},
        { title: 'URL', link:'#'},
        { title: 'JSON', link:'#'}
    ]
}

router.get('/', (req, res) => {
    res.render('search', options);
});

router.get('/conn',(req,res)=>{
    res.render('searchConn', {title:'searchConn'});
});
module.exports = router;
