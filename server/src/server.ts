import express from 'express';
import cors from 'cors';

import routes from './routes';

import './database/connection';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/files', express.static('./uploads'));

app.use(routes);

app.listen(3333, () => {
  console.log('The application is running on port 3333')
});
