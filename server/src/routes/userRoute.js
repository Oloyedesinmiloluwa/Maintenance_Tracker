import express from 'express';
import expressValidator from 'express-validator';
import userController from '../controllers/userController';
import userValidator from '../middlewares/userValidator';

const userRoute = express();
userRoute.use(expressValidator());
userRoute.route('/auth/signup')
  .post(userValidator.signUp, userController.signUp);
userRoute.route('/auth/login')
  .post(userValidator.login, userController.login);
export default userRoute;
