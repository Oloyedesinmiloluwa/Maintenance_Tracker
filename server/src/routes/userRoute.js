import express from 'express';
import bodyParser from 'body-parser';
import userController from '../controllers/userController';
import userValidator from '../middlewares/userValidator';

const userRoute = express();
userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: false }));
userRoute.route('/auth/signup')
  .post(userValidator.signUp, userController.signUp);
userRoute.route('/auth/login')
  .post(userValidator.login, userController.login);
export default userRoute;
