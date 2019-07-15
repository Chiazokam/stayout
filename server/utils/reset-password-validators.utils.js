import db from '../database/models';
import CommonValidators from './common-validators.utils';
import JWTUtil from './jwt-sign.utils';
import Response from './response.utils';
import { isPasswordValid } from './password.utils';

const { User } = db;
const { doesUserExist, checkParamsType } = CommonValidators;
const { verifyToken } = JWTUtil;

class ResetPasswordValidators {
  /**
   * @description - Check if user emsil exists
   * @param {object} req
   * @param {object} res
   * @param {any} next
   * @returns {any} any
   */
  static async doesUserEmailExist(req, res, next) {
    const { email } = req.body;
    const paramObject = {
      model: 'User',
      req,
      res,
      next
    };
    doesUserExist(
      { email },
      paramObject
    );
  }

  /**
   * @description - Check if the email is a string
   * @param {object} req
   * @param {object} res
   * @param {any} next
   * @returns {any} any
   */
  static async isUserEmailString(req, res, next) {
    const { email } = req.body;
    checkParamsType(
      { email },
      res,
      next
    );
  }

  /**
   * @description - Check if user from the reset token exists
   * @param {object} req
   * @param {object} res
   * @param {any} next
   * @returns {any} response
   */
  static async doesUserFromTokenExist(req, res, next) {
    const { token } = req.query;
    const { id } = await verifyToken(token, res);
    const paramObject = {
      model: 'User',
      req,
      res,
      next
    };
    doesUserExist(
      { id },
      paramObject
    );
  }

  /**
   * @description - Check if user is trying to re-use the same password
   * @param {object} req
   * @param {object} res
   * @param {any} next
   * @returns {any} response
   */
  static async isPasswordUsed(req, res, next) {
    const { password } = req.body;
    const {
      id, username, email, password: oldPassword
    } = req.user;
    if (isPasswordValid(password, oldPassword)) {
      return Response({
        res,
        code: '400',
        data: { password: 'Looks like you have used this password in the past' }
      });
    }
    req.user = {
      id,
      username,
      email
    };
    return next();
  }

  static async isPasswordReset(req, res, next) {
    const {
      id, username, email, password
    } = req.user;
    const checkuser = await User.findOne({
      where: {
        email,
      }
    });
    const { istokenreset } = checkuser;
    if (istokenreset) {
      return Response({
        res,
        code: '400',
        data: { password: 'Token cannot be re-used' }
      });
    }
    req.user = {
      id,
      username,
      email,
      password
    };
    return next();
  }
}

export default ResetPasswordValidators;
