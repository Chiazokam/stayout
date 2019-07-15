import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import baseUrl from './utils/baseUrl.utils';
import mock from './utils/mock';

chai.use(chaiHttp);

describe('User Sign In', () => {
  it('should successfully sign in an existing user', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({
        ...mock.signin
      });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Successfully signed in');
    expect(res.body.data[0].user.email).to.equal(mock.signin.email);
  });

  it('should not signin a non-existing email', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({
        ...mock.signin,
        email: 'holly@holly.com',
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.email).to.equal('Invalid credentials');
  });

  it('should not signin a non-existing username', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({
        username: 'holly',
        password: 'Mother2019'
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.username).to.equal('Invalid credentials');
  });

  it('should not signin with wrong password', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({
        ...mock.signin,
        password: 'Father2019'
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.password).to.equal('Invalid credentials');
  });
});

describe('User Sign In Validations', () => {
  it('should not signin with no email or username', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({
        password: 'Mother2019'
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.username).to.equal('Invalid username format');
  });

  it('should not signin with no password', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({
        email: 'mother@mother.com',
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.password).to.equal('Invalid password format');
  });

  it('should not signin with incorrect email format', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({
        ...mock.signin,
        email: 'mothermother.com',
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.email).to.equal('Incorrect email format');
  });

  it('should not signin with wrong email type', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({
        ...mock.signin,
        email: 888888,
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.email).to.equal('Invalid email format');
  });

  it('should not signin with wrong password type', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({
        ...mock.signin,
        password: 888888
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.password).to.equal('Invalid password format');
  });
});
