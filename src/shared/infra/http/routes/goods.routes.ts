import {Router} from 'express'
import { EnsureAdmin } from '../middlewares/EnsureAdmin';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { CreateGoodController } from '@modules/goods/useCases/Good/createGood/CreateGoodController';
import { ListGoodsController } from '@modules/goods/useCases/Good/listGoods/ListGoodsController';
import { UpdateGoodController } from '@modules/goods/useCases/Good/updateGood/UpdateGoodController';
import { DeleteGoodController } from '@modules/goods/useCases/Good/deleteGood/DeleteGoodController';

const goodsRoutes = Router();

let createGoodController = new CreateGoodController();
let updateGoodController = new UpdateGoodController();
let deleteGoodController = new DeleteGoodController();
let listGoodsController = new ListGoodsController();

goodsRoutes.post('/', EnsureAuthenticated, EnsureAdmin, createGoodController.handle)
goodsRoutes.get('/', listGoodsController.handle)
goodsRoutes.put('/:id', EnsureAuthenticated, EnsureAdmin, updateGoodController.handle)
goodsRoutes.delete('/:id', EnsureAuthenticated, EnsureAdmin, deleteGoodController.handle)

export {goodsRoutes}
