const express = require("express");
const app = express();

const port = 3000;

const postRouter = require('./routers/post.js');
const errorHandling = require('./middleware/errorHandling.js');

app.use(express.urlencoded());

app.use(express.static('public'));

app.use('/posts', postRouter);

app.use(errorHandling);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});