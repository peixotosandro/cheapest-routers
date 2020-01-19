import express, { json } from 'express';
import cors from 'cors';
import routes from './routes';
import cheapestRoute from './app/utils/CheapestRoute';

class App {
  constructor() {
    this.server = express();
    this.pathsFile = null;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(json());
  }

  routes() {
    this.server.use('/v1', routes);
  }

  loadPathsFile(pathsFile) {
    cheapestRoute.loadPathsFromFile(pathsFile);
  }
}

export default new App();
