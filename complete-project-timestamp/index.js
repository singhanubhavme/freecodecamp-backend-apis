// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// my code
app.get("/api/:date", (req, res) => {
  const date = req.params.date;
  let getDate;
  if (!date.includes("-")) {
    getDate = new Date(parseInt(date));
  } else {
    getDate = new Date(date);
  }
    if (getDate == "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    } else {
      const showDate = getDate.toUTCString();
      return res.json({ "unix": getDate.getTime(), "utc": showDate });
    }
})
//my code

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});