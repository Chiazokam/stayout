import express from 'express';
import { signup, signin } from '../controllers';
import {
  doSignupParamsExist,
  isEmailValid,
  isPasswordStrong,
  areSignupInputsString,
  areSigninInputsString,
  isSigninEmailValid,
  doesSigninInputExist,
} from '../utils';

const router = express.Router();

router.post('/signup', [areSignupInputsString, isEmailValid, isPasswordStrong, doSignupParamsExist], signup);
router.post('/signin', [areSigninInputsString, isSigninEmailValid, doesSigninInputExist], signin);


export default router;
