import {Router} from 'express';
import { customersRoutes } from './customers.routes';

const router = Router();

router.use('/customers', customersRoutes)

export {router}
