import { winstonLogger } from '@datz0512/freelancer-shared';
import { Logger } from 'winston';
import { config } from '@chat/config';
import mongoose from 'mongoose';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'chatDatabaseService', 'debug');

const databaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(`${config.DATABASE_URL}`);
    log.info('Chat service successfully connected to database.');
  } catch (error) {
    log.log('error', 'ChatService databaseConnection() method error:', error);
  }
};

export { databaseConnection };
