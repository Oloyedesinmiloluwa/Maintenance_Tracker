import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    req.headers['x-access-token'] = process.env.token;
  }
  return jwt.verify(req.headers['x-access-token'], process.env.secret_key, (error, decoded) => {
    if (error) return res.status(401).send({ message: 'Authentication failed' });
    req.decoded = decoded;
    return next();
  });
};
export default auth;
