import express from 'express';
import expressValidator from 'express-validator';
import userController from '../controllers/userController';
import userValidator from '../middlewares/userValidator';
import auth from '../middlewares/auth';
import checkMail from '../middlewares/checkMail';

const userRoute = express();
userRoute.use(expressValidator());
userRoute.route('/auth/signup')
  .post(userValidator.signUp, userController.signUp);
userRoute.route('/auth/login')
  .post(userValidator.login, userController.login);
userRoute.route('/users/password/reset')
  .post(userValidator.sendEmail, checkMail, userController.sendEmail)
  .put(auth, userValidator.resetPassword, userController.resetPassword);
export default userRoute;
