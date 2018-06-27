import { isString } from 'util';

const isStringValidator = (req, res) => {
  let error = false;
  Object.keys(req.body).forEach((key) => {
    if (!isString(req.body[key])) {
      error = true;
      return res.status(400).json({ message: `Invalid Format for ${key} field` });
    }
  });
  if (error) return true;
};
export default isStringValidator;
