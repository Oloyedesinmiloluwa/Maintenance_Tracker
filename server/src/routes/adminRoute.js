import express from 'express';
import bodyParser from 'body-parser';
import adminController from '../controllers/adminController';
import auth from '../middlewares/auth';

const adminRoute = express();
adminRoute.use(bodyParser.json());
adminRoute.use(bodyParser.urlencoded({ extended: false }));

adminRoute.route('/requests')
  .get(auth, adminController.getAll);

export default adminRoute;
