const express = require('express');
const path = require('path');

const homeRouter = require('./routes/home');
const searchRouter = require('./routes/search');
const registerRouter = require('./routes/regist');
const cookieRouter = require('./routes/cookies');
const registJsonRouter = require('./routes/registJson');
const searchConnRouter = require('./routes/searchConn');

const app = express();

app.set('port', process.env.PORT || 8080);

app.set('view engine', 'ejs');

app.use('/', homeRouter);
app.use('/search', searchRouter);
app.use('/regist', registerRouter);
app.use('/cookies', cookieRouter);
app.use('/searchConn',searchConnRouter);
app.use('/regist/json',registJsonRouter);
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname+'/public'));

app.listen(app.get('port'), () => {
    console.log(`Server is running at : http://127.0.0.1:${app.get('port')}`);
});

// app.get('/',function(req,res){
//     res.render('regist.ejs');
// });

// module.exports = router;