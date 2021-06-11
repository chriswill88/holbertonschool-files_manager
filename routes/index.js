import express from 'express';
import AppController from '../controllers/AppController';

const statusRoute = express.Router();
const statsRoute = express.Router();

statusRoute.get('/status', AppController.getStatus);
statsRoute.get('/stats', AppController.getStats);

export { statusRoute, statsRoute };
