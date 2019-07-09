import Response from './response.utils';
import { doParamsExist, checkParamsType } from './common-validators.utils';

/**
 * description - Check if email and username exist in database
 * @param {object} req
 * @param {object} res
 * @param {any} next
 * @returns {any} next
 */
const doSignupParamsExist = (req, res, next) => {
  const { username, email } = req.body;
  doParamsExist(
    { username, email },
    'User',
    res,
    next
  );
};

/**
 * description - Check if email format is valid
 * @param {object} req
 * @param {object} res
 * @param {any} next
 * @returns {any} next
 */
const isEmailValid = (req, res, next) => {
  const { email } = req.body;
  if (/\S+@\S+\.\S+/.test(email)) {
    next();
  } else {
    return Response({
      res,
      code: '400',
      data: { email: 'Incorrect email format' }
    });
  }
};

/**
 * description - Check if password is strong
 * @param {object} req
 * @param {object} res
 * @param {any} next
 * @returns {any} next
 */
const isPasswordStrong = (req, res, next) => {
  const { password } = req.body;
  let strength = 0;
  strength += /[A-Z]+/.test(password) ? 1 : 0;
  strength += /[a-z]+/.test(password) ? 1 : 0;
  strength += /[0-9]+/.test(password) ? 1 : 0;
  strength += /[\W]+/.test(password) ? 1 : 0;

  switch (strength) {
    case 3:
      return next();
    case 4:
      return next();
    default:
      return Response({
        res,
        code: '400',
        data: { password: 'Password must be alphanumeric' }
      });
  }
};

/**
 * description - Check if input types are strings
 * @param {object} req
 * @param {object} res
 * @param {any} next
 * @returns {any} next
 */
const areSignupInputsString = (req, res, next) => {
  const { email, username, password } = req.body;
  checkParamsType(
    { email, username, password },
    res,
    next
  );
};

export {
  doSignupParamsExist,
  isEmailValid,
  isPasswordStrong,
  areSignupInputsString
};
