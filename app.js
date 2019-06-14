import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import docs from './docs.json';
import router from './server/routes';


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));

app.use('/api/v1', router);

app.listen(process.env.PORT || 5000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});

export default app;
