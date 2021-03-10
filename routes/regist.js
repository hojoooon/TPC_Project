const express = require('express');

const router = express.Router();

const options = {
    title: 'Regist',
    menus: [
        { title: 'Cookie', link: '/regist/cookie'},
        { title: 'URL', link: '#'},
        { title: 'JSON', link: '#'}
    ]
}

router.get('/', (req, res) => {
    res.render('regist', options);
});

module.exports = router;