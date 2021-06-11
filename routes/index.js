import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const statusRoute = express.Router();
const statsRoute = express.Router();
const userRoute = express.Router();
const authRoute = express.Router();

statusRoute.get('/status', AppController.getStatus);
statsRoute.get('/stats', AppController.getStats);
userRoute.post('/users', UsersController.postNew);

export {
  statusRoute, statsRoute, userRoute, authRoute,
};
