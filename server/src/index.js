import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import requestRoute from './routes/requestRoute';
import userRoute from './routes/userRoute';
import adminRoute from './routes/adminRoute';
import swaggerDocument from '../../swagger';

const port = parseInt(process.env.PORT, 10) || 8000;
const app = express();
dotenv.config();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/', requestRoute);
app.use('/api/v1/', userRoute);
app.use('/api/v1/', adminRoute);
app.all('*', (req, res) => res.status(404).send({
  message: 'You are not in the right place, pls input a valid endpoint',
}));
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;
