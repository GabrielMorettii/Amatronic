import {Router} from 'express'
import { EnsureAdmin } from '../middlewares/EnsureAdmin';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { CreateGoodController } from '@modules/goods/useCases/Good/createGood/CreateGoodController';

const goodsRoutes = Router();

let createGoodController = new CreateGoodController();

goodsRoutes.post('/', EnsureAuthenticated, EnsureAdmin, createGoodController.handle)

export {goodsRoutes}
