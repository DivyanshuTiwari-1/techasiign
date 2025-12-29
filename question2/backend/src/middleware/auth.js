const jwt = require('jsonwebtoken');


const authenticate = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No token provided. Please include Bearer token in Authorization header.'
      });
    }
    
    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.substring(7);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Token not found'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    
    // Attach user ID to request object
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired'
      });
    }
    
    return res.status(500).json({
      success: false,
      error: 'Authentication error'
    });
  }
};

module.exports = authenticate;

