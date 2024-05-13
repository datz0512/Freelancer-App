import { IAuthDocument, IAuthPayload } from '@datz0512/freelancer-shared';
import { Response } from 'express';
export const authMockRequest = (sessionData: IJWT, body: IAuthMock, currentUser?: IAuthPayload | null, params?: unknown) => ({
  session: sessionData,
  body,
  params,
  currentUser
});

export const authMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export interface IJWT {
  jwt?: string;
}

export interface IAuthMock {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  createdAt?: Date | string;
}

export const authUserPayload: IAuthPayload = {
  id: 1,
  username: 'Manny',
  email: 'manny@test.com',
  iat: 12341241234
};

export const authMock: IAuthDocument = {
  id: 1,
  profilePublicId: '1314245131342341',
  username: 'Manny',
  email: 'manny@test.com',
  country: 'vietnam',
  profilePicture: '',
  emailVerified: 1,
  createdAt: new Date(),
  comparePassword: () => {},
  hashPassword: () => false
} as unknown as IAuthDocument;
