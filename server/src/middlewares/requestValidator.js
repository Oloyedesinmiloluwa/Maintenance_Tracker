import validator from 'validator';
import isStringValidator from './isStringValidator';
import queryValidator from './queryValidator';

/**
 * Class representing the validator for the application.
 */
export default class validateRequest {
  /**
   * This validates a get request.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @param {Object} next - call next route handler
   * @returns {Object} suceess or failure
   */
  static getAll(req, res, next) {
    if (req.query.category) {
      req.query.category = queryValidator(req.query.category);
    }

    if (req.query.status) {
      req.query.status = queryValidator(req.query.status);
    }
    next();
  }
  /**
   * This validates the length of request input fields.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} suceess or failure
   */
  static validateLength(req, res) {
    let error = false;
    if (req.body.title && req.body.title.length > 20) {
      res.status(400).json({ message: 'Title cannot be more than 20 characters' });
      error = true;
    }
    if (req.body.title && req.body.title.length < 5) {
      res.status(400).json({ message: 'Title cannot be less than 5 characters' });
      error = true;
    }
    if (req.body.description && req.body.description.length > 250) {
      res.status(400).json({ message: 'Description length cannot be more than 250 characters' });
      error = true;
    }
    if (req.body.description && req.body.description.length < 20) {
      res.status(400).json({ message: 'Description length cannot be less than 20 characters' });
      error = true;
    }
    if (req.body.category && req.body.category.length > 20) {
      res.status(400).json({ message: 'Category length cannot be more than 20 characters' });
      error = true;
    }
    if (req.body.image && req.body.image.length > 20) {
      res.status(400).json({ message: 'Image length cannot be more than 20 characters' });
      error = true;
    }
    if (error) return true;
  }
  /**
   * This validates a new request if it is in the right format.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @param {Object} next - call next route handler
   * @returns {Object} suceess or failure
   */
  static addRequest(req, res, next) {
    let error = false;
    if (!req.body.title) {
      res.status(400).json({ message: 'Request title required' });
      error = true;
    }
    if (!req.body.description) {
      res.status(400).json({ message: 'Request description required' });
      error = true;
    }
    if (validateRequest.validateLength(req, res)) error = true;
    if (isStringValidator(req, res)) error = true;

    if (req.body.title.indexOf(' ') !== -1 || req.body.title.indexOf('-') !== -1) {
      let test = req.body.title;
      for (let i = 0; i < test.length; i += 1) {
        test = test.replace(' ', '');
        test = test.replace('-', '');
      }
      if (!validator.isAlphanumeric(test)) {
        res.status(400).json({ message: 'Request title can only contain alphanumeric characters, space & hypen' });
        error = true;
      }
    } else if (!validator.isAlphanumeric(req.body.title)) {
      res.status(400).json({ message: 'Request title can only contain alphanumeric characters, space & hypen' });
      error = true;
    }
    if (error) return;
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
    let error = false;
    if (validateRequest.validateLength(req, res)) error = true;
    if (isStringValidator(req, res)) error = true;
    if (req.body.title && req.body.title.indexOf(' ') !== -1) {
      let test = req.body.title;
      for (let i = 0; i < test.length; i += 1) {
        test = test.replace(' ', '');
      }
      if (!validator.isAlphanumeric(test)) {
        res.status(400).json({ message: 'Request title can only contain alphanumeric characters, space & hypen' });
        error = true;
      }
    } else if (req.body.title && !validator.isAlphanumeric(req.body.title)) {
      res.status(400).json({ message: 'Request title can only contain alphanumeric characters, space & hypen' });
      error = true;
    }
    if (error) return;
    next();
  }
}
