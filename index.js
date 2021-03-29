import express from "express";
import path from 'path';

import homeRouter from './routes/home.js';
import searchRouter from './routes/search.js'
import registRouter from './routes/regist.js';

const app = express();
const __dirname = path.resolve();

app.set('port', process.env.PORT || 8080);

app.set('view engine', 'ejs');

app.use('/', homeRouter);
app.use('/search', searchRouter);
app.use('/regist', registRouter);

app.use('/public', express.static(path.join(__dirname, '/public')));

app.listen(app.get('port'), () => {
    console.log(`Server is running at : http://127.0.0.1:${app.get('port')}`);
});
