import {Router} from 'express';
import { customersRoutes } from './customers.routes';
import { sessionsRoutes } from './sessions.routes';

const router = Router();

router.use(sessionsRoutes)
router.use('/customers', customersRoutes)

export {router}
