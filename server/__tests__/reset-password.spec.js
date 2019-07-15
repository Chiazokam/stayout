import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import baseUrl from './utils/baseUrl.utils';
import mock from './utils/mock';

chai.use(chaiHttp);

describe('Forgot Password', () => {
  it('should successfully send reset link to email', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/forgot-password`)
      .send({
        email: 'fiona@fiona.com'
      });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('A reset link has been sent to your email');
  });
});

describe('Reset Password', () => {
  let token;

  before(async () => {
    // eslint-disable-next-line prefer-destructuring
    token = (await chai
      .request(app)
      .post(`${baseUrl}/auth/signin`)
      .send(mock.signin2)).body.data[0].token;
  });

  it('should successfully reset a users password', async () => {
    const res = await chai
      .request(app)
      .put(`${baseUrl}/auth/reset-password?token=${token}`)
      .send({
        password: 'NewMcdonald2019'
      });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Your Password has been reset');
  });

  it('should not re-use a used token', async () => {
    const res = await chai
      .request(app)
      .put(`${baseUrl}/auth/reset-password?token=${token}`)
      .send({
        password: 'NewPassword123'
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.password).to.equal('Token cannot be re-used');
  });
});
