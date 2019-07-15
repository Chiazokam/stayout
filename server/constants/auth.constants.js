const authConstants = {
  subject: 'Welcome to Stayout',
  message: `<p>Thanks for signing up on Stayout. <br> Stayout gives you a workspace away from 
            your office for more comfort and flexibility.
            </p>`
};

const forgotPasswordMessage = (token, FRONTEND_URL) => `
    <p>
      You are recieving this mail because you requested a password reset, if not you please ignore.
    </p>
    <p>
    Follow this link to reset your password:
        <a href='${FRONTEND_URL}/auth/reset-password?token=${token}'>reset password</a>
    </p>
    <p>
    <b style = 'color:black;'>Note</b> this link would expire in 15 minutes
    </p>`;

const forgotPasswordSubject = () => 'Password Reset';

export { authConstants, forgotPasswordMessage, forgotPasswordSubject };
