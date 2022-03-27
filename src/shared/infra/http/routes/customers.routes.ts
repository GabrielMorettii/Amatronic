import { CreateCustomerController } from '@modules/customers/useCases/createCustomer/CreateCustomerController';
import { DeleteCustomerController } from '@modules/customers/useCases/deleteCustomer/DeleteCustomerController';
import { ListCustomersController } from '@modules/customers/useCases/listCustomer/ListCustomersController';
import { UpdateCustomerController } from '@modules/customers/useCases/updateCustomer/UpdateCustomerController';
import {Router} from 'express';
import { EnsureAdmin } from '../middlewares/EnsureAdmin';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const customersRoutes = Router();

let createCustomerController = new CreateCustomerController();
let listCustomersController = new ListCustomersController();
let updateCustomerController = new UpdateCustomerController();
let deleteCustomerController = new DeleteCustomerController();

customersRoutes.post('/', createCustomerController.handle)
customersRoutes.get('/', EnsureAuthenticated, EnsureAdmin,listCustomersController.handle)
customersRoutes.put('/', EnsureAuthenticated, updateCustomerController.handle)
customersRoutes.delete('/', EnsureAuthenticated, deleteCustomerController.handle)

export {customersRoutes}
