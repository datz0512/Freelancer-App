import express, { Express } from 'express';

import { config } from '@review/config';
import { databaseConnection } from '@review/database';
import { start } from '@review/server';

const initialize = (): void => {
  config.cloudinaryConfig();
  databaseConnection();
  const app: Express = express();
  start(app);
};

initialize();
