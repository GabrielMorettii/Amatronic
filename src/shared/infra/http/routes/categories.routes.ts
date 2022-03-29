import { CreateCategoryController } from '@modules/goods/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '@modules/goods/useCases/listCategories/ListCategoriesController';
import { UpdateCategoryController } from '@modules/goods/useCases/updateCategory/UpdateCategoryController';
import {Router} from 'express'
import { EnsureAdmin } from '../middlewares/EnsureAdmin';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const categoriesRoutes = Router();

let listCategoriesController = new ListCategoriesController();
let createCategoryController = new CreateCategoryController();
let updateCategoryController = new UpdateCategoryController();

categoriesRoutes.get('/', listCategoriesController.handle)
categoriesRoutes.post('/', EnsureAuthenticated, EnsureAdmin, createCategoryController.handle)
categoriesRoutes.put('/:id', EnsureAuthenticated, EnsureAdmin, updateCategoryController.handle)

export {categoriesRoutes}
