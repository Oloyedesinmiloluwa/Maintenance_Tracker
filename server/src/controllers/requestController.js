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
   * @returns {Array} request
   */
  static getAll(req, res) {
    let filter = {};
    let presentQuery = '';
    if (req.query.category) {
      filter.categoryQuery = `category LIKE '${req.query.category}%'`;
      filter.fullQuery = filter.categoryQuery;
      presentQuery = 'in this category';
    }
    if (req.query.status) {
      filter.statusQuery = `status LIKE '${req.query.status}%'`;
      filter.fullQuery = filter.statusQuery;
      presentQuery = 'of this status';
    }
    if (req.query.status || req.query.category) {
      if (req.query.status && req.query.category) filter.fullQuery = `${filter.statusQuery} AND ${filter.categoryQuery}`;
      clientPool.connect()
        .then((client) => {
          return client.query(`SELECT * FROM Requests WHERE ${filter.fullQuery} AND userid=$1`, [req.decoded.id])
            .then((requests) => {
              client.release();
              if (!requests.rows[0]) return res.status(200).json({ message: `No request ${presentQuery} found` });
              res.status(200).json({ data: requests.rows }); })
            .catch((error) => {
              client.release();
              res.status(500).json(error.stack);
            });
        });
      return;
    }
    clientPool.connect()
      .then((client) => {
        return client.query({ text: 'SELECT * FROM Requests WHERE userid= $1', values: [req.decoded.id] })
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
   * This method gets a single request.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} request
   */
  static getARequest(req, res) {
    clientPool.connect()
      .then((client) => {
        return client.query({ text: 'SELECT * FROM Requests WHERE Id=$1 AND userid=$2', values: [parseInt(req.params.requestId, 10), req.decoded.id] })
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
        return client1.query({ text: 'SELECT description FROM requests WHERE description=$1', values: [req.body.description] })
          .then((requests) => {
            client1.release();
            if (!requests.rows[0]) {
              clientPool.connect()
                .then((client) => {
                  return client.query({ text:
                  'INSERT INTO Requests(title,description, category, image, status, dated, userid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                  values: [req.body.title, req.body.description, req.body.category, req.body.image,
                    'pending', dateToday, req.decoded.id]
                  })
                    .then((results) => {
                      client.release();
                      res.status(201).json({ message: 'Request Added Successfully', data: results.rows[0]});
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
    clientPool.connect()
      .then((client) => {
        return client.query({ text: 'SELECT * FROM Requests WHERE Id=$1', values: [parseInt(req.params.requestId, 10)] })
          .then((requests) => {
            if (!requests.rows[0]) return res.status(404).json({ message: 'Request not found' });
            client.release();
            const [selectedRequest] = requests.rows;
            if (selectedRequest.status === 'approved') return res.status(403).json({ message: 'Request is already approved' });
            if (req.decoded.id !== selectedRequest.userid) return res.status(403).json({ message: 'You are not the author of this request' });
            clientPool.connect()
              .then((client2) => {
                Object.keys(req.body).forEach((key) => {
                  if (req.body[key]) selectedRequest[key] = req.body[key];
                });
                return client2.query({ text:
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
          })
          .catch((error) => {
            client.release();
            res.status(500).json(error.stack);
          });
      });
  }
}
