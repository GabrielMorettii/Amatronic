import { CreateCustomerController } from '@modules/customers/useCases/createCustomer/CreateCustomerController';
import { ListCustomerController } from '@modules/customers/useCases/listCustomer/ListCustomerController';
import {Router} from 'express';

const customersRoutes = Router();

let createCustomerController = new CreateCustomerController();
let listCustomersController = new ListCustomerController();

customersRoutes.post('/', createCustomerController.handle)
customersRoutes.get('/', listCustomersController.handle)

export {customersRoutes}
