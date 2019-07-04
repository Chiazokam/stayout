import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

/**
 * Generates a JWT token
 * @param {object} data
 * @param {string} expires
 * @returns {string} token
 */
const generateToken = async (data, expires) => {
  const token = await jwt.sign(data, JWT_SECRET, { expiresIn: expires });
  return token;
};

export default generateToken;
