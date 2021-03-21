const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

router.get('/', (req, res) => {
    fetch('http://localhost:4000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            query: `
                    query getData {
                        getCookieData(domain: "11st", updatedDate: "20210302") {
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
            res.render('searchConn', { title: 'searchConn', data: d[0].data.getCookieData });
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        })
});

module.exports = router;
