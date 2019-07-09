import { doesUserExist, checkParamsType } from './common-validators.utils';
import { isEmailValid } from './signup-validators.utils';

/**
 * @description - Checks if Sign in inputs are string
 * @param {req} req
 * @param {res} res
 * @param {any} next
 * @returns {any} response
 */
const areSigninInputsString = (req, res, next) => {
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
};

/**
 * @description - Checks if the email imput is valid if available
 * @param {req} req
 * @param {res} res
 * @param {any} next
 * @returns {any} response
 */
const isSigninEmailValid = (req, res, next) => {
  const { email } = req.body;
  if (email !== undefined) {
    isEmailValid(req, res, next);
  } else {
    return next();
  }
};

/**
 * @description - Checks if the user email or username exists in the database
 * @param {req} req
 * @param {res} res
 * @param {any} next
 * @returns {any} response
 */
const doesSigninInputExist = (req, res, next) => {
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
};

export { areSigninInputsString, isSigninEmailValid, doesSigninInputExist };
