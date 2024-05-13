import { IAuthPayload, IBuyerDocument } from '@datz0512/freelancer-shared';
import { Response } from 'express';

export const buyerMockRequest = (sessionData: IJWT, currentUser?: IAuthPayload | null, params?: unknown) => ({
  session: sessionData,
  params,
  currentUser
});

export const buyerMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export interface IJWT {
  jwt?: string;
}

export interface IParams {
  username?: string;
}

export const authUserPayload: IAuthPayload = {
  id: 1,
  username: 'Manny',
  email: 'manny@test.com',
  iat: 12341241234
};

export const buyerDocument: IBuyerDocument = {
  _id: 'j2h14jk213kj42j3h4j24242',
  username: 'Manny',
  email: 'manny@test.com',
  country: 'vietnam',
  profilePicture: '',
  isSeller: false,
  purchasedGigs: [],
  createdAt: new Date()
};
