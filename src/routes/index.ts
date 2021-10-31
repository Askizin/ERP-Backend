import { Router } from 'express';
import { logRequest } from '../middlewares/logRequest'
import { sessionsRouter } from './sessions.routes';
import { usersRouter } from'./users.routes';
import {productsRouter } from'./products.routes';
import { permissionsRouter } from'./permissions.routes';
import { rolesRouter } from'./roles.routes';

const routes = Router();

routes.use(logRequest);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRouter);
routes.use('/permissions', permissionsRouter);
routes.use('/roles', rolesRouter);

export { routes }
