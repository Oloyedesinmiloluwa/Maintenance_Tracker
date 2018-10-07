import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mailer from 'nodemailer';
import { Pool } from 'pg';
import { connectionString } from '../config/config';

const clientPool = new Pool(connectionString);
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
    clientPool.connect()
      .then((client) => {
        return client.query({ text: 'SELECT email FROM Users WHERE email=$1', values: [req.body.email] })
          .then((requests) => {
            client.release();
            if (requests.rows[0]) {
              if (requests.rows[0].email === req.body.email) return res.status(200).json({ message: 'User already exists' });
            }
            clientPool.connect()
              .then((client2) => {
                return client2.query({ text:
          'INSERT INTO users (firstname, lastname,email,password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, firstname, lastname, role',
                values: [req.body.firstName, req.body.lastName, req.body.email, hashedPassword, 'user']
                })
                  .then((result) => {
                    client2.release();
                    const {
                      id, email, role, firstname, lastname
                    } = result.rows[0];
                    const token = jwt.sign({ id, email, role, firstname, lastname }, process.env.secret_key, { expiresIn: '24h' });
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
    clientPool.connect()
      .then((client) => {
        return client.query({ text: 'SELECT * FROM users WHERE email=$1', values: [req.body.email] })
          .then((result) => {
            client.release();
            if (!result.rows[0]) return res.status(401).json({ message: 'No account with this email address' });
            bcrypt
              .compare(req.body.password, result.rows[0].password)
              .then((response) => {
                if (!response) return res.status(401).json({ message: 'Invalid Password' });
                const {
                  id, email, role, firstname, lastname
                } = result.rows[0];
                const token = jwt.sign({ id, email, role, firstname, lastname }, process.env.secret_key, { expiresIn: '24h' });
                if (process.env.NODE_ENV === 'test') process.env.token = token;
                delete result.rows[0].password;
                return res.status(200).json({ message: 'Login successful', data: result.rows[0], token });
              })
              .catch(error => res.status(500).json(error));
          })
          .catch((error) => {
            client.release();
            res.status(500).json(error.stack);
          });
      });
  }
  /**
   * Sends user email so as to recover password.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static sendEmail(req, res) {
    const mailOptions = {
      from: 'sinmi.mtracker@gmail.com',
      to: req.body.email,
      subject: 'Password reset M-tracker.com',
      html: `<p>Hello ${req.body.firstname}</p><p> You can reset your password by clicking this <a href='${req.body.baseUrl}/resetpassword.html?token=${req.body.token}'>link</a>. If you did not request to reset your password, please ignore this email. However, it may mean someone is trying to steal your password on our site</p>`
    };

    const transport = mailer.createTransport({
      host: 'smtp.gmail.com', 
      secure: true,
      port: 465,
      auth: {
        user: process.env.emailAdd,
        pass: process.env.emailPassword,
      },
      transportMethod: 'SMTP',
      tls: {
        rejectUnauthorized: false
      }
    });
    transport.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).json({ message: 'Email failed to send', error });
      }
      res.status(200).json({ message: 'Email sent successfully' });
    });
  };
  /**
   * This resets user's password.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static resetPassword(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    clientPool.connect()
      .then((client) => {
        return client.query({ text:
          'UPDATE users SET password=$1 WHERE id=$2 AND firstname =$3  RETURNING *',
        values: [hashedPassword, req.decoded.id, req.decoded.firstname]
        })
          .then((result) => {
            client.release();
            if (!result.rows[0]) res.status(400).json({ message: 'Password reset failed' });
            res.status(200).json({ message: 'Password reset successful' });
          })
          .catch((error) => {
            client.release();
            res.status(500).json(error.stack);
          });
      });
  }
}
