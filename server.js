// server.js
// where your node app starts
var moment = require('moment');

// init project
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/build/'));

app.get('/', (req, res) => {
  res.sendFile(__dirname, '/build/index.html');
});

const formatUnix = (date) => {
  return +moment.utc(date).format('x');
};

const formatUTC = (date) => {
  return moment.utc(date).format('ddd, DD MMM YYYY HH:mm:ss') + ' GMT';
};

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.get('/api/timestamp/', (req, res) => {
  const currentDate = moment();
  res.json({
    unix: formatUnix(currentDate),
    utc: formatUTC(currentDate),
  });
});

app.get('/api/timestamp/:date', (req, res) => {
  let { date } = req.params;
  if (!moment(date).isValid()) {
    console.log(date);
    date = moment.unix(date/1000);
    console.log(date);
  }

  if (moment(date).isValid()) {
    res.json({
      unix: formatUnix(date),
      utc: formatUTC(date),
    });
  } else {
    res.send({ error: 'Invalid Date' });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
