const express = require('express');
const path = require('path');

const homeRouter = require('./routes/home');
const searchRouter = require('./routes/search');
const registRouter = require('./routes/regist');

const app = express();

app.set('port', process.env.PORT || 8080);

app.set('view engine', 'ejs');

app.use('/', homeRouter);
app.use('/search', searchRouter);
app.use('/regist', registRouter);

app.use('/public', express.static(path.join(__dirname, '/public')));

app.listen(app.get('port'), () => {
    console.log(`Server is running at : http://127.0.0.1:${app.get('port')}`);
});

// module.exports = router;