import { Pool } from 'pg';
import requestController from './requestController';
import { connectionString } from '../config/config';

const clientPool = new Pool(connectionString);
/**
 * Class representing the controller for admin role in the application.
 */
export default class adminController {
  /**
   * This gets all requests
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Array} request
   */
  static getAll(req, res) {
    let queryObject = { text: 'SELECT * FROM Requests' };
    if (req.query.status || req.query.category || req.query.dated) {
      requestController.getAllFilter(req, res);
      return;
    }
    if (req.query.page) {
      req.query.offset = (req.query.page - 1) * req.query.limit;
      queryObject = { text: 'SELECT * FROM Requests OFFSET $1 LIMIT $2', values: [ req.query.offset, req.query.limit] }
    }
    clientPool.connect()
      .then((client) => {
        return client.query(queryObject)
          .then((requests) => {
            client.release();
            res.status(200).json({ data: requests.rows });
          })
          .catch((error) => {
            client.release();
            res.status(500).json(error.stack);
          });
      });
  }
  /**
   * This method modifies request status.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @param {String} requestStatus -Status to set request to
   * @returns {Object} updated request
   */
  static modifyStatus(req, res) {
    clientPool.connect()
      .then((client) => {
        return client.query({ text: 'SELECT * FROM requests WHERE id=$1', values: [parseInt(req.params.requestId, 10)] })
          .then((request) => {
            if (!request.rows[0]) return res.status(404).json({ message: 'Request not found' });
            client.release();
            clientPool.connect()
              .then((client2) => {
                return client2.query({
                  text: 'UPDATE requests SET status=$1 WHERE id=$2 RETURNING *',
                  values: [req.body.status, req.params.requestId]
                })
                  .then((result) => {
                    client2.release();
                    res.status(200).json({ message: `Request ${req.body.status}`, data: result.rows[0] });
                  })
                  .catch((error) => {
                    client2.release();
                    res.status(500).json(error.stack);
                  });
              });
          });
      });
  }
  /**
   * This method makes a user admin.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} user
   */
  static makeAdmin(req, res) {
    clientPool.connect()
      .then((client) => {
        return client.query({ text: 'SELECT * FROM users WHERE id=$1', values: [parseInt(req.params.userId, 10)] })
          .then((users) => {
            if (!users.rows[0]) return res.status(404).json({ message: 'User not found' });
            client.release();
            clientPool.connect()
              .then((client2) => {
                return client2.query({
                  text: 'UPDATE users SET role=$1 WHERE id=$2 RETURNING id, firstname, lastname, email, role',
                  values: ['admin', users.rows[0].id]
                })
                  .then((result) => {
                    client2.release();
                    res.status(200).json({ message: 'User role set to admin', data: result.rows[0] });
                  })
                  .catch((error) => {
                    client2.release();
                    res.status(500).json(error.stack);
                  });
              });
          })
          .catch((error) => {
            client.release();
            res.status(500).json(error.stack);
          });
      });
  }
}
