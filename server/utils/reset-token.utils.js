import db from '../database/models';

const { User } = db;

/**
   * @description - Reset token flag in database to false
   * @param {object} req
   * @param {object} res
   * @param {any} next
   * @returns {any} response
   */
const resetToken = (req, res, next) => {
  const {
    id, username, email, isAdmin
  } = req.user;
  const reset = User.update({
    istokenreset: false,
  }, {
    where: {
      email,
    }
  });
  req.user = {
    id,
    username,
    isAdmin
  };
  return next();
};

export default resetToken;
