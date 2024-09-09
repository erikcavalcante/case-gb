const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '8ac97cb448991606bd31fc6f731061ffcd58a96d9fd877441e1ffc59491d68b0';

exports.generateToken = (user) => {
  const token = jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: '5m' });
  const refreshToken = jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: '7d' });
  return { token, refreshToken };
};

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY);
};

exports.convertJWTtoBasicAuth = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const { username, password } = decoded.user;

    if (!username || !password) {
      throw new Error('Token JWT não contém informações de username e password');
    }

    return Buffer.from(`${username}:${password}`).toString('base64');
  } catch (error) {
    console.error('Erro ao converter JWT para Basic Auth:', error.message);
    return null;
  }
};

exports.verifyAndRefreshToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET_KEY);
    const newToken = jwt.sign({ user: decoded.user }, JWT_SECRET_KEY, { expiresIn: '5m' });
    const newRefreshToken = jwt.sign({ user: decoded.user }, JWT_SECRET_KEY, { expiresIn: '7d' });
    return { token: newToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new Error('Invalid refresh token.');
  }
};
