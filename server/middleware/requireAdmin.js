const requireAdmin = (req, res, next) => {
  if (req.user && req.user.is_admin === true) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
};

module.exports = requireAdmin;
