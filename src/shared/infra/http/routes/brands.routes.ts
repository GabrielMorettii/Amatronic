import { CreateBrandController } from '@modules/goods/useCases/createBrand/CreateBrandController';
import { DeleteBrandController } from '@modules/goods/useCases/deleteBrand/DeleteBrandController';
import { ListBrandsController } from '@modules/goods/useCases/listBrands/ListBrandsController';
import { UpdateBrandController } from '@modules/goods/useCases/updateBrand/UpdateBrandController';
import {Router} from 'express'
import { EnsureAdmin } from '../middlewares/EnsureAdmin';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const brandsRoutes = Router();

let createBrandController = new CreateBrandController();
let updateBrandController = new UpdateBrandController();
let deleteBrandController = new DeleteBrandController();
let listBrandsController = new ListBrandsController();

brandsRoutes.get('/', listBrandsController.handle)
brandsRoutes.post('/', EnsureAuthenticated, EnsureAdmin, createBrandController.handle)
brandsRoutes.put('/:id', EnsureAuthenticated, EnsureAdmin, updateBrandController.handle)
brandsRoutes.delete('/:id', EnsureAuthenticated, EnsureAdmin, deleteBrandController.handle)

export {brandsRoutes}
