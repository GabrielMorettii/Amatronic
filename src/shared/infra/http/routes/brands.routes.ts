import { CreateBrandController } from '@modules/goods/useCases/createBrand/CreateBrandController';
import { ListBrandsController } from '@modules/goods/useCases/listBrands/ListBrandsController';
import {Router} from 'express'
import { EnsureAdmin } from '../middlewares/EnsureAdmin';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const brandsRoutes = Router();

let createBrandController = new CreateBrandController();
let listBrandsController = new ListBrandsController();

brandsRoutes.post('/', EnsureAuthenticated, EnsureAdmin, createBrandController.handle)
brandsRoutes.get('/', listBrandsController.handle)

export {brandsRoutes}
