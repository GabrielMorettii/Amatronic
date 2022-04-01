import { CreateOrderController } from '@modules/orders/useCases/Order/createOrder/CreateOrderController';
import { DeleteOrderController } from '@modules/orders/useCases/Order/deleteOrder/DeleteOrderController';
import { ListOrdersController } from '@modules/orders/useCases/Order/listOrders/ListOrdersController';
import { UpdateOrderController } from '@modules/orders/useCases/Order/updateOrder/UpdateOrderController';
import {Router} from 'express'
import { EnsureAdmin } from '../middlewares/EnsureAdmin';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const ordersRoutes = Router();

let createOrderController = new CreateOrderController();
let listOrdersController = new ListOrdersController();
let updateOrderController = new UpdateOrderController();
let deleteOrderController = new DeleteOrderController();

ordersRoutes.post('/', EnsureAuthenticated, createOrderController.handle)
ordersRoutes.get('/', EnsureAuthenticated, EnsureAdmin, listOrdersController.handle)
ordersRoutes.put('/:id', EnsureAuthenticated, EnsureAdmin, updateOrderController.handle)
ordersRoutes.delete('/:id', EnsureAuthenticated, EnsureAdmin, deleteOrderController.handle)

export {ordersRoutes}
