import db from '../database/models';
import {
  Response,
  passwordHash,
  generateToken,
  isPasswordValid,
  sendMail,
  baseTemplate,
} from '../utils';
import { authConstants, forgotPasswordMessage, forgotPasswordSubject } from '../constants';

const { User } = db;
const { FRONTEND_URL } = process.env;

class AuthControllers {
  /**
 * @description - Sign up controller
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
  static async signup(req, res) {
    const { email, username, password } = req.body;
    const hash = await passwordHash(password);
    const user = {
      email,
      username,
    };

    const {
      id, isAdmin, createdAt, updatedAt
    } = await User.create({
      ...user,
      password: hash
    });
    const token = await generateToken({ id, isAdmin }, '30d');
    const { subject, message } = authConstants;
    sendMail(email, subject, baseTemplate(`Hi ${username}`, message));
    return Response({
      res,
      code: '201',
      message: 'Successfully signed up user',
      data: {
        token,
        user: {
          id,
          ...user,
          createdAt,
          updatedAt
        }
      },
      type: 'success'
    });
  }


  /**
 * @description - Sign in controller
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
  static async signin(req, res) {
    const { password } = req.body;
    const {
      id, email, username, isAdmin, password: hash
    } = req.user;

    const passwordValid = isPasswordValid(password, hash);
    if (passwordValid) {
      const token = await generateToken({ id, isAdmin }, '30d');
      return Response({
        res,
        code: '200',
        message: 'Successfully signed in',
        data: {
          token,
          user: {
            id,
            email,
            username
          }
        },
        type: 'success'
      });
    }
    return Response({
      res,
      code: '400',
      data: { password: 'Invalid credentials' }
    });
  }

  /**
 * @description - Forgot Password Controller
 * @param {object} req
 * @param {object} res
 * @returns {any} response
 */
  static async forgotPassword(req, res) {
    const { email } = req.body;
    const { id, username, isAdmin } = req.user;

    const token = await generateToken({ id, isAdmin }, '30d');
    sendMail(email, forgotPasswordSubject(), baseTemplate(`Hi ${username}`, forgotPasswordMessage(token, FRONTEND_URL)));
    return Response({
      res,
      code: '200',
      message: 'A reset link has been sent to your email',
      data: {
        user: {
          id,
          email,
          username
        }
      },
      type: 'success'
    });
  }

  /**
 * @description - Reset Password Controller
 * @param {object} req
 * @param {object} res
 * @returns {any} response
 */
  static async resetPassword(req, res) {
    const { password } = req.body;
    const { id, username, email } = req.user;
    const hash = await passwordHash(password);

    const updatePassword = await User.update({
      password: hash,
      istokenreset: true,
    }, {
      where: {
        email,
      },
      returning: true
    });
    return Response({
      res,
      code: '200',
      message: 'Your Password has been reset',
      data: {
        user: {
          id,
          email,
          username,
          createdAt: updatePassword[1][0].dataValues.createdAt,
          updatedAt: updatePassword[1][0].dataValues.updatedAt,
        }
      },
      type: 'success'
    });
  }
}

export default AuthControllers;
