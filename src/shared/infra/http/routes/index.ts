import {Router} from 'express';
import { brandsRoutes } from './brands.routes';
import { categoriesRoutes } from './categories.routes';
import { customersRoutes } from './customers.routes';
import { goodsRoutes } from './goods.routes';
import { sessionsRoutes } from './sessions.routes';

const router = Router();

router.use(sessionsRoutes)
router.use('/customers', customersRoutes)
router.use('/categories', categoriesRoutes)
router.use('/goods', goodsRoutes)
router.use('/brands', brandsRoutes)

export {router}
