import { config } from '@order/config';
import { winstonLogger } from '@datz0512/freelancer-shared';
import { Logger } from 'winston';
import { Channel, ConsumeMessage, Replies } from 'amqplib';
import { createConnection } from '@order/queues/connection';
import { updateOrderReview } from '@order/services/order.service';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'orderServiceConsumer', 'debug');

export const consumeReviewFanoutMessages = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }

    const exchangeName = 'freelancer-review';
    const queueName = 'order-review-queue';
    await channel.assertExchange(exchangeName, 'fanout');
    const freelancerQueue: Replies.AssertQueue = await channel.assertQueue(queueName, {
      durable: true,
      autoDelete: false
    });
    await channel.bindQueue(freelancerQueue.queue, exchangeName, '');
    channel.consume(freelancerQueue.queue, async (msg: ConsumeMessage | null) => {
      await updateOrderReview(JSON.parse(msg!.content.toString()));
      channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'OrderService consumer consumeReviewFanoutMessages() method:', error);
  }
};
