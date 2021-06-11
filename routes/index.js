import { Router } from 'express';
import AppController from '../controllers/AppController';

const status = Router();
status.get('/status', AppController.getStatus);

const stats = Router();
stats.get('/stats', AppController.getStats);

export { status, stats };
