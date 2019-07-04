import db from '../database/models';
import {
  Response,
  passwordHash,
  generateToken
} from '../utils';

const { User } = db;

const signup = async (req, res) => {
  const { email, username, password } = req.body;
  const hash = await passwordHash(password);
  const user = {
    email,
    username,
  };

  const { id, createdAt, updatedAt } = await User.create({
    ...user,
    password: hash
  });
  const token = await generateToken({ id }, '30d');
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

export default signup;
