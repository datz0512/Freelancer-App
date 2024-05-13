import { Application } from 'express';
import { verifyGatewayRequest } from '@datz0512/freelancer-shared';
import { authRoutes } from '@auth/routes/auth';
import { healthRoutes } from '@auth/routes/health';
import { currentUserRoutes } from '@auth/routes/current-user';
import { searchRoutes } from '@auth/routes/search';
import { seedRoutes } from '@auth/routes/seed';

const BASE_PATH = '/api/v1/auth';

export function appRoutes(app: Application): void {
  app.use('', healthRoutes());
  app.use(BASE_PATH, searchRoutes());
  app.use(BASE_PATH, seedRoutes());

  app.use(BASE_PATH, verifyGatewayRequest, authRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, currentUserRoutes());
}
