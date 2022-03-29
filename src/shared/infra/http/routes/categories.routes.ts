import { CreateCategoryController } from '@modules/goods/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '@modules/goods/useCases/listCategories/ListCategoriesController';
import {Router} from 'express'
import { EnsureAdmin } from '../middlewares/EnsureAdmin';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const categoriesRoutes = Router();

let listCategoriesController = new ListCategoriesController();
let createCategoryController = new CreateCategoryController();

categoriesRoutes.get('/', listCategoriesController.handle)
categoriesRoutes.post('/', EnsureAuthenticated, EnsureAdmin, createCategoryController.handle)

export {categoriesRoutes}
