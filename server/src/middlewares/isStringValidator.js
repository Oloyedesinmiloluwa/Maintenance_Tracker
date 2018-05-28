import { isString } from 'util';

const isStringValidator = (req, res) => {
  let flag = false;
  Object.keys(req.body).forEach((key) => {
    if (!isString(req.body[key])) {
      flag = true;
      return res.status(400).json({ message: `Invalid Format for ${key} field` });
    }
  });
  if (flag) return null;
};
export default isStringValidator;
