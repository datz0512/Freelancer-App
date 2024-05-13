import { winstonLogger } from '@datz0512/freelancer-shared';
import { Logger } from 'winston';
import { config } from '@order/config';
import mongoose from 'mongoose';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'orderDatabaseService', 'debug');

const databaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(`${config.DATABASE_URL}`);
    log.info('Order service successfully connected to database.');
  } catch (error) {
    log.log('error', 'OrderService databaseConnection() method error:', error);
  }
};

export { databaseConnection };
