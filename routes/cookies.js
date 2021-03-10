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
            res.render('cookies', { title: 'cookies', data: d[0].data.getCookieData[0] });
            // console.log(d[0].data.getCookieData[0]);
        })
        .catch(err => {
            console.error(err);
        })
});

module.exports = router;