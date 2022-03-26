import { AuthenticateCustomerController } from '@modules/customers/useCases/authenticateCustomer/AuthenticateCustomerController';
import {Router} from 'express'

const sessionsRoutes = Router();

let authenticateCustomerController = new AuthenticateCustomerController();

sessionsRoutes.post('/sessions', authenticateCustomerController.handle)

export {sessionsRoutes}
