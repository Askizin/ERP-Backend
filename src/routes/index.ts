import { Router } from 'express';
import { logRequest } from '../middlewares/logRequest'
import { sessionsRouter } from './sessions.routes';
import { usersRouter } from'./users.routes';

const routes = Router();

routes.use(logRequest);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export { routes }
