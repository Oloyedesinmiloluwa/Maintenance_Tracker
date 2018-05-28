import validator from 'validator';
import isStringValidator from './isStringValidator';

/**
 * Class representing the validator for the application.
 */
export default class validateRequest {
  /**
   * This validates a new request if it is in the right format.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @param {Object} next - call next route handler
   * @returns {Object} suceess or failure
   */
  static addRequest(req, res, next) {
    if (!req.body.title) {
      return res.status(400).json({ message: 'Request title required' });
    }
    if (!req.body.description) {
      return res.status(400).json({ message: 'Request description required' });
    }
    if (req.body.title && req.body.title.length > 20) return res.status(400).json({ message: 'Title cannot be more than 20 characters' });
    if (req.body.description && req.body.description.length > 250) return res.status(400).json({ message: 'Description length cannot be more than 250 characters' });
    if (req.body.category && req.body.category.length > 20) return res.status(400).json({ message: 'Category length cannot be more than 20 characters' });
    if (req.body.image && req.body.image.length > 20) return res.status(400).json({ message: 'Image length cannot be more than 20 characters' });
    if (isStringValidator(req, res) === null) return;
    if (req.body.title.indexOf(' ') !== -1 || req.body.title.indexOf('-') !== -1) {
      let test = req.body.title;
      for (let i = 0; i < test.length; i += 1) {
        test = test.replace(' ', '');
        test = test.replace('-', '');
      }
      if (!validator.isAlphanumeric(test)) {
        return res.status(400).json({ message: 'Request title can only contain alphanumeric characters, space & hypen' });
      }
    } else if (!validator.isAlphanumeric(req.body.title)) {
      return res.status(400).json({ message: 'Request title can only contain alphanumeric characters, space & hypen' });
    }
    next();
  }
  /**
   * This validates update inputs
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   *  @param {Object} next - call next route handler
   * @returns {Object} success or fail
   */
  static modifyRequest(req, res, next) {
    if (isStringValidator(req, res) === null) return;
    if (req.body.title && req.body.title.indexOf(' ') !== -1) {
      let test = req.body.title;
      for (let i = 0; i < test.length; i += 1) {
        test = test.replace(' ', '');
      }
      if (!validator.isAlphanumeric(test)) {
        return res.status(400).json({ message: 'Request title can only contain alphanumeric characters, space & hypen' });
      }
    } else if (req.body.title && !validator.isAlphanumeric(req.body.title)) {
      return res.status(400).json({ message: 'Request title can only contain alphanumeric characters, space & hypen' });
    }
    next();
  }
}
