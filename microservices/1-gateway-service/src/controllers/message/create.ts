import { messageService } from '@gateway/services/api/message.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Create {
  public async message(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await messageService.addMessage(req.body);
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, conversationId: response.data.conversationId, messageData: response.data.messageData });
  }
}
