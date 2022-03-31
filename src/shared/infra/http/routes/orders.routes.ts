import { CreateOrderController } from '@modules/orders/useCases/createOrder/CreateOrderController';
import {Router} from 'express'
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const ordersRoutes = Router();

let createOrderController = new CreateOrderController();

ordersRoutes.post('/', EnsureAuthenticated, createOrderController.handle)

export {ordersRoutes}
