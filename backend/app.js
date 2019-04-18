const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post added sucessfully!'
    });
});

app.get("/api/posts", (req, res, next) => {
    const posts = [
        {id: 'dfsdfsdf', title: 'First post', content: 'Content of first post.'},
        {id: 'dfsddffsdf', title: 'Second post', content: 'Content of second post.'},
        {id: 'dfsdsdsfsdf', title: 'Third post', content: 'Content of third post.'},
    ]
    res.status(200).json({
        message: 'Posts fetchet succesfully!',
        posts: posts
    });
});

module.exports = app; 