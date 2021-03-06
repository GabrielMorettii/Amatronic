import { CreateCategoryController } from '@modules/goods/useCases/Category/createCategory/CreateCategoryController';
import { ListCategoriesController } from '@modules/goods/useCases/Category/listCategories/ListCategoriesController';
import { UpdateCategoryController } from '@modules/goods/useCases/Category/updateCategory/UpdateCategoryController';
import { DeleteCategoryController } from '@modules/goods/useCases/Category/deleteCategory/DeleteCategoryController';
import {Router} from 'express'
import { EnsureAdmin } from '../middlewares/EnsureAdmin';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const categoriesRoutes = Router();

let listCategoriesController = new ListCategoriesController();
let createCategoryController = new CreateCategoryController();
let updateCategoryController = new UpdateCategoryController();
let deleteCategoryController = new DeleteCategoryController();

categoriesRoutes.get('/', listCategoriesController.handle)
categoriesRoutes.post('/', EnsureAuthenticated, EnsureAdmin, createCategoryController.handle)
categoriesRoutes.put('/:id', EnsureAuthenticated, EnsureAdmin, updateCategoryController.handle)
categoriesRoutes.delete('/:id', EnsureAuthenticated, EnsureAdmin, deleteCategoryController.handle)

export {categoriesRoutes}
