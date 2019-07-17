import db from '../database/models';
import {
  passwordHash,
  generateToken,
} from '../utils';

const { User } = db;
const { FRONTEND_URL } = process.env;

class SocialControllers {
  /**
   * @description Gets profile from social service
   * @param {string} accessToken
   * @param {string} refreshToken
   * @param {object} profile
   * @param {function} done
   * @returns {object} User Profile Object
   */

  static async socialCallback(accessToken, refreshToken, profile, done) {
    const {
      id,
      displayName,
      emails,
      provider,
    } = profile;

    if (!emails) {
      const userWithNoEmail = { noEmail: true };
      return done(null, userWithNoEmail);
    }

    const email = emails[0].value;
    const names = displayName.split(' ');
    const username = `${names[0]}_${id}`;
    const hash = await passwordHash(username);

    const [user] = await User.findOrCreate({
      where: { email },
      defaults: {
        password: hash,
        email,
        social: provider,
        username
      },
    });
    return done(null, user.dataValues);
  }

  /**
   * @description Redirects user to the frontend
   * @param {object} req
   * @param {object} res
   * @returns {string} - Frontend url
   */
  static async socialRedirect(req, res) {
    if (req.user.noEmail) {
      return res.redirect(`${FRONTEND_URL}/auth/social?error=${400}`);
    }

    const {
      id, email, username, isAdmin
    } = req.user;
    const token = await generateToken({
      id,
      isAdmin
    }, '30d');
    return res.redirect(`${FRONTEND_URL}/auth/social?token=${token}&id=${id}&username=${username}&email=${email}`);
  }
}

export default SocialControllers;
