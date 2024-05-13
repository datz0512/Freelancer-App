import { IOrderDocument } from '@datz0512/freelancer-shared';
import { getOrderByBuyerId, getOrderByOrderId, getOrderBySellerId } from '@order/services/order.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const orderId = async (req: Request, res: Response): Promise<void> => {
  const order: IOrderDocument = await getOrderByOrderId(req.params.orderId);
  res.status(StatusCodes.OK).json({ message: 'Order by orderId', order });
};

const sellerOrders = async (req: Request, res: Response): Promise<void> => {
  const orders: IOrderDocument[] = await getOrderBySellerId(req.params.sellerId);
  res.status(StatusCodes.OK).json({ message: 'Seller orders', orders });
};

const buyerOrders = async (req: Request, res: Response): Promise<void> => {
  const orders: IOrderDocument[] = await getOrderByBuyerId(req.params.buyerId);
  res.status(StatusCodes.OK).json({ message: 'Buyer orders', orders });
};

export { orderId, sellerOrders, buyerOrders };
