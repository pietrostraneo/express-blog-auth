const express = require("express");
const app = express();

const port = 3000;

const postRouter = require('./routers/post.js');
const auth = require('./controllers/auth.js');
const errorHandling = require('./middleware/errorHandling.js');

app.use(express.urlencoded());
app.use(express.json());

app.use(express.static('public'));

app.post('/login', auth.login);

app.use(auth.authenticate);

app.use('/posts', postRouter);

app.use(errorHandling);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});