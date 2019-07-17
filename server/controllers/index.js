import AuthControllers from './auth.controllers';
import SocialControllers from './social.controllers';

const {
  signin, signup, forgotPassword, resetPassword
} = AuthControllers;
const { socialCallback, socialRedirect } = SocialControllers;

export {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  socialCallback,
  socialRedirect
};
