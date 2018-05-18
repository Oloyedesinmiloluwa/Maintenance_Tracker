import { data } from '../model/data';

/**
 * Class representing the controller for the application.
 */
export default class requestController {
  /**
   * This selects a particular request from database when called withing other methods.
   * @param {Object} req - The client request object.
   * @returns {Object} The selected request
   */
  static selectrequest(req) {
    const id = parseInt(req.params.requestId, 10);
    if (!data[id]) return null;
    return data[id];
  }
  /**
   * This formats req.params.id to an integer
   * @param {Object} req - client request Object
   * @returns {number} formatted number
   */
  static formatParamId(req) {
    const id = parseInt(req.params.requestId, 10);
    return id;
  }
  /**
   * This gets all requests
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Array} request
   */
  static getAll(req, res) {
    return res.status(200).send(data);
  }
}