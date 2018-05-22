import validator from 'validator';
import { Pool } from 'pg';
import config from '../config/config';

const env = process.env.NODE_ENV || 'development';
const pool = new Pool(config[env]);
/**
 * Class representing the controller for the application.
 */
export default class requestController {
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
      pool.connect()
        .then((client) => {
          return client.query({ text: 'SELECT * FROM Requests WHERE status=$1', values: [req.query.status] })
            .then((requests) => {
              client.release();
              res.status(200).json(requests.rows); })
            .catch((error) => {
              client.release();
              res.status(400).json(error.stack);
            });
        });
    }
    pool.connect()
      .then((client) => {
        return client.query({ text: 'SELECT * FROM Requests WHERE status=$1', values: [req.query.status] })
          .then((requests) => {
            client.release();
            res.status(200).json(requests.rows); })
          .catch((error) => {
            client.release();
            res.status(400).json(error.stack);
          });
      });
  }
}
