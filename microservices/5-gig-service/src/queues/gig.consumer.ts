import { Channel, ConsumeMessage, Replies } from 'amqplib';
import { createConnection } from '@gig/queues/connection';
import { Logger } from 'winston';
import { winstonLogger } from '@datz0512/freelancer-shared';
import { config } from '@gig/config';
import { seedData, updateGigReview } from '@gig/services/gig.service';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'gigServiceConsumer', 'debug');

const consumeGigDirectMessage = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'freelancer-update-gig';
    const routingKey = 'update-gig';
    const queueName = 'gig-update-queue';
    await channel.assertExchange(exchangeName, 'direct');
    const freelancerQueue: Replies.AssertQueue = await channel.assertQueue(queueName, {
      durable: true,
      autoDelete: false
    });
    await channel.bindQueue(freelancerQueue.queue, exchangeName, routingKey);
    channel.consume(freelancerQueue.queue, async (msg: ConsumeMessage | null) => {
      const { gigReview } = JSON.parse(msg!.content.toString());
      await updateGigReview(JSON.parse(gigReview));
      channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'GigService consumeGigDirectMessage() method error:', error);
  }
};

const consumeSeedDirectMessages = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'freelancer-seed-gig';
    const routingKey = 'receive-sellers';
    const queueName = 'seed-gig-queue';
    await channel.assertExchange(exchangeName, 'direct');
    const freelancerQueue: Replies.AssertQueue = await channel.assertQueue(queueName, {
      durable: true,
      autoDelete: false
    });
    await channel.bindQueue(freelancerQueue.queue, exchangeName, routingKey);
    channel.consume(freelancerQueue.queue, async (msg: ConsumeMessage | null) => {
      const { sellers, count } = JSON.parse(msg!.content.toString());
      await seedData(sellers, count);
      channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'GigService consumeGigDirectMessage() method error:', error);
  }
};

export { consumeGigDirectMessage, consumeSeedDirectMessages };
