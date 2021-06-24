import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const statusRoute = express.Router();
const statsRoute = express.Router();
const userRoute = express.Router();
const authRoute = express.Router();

statusRoute.get('/status', AppController.getStatus);
statsRoute.get('/stats', AppController.getStats);
userRoute.post('/users', UsersController.postNew);
authRoute.get('/connect', AuthController.getConnect);
authRoute.get('/disconnect', AuthController.getDisconnect);
userRoute.get('/users/me', UsersController.getMe);

export {
  statusRoute, statsRoute, userRoute, authRoute,
};
