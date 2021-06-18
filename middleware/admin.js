function admin(req, res, next) {
  // * 401 Unauthorized
  // * 403 Forbidden

  // * this property could isAdmin, roles (array), operations (array), etc...
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
}

module.exports = admin;
