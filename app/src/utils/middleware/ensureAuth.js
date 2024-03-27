module.exports = function ensureAuthenticated(req, res, next) {
    if (req.session.user == undefined) {
      res.redirect('/admin/auth/login');
    } else {
      next();
    }
  };