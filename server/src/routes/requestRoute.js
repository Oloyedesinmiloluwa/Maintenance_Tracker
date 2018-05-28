import express from 'express';
import bodyParser from 'body-parser';
import requestController from '../controllers/requestController';
import requestValidator from '../middlewares/requestValidator';
import auth from '../middlewares/auth';
import idValidator from '../middlewares/idValidator';

const requestRoute = express();
requestRoute.use(bodyParser.json());
requestRoute.use(bodyParser.urlencoded({ extended: false }));
requestRoute.route('/users/requests')
  .get(auth, requestController.getAll)
  .post(requestValidator.addRequest, auth, requestController.addRequest);
requestRoute.route('/users/requests/:requestId')
  .get(auth, idValidator, requestController.getARequest)
  .put(auth, idValidator, requestValidator.modifyRequest, requestController.modifyRequest);
export default requestRoute;
