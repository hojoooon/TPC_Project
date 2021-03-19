const express = require('express');
const fetch = require('isomorphic-fetch');

const router = express.Router();

router.get('/', (req, res) => {
    fetch('http://localhost:4000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query {
                getCookieDatas(domain: "11st") {
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
            // return data;
            // res.send(data);
            const d = []
            d.push(data)
            res.render('cookiesCompare', { title: 'Compare Cookies', data: d[0].data.getCookieDatas });
            console.log(d[0].data.getCookieDatas);
        })
        .catch(err => {
            console.error(err);
        })
});

module.exports = router;