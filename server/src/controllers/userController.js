import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import config from '../config/config';

const env = process.env.NODE_ENV || 'development';
const pool = new Pool(config[env]);
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
        return client.query({ text:
          'INSERT INTO users (firstname, lastname,email,password) VALUES ($1, $2, $3, $4) RETURNING id',
        values: [req.body.firstName, req.body.lastName, req.body.email, hashedPassword]
        })
          .then((userId) => {
            client.release();
            const {
              id
            } = userId;
            const token = jwt.sign({ id }, process.env.secret_key, { expiresIn: '1h' });
            if (process.env.NODE_ENV === 'test') process.env.token = token;
            return res.status(201).json({ message: 'Successfully created an account', token });
          })
          .catch((error) => {
            client.release();
            res.status(500).json(error.stack);
          });
      });
  }
}
