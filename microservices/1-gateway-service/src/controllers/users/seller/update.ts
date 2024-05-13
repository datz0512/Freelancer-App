import { sellerService } from '@gateway/services/api/seller.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Update {
  public async seller(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await sellerService.updateSeller(req.params.sellerId, req.body);
    res.status(StatusCodes.OK).json({ message: response.data.message, seller: response.data.seller });
  }
}
