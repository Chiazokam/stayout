import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import baseUrl from './utils/baseUrl.utils';
import mock from './utils/mock';

chai.use(chaiHttp);

describe('User Sign Up', () => {
  it('should successfully sign up a user', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        ...mock.signup
      });
    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal('Successfully signed up user');
    expect(res.body.data[0].user.email).to.equal(mock.signup.email);
  });

  it('should not signup a user with the same email', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        ...mock.signup,
        username: 'new-mock',
        password: 'NewMockPassword19'
      });
    expect(res.status).to.equal(409);
    expect(res.body.errors.email).to.equal('Email already exists');
  });

  it('should not signup a user with the same username', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        ...mock.signup,
        email: 'newdemo@demo.com',
        password: 'NewMockPassword19'
      });
    expect(res.status).to.equal(409);
    expect(res.body.errors.username).to.equal('Username already exists');
  });
});

describe('User Sign Up Validations', () => {
  it('should not signup with no email', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        username: 'new-demo',
        password: 'NewMockPassword19'
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.email).to.equal('Invalid email format');
  });

  it('should not signup with no username', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        email: 'newdemo@demo.com',
        password: 'NewMockPassword19'
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.username).to.equal('Invalid username format');
  });

  it('should not signup with no password', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        email: 'newdemo@demo.com',
        username: 'new-demo'
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.password).to.equal('Invalid password format');
  });

  it('should not signup with incorrect email format', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        ...mock.signup,
        email: 'newdemodemo.com',
        username: 'wrongemail'
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.email).to.equal('Incorrect email format');
  });

  it('should not signup with wrong password strenght', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        email: 'newdemo@demo.com',
        username: 'wrongemail',
        password: 'day'
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.password).to.equal('Password must be alphanumeric');
  });

  it('should not signup with wrong email type', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        ...mock.signup,
        email: 888888,
        username: 'wrongemail'
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.email).to.equal('Invalid email format');
  });

  it('should not signup with wrong username type', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        ...mock.signup,
        email: 'newdemo@demo.com',
        username: 888888
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.username).to.equal('Invalid username format');
  });

  it('should not signup with wrong password type', async () => {
    const res = await chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        ...mock.signup,
        password: 888888
      });
    expect(res.status).to.equal(400);
    expect(res.body.errors.password).to.equal('Invalid password format');
  });
});
