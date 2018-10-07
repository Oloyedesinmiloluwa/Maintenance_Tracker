import { Pool } from 'pg';
import { connectionString } from '../config/config';

const clientPool = new Pool(connectionString);
/**
 * Class representing the controller for the application.
 */
export default class requestController {
  /**
   * This gets all requests
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} requests
   */
  static getAll(req, res) {
    let queryObject = { text: 'SELECT * FROM Requests WHERE userid= $1', values: [req.decoded.id] };
    if (req.query.status || req.query.category || req.query.dated) {
      requestController.getAllFilter(req, res);
      return;
    }
    if (req.query.page) {
      req.query.offset = (req.query.page - 1) * req.query.limit;
      queryObject = { text: 'SELECT * FROM Requests WHERE userid= $1 OFFSET $2 LIMIT $3', values: [req.decoded.id, req.query.offset, req.query.limit] }
    }
    clientPool.connect()
      .then((client) => {
        return client.query(queryObject)
          .then((requests) => {
            client.release();
            if (requests.rows.length === 0) return res.status(200).json({ message: 'You have not made any request yet' });
            res.status(200).json({ data: requests.rows }); })
          .catch((error) => {
            client.release();
            res.status(500).json(error.stack);
          });
      });
  }
  /**
   * This filters requests
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} requests
   */
  static getAllFilter(req, res) {
    const filter = {};
    let queryMessage = '';
    if (!req.query.dated) {
      if (req.query.category) {
        filter.categoryQuery = `category LIKE '${req.query.category}%'`;
        filter.filterQuery = filter.categoryQuery;
        queryMessage = 'in this category';
      }
      if (req.query.status) {
        filter.statusQuery = `status LIKE '${req.query.status}%'`;
        filter.filterQuery = filter.statusQuery;
        queryMessage = 'of this status';
      } 
      if (req.query.status && req.query.category) filter.filterQuery = `${filter.statusQuery} AND ${filter.categoryQuery}`;
      filter.fullQueryObject = { text: `SELECT * FROM Requests WHERE ${filter.filterQuery} AND userid=$1`, values: [req.decoded.id] };
      if (req.decoded.role === 'admin') {
        filter.fullQueryObject = { text: `SELECT * FROM Requests WHERE ${filter.filterQuery}` };
      }
    } else
    {
      filter.fullQueryObject = { text: 'SELECT * FROM Requests WHERE dated >= $1 AND userid=$2', values: [req.query.dated, req.decoded.id] };
      if (req.decoded.role === 'admin') {
        filter.fullQueryObject = { text: 'SELECT * FROM Requests WHERE dated >= $1', values: [req.query.dated] };
      }
    }
    clientPool.connect()
      .then((client) => {
        return client.query(filter.fullQueryObject)
          .then((requests) => {
            client.release();
            if (!requests.rows[0]) return res.status(200).json({ message: `No request ${queryMessage} found`, data: [] });
            res.status(200).json({ data: requests.rows }); })
          .catch((error) => {
            client.release();
            res.status(500).json(error.stack);
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
    clientPool.connect()
      .then((client) => {
        let queryObject = {
          text: 'SELECT * FROM Requests WHERE Id=$1 AND userid=$2',
          values: [parseInt(req.params.requestId, 10), req.decoded.id]
        };
        if (req.decoded.role === 'admin') {
          queryObject = {
            text: 'SELECT * FROM Requests WHERE Id=$1',
            values: [parseInt(req.params.requestId, 10)] };
        }
        return client.query(queryObject)
          .then((requests) => {
            if (!requests.rows[0]) return res.status(404).json({ message: 'Request not found' });
            client.release();
            res.status(200).json({ data: requests.rows[0] });
          })
          .catch((error) => {
            client.release();
            res.status(500).json(error.stack);
          });
      });
  }
  /**
   * This uploads a request image to local.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Image with success message or failure message
   */
  static uploadToLocal(req, res) {
    if (req.files) {
      req.files.request.mv('./vanilla/assets/image/request.jpg', (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ data: req.files.request, message: 'File uploaded!' });
      }); }
    else res.status(400).json({ message: 'No image found' });
  }
  /**
   * This adds a request to the database.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} added request
   */
  static addRequest(req, res) {
    if (req.body.category) req.body.category = req.body.category.toLowerCase();
    const dateToday = new Date();
    clientPool.connect()
      .then((client1) => {
        return client1.query({ text: 'SELECT description FROM requests WHERE description=$1 AND status=$2', values: [req.body.description, 'pending'] })
          .then((requests) => {
            client1.release();
            if (!requests.rows[0]) {
              clientPool.connect()
                .then((client) => {
                  return client.query({ text:
                  'INSERT INTO Requests(title,description, category, image, status, dated, userid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                  values: [req.body.title, req.body.description, req.body.category, req.body.image,
                    'pending', dateToday.toLocaleDateString(), req.decoded.id]
                  })
                    .then((results) => {
                      client.release();
                      res.status(201).json({ message: 'Request Added Successfully', data: results.rows[0] });
                    })
                    .catch((error) => {
                      client.release();
                      res.status(500).json(error.stack);
                    });
                });
            } else return res.status(200).json({ message: 'Request already exists' });
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
    const { selectedRequest } = req.body;
    clientPool.connect()
      .then((client) => {
        Object.keys(req.body).forEach((key) => {
          if (req.body[key]) selectedRequest[key] = req.body[key];
        });
        return client.query({ text:
          'UPDATE Requests SET title=$1,description=$2, category=$3, image=$4 WHERE id=$5 RETURNING *',
        values: [selectedRequest.title, selectedRequest.description,
          selectedRequest.category, selectedRequest.image,
          parseInt(req.params.requestId, 10)]
        })
          .then((result) => {
            client.release();
            res.status(200).json({ message: 'Request Updated Successfully', data: result.rows[0] });
          })
          .catch((error) => {
            client.release();
            res.status(500).json(error.stack);
          });
      });
  }
  /**
   * This deletes a request from database.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} success or failure message
   */
  static deleteRequest(req, res) {
    clientPool.connect()
      .then((client) => {
        const queryObject = {
          text: 'DELETE FROM Requests WHERE Id=$1 AND userid=$2',
          values: [parseInt(req.params.requestId, 10), req.decoded.id]
        };
        return client.query(queryObject)
          .then((response) => {
            if (response.rowCount !== 1) return res.status(404).json({ message: 'Request does not exist' });
            client.release();
            res.status(200).json({ message: 'Request successfully deleted' });
          })
          .catch((error) => {
            client.release();
            res.status(500).json(error.stack);
          });
      });
  }
}
