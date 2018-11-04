"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const utils = __importStar(require("./utils"));
const config = require('../config.json');
const eventsDB = require('../events.json');
const port = config.port || 8000;
const app = express_1.default();
const jsonParser = body_parser_1.default.json();
app.get('/status', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    const serverUptimeMs = Date.now() - req.app.get('startTime');
    const serverUptime = utils.formatTime(serverUptimeMs);
    res.send(serverUptime);
});
app.post('/api/events', jsonParser, (req, res) => {
    let events = [];
    // Filter by type
    if (req.body.type !== undefined) {
        const types = req.body.type;
        if (!utils.validateTypes(types, config.types)) {
            res.statusMessage = 'incorrect type';
            res.status(400).end();
            return;
        }
        events = eventsDB.events.filter((event) => {
            return types.includes(event.type);
        });
    }
    else {
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
//# sourceMappingURL=index.js.map