const express = require('express');

const router = express.Router();

const options = {
    title: 'Search',
    menus: ['Cookies', 'Publishers', 'Conn', 'Month']
}

router.get('/', (req, res) => {
    res.render('search', options);
});

module.exports = router;
