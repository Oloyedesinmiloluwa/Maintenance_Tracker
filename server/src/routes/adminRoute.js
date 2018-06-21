import express from 'express';
import adminController from '../controllers/adminController';
import requestValidator from '../middlewares/requestValidator';
import auth from '../middlewares/auth';
import idValidator from '../middlewares/idValidator';
import { isAdminValidator, isSuperAdminValidator } from '../middlewares/isAdminValidator';
import approveRequestValidator from '../middlewares/approveRequestValidator';
import { approveStatus, disapproveStatus, resolveStatus } from '../middlewares/modifyStatus';

const adminRoute = express();
adminRoute.route('/requests')
  .get(auth, isAdminValidator, requestValidator.getAll, adminController.getAll);
adminRoute.route('/requests/:requestId/approve')
  .put(idValidator, auth, isAdminValidator, approveRequestValidator, approveStatus, adminController.modifyStatus);
adminRoute.route('/requests/:requestId/disapprove')
  .put(idValidator, auth, isAdminValidator, disapproveStatus, adminController.modifyStatus);
adminRoute.route('/requests/:requestId/resolve')
  .put(idValidator, auth, isAdminValidator, resolveStatus, adminController.modifyStatus);
adminRoute.route('/admin/:userId/approve')
  .put(idValidator, auth, isSuperAdminValidator, adminController.makeAdmin);

export default adminRoute;
