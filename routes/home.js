import express from "express";
import fetch from 'node-fetch';

const router = express.Router();

let dataArr = [];

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
            dataArr.push(data);
            res.render('home', { title: 'Home', data: JSON.stringify(data) });
            console.log(dataArr[0].data.getCookieData[0].cookie);
        })
        .catch(err => {
            console.error(err);
        })
});

export default router;

// module.exports = router;

