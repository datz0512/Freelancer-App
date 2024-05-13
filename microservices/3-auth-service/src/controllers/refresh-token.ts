import { getUserByUsername, signToken } from "@auth/services/auth.service";
import { IAuthDocument } from "@datz0512/freelancer-shared";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function token(req: Request, res: Response): Promise<void> {
  const existingUser: IAuthDocument = await getUserByUsername(req.params.username) as IAuthDocument
  const userJWT: string = signToken(existingUser.id!, existingUser.email!, existingUser.username!)
  res.status(StatusCodes.OK).json({message: 'Refresh token', user: existingUser, token: userJWT})
}