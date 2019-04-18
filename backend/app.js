const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./models/post");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://olek:rBWQcmUQh3aUqyQT@cluster0-jjhi1.mongodb.net/meanapp?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database.");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// rBWQcmUQh3aUqyQT

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added sucessfully!",
      postId: createdPost._id
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetchet succesfully!",
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id}).then(result => {
      console.log(result);
      res.status(200).json({message: 'Post deleted.'});
    }); 
});

module.exports = app;