const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const config = require('./config.json');
const eventsDB = require('./events.json');
const port = config.port || 8000;

const urlencodedParser = bodyParser.urlencoded({ extended: false });
let startTime;

app.get('/status', (req, res) => {
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

  const serverUptimeMs = Date.now() - startTimeMs;
  const serverUptime = formatTime(serverUptimeMs);

  res.send(serverUptime);
});

app.post('/api/events', urlencodedParser, (req, res) => {
  let result = {};
  // Filter by type
  if (req.body.type) {
    const types = req.body.type.split(':');

    if (!validateTypes(types)) {
      res.statusMessage = 'incorrect type';
      res.status(400).end();
      return;
    }

    result.events = eventsDB.events.filter(event => {
      return types.includes(event.type);
    });
  } else {
    result = Object.assign({}, eventsDB);
  }

  // Pagination
  if (req.body.page && req.body.perPage) {
    if (!validatePagination(req.body.page, req.body.perPage)) {
      res.statusMessage = 'incorrect pagination';
      res.status(400).end();
      return;
    }

    const pageStart = (req.body.page - 1) * req.body.perPage;
    const pageEnd = req.body.page * req.body.perPage;
    result.events = result.events.slice(pageStart, pageEnd);
  }

  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(result));
});

app.all('*', (req, res) => {
  res.status(404);
  res.setHeader('Content-Type', 'text/html');
  res.send('<h1>Page not found</h1>');
});

app.listen(port, () => {
  startTimeMs = Date.now();
  console.log(`App listening on port ${port}!`);
});

// Takes time in ms and returns it converted to "hh:mm:ss"
function formatTime(ms) {
  const seconds = parseInt((ms / 1000) % 60);
  const minutes = parseInt((ms / (1000 * 60)) % 60);
  const hours = parseInt((ms / (1000 * 60 * 60)) % 24);
  return `${hours}:${minutes}:${seconds}`;
}

// Takes array of types and checks if each of them is allowed in config.json
// returns true if each type is allowed, false otherwise
function validateTypes(types) {
  for (const type of types) {
    if (!config.types.includes(type)) {
      return false;
    }
  }

  return true;
}

// Takes page and perPage query params values and checks
// if they are positive integers
// returns true if it's the case, false otherwise
function validatePagination(page, perPage) {
  return isPositiveInt(page) && isPositiveInt(perPage);
}

// Takes string and determines if it consists only of digits
// and begins with digit other than `0`;
function isPositiveInt(str) {
    return /^[1-9]\d*$/.test(str);
}