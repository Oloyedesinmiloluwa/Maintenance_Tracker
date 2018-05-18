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
  static selectRequest(req) {
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
  /**
   * This method gets a single request.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} request
   */
  static getARequest (req, res) {
    if (requestController.selectRequest(req) === null) return res.status(404).send({ message: 'Invalid ID' });
    res.status(200).send(requestController.selectRequest(req));
  }
}