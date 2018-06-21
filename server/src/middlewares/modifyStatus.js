const approveStatus = (req, res, next) => {
  req.body.status = 'approved';
  next();
}
const disapproveStatus = (req, res, next) => {
  req.body.status = 'disapproved';
  next();
}
const resolveStatus = (req, res, next) => {
  req.body.status = 'resolved';
  next();
}
export { approveStatus, disapproveStatus, resolveStatus };
