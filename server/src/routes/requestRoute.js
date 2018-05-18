import express from 'express';
import bodyParser from 'body-parser';
import requestController from '../controllers/requestController';

const requestRoute = express();
requestRoute.use(bodyParser.json());
requestRoute.use(bodyParser.urlencoded({ extended: false }));
requestRoute.route('users/requests')
  .get(requestController.getAll)
  
export default requestRoute;
