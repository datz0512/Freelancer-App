import { getNotificationsById } from '@order/services/notification.service';
import { IOrderNotifcation } from '@datz0512/freelancer-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notifications = async (req: Request, res: Response): Promise<void> => {
  const notifications: IOrderNotifcation[] = await getNotificationsById(req.params.userTo);
  res.status(StatusCodes.OK).json({ message: 'Notifications', notifications });
};

export { notifications };
