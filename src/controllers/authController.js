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
