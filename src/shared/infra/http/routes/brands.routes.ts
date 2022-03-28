import { CreateBrandController } from '@modules/goods/useCases/createBrand/CreateBrandController';
import { ListBrandsController } from '@modules/goods/useCases/listBrands/ListBrandsController';
import { UpdateBrandController } from '@modules/goods/useCases/updateBrand/UpdateBrandController';
import {Router} from 'express'
import { EnsureAdmin } from '../middlewares/EnsureAdmin';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const brandsRoutes = Router();

let createBrandController = new CreateBrandController();
let updateBrandController = new UpdateBrandController();
let listBrandsController = new ListBrandsController();

brandsRoutes.post('/', EnsureAuthenticated, EnsureAdmin, createBrandController.handle)
brandsRoutes.put('/:id', EnsureAuthenticated, EnsureAdmin, updateBrandController.handle)
brandsRoutes.get('/', listBrandsController.handle)

export {brandsRoutes}
