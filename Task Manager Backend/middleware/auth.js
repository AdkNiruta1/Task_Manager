const jwt = require('jsonwebtoken');

// A secure key. In production, this should be in .env!
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_taskmanager';

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization');

  // Check if token doesn't exist
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token (Bearer <token>)
    const tokenPart = token.split(' ')[1] || token;
    const decoded = jwt.verify(tokenPart, JWT_SECRET);
    
    // Attach user payload to request
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
