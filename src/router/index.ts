import {Router} from 'express';
import userRouter from './routes';

const routes = Router(); // eslint-disable-line

routes.use('/user', userRouter);

export default routes;
