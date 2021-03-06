import { Router } from 'express';
import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController"
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';

import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';

import multer from "multer";
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/categories/import",upload.single("file"),importCategoryController.handle) 

categoriesRoutes.post("/categories",ensureAuthenticated, createCategoryController.handle);

categoriesRoutes.get("/",listCategoriesController.handle);

export { categoriesRoutes }