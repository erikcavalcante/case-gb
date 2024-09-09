const jwtHelper = require('../utils/jwtHelper');

exports.authenticate = (req, res) => {
  const { user, password } = req.body;
  if (user && password) {
    const tokens = jwtHelper.generateToken({ username: user, password });
    res.json(tokens);
  } else {
    res.status(401).json({ message: 'Credentials are required.' });
  }
};

exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is required.' });
  }

  try {
    const newToken = jwtHelper.verifyAndRefreshToken(refreshToken);
    res.json(newToken);
  } catch (error) {
    res.status(403).json({ message: 'Invalid refresh token.' });
  }
};