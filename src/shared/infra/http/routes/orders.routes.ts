import { CreateOrderController } from '@modules/orders/useCases/Order/createOrder/CreateOrderController';
import { ListOrdersController } from '@modules/orders/useCases/Order/listOrders/ListOrdersController';
import {Router} from 'express'
import { EnsureAdmin } from '../middlewares/EnsureAdmin';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const ordersRoutes = Router();

let createOrderController = new CreateOrderController();
let listOrdersController = new ListOrdersController();

ordersRoutes.post('/', EnsureAuthenticated, createOrderController.handle)
ordersRoutes.get('/', EnsureAuthenticated, EnsureAdmin, listOrdersController.handle)

export {ordersRoutes}
