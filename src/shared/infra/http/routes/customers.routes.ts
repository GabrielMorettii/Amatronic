import { CreateCustomerController } from '@modules/customers/useCases/createCustomer/CreateCustomerController';
import { ListCustomersController } from '@modules/customers/useCases/listCustomer/ListCustomersController';
import {Router} from 'express';
import { EnsureAdmin } from '../middlewares/EnsureAdmin';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const customersRoutes = Router();

let createCustomerController = new CreateCustomerController();
let listCustomersController = new ListCustomersController();

customersRoutes.post('/', createCustomerController.handle)
customersRoutes.get('/', EnsureAuthenticated, EnsureAdmin,listCustomersController.handle)

export {customersRoutes}
