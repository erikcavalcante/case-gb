const jwtHelper = require('../utils/jwtHelper');

exports.verifyTokenAndConvertToBasicAuth = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header must use Bearer token' });
  }

  const bearerToken = bearerHeader.split(' ')[1];

  try {
    const authData = jwtHelper.verifyToken(bearerToken);
    const basicAuth = jwtHelper.convertJWTtoBasicAuth(bearerToken);

    if (!basicAuth) {
      return res.status(403).json({ message: 'Failed to convert JWT to Basic Auth' });
    }

    req.basicAuth = basicAuth;
    req.user = authData.user;
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    return res.status(403).json({ message: 'Invalid token' });
  }
};
