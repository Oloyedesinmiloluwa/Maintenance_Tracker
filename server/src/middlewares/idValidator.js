const idValidator = (req, res, next) => {
  let testId = req.params.requestId;
  if (req.params.userId) testId = req.params.userId;
  const id = parseInt(testId, 10);
  if (!id || id < 0 || id !== Number(testId)) return res.status(400).json({ message: 'Invalid ID' });
  next();
};
export default idValidator;
