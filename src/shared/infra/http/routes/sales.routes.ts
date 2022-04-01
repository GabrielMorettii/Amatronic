import { CreateSalesController } from '@modules/orders/useCases/Sales/createSales/CreateSalesController';
import { ListSalesController } from '@modules/orders/useCases/Sales/listSales/ListSalesController';
import { UpdateSalesController } from '@modules/orders/useCases/Sales/updateSales/UpdateSalesController';
import {Router} from 'express'
import { EnsureAdmin } from '../middlewares/EnsureAdmin';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const salesRoutes = Router();

let createSalesController = new CreateSalesController();
let listSalesController = new ListSalesController();
let updateSalesController = new UpdateSalesController();

salesRoutes.post('/', EnsureAuthenticated, createSalesController.handle)
salesRoutes.get('/', EnsureAuthenticated, EnsureAdmin, listSalesController.handle)
salesRoutes.put('/:id', EnsureAuthenticated, EnsureAdmin, updateSalesController.handle)

export {salesRoutes}
