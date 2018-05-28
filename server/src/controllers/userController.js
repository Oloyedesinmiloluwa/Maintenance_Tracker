import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { connectionString } from '../config/config';

const pool = new Pool(connectionString);
/**
 * Class representing the controller for the application.
 */
export default class userController {
/**
   * This creates a new account for a user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static signUp(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    pool.connect()
      .then((client) => {
        return client.query({ text: 'SELECT email FROM Users WHERE email=$1', values: [req.body.email] })
          .then((requests) => {
            client.release();
            if (requests.rows[0]) {
              if (requests.rows[0].email === req.body.email) return res.status(400).json({ message: 'User already exists' });
            }
            pool.connect()
              .then((client2) => {
                return client2.query({ text:
          'INSERT INTO users (firstname, lastname,email,password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, firstname, lastname, role',
                values: [req.body.firstName, req.body.lastName, req.body.email, hashedPassword, 'user']
                })
                  .then((result) => {
                    client2.release();
                    const {
                      id, email
                    } = result.rows[0];
                    const token = jwt.sign({ id, email }, process.env.secret_key, { expiresIn: '1h' });
                    if (process.env.NODE_ENV === 'test') process.env.token = token;
                    delete result.rows[0].password;
                    return res.status(201).json({ message: 'Successfully created an account', data: result.rows[0], token });
                  })
                  .catch((error) => {
                    client2.release();
                    res.status(500).json(error.stack);
                  });
              })
              .catch((error) => {
                client.release();
                res.status(500).json(error.stack);
              });
          });
      });
  }
  /**
   * This validates the credentials of a user to allow or disallow login.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static login(req, res) {
    pool.connect()
      .then((client) => {
        return client.query({ text: 'SELECT * FROM users WHERE email=$1', values: [req.body.email] })
          .then((result) => {
            client.release();
            if (!result.rows[0]) return res.status(401).json({ message: 'Invalid Email' });
            bcrypt
              .compare(req.body.password, result.rows[0].password)
              .then((response) => {
                if (!response) return res.status(401).json({ message: 'Invalid Password' });
                const {
                  id, email
                } = result.rows[0];
                const token = jwt.sign({ id, email }, process.env.secret_key, { expiresIn: '1h' });
                if (process.env.NODE_ENV === 'test') process.env.token = token;
                delete result.rows[0].password;
                return res.status(201).json({ message: 'Login successful', data: result.rows[0], token });
              })
              .catch(error => res.status(500).json(error));
          })
          .catch((error) => {
            client.release();
            res.status(500).json(error.stack);
          });
      });
  }
}
