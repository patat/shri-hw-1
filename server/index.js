const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const utils = require('./utils.js');
const config = require('./config.json');
const eventsDB = require('./events.json');
const port = config.port || 8000;

app.get('/status', (req, res) => {
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

  const serverUptimeMs = Date.now() - req.app.get('startTime');
  const serverUptime = utils.formatTime(serverUptimeMs);

  res.send(serverUptime);
});

app.post('/api/events', jsonParser, (req, res) => {
  let result = {};
  // Filter by type
  if (req.body.type !== global.udefined) {
    const types = req.body.type;

    if (!utils.validateTypes(types, config.types)) {
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
  if (req.body.page !== global.udefined && req.body.perPage !== global.udefined) {
    if (!utils.validatePagination(req.body.page, req.body.perPage)) {
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
  const startTimeMs = Date.now();
  app.set('startTime', startTimeMs);
  console.log(`App listening on port ${port}!`);
});
