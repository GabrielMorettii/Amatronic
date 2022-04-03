import { AuthenticateCustomerController } from '@modules/customers/useCases/authenticateCustomer/AuthenticateCustomerController';
import {Router} from 'express'

const sessionsRoutes = Router();

let authenticateCustomerController = new AuthenticateCustomerController();

sessionsRoutes.post('/sessions', authenticateCustomerController.handle)
sessionsRoutes.get('/', (req, res) =>{
  res.status(301).redirect('/docs')
})

export {sessionsRoutes}
