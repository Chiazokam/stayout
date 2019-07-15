import jwt from 'jsonwebtoken';
import Response from './response.utils';

const { JWT_SECRET } = process.env;

class JWTUtil {
  /**
 * @description - Generates a JWT token
 * @param {object} data
 * @param {string} expires
 * @returns {string} token
 */
  static async generateToken(data, expires) {
    const token = await jwt.sign(data, JWT_SECRET, { expiresIn: expires });
    return token;
  }


  /**
 * @description - Verify token
 * @param {Object} token
 * @param {Object} res
 * @returns {object} decoded
 */
  static async verifyToken(token, res) {
    try {
      const decoded = await jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      return Response({
        res,
        code: '400',
        data: { token: error.message }
      });
    }
  }
}

export default JWTUtil;
