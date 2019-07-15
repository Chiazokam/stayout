import express from 'express';
import {
  signup, signin, forgotPassword, resetPassword
} from '../controllers';
import {
  doSignupParamsExist,
  isEmailValid,
  isPasswordStrong,
  areSignupInputsString,
  areSigninInputsString,
  isSigninEmailValid,
  doesSigninInputExist,
  doesUserEmailExist,
  isUserEmailString,
  doesUserFromTokenExist,
  isPasswordUsed,
  resetToken,
  isPasswordReset
} from '../utils';

const router = express.Router();

router.post('/signup', [areSignupInputsString, isEmailValid, isPasswordStrong, doSignupParamsExist], signup);
router.post('/signin', [areSigninInputsString, isSigninEmailValid, doesSigninInputExist], signin);
router.post('/forgot-password', [isUserEmailString, doesUserEmailExist, resetToken], forgotPassword);
router.put('/reset-password', [isPasswordStrong, doesUserFromTokenExist, isPasswordReset, isPasswordUsed], resetPassword);


export default router;
