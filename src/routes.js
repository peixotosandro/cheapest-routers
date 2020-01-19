import { Router } from 'express';

import RoutesController from './app/controllers/RoutesController';

const routes = new Router();

routes.get('/routes/cheapest/:route', RoutesController.index);

export default routes;
