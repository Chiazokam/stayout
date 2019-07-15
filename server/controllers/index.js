import AuthControllers from './auth.controllers';

const {
  signin, signup, forgotPassword, resetPassword
} = AuthControllers;

export {
  signup, signin, forgotPassword, resetPassword
};
