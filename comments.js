// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;

// Add body-parser middleware
app.use(bodyParser.json());

// Add static middleware
app.use(express.static(path.join(__dirname, 'public')));

// Get comments
app.get('/comments', (req, res) => {
  fs.readFile('data/comments.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Post comment
app.post('/comments', (req, res) => {
  fs.readFile('data/comments.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const comments = JSON.parse(data);
    const newComment = {
      id: comments.length + 1,