import { CreateBrandController } from '@modules/goods/useCases/createBrand/CreateBrandController';
import {Router} from 'express'

const brandsRoutes = Router();

let createBrandController = new CreateBrandController();

brandsRoutes.post('/', createBrandController.handle)

export {brandsRoutes}
