import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import requestRoute from './routes/requestRoute';
import userRoute from './routes/userRoute';
import adminRoute from './routes/adminRoute';
import swaggerDocument from '../../swagger.json';

const port = parseInt(process.env.PORT, 10) || 8000;
const app = express();
dotenv.config();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('/api/v1/', (req, res) => res.status(200).send({
  message: 'Welcome to M-Tracker.com, we handle repair or maintenance request the finest and fastest way',
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/', requestRoute);
app.use('/api/v1/', userRoute);
app.use('/api/v1/', adminRoute);
app.use(express.static(path.resolve(__dirname, '../../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});
app.all('*', (req, res) => res.status(404).send({
  message: 'You are not in the right place, pls input a valid endpoint',
}));
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
console.info(`server running at port ${port}`);
export default app;
