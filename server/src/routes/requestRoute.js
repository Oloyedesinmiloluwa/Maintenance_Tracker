import express from 'express';
import bodyParser from 'body-parser';
import requestController from '../controllers/requestController';
import requestValidator from '../middlewares/requestValidator';
import auth from '../middlewares/auth';

const requestRoute = express();
requestRoute.use(bodyParser.json());
requestRoute.use(bodyParser.urlencoded({ extended: false }));
requestRoute.route('/users/requests')
  .get(auth, requestController.getAll)
  .post(requestValidator.addRequest, auth, requestController.addRequest);
requestRoute.route('/users/requests/:requestId')
  .get(auth, requestController.getARequest)
  .put(auth, requestValidator.modifyRequest, requestController.modifyRequest);
export default requestRoute;
