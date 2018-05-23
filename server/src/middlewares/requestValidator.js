import validator from 'validator';
import { isString } from 'util';

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
    const keys = Object.keys(req.body);
    let flag2 = false;
    keys.forEach((key) => {
      if (!isString(req.body[key])) {
        flag2 = true;
        return res.status(400).json({ message: `Invalid Format for ${key} field` });
      }
    });
    if (flag2) return;
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
    const id = parseInt(req.params.requestId, 10);
    if (!id || id < 0 || id !== Number(req.params.requestId)) return res.status(400).json({ message: 'Invalid ID' });
    let flag = false;
    if (req.body.status) {
      ['pending', 'approved', 'disapproved', 'resolved'].forEach((status) => {
        if (req.body.status === status) flag = true;
      });
      if (!flag) res.status(400).json({ message: 'Status not valid' });
    }
    let flag2 = false;
    const keys = Object.keys(req.body);
    keys.forEach((key) => {
      if (!isString(req.body[key])) {
        flag2 = true;
        return res.status(400).json({ message: `Invalid Format for ${key} field` });
      }
    });
    if (flag2) return;
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
