import express from "express";
import fetch from 'node-fetch';
import sessionStorage from 'sessionstorage';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    fetch('http://localhost:4000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `
                    query{ 
                        getData {
                            cookieData{
                                domainTitle
                                domain
                                url
                            }
                            publisherData{
                                publisher
                                type
                            }
                        }
                    }
                `
        })
    })
    .then(result => {
        return result.json();
    })
    .then(data => {
        const d = []
        d.push(data)
        res.render('search', { title: 'search', data: d[0].data.getData });
    })
    .catch(err => {
        console.error(err);
    })
})

let option;
let keyword;

router.get('/result', (req, res) => {
    option = req.query.option;
    keyword = req.query.keyword;

    sessionStorage.setItem('keyword', keyword);

    if (req.query.option === 'domains') {
        fetch('http://localhost:4000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query {
                        getCookieData(domain: "${keyword}") {
                            domainTitle
                            url
                            cookie {
                              name
                              conn
                              connTLD
                              publisher
                              value
                              id
                              type
                            }
                        }
                    }
                   `
            })
        })
            .then(result => {
                return result.json();
            })
            .then(data => {
                const d = []
                d.push(data)
                res.render('cookies', {
                    title: 'cookies',
                    keyword: keyword,
                    data: d[0].data.getCookieData[0],
                    menus : [
                        { title: 'Cookies', link: `/search/result?option=domains&keyword=${sessionStorage.getItem('keyword')}`},
                        { title: 'Publishers', link: '/search/types'},
                        { title: 'Conn', link: '/search/conn'},
                        { title: 'Month', link: '/search/month' }
                    ],
                });
            })
            .catch(err => {
                console.error(err);
            })
    } else if (req.query.option === 'publishers') {
        fetch('http://localhost:4000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query {
                        getPubData(publisher: "${keyword}", updatedMonth:"202103") {
                            publisher
                            detail {
                                domain
                                count
                            }
                        }
                    }
                `
            })
        })
            .then(result => {
                return result.json();
            })
            .then(data => {
                const d = [];
                d.push(data);
                console.log(d[0].data.getPubData[0]);
                res.render('publishers', {
                    title: 'Search by Publishers',
                    data: d[0].data.getPubData[0]
                })
            })
    }
});

router.get('/types', (req, res) => {
    fetch('http://localhost:4000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `
                    query {
                      getCookieData(domain:"${sessionStorage.getItem('keyword')}") {
                        domainTitle
                        url
                        cookie {
                          publisher
                          type
                        }
                      }
                    }
                   `
        })
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            const d = []
            d.push(data)
            console.log(d[0].data.getCookieData[0]);
            let adArr = [],
                portalArr = [],
                webArr = [],
                shopArr = [],
                gameArr = [],
                entertainArr = [],
                musicArr = [],
                movieArr = [],
                tripArr = [],
                eduArr = [],
                bankArr = [],
                stockArr = [],
                snsArr = [];

            let adCount = 0,
                portalCount = 0,
                webCount = 0,
                shopCount = 0,
                gameCount = 0,
                entertainCount = 0,
                musicCount = 0,
                movieCount = 0,
                tripCount = 0,
                eduCount = 0,
                bankCount = 0,
                stockCount = 0,
                snsCount = 0;
            for (let i = 0; i < d[0].data.getCookieData[0].cookie.length; i++) {
                if (d[0].data.getCookieData[0].cookie[i].type === '광고') {
                    adArr.push(d[0].data.getCookieData[0].cookie[i].publisher);
                    adCount++;
                } else if (d[0].data.getCookieData[0].cookie[i].type === '포털') {
                    portalArr.push(d[0].data.getCookieData[0].cookie[i].publisher);
                    portalCount++;
                } else if (d[0].data.getCookieData[0].cookie[i].type === '웹') {
                    webArr.push(d[0].data.getCookieData[0].cookie[i].publisher);
                    webCount++;
                } else if (d[0].data.getCookieData[0].cookie[i].type === '쇼핑') {
                    shopArr.push(d[0].data.getCookieData[0].cookie[i].publisher);
                    shopCount++;
                } else if (d[0].data.getCookieData[0].cookie[i].type === '게임') {
                    gameArr.push(d[0].data.getCookieData[0].cookie[i].publisher);
                    gameCount++;
                } else if (d[0].data.getCookieData[0].cookie[i].type === '엔터테인먼트') {
                    entertainArr.push(d[0].data.getCookieData[0].cookie[i].publisher);
                    entertainCount++;
                } else if (d[0].data.getCookieData[0].cookie[i].type === '음악') {
                    musicArr.push(d[0].data.getCookieData[0].cookie[i].publisher);
                    musicCount++;
                } else if (d[0].data.getCookieData[0].cookie[i].type === '영화') {
                    movieArr.push(d[0].data.getCookieData[0].cookie[i].publisher);
                    movieCount++;
                } else if (d[0].data.getCookieData[0].cookie[i].type === '여행') {
                    tripArr.push(d[0].data.getCookieData[0].cookie[i].publisher);
                    tripCount++;
                } else if (d[0].data.getCookieData[0].cookie[i].type === '교육') {
                    eduArr.push(d[0].data.getCookieData[0].cookie[i].publisher);
                    eduCount++;
                } else if (d[0].data.getCookieData[0].cookie[i].type === '금융') {
                    bankArr.push(d[0].data.getCookieData[0].cookie[i].publisher);
                    bankCount++;
                } else if (d[0].data.getCookieData[0].cookie[i].type === '증권') {
                    stockArr.push(d[0].data.getCookieData[0].cookie[i].publisher);
                    stockCount++;
                } else if (d[0].data.getCookieData[0].cookie[i].type === 'SNS') {
                    snsArr.push(d[0].data.getCookieData[0].cookie[i].publisher);
                    snsCount++;
                }
            }
            console.log(`
                광고: ${adCount},
                포털: ${portalCount}, 
                웹: ${webCount}, 
                쇼핑: ${shopCount}, 
                게임: ${gameCount}, 
                엔터테인먼트: ${entertainCount}, 
                음악: ${musicCount},
                여행: ${tripCount},
                교육: ${eduCount},
                금융: ${bankCount},
                증권: ${stockCount},
                SNS: ${snsCount}
            `);

            console.log(stockArr);

            res.render('types', {
                title: 'Types',
                data: d[0].data.getCookieData[0],
                menus : [
                    { title: 'Cookies', link: `/search/result?option=domains&keyword=${sessionStorage.getItem('keyword')}`},
                    { title: 'Publishers', link: '/search/types'},
                    { title: 'Conn', link: '/search/conn'},
                    { title: 'Month', link: '/search/month' }
                ],
                counts: [
                    { type: '광고', count: adCount, publisher: adArr },
                    { type: '포털', count: portalCount, publisher: portalArr },
                    { type: '웹', count: webCount, publisher: webArr },
                    { type: '쇼핑', count: shopCount, publisher: shopArr },
                    { type: '게임', count: gameCount, publisher: gameArr },
                    { type: '엔터테인먼트', count: entertainCount, publisher: entertainArr },
                    { type: '음악', count: musicCount, publisher: musicArr },
                    { type: '영화', count: movieCount, publisher: movieArr },
                    { type: '여행', count: tripCount, publisher: tripArr },
                    { type: '교육', count: eduCount, publisher: eduArr },
                    { type: '금융', count: bankCount, publisher: bankArr },
                    { type: '증권', count: stockCount, publisher: stockArr },
                    { type: 'SNS', count: snsCount, publisher: snsArr }
                ]
            });
        })
        .catch(err => {
            console.error(err);
        })
});

router.get('/conn', (req, res) => {
    fetch('http://localhost:4000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            query: `
                    query getData {
                        getCookieData(domain: "${sessionStorage.getItem('keyword')}") {
                            domainTitle
                            url
                            cookie {
                              name
                              conn
                              connTLD
                              publisher
                              value
                              id
                              type
                            }
                        }
                    }
                   `
        })
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            // return data;
            // res.send(data);
            const d = []
            d.push(data)
            res.render('searchConn', {
                title: 'searchConn',
                data: d[0].data.getCookieData,
                menus : [
                    { title: 'Cookies', link: `/search/result?option=domains&keyword=${sessionStorage.getItem('keyword')}`},
                    { title: 'Publishers', link: '/search/types'},
                    { title: 'Conn', link: '/search/conn'},
                    { title: 'Month', link: '/search/month' }
                ]
            });
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        })
});

router.get('/month', (req, res) => {
    fetch('http://localhost:4000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query {
                getCookieDatas(domain: "${sessionStorage.getItem('keyword')}") {
                    domainTitle
                    url
                    updatedAt
                    updatedDate
                    cookie {
                        name
                        connTLD
                        publisher
                        id
                        type
                    }
                }
            }
            `
        })
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            const d = []
            d.push(data)
            res.render('cookiesCompare', {
                title: 'Compare Cookies',
                data: d[0].data.getCookieDatas,
                menus : [
                    { title: 'Cookies', link: `/search/result?option=domains&keyword=${sessionStorage.getItem('keyword')}`},
                    { title: 'Publishers', link: '/search/types'},
                    { title: 'Conn', link: '/search/conn'},
                    { title: 'Month', link: '/search/month' }
                ]
            });
            console.log(d[0].data.getCookieDatas);
        })
        .catch(err => {
            console.error(err);
        })
});


export default router;
