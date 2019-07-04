import express from 'express';
import signup from '../controllers';
import {
  doUserParamsExist,
  isEmailValid,
  isPasswordStrong,
  areParamTypesValid
} from '../utils';

const router = express.Router();

router.post('/signup', [areParamTypesValid, isEmailValid, isPasswordStrong, doUserParamsExist], signup);

export default router;
