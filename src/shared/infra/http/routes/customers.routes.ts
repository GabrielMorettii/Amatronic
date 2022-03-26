import { CreateCustomerController } from '@modules/customers/useCases/createCustomer/CreateCustomerController';
import { ListCustomerController } from '@modules/customers/useCases/listCustomer/ListCustomerController';
import {Router} from 'express';
import { EnsureAdmin } from '../middlewares/EnsureAdmin';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const customersRoutes = Router();

let createCustomerController = new CreateCustomerController();
let listCustomersController = new ListCustomerController();

customersRoutes.post('/', createCustomerController.handle)
customersRoutes.get('/', EnsureAuthenticated, EnsureAdmin,listCustomersController.handle)

export {customersRoutes}
