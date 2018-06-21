import { Pool } from 'pg';
import { connectionString } from '../config/config';

const clientPool = new Pool(connectionString);

const approveRequestValidator = (req, res, next) => {
  clientPool.connect()
    .then((client) => {
      return client.query('SELECT * FROM requests WHERE id=$1', [parseInt(req.params.requestId, 10)])
        .then((result) => {
          client.release();
          if (!result.rows[0]) return res.status(404).json({ message: 'Request not found' });
          if (result.rows[0].status !== 'pending') return res.status(403).json({ message: 'Request has been acted upon' });
          next();
        })
        .catch((error) => {
          client.release();
          res.status(500).json(error.stack);
        });
    });
};
export default approveRequestValidator;
