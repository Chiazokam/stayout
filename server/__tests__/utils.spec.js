import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { capitalize, generateToken, sendMail } from '../utils';
import baseUrl from './utils/baseUrl.utils';
import mock from './utils/mock';

chai.use(chaiHttp);

describe('Test the default route', () => {
  it('it should get the default route', async () => {
    const res = await chai
      .request(app)
      .get(`${baseUrl}/default`);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Welcome to Stayout.com');
  });
});

describe('Test capitalize function', () => {
  it('should capitalize the input parameter', async () => {
    const capitalized = capitalize('hello');
    expect(capitalized).to.equal('Hello');
  });

  it('should return an empty string for non-strings', async () => {
    const capitalized = capitalize(888);
    expect(capitalized).to.equal('');
  });
});

describe('Token Tests', () => {
  it('should generate a token for a user', async () => {
    const token = await generateToken({
      id: '88e98c51-14c1-4fb8-8748-3935940d5189',
      isAdmin: false
    }, '30d');
    expect(token).to.be.a('string');
  });
});

describe('Email Tests', () => {
  it('should successfully send email', async () => {
    const response = await sendMail(
      mock.signup.email,
      `Hi ${mock.signup.username}`,
      '<h1>Welcome to Stayout</h1>'
    );
    expect(response.accepted).to.be.an('array');
    expect(response.accepted[0]).to.equal(mock.signup.email);
  });

  it('should fail to send email', async () => {
    const response = await sendMail(
      'aaa',
      `Hi ${mock.signup.username}`,
      '<h1>Welcome to Stayout</h1>'
    );
    expect(response.status).to.equal('failure');
    expect(response.message).to.equal('No recipients defined');
  });
});
