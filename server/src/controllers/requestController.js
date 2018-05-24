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
          return client.query('SELECT * FROM Requests WHERE status=$1 AND userid=$2', [req.query.status, req.decoded.id])
            .then((requests) => {
              client.release();
              res.status(200).json(requests.rows); })
            .catch((error) => {
              client.release();
              res.status(400).json(error.stack);
            });
        });
      return;
    }
    pool.connect()
      .then((client) => {
        return client.query({ text: 'SELECT * FROM Requests WHERE userid= $1', values: [req.decoded.id] })
          .then((requests) => {
            client.release();
            res.status(200).json(requests.rows); })
          .catch((error) => {
            client.release();
            res.status(400).json(error.stack);
          });
      });
  }

  /**
   * This method gets a single request.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} request
   */
  static getARequest(req, res) {
    const id = parseInt(req.params.requestId, 10);
    if (!id || id < 0 || id !== Number(req.params.requestId)) return res.status(400).json({ message: 'Invalid ID' });
    pool.connect()
      .then((client) => {
        return client.query({ text: 'SELECT * FROM Requests WHERE Id=$1 AND userid=$2', values: [parseInt(req.params.requestId, 10), req.decoded.id] })
          .then((requests) => {
            if (!requests.rows[0]) return res.status(404).json({ message: 'Request not found' });
            client.release();
            res.status(200).json(requests.rows[0]); })
          .catch((error) => {
            client.release();
            res.status(400).json(error.stack);
          });
      });
  }
  /**
   * This adds a request to the database.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} added request
   */
  static addRequest(req, res) {
    if (req.body.category) req.body.category = req.body.category.toLowerCase();
    pool.connect()
      .then((client) => {
        return client.query({ text:
          'INSERT INTO Requests(title,description, category, image, status, dated, userid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        values: [req.body.title, req.body.description, req.body.category, req.body.image,
          'pending', req.body.dated, req.decoded.id]
        })
          .then((results) => {
            client.release();
            res.status(201).json({ message: 'Request Added Successfully', Data: results.rows[0]});
          })
          .catch((error) => {
            client.release();
            res.status(400).json(error.stack);
          });
      });
  }
  /**
   * This updates an existing request
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} updated request
   */
  static modifyRequest(req, res) {
    pool.connect()
      .then((client) => {
        return client.query({ text: 'SELECT * FROM Requests WHERE Id=$1', values: [parseInt(req.params.requestId, 10)] })
          .then((requests) => {
            if (!requests.rows[0]) return res.status(404).json({ message: 'Request not found' });
            client.release();
            const [selectedRequest] = requests.rows;
            if (selectedRequest.status === 'approved') return res.status(403).json({ message: 'Request is already approved' });
            if (req.decoded.id !== selectedRequest.userid) return res.status(403).json({ message: 'You are not the author of this request' });
            pool.connect()
              .then((client2) => {
                Object.keys(req.body).forEach((key) => {
                  if (req.body[key]) selectedRequest[key] = req.body[key];
                });
                return client2.query({ text:
          'UPDATE Requests SET title=$1,description=$2, category=$3, image=$4, status=$5, dated=$6 WHERE id=$7 RETURNING *',
                values: [selectedRequest.title, selectedRequest.description, selectedRequest.category, selectedRequest.image,
                  selectedRequest.status, selectedRequest.dated, parseInt(req.params.requestId, 10)]
                })
                  .then((result) => {
                    client.release();
                    res.status(201).json({ message: 'Request Updated Successfully', data: result.rows[0] });
                  })
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
