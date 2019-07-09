/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import db from '../database/models';
import Response from './response.utils';
import capitalize from './capitalize.utils';

/**
 * @description Check if parameter provided already exists in the database
 * @param {object} param
 * @param {string} model
 * @param {object} res
 * @param {any} next
 * @returns {any} next
 */
/* istanbul ignore next */
const doParamsExist = async (param, model, res, next) => {
  const paramKey = Object.keys(param);
  const paramValue = Object.values(param);
  const errors = {};

  for (const key of paramKey) {
    for (const value of paramValue) {
      const paramExists = await db[model].findOne({
        where: { [key]: value.trim() },
      });

      if (paramExists) {
        errors[key] = `${[capitalize(key)]} already exists`;
      }
    }
  }
  if (Object.keys(errors).length !== 0) {
    return Response({
      res,
      code: '409',
      data: errors
    });
  }
  return next();
};

/**
 * @description Confirms that user input is not a non-string value or an empty string
 * @param {object} param
 * @param {object} res
 * @param {any} next
 * @returns {any} any
 */
const checkParamsType = (param, res, next) => {
  const errors = {};
  Object.entries(param).map((value) => {
    if (typeof value[1] !== 'string' || value[1].trim() === '') {
      errors[`${value[0]}`] = `Invalid ${value[0]} format`;
    }
    return errors;
  });
  if (Object.keys(errors).length !== 0) {
    return Response({
      res,
      code: '400',
      data: errors
    });
  }
  return next();
};

/**
 * @description Check if parameter provided already exists in the database
 * @param {object} param
 * @param {object} paramObject
 * @returns {any} next
 */
const doesUserExist = async (param, paramObject) => {
  const {
    model, req, res, next
  } = paramObject;
  const paramKey = Object.keys(param);
  const paramValue = Object.values(param);
  const errors = {};
  let paramExists;
  let user;

  for (const key of paramKey) {
    for (const value of paramValue) {
      paramExists = await db[model].findOne({
        where: { [key]: value.trim() },
      });

      if (!paramExists) {
        errors[key] = 'Invalid login credentials';
      } else {
        const {
          id, username, email, isAdmin, password
        } = paramExists.dataValues;
        user = {
          id,
          username,
          email,
          password,
          isAdmin
        };
      }
    }
  }
  if (Object.keys(errors).length !== 0) {
    return Response({
      res,
      code: '400',
      data: errors
    });
  }
  req.user = user;
  return next();
};

export { doParamsExist, checkParamsType, doesUserExist };
