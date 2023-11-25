import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from './routes';

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(router);

app.listen(4000, () => {
   console.log('Server is running on port 4000');
});