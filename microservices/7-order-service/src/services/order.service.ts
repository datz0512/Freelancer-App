import {
  IDeliveredWork,
  IExtendedDelivery,
  IOrderDocument,
  IOrderMessage,
  IReviewMessageDetails,
  lowerCase
} from '@datz0512/freelancer-shared';
import { config } from '@order/config';
import { OrderModel } from '@order/models/order.schema';
import { publishDirectMessage } from '@order/queues/order.producer';
import { orderChannel } from '@order/server';
import { sendNotification } from '@order/services/notification.service';

export const getOrderByOrderId = async (orderId: string): Promise<IOrderDocument> => {
  const order: IOrderDocument[] = await OrderModel.aggregate([{ $match: { orderId } }]); //aggregate always return array
  return order[0];
};

export const getOrderBySellerId = async (sellerId: string): Promise<IOrderDocument[]> => {
  const orders: IOrderDocument[] = await OrderModel.aggregate([{ $match: { sellerId } }]); //aggregate always return array
  return orders;
};

export const getOrderByBuyerId = async (buyerId: string): Promise<IOrderDocument[]> => {
  const orders: IOrderDocument[] = await OrderModel.aggregate([{ $match: { buyerId } }]); //aggregate always return array
  return orders;
};

export const createOrder = async (data: IOrderDocument): Promise<IOrderDocument> => {
  const order: IOrderDocument = await OrderModel.create(data);

  //update seller info
  const messageDetails: IOrderMessage = {
    sellerId: data.sellerId,
    ongoingJobs: 1,
    type: 'create-order'
  };
  await publishDirectMessage(
    orderChannel,
    'freelancer-seller-update',
    'user-seller',
    JSON.stringify(messageDetails),
    'Details sent to users service'
  );

  //send email
  const emailMessageDetails: IOrderMessage = {
    orderId: data.orderId,
    invoiceId: data.invoiceId,
    orderDue: `${data.offer.newDeliveryDate}`,
    amount: `${data.price}`,
    buyerUsername: lowerCase(data.buyerUsername),
    sellerUsername: lowerCase(data.sellerUsername),
    title: data.offer.gigTitle,
    description: data.offer.description,
    requirements: data.requirements,
    serviceFee: `${order.serviceFee}`,
    total: `${order.price + order.serviceFee!}`,
    orderUrl: `${config.CLIENT_URL}/orders/${data.orderId}/activities`,
    template: 'orderPlaced'
  };
  await publishDirectMessage(
    orderChannel,
    'freelancer-order-notification',
    'order-email',
    JSON.stringify(emailMessageDetails),
    'Order email sent to notification service.'
  );

  sendNotification(order, data.sellerUsername, 'placed an order for your gig.');
  return order;
};

export const cancelOrder = async (orderId: string, data: IOrderMessage): Promise<IOrderDocument> => {
  const order: IOrderDocument = (await OrderModel.findOneAndUpdate(
    { orderId },
    {
      $set: {
        cancelled: true,
        status: 'Cancelled',
        approvedAt: new Date()
      }
    },
    { new: true }
  ).exec()) as IOrderDocument;

  //update seller info
  await publishDirectMessage(
    orderChannel,
    'freelancer-seller-update',
    'user-seller',
    JSON.stringify({ type: 'cancel-order', sellerId: data.sellerId }),
    'Cancelled order details sent to users service'
  );

  //update buyer info
  await publishDirectMessage(
    orderChannel,
    'freelancer-buyer-update',
    'user-buyer',
    JSON.stringify({ type: 'cancel-order', buyerId: data.buyerId, purchasedGigs: data.purchasedGigs }),
    'Cancelled order details sent to users service'
  );

  sendNotification(order, order.sellerUsername, 'cancelled your order delivery.');
  return order;
};

export const approveOrder = async (orderId: string, data: IOrderMessage): Promise<IOrderDocument> => {
  const order: IOrderDocument = (await OrderModel.findOneAndUpdate(
    { orderId },
    {
      $set: {
        approved: true,
        status: 'Completed',
        approvedAt: new Date()
      }
    },
    { new: true }
  ).exec()) as IOrderDocument;

  //update seller info
  const messageDetails: IOrderMessage = {
    sellerId: data.sellerId,
    ongoingJobs: data.ongoingJobs,
    completedJobs: data.completedJobs,
    totalEarnings: data.totalEarnings,
    recentDelivery: `${new Date()}`,
    type: 'approve-order'
  } as IOrderMessage;
  await publishDirectMessage(
    orderChannel,
    'freelancer-seller-update',
    'user-seller',
    JSON.stringify(messageDetails),
    'Approved order details sent to users service.'
  );

  //update buyer info
  await publishDirectMessage(
    orderChannel,
    'freelancer-buyer-update',
    'user-buyer',
    JSON.stringify({ type: 'purchased-gigs', buyerId: data.buyerId, purchasedGigs: data.purchasedGigs }),
    'Approved order details sent to users service.'
  );

  sendNotification(order, order.sellerUsername, 'approved your order delivery.');
  return order;
};

//seller deliver the order by sending file
export const sellerDeliverOrder = async (
  orderId: string,
  delivered: boolean,
  deliveredWork: IDeliveredWork //file
): Promise<IOrderDocument> => {
  const order: IOrderDocument = (await OrderModel.findOneAndUpdate(
    { orderId },
    {
      $set: {
        delivered,
        status: 'Delivered',
        ['events.orderDelivered']: new Date()
      },
      $push: {
        deliveredWork
      }
    },
    { new: true }
  ).exec()) as IOrderDocument;

  if (order) {
    //send email to buyer
    const emailMessageDetails: IOrderMessage = {
      orderId,
      buyerUsername: lowerCase(order.buyerUsername),
      sellerUsername: lowerCase(order.sellerUsername),
      title: order.offer.gigTitle,
      description: order.offer.description,
      orderUrl: `${config.CLIENT_URL}/orders/${orderId}/activities`,
      template: 'orderDelivered'
    };
    await publishDirectMessage(
      orderChannel,
      'freelancer-order-notification',
      'order-email',
      JSON.stringify(emailMessageDetails),
      'Order delivered message sent to notification service.'
    );

    sendNotification(order, order.buyerUsername, 'delivered your order.');
  }

  return order;
};

//seller requested for extension
export const requestDeliveryExtension = async (orderId: string, data: IExtendedDelivery): Promise<IOrderDocument> => {
  const { newDate, days, reason, originalDate } = data;
  const order: IOrderDocument = (await OrderModel.findOneAndUpdate(
    { orderId },
    {
      $set: {
        ['requestExtension.originalDate']: originalDate,
        ['requestExtension.newDate']: newDate,
        ['requestExtension.days']: days,
        ['requestExtension.reason']: reason
      }
    },
    { new: true }
  ).exec()) as IOrderDocument;

  if (order) {
    //send email to buyer
    const emailMessageDetails: IOrderMessage = {
      buyerUsername: lowerCase(order.buyerUsername),
      sellerUsername: lowerCase(order.sellerUsername),
      originalDate: order.offer.oldDeliveryDate,
      newDate: order.offer.newDeliveryDate,
      reason: order.offer.reason,
      orderUrl: `${config.CLIENT_URL}/orders/${orderId}/activities`,
      template: 'orderExtension'
    };
    await publishDirectMessage(
      orderChannel,
      'freelancer-order-notification',
      'order-email',
      JSON.stringify(emailMessageDetails),
      'Order delivered message sent to notification service.'
    );

    sendNotification(order, order.buyerUsername, 'requested for an order delivery date extension.');
  }

  return order;
};

//buyer approve extension request
export const approveDeliveryDate = async (orderId: string, data: IExtendedDelivery): Promise<IOrderDocument> => {
  const { newDate, days, reason, deliveryDateUpdate } = data;
  const order: IOrderDocument = (await OrderModel.findOneAndUpdate(
    { orderId },
    {
      $set: {
        ['offer.deliveryInDays']: days,
        ['offer.newDeliveryDate']: newDate,
        ['offer.reason']: reason,
        ['events.deliveryDateUpdate']: new Date(`${deliveryDateUpdate}`),
        requestExtension: {
          originalDate: '',
          newDate: '',
          days: 0,
          reason: ''
        }
      }
    },
    { new: true }
  ).exec()) as IOrderDocument;

  if (order) {
    //send email to seller
    const emailMessageDetails: IOrderMessage = {
      subject: 'Congratulations: Your extension request was approved',
      buyerUsername: lowerCase(order.buyerUsername),
      sellerUsername: lowerCase(order.sellerUsername),
      header: 'Request Accepted',
      type: 'accepted',
      message: 'You can continue working on the order.',
      orderUrl: `${config.CLIENT_URL}/orders/${orderId}/activities`,
      template: 'orderExtensionApproval'
    };
    await publishDirectMessage(
      orderChannel,
      'freelancer-order-notification',
      'order-email',
      JSON.stringify(emailMessageDetails),
      'Order request extension approval message sent to notification service.'
    );

    sendNotification(order, order.sellerUsername, 'approved your order delivery date extension request.');
  }

  return order;
};

//buyer reject extension request
export const rejectDeliveryDate = async (orderId: string): Promise<IOrderDocument> => {
  const order: IOrderDocument = (await OrderModel.findOneAndUpdate(
    { orderId },
    {
      $set: {
        requestExtension: {
          originalDate: '',
          newDate: '',
          days: 0,
          reason: ''
        }
      }
    },
    { new: true }
  ).exec()) as IOrderDocument;

  if (order) {
    //send email to seller
    const emailMessageDetails: IOrderMessage = {
      subject: 'Sorry: Your extension request was rejected',
      buyerUsername: lowerCase(order.buyerUsername),
      sellerUsername: lowerCase(order.sellerUsername),
      header: 'Request Rejected',
      type: 'rejected',
      message: 'You can contact the buyer for more information.',
      orderUrl: `${config.CLIENT_URL}/orders/${orderId}/activities`,
      template: 'orderExtensionApproval'
    };
    await publishDirectMessage(
      orderChannel,
      'freelancer-order-notification',
      'order-email',
      JSON.stringify(emailMessageDetails),
      'Order request extension rejection message sent to notification service.'
    );

    sendNotification(order, order.sellerUsername, 'rejected your order delivery date extension request.');
  }

  return order;
};

export const updateOrderReview = async (data: IReviewMessageDetails): Promise<IOrderDocument> => {
  const order: IOrderDocument = (await OrderModel.findOneAndUpdate(
    { orderId: data.orderId },
    {
      $set:
        data.type === 'buyer-review'
          ? {
              buyerReview: {
                rating: data.rating,
                review: data.review,
                created: new Date(`${data.createdAt}`)
              },
              ['events.buyerReview']: new Date(`${data.createdAt}`)
            }
          : {
              sellerReview: {
                rating: data.rating,
                review: data.review,
                created: new Date(`${data.createdAt}`)
              },
              ['events.sellerReview']: new Date(`${data.createdAt}`)
            }
    },
    { new: true }
  ).exec()) as IOrderDocument;

  sendNotification(
    order,
    data.type === 'buyer-review' ? order.sellerUsername : order.buyerUsername,
    `left you a ${data.rating} star review`
  );

  return order;
};
