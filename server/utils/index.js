import Response from './response.utils';
import { passwordHash, isPasswordValid } from './password.utils';
import SignupValidators from './signup-validators.utils';
import capitalize from './capitalize.utils';
import JWTUtil from './jwt-sign.utils';
import SigninValidators from './signin-validators.utils';
import sendMail from './email.utils';
import baseTemplate from './email-template.utils';
import ResetPasswordValidators from './reset-password-validators.utils';
import resetToken from './reset-token.utils';

const { generateToken } = JWTUtil;
const {
  doesUserEmailExist, isUserEmailString, doesUserFromTokenExist, isPasswordUsed, isPasswordReset
} = ResetPasswordValidators;
const {
  doSignupParamsExist,
  isEmailValid,
  isPasswordStrong,
  areSignupInputsString
} = SignupValidators;
const {
  areSigninInputsString,
  isSigninEmailValid,
  doesSigninInputExist
} = SigninValidators;

export {
  Response,
  passwordHash,
  doSignupParamsExist,
  isEmailValid,
  isPasswordStrong,
  areSignupInputsString,
  capitalize,
  generateToken,
  areSigninInputsString,
  isSigninEmailValid,
  doesSigninInputExist,
  isPasswordValid,
  sendMail,
  baseTemplate,
  doesUserEmailExist,
  isUserEmailString,
  doesUserFromTokenExist,
  isPasswordUsed,
  resetToken,
  isPasswordReset
};
