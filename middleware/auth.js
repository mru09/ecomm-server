const jwt = require('jsonwebtoken');
//auth controller
exports.verifySeller = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, seller) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.seller = seller;
    next();
  });
};