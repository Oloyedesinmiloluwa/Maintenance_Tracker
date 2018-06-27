import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import { connectionString } from '../config/config';

const clientPool = new Pool(connectionString);
const checkMail = (req, res, next) => {
  clientPool.connect()
    .then((client) => {
      return client.query({
        text: 'SELECT  id,firstname FROM users where email=$1',
        values: [req.body.email]
      })
        .then((result) => {
          client.release();
          if (!result.rows[0]) return res.status(404).json({ message: 'No account with this email address' });
          const { id, firstname } = result.rows[0];
          req.body.token = jwt.sign({ id, firstname }, process.env.secret_key, { expiresIn: '900s' });
          req.body.firstname = result.rows[0].firstname;
          next();
        })
        .catch((error) => {
          client.release();
          res.status(500).json(error.stack);
        });
    });
};
export default checkMail;
