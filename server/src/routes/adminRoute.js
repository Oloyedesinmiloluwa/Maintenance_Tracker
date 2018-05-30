import express from 'express';
import adminController from '../controllers/adminController';
import auth from '../middlewares/auth';
import idValidator from '../middlewares/idValidator';

const adminRoute = express();
adminRoute.route('/requests')
  .get(auth, adminController.getAll);
adminRoute.route('/requests/:requestId/approve')
  .put(idValidator, auth, adminController.approveRequest);
adminRoute.route('/requests/:requestId/disapprove')
  .put(idValidator, auth, adminController.disapproveRequest);
adminRoute.route('/requests/:requestId/resolve')
  .put(idValidator, auth, adminController.resolveRequest);
adminRoute.route('/admin/:userId/approve')
  .put(idValidator, auth, adminController.makeAdmin);

export default adminRoute;
