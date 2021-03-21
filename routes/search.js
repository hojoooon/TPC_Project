const express = require('express');

const router = express.Router();

const menus = [
    {title: 'Cookies', link:'#'},
    {title: 'Publishers', link:'#'},
    {title: 'Conn', link:'#'},
    {title: 'Month', link:'#'}
]

router.get('/', (req, res) => {
    res.render('search', {title: 'Search'});
});

router.get('/conn',(req,res)=>{
    res.render('searchConn', {title:'searchConn'});
});
module.exports = router;