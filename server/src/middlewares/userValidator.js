import isStringValidator from './isStringValidator';
import checkName from './checkName';

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
    if (req.body.firstName && req.body.firstName.length > 20) return res.status(400).json({ message: 'First name cannot be more than 20 characters' });
    if (req.body.lastName && req.body.lastName.length > 20) return res.status(400).json({ message: 'Last name cannot be more than 20 characters' });
    if (req.body.email && req.body.email.length > 30) return res.status(400).json({ message: 'Email cannot be more than 30 characters' });
    if (req.body.password && req.body.password.length > 20) return res.status(400).json({ message: 'password cannot be more than 20 characters' });
    if (isStringValidator(req, res) === null) return;
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (req.body.email.indexOf('@') === -1 || req.body.email.indexOf('.') === -1) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    if (checkName(req.body.firstName) === null) return res.status(400).json({ message: 'First name can only contain alphabelts and hyphen' });
    if (checkName(req.body.lastName) === null) return res.status(400).json({ message: 'Last name can only contain alphabelts and hyphen' });
    next();
  }
  /**
   * This validates login details
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @param {Object} next - call next route handler
   * @returns {Object} Success or failure message
   */
  static login(req, res, next) {
    if (isStringValidator(req, res) === null) return;
    if (!req.body.email) return res.status(400).json({ message: 'Email is required' });
    if (!req.body.password) return res.status(400).json({ message: 'Password is required' });
    next();
  }
}
