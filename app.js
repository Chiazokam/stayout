import express from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './server/routes';
import { facebookStrategy, googleStrategy, twitterStrategy } from './server/utils/services/passport.services';

dotenv.config();

const { PORT, SESSION_SECRET } = process.env;
const app = express();
const port = PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true }));

passport.use(facebookStrategy);
passport.use(googleStrategy);
passport.use(twitterStrategy);
app.use(passport.initialize());

app.use('/api/v1', router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});

export default app;
