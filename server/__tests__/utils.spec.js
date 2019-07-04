import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { capitalize } from '../utils';
import baseUrl from './utils/baseUrl.utils';

chai.use(chaiHttp);

describe('Test general utils', () => {
  it('it should get the default route', async () => {
    const res = await chai
      .request(app)
      .get(`${baseUrl}/default`);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Welcome to Stayout.com');
  });

  it('should capitalize the input parameter', async () => {
    const capitalized = capitalize('hello');
    expect(capitalized).to.equal('Hello');
  });

  it('should return an empty string for non-strings', async () => {
    const capitalized = capitalize(888);
    expect(capitalized).to.equal('');
  });
});
