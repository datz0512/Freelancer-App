import { Search } from '@gateway/controllers/auth/search';
import express, { Router } from 'express';

class SearchRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/search/gig/:gigId', Search.prototype.gigById);
    this.router.get('/search/gig/:from/:size/:type', Search.prototype.gigs);
    return this.router;
  }
}

export const searchRoutes: SearchRoutes = new SearchRoutes();
