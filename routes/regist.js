const express = require('express');

const router = express.Router();

const options = {
    title: 'Regist',
    menus: ['Cookie', 'URL', 'JSON']
}

router.get('/', (req, res) => {
    res.render('regist', options);
});

module.exports = router;