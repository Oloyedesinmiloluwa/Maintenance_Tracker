import validator from 'validator';
import { isString } from 'util';

/**
 * Class representing the validator for the application.
 */
export default class userValidator {
/**
   * This validates new account details
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @param {Object} next - call next route handler
   * @returns {Object} Success or failure message
   */
  static signUp(req, res, next) {
    const keys = Object.keys(req.body);
    let flag = false;
    keys.forEach((key) => {
      if (!isString(req.body[key])) {
        flag = true;
        return res.status(400).json({ message: `Invalid Format for ${key} field` });
      }
    });
    if (flag) return;
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (req.body.email.indexOf('@') === -1 || req.body.email.indexOf('.') === -1) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    if (req.body.firstName && req.body.firstName.indexOf('-') !== -1) {
      let test = req.body.firstName;
      for (let i = 0; i < test.length; i += 1) {
        test = test.replace('-', '');
      }
      if (!validator.isAlpha(test)) {
        return res.status(400).json({ message: 'First name can only contain alphabelts and hyphen' });
      }
    } else if (!validator.isAlpha(req.body.firstName)) {
      return res.status(400).json({ message: 'First name can only contain alphabelts and hyphen' });
    }
    if (req.body.lastName && req.body.lastName.indexOf('-') !== -1) {
      let test = req.body.lastName;
      for (let i = 0; i < test.length; i += 1) {
        test = test.replace('-', '');
      }
      if (!validator.isAlpha(test)) {
        return res.status(400).json({ message: 'Last name can only contain alphabelts and hyphen' });
      }
    } else if (!validator.isAlpha(req.body.lastName)) {
      return res.status(400).json({ message: 'Last name can only contain alphabelts and hyphen' });
    }
    next();
  }
}
