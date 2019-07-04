import db from '../database/models';
import { Response, passwordHash } from '../utils';

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
  return Response({
    res,
    code: '201',
    message: 'Successfully signed up user',
    data: {
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
