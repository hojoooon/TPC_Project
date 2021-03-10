const express = require('express');

const router = express.Router();

const options = {
    title: 'Search',
    menus: [
        { title: 'cookies', link: '/cookies'},
        { title: 'URL', link: '#'},
        { title: 'JSON', link: '#'}
    ]
}

router.get('/', (req, res) => {
    res.render('search', options);
});

// router.get('/search:id', (req, res) => {
//     console.log(req.params, req.query);
// });
module.exports = router;