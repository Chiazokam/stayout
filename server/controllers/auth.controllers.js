import db from '../database/models';
import {
  Response,
  passwordHash,
  generateToken,
  isPasswordValid
} from '../utils';

const { User } = db;

/**
 * @description - Sign up controller
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
const signup = async (req, res) => {
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
};

/**
 * @description - Sign in controller
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
const signin = async (req, res) => {
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
    data: { password: 'Invalid login credentials' }
  });
};

export { signup, signin };
