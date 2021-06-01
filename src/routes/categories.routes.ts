import { Router } from 'express';
import {CreateCategoryController} from "../modules/cars/useCases/createCategory/CreateCategoryController"

import { listCategoriesController } from '../modules/cars/useCases/listCategories';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import multer from "multer";



const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/categories/import",upload.single("file"), (request,response)=>{
   return importCategoryController.handle(request,response);
});

categoriesRoutes.post("/categories",createCategoryController.handle);


categoriesRoutes.get("/",(request,response)=>{
    return listCategoriesController.handle(request,response);
});



export { categoriesRoutes }