import {Router} from 'express';
import { brandsRoutes } from './brands.routes';
import { customersRoutes } from './customers.routes';
import { sessionsRoutes } from './sessions.routes';

const router = Router();

router.use(sessionsRoutes)
router.use('/customers', customersRoutes)
router.use('/brands', brandsRoutes)

export {router}
