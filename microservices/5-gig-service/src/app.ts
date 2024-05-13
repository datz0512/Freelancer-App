import express, { Express } from 'express';

import { config } from '@gig/config';
import { databaseConnection } from '@gig/database';
import { start } from '@gig/server';
import { redisConnect } from '@gig/redis/redis.connection';

const initialize = (): void => {
  config.cloudinaryConfig();
  databaseConnection();
  const app: Express = express();
  start(app);
  redisConnect();
};

initialize();
