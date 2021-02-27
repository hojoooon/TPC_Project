const express = require('express');

const router = express.Router();

const menus = [
    { title: 'Cookie', link: '#'},
    { title: 'URL', link: '/regist/url'},
    { title: 'JSON', link: '#'}
]

router.get('/', (req, res) => {
    res.render('regist', { title: 'Regist', menus });
});

module.exports = router;
