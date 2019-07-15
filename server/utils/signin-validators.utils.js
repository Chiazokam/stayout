import CommonValidators from './common-validators.utils';
import SignupValidators from './signup-validators.utils';

const { doesUserExist, checkParamsType } = CommonValidators;
const { isEmailValid } = SignupValidators;

class SigninValidators {
  /**
 * @description - Checks if Sign in inputs are string
 * @param {req} req
 * @param {res} res
 * @param {any} next
 * @returns {any} response
 */
  static async areSigninInputsString(req, res, next) {
    const { email, username, password } = req.body;
    if (email === undefined) {
      checkParamsType(
        { username, password },
        res,
        next
      );
    } else {
      checkParamsType(
        { email, password },
        res,
        next
      );
    }
  }

  /**
 * @description - Checks if the email imput is valid if available
 * @param {req} req
 * @param {res} res
 * @param {any} next
 * @returns {any} response
 */
  static async isSigninEmailValid(req, res, next) {
    const { email } = req.body;
    if (email !== undefined) {
      isEmailValid(req, res, next);
    } else {
      return next();
    }
  }

  /**
 * @description - Checks if the user email or username exists in the database
 * @param {req} req
 * @param {res} res
 * @param {any} next
 * @returns {any} response
 */
  static async doesSigninInputExist(req, res, next) {
    const { username, email } = req.body;
    const paramObject = {
      model: 'User',
      req,
      res,
      next
    };

    if (email === undefined) {
      doesUserExist(
        { username },
        paramObject
      );
    } else {
      doesUserExist(
        { email },
        paramObject
      );
    }
  }
}

export default SigninValidators;
