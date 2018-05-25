import { Pool } from 'pg';
import config from '../config/config';


let conString;
const env = process.env.NODE_ENV || 'development';
if (env === 'production') conString = { connectionString: process.env.DATABASE_URL, ssl: true };
else conString = config[env];
const pool = new Pool(conString);
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
    let flag = false;
    pool.connect()
      .then((client) => {
        return client.query('SELECT * FROM users WHERE role=$1', ['admin'])
          .then((users) => {
            client.release();
            users.rows.forEach((user) => {
              if (user.email === req.decoded.email) flag = true;
            });
            if (!flag) return res.status(403).json({ message: 'You are not an admin' });
            pool.connect()
              .then((client2) => {
                return client2.query('SELECT * FROM Requests')
                  .then((requests) => {
                    client2.release();
                    res.status(200).json(requests.rows); })
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
  /**
   * This method modifies request status.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @param {String} requestStatus -Status to set request to
   * @returns {Object} updated request
   */
  static modifyStatus(req, res, requestStatus) {
    pool.connect()
      .then((client) => {
        return client.query({ text: 'SELECT * FROM requests WHERE id=$1', values: [parseInt(req.params.requestId, 10)] })
          .then((request) => {
            if (!request.rows[0]) return res.status(404).json({ message: 'Request not found' });
            client.release();
            pool.connect()
              .then((client2) => {
                return client2.query({
                  text: 'UPDATE requests SET status=$1 WHERE id=$2 RETURNING *',
                  values: [requestStatus, req.params.requestId]
                })
                  .then((result) => {
                    client2.release();
                    res.status(200).json({ message: `Request ${requestStatus}`, data: result.rows[0] });
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
  /**
   * This method approves a request when called by an admin.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} user
   */
  static approveRequest(req, res) {
    const requestStatus = 'approved';
    adminController.verifyIfAdmin(req, res, requestStatus);
  }
  /**
   * This method disapproves a request when called by an admin.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} user
   */
  static disapproveRequest(req, res) {
    const requestStatus = 'disapproved';
    adminController.verifyIfAdmin(req, res, requestStatus);
  }
  /**
   * This method approves a request when called by an admin.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} user
   */
  static resolveRequest(req, res) {
    const requestStatus = 'resolved';
    adminController.verifyIfAdmin(req, res, requestStatus);
  }
  /**
   * This method verifies if a user is admin.
   * @param {Object} req - client request Object
   * @param {Object} res - server response Object
   * @param {String} requestStatus - new status of request
   * @returns {Object} nothing
   */
  static verifyIfAdmin(req, res, requestStatus) {
    let flag = false;
    pool.connect()
      .then((client) => {
        return client.query('SELECT * FROM requests WHERE id=$1', [parseInt(req.params.requestId, 10)])
          .then((result) => {
            client.release();
            if (!result.rows[0]) return res.status(404).json({ message: 'Request not found' });
            if (requestStatus === 'approved') {
              if (result.rows[0].status !== 'pending') return res.status(403).json({ message: 'Request has been acted upon' });
            }
            pool.connect()
              .then((client1) => {
                return client1.query('SELECT * FROM users WHERE role=$1', ['admin'])
                  .then((users) => {
                    client1.release();
                    users.rows.forEach((user) => {
                      if (user.email === req.decoded.email) flag = true;
                    });
                    if (!flag) return res.status(403).json({ message: 'You are not an admin' });
                    adminController.modifyStatus(req, res, requestStatus);
                  })
                  .catch(() => {
                    client1.release();
                  });
              });
          })
          .catch((error) => {
            client.release();
            res.status(500).json(error.stack);
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
    if (req.decoded.id !== 1) return res.status(403).json({ message: 'You are not an admin' });
    pool.connect()
      .then((client) => {
        return client.query({ text: 'SELECT * FROM users WHERE id=$1', values: [parseInt(req.params.userId, 10)] })
          .then((users) => {
            if (!users.rows[0]) return res.status(404).json({ message: 'User not found' });
            client.release();
            pool.connect()
              .then((client2) => {
                return client2.query({
                  text: 'UPDATE users SET role=$1 WHERE id=$2 RETURNING id, firstname, lastname, email, role',
                  values: ['admin', users.rows[0].id]
                })
                  .then((result) => {
                    client.release();
                    res.status(200).json({ message: 'User role set to admin', data: result.rows[0] });
                  })
                  .catch((error) => {
                    client.release();
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
