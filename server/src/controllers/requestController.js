import validator from 'validator';
import data from '../model/data';

/**
 * Class representing the controller for the application.
 */
export default class requestController {
  /**
   * This selects a particular request from database when called withing other methods.
   * @param {Object} req - The client request object.
   * @param {Object} res - The server response object
   * @returns {Object} The selected request
   */
  static selectRequest(req, res) {
    const id = requestController.formatParamId(req);
    if (!id || id < 0 || id !== Number(req.params.requestId)) return res.status(400).json({ message: 'Invalid ID' });
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
    if (req.query.status) {
      req.query.status = req.query.status.toLowerCase();
      req.query.status = validator.trim(req.query.status);
      const filteredData = data.filter(request => request.status === req.query.status);
      return res.status(200).send(filteredData);
    }
    return res.status(200).json(data);
  }
  /**
   * This method gets a single request.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} request
   */
  static getARequest(req, res) {
    if (requestController.selectRequest(req, res) === null) return res.status(404).json({ message: 'Invalid ID' });
    res.status(200).json(requestController.selectRequest(req, res));
  }

  /**
   * This method create a request.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} request
   */
  static addRequest(req, res) {
    if (req.body.category) req.body.category = req.body.category.toLowerCase();
    const request = {
      id: data[data.length - 1].id + 1,
      title: req.body.title,
      description: req.body.description,
      status: 'new',
      category: req.body.category,
      date: req.body.date,
      image: req.body.image
    };
    data.push(request);
    res.status(200).json(request);
  }
  /**
   * This updates an existing request
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} updated request
   */
  static modifyRequest(req, res) {
    if (requestController.selectRequest(req, res) === null) return res.status(404).json({ message: 'Invalid ID' });
    const item = requestController.selectRequest(req, res);
    Object.keys(item).forEach((property) => {
      item[property] = req.body[property] || item[property];
    });
    res.status(200).json(item);
  }
}
