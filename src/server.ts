import express from 'express';
import cors from 'cors';
import routes from './router';

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(routes);
app.get('/', (req, res) => res.send('Hello World! 20h36 20/06'));
app.listen(port, () => console.log(`listening on port ${port}! 😎 20h36 20/06`));
