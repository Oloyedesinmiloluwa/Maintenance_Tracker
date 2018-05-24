import { Pool } from 'pg';
import config from '../config/config';

const env = process.env.NODE_ENV || 'development';
let conString;
if (env === 'production') conString = { connectionString: config[env].use_env_variable };
else conString = config[env];
const pool = new Pool(conString);
/**
 * Class representing the controller for admin role in the application.
 */
export default class requestController {
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
                    client.release();
                    res.status(400).json(error.stack);
                  });
              });
          })
          .catch((error) => {
            client.release();
            res.status(400).json(error.stack);
          });
      });
  }
}
