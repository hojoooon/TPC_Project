import express from 'express';
// import { spawn } from 'child_process';

const router = express.Router();

const menus = [
    { title: 'Cookie', link: '#'},
    { title: 'URL', link: '/regist/url'},
    { title: 'JSON', link: '#'}
]

router.get('/', (req, res) => {
    res.render('regist', { title: 'Regist', menus });
});

router.get('/url', (req, res) => {
    res.render('url', { title: 'Regist by URL', menus })
});

export default router;
