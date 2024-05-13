import crypto from 'crypto';
import { BadRequestError, IDeliveredWork, IOrderDocument, uploads } from '@datz0512/freelancer-shared';
import { config } from '@order/config';
import { orderUpdateSchema } from '@order/schemes/order';
import {
  approveDeliveryDate,
  approveOrder,
  cancelOrder,
  rejectDeliveryDate,
  requestDeliveryExtension,
  sellerDeliverOrder
} from '@order/services/order.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Stripe from 'stripe';
import { UploadApiResponse } from 'cloudinary';

const stripe: Stripe = new Stripe(`${config.STRIPE_API_KEY}`, {
  typescript: true
});

const cancel = async (req: Request, res: Response): Promise<void> => {
  await stripe.refunds.create({
    payment_intent: `${req.body.paymentIntent}`
  });

  const { orderId } = req.params;
  await cancelOrder(orderId, req.body.orderData);

  res.status(StatusCodes.OK).json({
    message: 'Order cancelled successfully.'
  });
};

const requestExtension = async (req: Request, res: Response): Promise<void> => {
  const { error } = await Promise.resolve(orderUpdateSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Update requestExtension() method error:');
  }

  const { orderId } = req.params;
  const order: IOrderDocument = await requestDeliveryExtension(orderId, req.body);

  res.status(StatusCodes.OK).json({
    message: 'Order delivery request.',
    order
  });
};

const deliveryDate = async (req: Request, res: Response): Promise<void> => {
  const { error } = await Promise.resolve(orderUpdateSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Update deliveryDate() method error:');
  }

  const { orderId, type } = req.params;
  const order: IOrderDocument =
    type === 'approve' ? await approveDeliveryDate(orderId, req.body) : await rejectDeliveryDate(orderId);

  res.status(StatusCodes.OK).json({
    message: 'Order delivery date extension.',
    order
  });
};

const buyerApproveOrder = async (req: Request, res: Response): Promise<void> => {
  const { orderId } = req.params;
  const order: IOrderDocument = await approveOrder(orderId, req.body);

  res.status(StatusCodes.OK).json({
    message: 'Order approved successfully.',
    order
  });
};

const deliverOrder = async (req: Request, res: Response): Promise<void> => {
  const { orderId } = req.params;

  //File handling
  let file: string = req.body.file;
  const randomBytes = await Promise.resolve(crypto.randomBytes(20));
  const randomCharacters = randomBytes.toString('hex');
  let result: UploadApiResponse;
  if (file) {
    result = (
      req.body.fileType === 'zip' ? await uploads(file, `${randomCharacters}.zip`) : await uploads(file)
    ) as UploadApiResponse;
    if (!result.public_id) {
      throw new BadRequestError('File upload error.', 'Update deliverOrder() method');
    }
    file = result?.secure_url;
  }

  const deliveredWork: IDeliveredWork = {
    message: req.body.message,
    file,
    fileType: req.body.fileType,
    fileSize: req.body.fileSize,
    fileName: req.body.fileName
  };

  const order: IOrderDocument = await sellerDeliverOrder(orderId, true, deliveredWork);

  res.status(StatusCodes.OK).json({
    message: 'Order delivered successfully.',
    order
  });
};

export { cancel, requestExtension, deliveryDate, buyerApproveOrder, deliverOrder };
