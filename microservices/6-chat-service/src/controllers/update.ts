import { markManyMessageAsRead, markMessageAsRead, updateOffer } from '@chat/services/message.service';
import { IMessageDocument } from '@datz0512/freelancer-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const offer = async (req: Request, res: Response): Promise<void> => {
  const { messageId, type } = req.body;
  const message: IMessageDocument = await updateOffer(messageId, type);
  res.status(StatusCodes.OK).json({ message: 'Message updated.', singleMessage: message });
};

const markMultipleMessages = async (req: Request, res: Response): Promise<void> => {
  const { sender, receiver, messageId } = req.body;
  await markManyMessageAsRead(sender, receiver, messageId);
  res.status(StatusCodes.OK).json({ message: 'Messages marked as read' });
};

const markSingleMessage = async (req: Request, res: Response): Promise<void> => {
  const { messageId } = req.body;
  const message: IMessageDocument = await markMessageAsRead(messageId);
  res.status(StatusCodes.OK).json({ message: 'Messages marked as read', singleMessage: message });
};

export { offer, markMultipleMessages, markSingleMessage };
