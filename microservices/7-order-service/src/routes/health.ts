import { health } from '@order/controllers/order/health';
import express, { Router } from 'express';

const router: Router = express.Router();

const healthRoutes = (): Router => {
  router.get('/order-health', health);

  return router;
};

export { healthRoutes };
