import express from 'express';
import expressFileUpload from 'express-fileupload';
import requestController from '../controllers/requestController';
import requestValidator from '../middlewares/requestValidator';
import auth from '../middlewares/auth';
import idValidator from '../middlewares/idValidator';
import uploadToCloudinary from '../middlewares/uploadToCloudinary';

const requestRoute = express();
requestRoute.use(expressFileUpload());
requestRoute.route('/users/requests')
  .get(auth, requestValidator.getAll, requestController.getAll)
  .post(requestValidator.addRequest, auth, uploadToCloudinary, requestController.addRequest);
requestRoute.route('/users/requests/:requestId')
  .get(auth, idValidator, requestController.getARequest)
  .put(
    auth, idValidator, requestValidator.modifyRequest, uploadToCloudinary,
    requestController.modifyRequest
  )
  .delete(auth, idValidator, requestController.deleteRequest);
requestRoute.route('/upload')
  .post(auth, requestController.uploadToLocal);
export default requestRoute;
