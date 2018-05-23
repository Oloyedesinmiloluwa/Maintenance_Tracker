import express from 'express';
import bodyParser from 'body-parser';
import requestController from '../controllers/requestController';
import requestValidator from '../middlewares/requestValidator';

const requestRoute = express();
requestRoute.use(bodyParser.json());
requestRoute.use(bodyParser.urlencoded({ extended: false }));
requestRoute.route('/users/requests')
  .get(requestController.getAll)
  .post(requestValidator.addRequest, requestController.addRequest);
requestRoute.route('/users/requests/:requestId')
  .get(requestController.getARequest)
  .put(requestValidator.modifyRequest, requestController.modifyRequest);
export default requestRoute;
