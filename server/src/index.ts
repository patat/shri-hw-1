import express from "express";
import bodyParser from "body-parser";
import path from 'path';

import * as utils from './utils';
const config = require('../config.json');
const eventsDB = require('../events.json');
const port = config.port || 8000;

const app = express();
const jsonParser = bodyParser.json();

interface HouseEvent {
  type: string;
  title: string;
  source: string;
  time: string;
  icon: string;
  size: string;
  description?: string;
  data?: any
}

app.use('/', express.static(path.join(__dirname, '../../client'), {
  etag: false
}));

app.get('/status', (req: express.Request, res: express.Response) => {
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

  const serverUptimeMs = Date.now() - req.app.get('startTime');
  const serverUptime = utils.formatTime(serverUptimeMs);

  res.send(serverUptime);
});

app.post('/api/events', jsonParser, (req: express.Request, res: express.Response) => {
  let events: Array<HouseEvent> = [];
  // Filter by type
  if (req.body.type !== undefined) {
    const types = req.body.type;

    if (!utils.validateTypes(types, config.types)) {
      res.statusMessage = 'incorrect type';
      res.status(400).end();
      return;
    }

    events = eventsDB.events.filter((event: HouseEvent) => {
      return types.includes(event.type);
    });
  } else {
    events = eventsDB.events;
  }

  // Pagination
  if (req.body.page !== undefined && req.body.perPage !== undefined) {
    if (!utils.validatePagination(req.body.page, req.body.perPage)) {
      res.statusMessage = 'incorrect pagination';
      res.status(400).end();
      return;
    }

    const page = parseInt(req.body.page, 10);
    const perPage = parseInt(req.body.perPage, 10);
    const pageStart = (page - 1) * perPage;
    const pageEnd = page * perPage;

    events = events.slice(pageStart, pageEnd);
  }

  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ events }));
});

app.post('/api/cam-state', jsonParser, (req, res) => {
  app.set('camState', req.body);
});

app.get('/api/cam-state', (req, res) => {
  res.status(200);
  res.setHeader('Content-Type', 'application/json');

  let camState = app.get('camState');
  if (!camState) {
    camState = { opened: '' }
  }
  res.send(JSON.stringify(camState));
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
