require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// my code
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const dns = require('dns');
// my code

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// my code
global.index = -1;
global.urlArr = []
app.post("/api/shorturl", (req, res) => {
  const { url } = req.body;
  const REPLACE_REGEX = /^https?:\/\//i;
  const url1 = url.replace(REPLACE_REGEX, '');
  dns.lookup(url1, (err, addresses, family) => {
    if (!err) {
      global.index++;
      global.urlArr[index] = url;
      res.json({
        "original_url": url,
        "short_url": global.index
      })
    } else {
      res.json({
        "error": "Invalid URL"
      })
    }
  })
})

app.get("/api/shorturl/:uid", (req, res) => {
  const { uid } = req.params;
  res.redirect(global.urlArr[uid]);
})
// my code

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
