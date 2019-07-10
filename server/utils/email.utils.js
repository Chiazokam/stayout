import nodemailer from 'nodemailer';

const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${EMAIL_ADDRESS}`,
    pass: `${EMAIL_PASSWORD}`
  }
});

/**
 * @description - Sends mail
 * @param {string} to
 * @param {string} subject
 * @param {string} html
 * @returns {any} response
 */
const sendMail = async (to, subject, html) => {
  const mail = {
    from: `Stayout.com <${EMAIL_ADDRESS}>`,
    to,
    subject,
    html
  };

  let response = {};
  try {
    response = await transporter.sendMail(mail);
    response.status = 'success';
  } catch (error) {
    response.status = 'failure';
    response.message = error.message;
  }
  return response;
};

export default sendMail;
