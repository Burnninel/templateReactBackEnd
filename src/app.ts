import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.post('/login', (req: Request, res: Response) => {
   const { email, pw } = req.body;
   
   res.json({ email, pw });

   console.log(email, pw)
});

app.listen(4000, () => {
   console.log('Server is running on port 4000');
});