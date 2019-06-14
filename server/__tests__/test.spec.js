import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import baseUrl from './utils/baseUrl.utils';


chai.use(chaiHttp);

describe('Test if tests run', () => {
  it('it should get the default route', async () => {
    const res = await chai
      .request(app)
      .get(`${baseUrl}/default`);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Welcome to Stayout.com');
  });
});
