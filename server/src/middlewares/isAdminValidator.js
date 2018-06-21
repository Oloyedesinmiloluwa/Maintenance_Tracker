export const isAdminValidator = (req, res, next) => {
  if (req.decoded.role !== 'admin') return res.status(403).json({ message: 'You are not an admin' });
  next();
};
export const isSuperAdminValidator = (req, res, next) => {
  if (req.decoded.id !== 1) return res.status(403).json({ message: 'You are not super admin' });
  next();
};

