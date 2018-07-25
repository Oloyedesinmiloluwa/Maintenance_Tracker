import { Pool } from 'pg';
import nodemailer from 'nodemailer';
import requestController from './requestController';
import { connectionString } from '../config/config';

const clientPool = new Pool(connectionString);
/**
 * Class representing the controller for admin role in the application.
 */
export default class adminController {
  /**
   * This function is used to send emails
   * @param {Object} userEmail - email address of request creator
   * @param {Object} requestTitle - title of request
   * @param {Object} requestDate - date of request creation
   * @param {Object} requestStatus - status of request
   * @returns {boolean} sentStatus
   */
  static sendMail(userEmail, requestTitle, requestDate, requestStatus) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let status;
    if (
      (arguments.length < 4 || arguments.length > 4) ||
      (!re.test(String(userEmail).toLowerCase())) ||
      (!(requestDate instanceof Date)) ||
      (!(['approved', 'disapproved', 'resolved'].includes(requestStatus)))
    ) {
      return new Promise(a => a)
        .then(() => false);
    }
    switch (requestStatus) {
      case 'approved':
        status = 'Maintenance approval';
        break;
      case 'disapproved':
        status = 'Maintenance disapproval';
        break;
      default:
        status = 'Maintenance resolution';
    }
    const eMailOptions = {
      host: process.env.emailHost,
      port: process.env.emailPort,
      secure: Boolean(process.env.emailSecure),
      requireTLS: Boolean(process.env.emailRequireTLS),
      auth: {
        user: process.env.emailAdd,
        pass: process.env.emailPassword
      }
    };
    const message = {
      from: process.env.emailUserName,
      to: userEmail,
      subject: 'Regarding your maintenance request',
      html: `
      <h1>${status} notification</h1>
      <p>Your maintenance request titled <b>${requestTitle}</b>, which you raised on ${requestDate.toDateString()} has been ${requestStatus}.</p>
      `,
      priority: 'normal'
    };
    const eMailTransporter = nodemailer.createTransport(eMailOptions);
    return eMailTransporter.sendMail(message)
      .then(() => true)
      .catch(() => false);
  }
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
                    clientPool.connect().then(client3 => client3.query({
                      text: 'SELECT requests.title,  requests.dated, requests.status, users.email FROM requests inner join users ON requests.userid = users.id where requests.id = $1',
                      values: [parseInt(req.params.requestId, 10)]
                    }).then((requestData) => {
                      client3.release();
                      const userEmail = requestData.rows[0].email;
                      const requestTitle = requestData.rows[0].title;
                      const requestDate = requestData.rows[0].dated;
                      const requestStatus = requestData.rows[0].status;
                      const sentEmailResponse = adminController.sendMail(userEmail, requestTitle, requestDate, requestStatus);
                      sentEmailResponse
                        .then(info => console.log('Info is: ', info))
                        .catch(error => console.log('Error is: ', error));
                    }));
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
