import express, { Router } from 'express';

import { create } from '@auth/controllers/signup';
import { read } from '@auth/controllers/signin';
import { update } from '@auth/controllers/verify-email';
import { changePassword, createForgotPassword, resetPassword } from '@auth/controllers/password';

const router: Router = express.Router();

export function authRoutes(): Router {
  router.post('/signup', create);
  router.post('/signin', read);
  router.put('/verify-email', update);
  router.put('/forgot-password', createForgotPassword);
  router.put('/reset-password/:token', resetPassword);
  router.put('/change-password', changePassword);

  return router;
}
