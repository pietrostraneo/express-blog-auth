const express = require("express");
const app = express();

const handleBars = require('express-handlebars')

const port = 3000;

const path = require('path');

const postRouter = require('./routers/post.js');
const auth = require('./controllers/auth.js');
const errorHandling = require('./middleware/errorHandling.js');

app.engine('html', handleBars.engine({ extname: '.html' }));
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.json());

app.use(express.static('public'));

const title = "TITOLO JS";

app.get('/', (req, res) => {
    const data = {
        title: title,
    }
    res.render('index', data);
})

app.post('/login', auth.login);

app.use('/posts', postRouter);

app.use(errorHandling);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});