import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
import path from 'path';
import requestRoute from './routes/requestRoute';

const port = parseInt(process.env.PORT, 10) || 8000;
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/', requestRoute);
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;
