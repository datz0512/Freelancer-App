import { IReviewDocument } from '@datz0512/freelancer-shared';
import { getReviewsByGigId, getReviewsBySellerId } from '@review/services/review.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const reviewsByGigId = async (req: Request, res: Response): Promise<void> => {
  const reviews: IReviewDocument[] = await getReviewsByGigId(req.params.gigId);
  res.status(StatusCodes.OK).json({ message: 'Gig reviews by gigId', reviews });
};

export const reviewsBySellerId = async (req: Request, res: Response): Promise<void> => {
  const reviews: IReviewDocument[] = await getReviewsBySellerId(req.params.sellerId);
  res.status(StatusCodes.OK).json({ message: 'Gig reviews by sellerId', reviews });
};
